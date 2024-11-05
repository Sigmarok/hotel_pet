// Inicia o carregamento das reservas quando o conteúdo do documento for carregado
document.addEventListener("DOMContentLoaded", function () {
    carregarReservas();
});

// Função para carregar todas as reservas e exibi-las na tabela
function carregarReservas() {
    // Obtém os dados armazenados no localStorage
    const dados = JSON.parse(localStorage.getItem("hotelPetDados"));
    const tabelaReservas = document.querySelector(".lista-reservas table tbody");
    console.log(dados)

    // Limpa o conteúdo atual da tabela antes de adicionar as reservas
    tabelaReservas.innerHTML = ""; // Descomente esta linha para limpar a tabela antes de adicionar novas reservas

    // Itera sobre cada reserva e adiciona uma linha na tabela
    dados.reservas.forEach(reserva => {
        const row = document.createElement("tr");
        const pet_index = dados.pets.findIndex(pet => pet.id === reserva.pet);
        row.innerHTML = `
            <td>${reserva.id}</td>
            <td>${dados.pets[pet_index].nome}</td>
            <td>${reserva.chegada}</td>
            <td>${reserva.partida}</td>
            <td>${reserva.status}</td>
            <td>R$ ${reserva.total}</td>
            <td>
                <button onclick="window.location.href='editar_reserva_gerente.html?id=${reserva.id}'">Editar</button>
                <button onclick="window.location.href='detalhes_reserva_gerente.html?id=${reserva.id}'">Visualizar</button>
                <button onclick="abrirModalExcluir('${reserva.id}')">Excluir</button>
            </td>
        `;
        // Adiciona a linha da reserva à tabela de reservas
        tabelaReservas.appendChild(row);
    });
}

// Função para abrir o modal de confirmação de exclusão da reserva
function abrirModalExcluir(id) {
    // Exibe o modal de exclusão, passando o ID da reserva a ser excluída
    const modal = document.getElementById("modal-excluir");
    modal.classList.add("show");
    modal.dataset.reservaId = id; // Armazena o ID da reserva no dataset do modal
}

// Função para confirmar e excluir a reserva
function confirmarExclusao() {
    const modal = document.getElementById("modal-excluir");
    const id = modal.dataset.reservaId; // Obtém o ID da reserva armazenado no modal

    // Remove a reserva dos dados e salva no localStorage
    const dados = JSON.parse(localStorage.getItem("hotelPetDados"));
    dados.reservas = dados.reservas.filter(r => r.id !== id);
    localStorage.setItem("hotelPetDados", JSON.stringify(dados));

    // Exibe mensagem de sucesso e recarrega a lista de reservas
    mostrarModal("Reserva excluída com sucesso.");
    carregarReservas();
    fecharModal(); // Fecha o modal após a exclusão
}

// Função para fechar o modal de exclusão
function fecharModal() {
    const modal = document.getElementById("modal-excluir");
    modal.classList.remove("show");
}

// Função para mostrar um modal com mensagens
function mostrarModal(mensagem) {
    alert(mensagem); // Exemplo de modal simples usando alert. Você pode implementar um modal mais complexo se desejar.
}

// Função para pesquisar na tabela
function pesquisarTabela() {
    // Obter o valor do campo de pesquisa e normalizá-lo para minúsculas
    const input = document.getElementById("pesquisa");
    const filter = input.value.toLowerCase();
    const table = document.querySelector(".lista-reservas");
    const rows = table.getElementsByTagName("tr");

    // Percorre cada linha da tabela (exceto o cabeçalho)
    for (let i = 1; i < rows.length; i++) {
        const row = rows[i];
        const cells = row.getElementsByTagName("td");
        let match = false;

        // Verifica se alguma célula na linha contém o texto da pesquisa
        for (let j = 0; j < cells.length; j++) {
            const cell = cells[j];
            if (cell) {
                const cellText = cell.textContent || cell.innerText;
                if (cellText.toLowerCase().indexOf(filter) > -1) {
                    match = true;
                    break;
                }
            }
        }

        // Mostra ou oculta a linha com base no resultado da pesquisa
        row.style.display = match ? "" : "none";
    }
}