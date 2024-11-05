// Obtém o ID da reserva a ser visualizada da URL
const urlParams = new URLSearchParams(window.location.search);
const reservaId = urlParams.get('id');

// Carrega a reserva e exibe os detalhes
document.addEventListener("DOMContentLoaded", function () {
    carregarReserva(reservaId);
});

// Função para carregar os dados da reserva e exibi-los
function carregarReserva(id) {
    const dados = JSON.parse(localStorage.getItem("hotelPetDados"));
    const reserva = dados.reservas.find(r => r.id === id);

    if (reserva) {
        // Exibe os detalhes da reserva na página
        document.querySelector(".detalhes-reserva").innerHTML = `
            <p><strong>Pet:</strong> ${reserva.pet}</p>
            <p><strong>Proprietário:</strong> ${reserva.proprietario || 'N/A'}</p>
            <p><strong>Data de Chegada:</strong> ${reserva.chegada}</p>
            <p><strong>Data de Partida:</strong> ${reserva.partida}</p>
            <p><strong>Status:</strong> ${reserva.status}</p>
            <p><strong>Total das Diárias:</strong> R$ ${calcularTotalDiarias(reserva.chegada, reserva.partida, 40).toFixed(2)}</p>
            <p><strong>Anotações:</strong> ${reserva.anotacoes || 'Nenhuma anotação'}</p>
            <p><strong>Nota Fiscal:</strong> <a href="${reserva.notaFiscal || '#'}">Ver Documento</a></p>
        `;
    } else {
        mostrarMensagemErro("Reserva não encontrada.");
    }
}

// Função para calcular o total de diárias
function calcularTotalDiarias(checkin, checkout, valorDiaria) {
    const dataCheckin = new Date(checkin);
    const dataCheckout = new Date(checkout);
    const diferencaEmDias = (dataCheckout - dataCheckin) / (1000 * 60 * 60 * 24); // Converte milissegundos para dias
    return diferencaEmDias * valorDiaria;
}

// Função para mostrar mensagem de erro
function mostrarMensagemErro(mensagem) {
    const detalhesReserva = document.querySelector(".detalhes-reserva");
    detalhesReserva.innerHTML = `<p class="error">${mensagem}</p>`;
}
