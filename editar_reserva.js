// Obtém os dados existentes do localStorage
const dados = JSON.parse(localStorage.getItem("hotelPetDados")) || { pets: [] };
const select = document.getElementById("pet");

// Limpa as opções atuais (se houver)
select.innerHTML = "";

// Percorre o array e cria uma opção para cada item
dados.pets.forEach((pet) => {
  const option = document.createElement("option");
  option.value = pet.id; // Define o valor da opção
  option.textContent = `${pet.nome} (${pet.proprietario})`; // Define o texto exibido da opção
  select.appendChild(option); // Adiciona a opção ao select
});

// Obtém o ID da reserva a ser editada da URL
const urlParams = new URLSearchParams(window.location.search);
const reservaId = urlParams.get("id");

// Carrega a reserva e preenche o formulário
document.addEventListener("DOMContentLoaded", function () {
  carregarReserva(reservaId);
});

// Função para carregar os dados da reserva e preencher o formulário
function carregarReserva(id) {
  const dados = JSON.parse(localStorage.getItem("hotelPetDados"));
  const reserva = dados.reservas.find((r) => r.id === id);

  if (reserva) {
    document.getElementById("pet").value = reserva.pet;
    document.getElementById("status").value = reserva.status;
    document.getElementById("checkin").value = reserva.chegada;
    document.getElementById("checkout").value = reserva.partida;
    document.getElementById("notas").value = reserva.notas;
    // Caso haja anotações do funcionário, preencha também
    document.getElementById("anotacoes").value = reserva.anotacoes || "";

    // Calcula e exibe o total das diárias
    const totalDiarias = calcularTotalDiarias(
      reserva.chegada,
      reserva.partida,
      40
    );
    document.getElementById("total-diarias").innerText =
      totalDiarias.toFixed(2);
  } else {
    mostrarMensagemErro("Reserva não encontrada.");
  }
}

// Função para salvar as alterações na reserva
document.getElementById("editar-reserva-form").onsubmit = function (event) {
  event.preventDefault(); // Impede o envio padrão do formulário
  salvarAlteracoes(reservaId);
};

// Função para salvar as alterações da reserva
function salvarAlteracoes(id) {
  const dados = JSON.parse(localStorage.getItem("hotelPetDados"));
  const reservaIndex = dados.reservas.findIndex((r) => r.id === id);

  if (reservaIndex !== -1) {
    // Atualiza os dados da reserva
    dados.reservas[reservaIndex].pet = document.getElementById("pet").value;
    dados.reservas[reservaIndex].status =
      document.getElementById("status").value;
    dados.reservas[reservaIndex].chegada =
      document.getElementById("checkin").value;
    dados.reservas[reservaIndex].partida =
      document.getElementById("checkout").value;
    dados.reservas[reservaIndex].notas = document.getElementById("notas").value;
    dados.reservas[reservaIndex].anotacoes =
      document.getElementById("anotacoes").value;

    // Armazena as alterações no localStorage
    localStorage.setItem("hotelPetDados", JSON.stringify(dados));

    // Exibe mensagem de sucesso
    mostrarMensagemSucesso("Reserva atualizada com sucesso!");
  } else {
    mostrarMensagemErro("Erro ao atualizar a reserva.");
  }
}

// Função para calcular o total de diárias
function calcularTotalDiarias(checkin, checkout, valorDiaria) {
  const dataCheckin = new Date(checkin);
  const dataCheckout = new Date(checkout);
  const diferencaEmDias = (dataCheckout - dataCheckin) / (1000 * 60 * 60 * 24); // Converte milissegundos para dias
  return diferencaEmDias * valorDiaria;
}

// Função para mostrar mensagem de sucesso
function mostrarMensagemSucesso(mensagem) {
  const msgSucesso = document.getElementById("msg-sucesso");
  msgSucesso.innerText = mensagem;
  msgSucesso.style.display = "block";

  // Esconde a mensagem após 3 segundos
  setTimeout(() => {
    msgSucesso.style.display = "none";
  }, 3000);
}

// Função para mostrar mensagem de erro
function mostrarMensagemErro(mensagem) {
  const msgErro = document.getElementById("msg-erro");
  msgErro.innerText = mensagem;
  msgErro.style.display = "block";

  // Esconde a mensagem após 3 segundos
  setTimeout(() => {
    msgErro.style.display = "none";
  }, 3000);
}
