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

// Função para criar uma nova reserva
function criarReserva(event) {
  event.preventDefault(); // Evita o envio padrão do formulário

  // Obtém os valores dos campos do formulário
  const pet = document.getElementById("pet").value;
  const checkin = document.getElementById("checkin").value;
  const checkout = document.getElementById("checkout").value;
  const status = document.getElementById("status").value;
  const notas = document.getElementById("notas").value;

  // Validação das datas
  if (new Date(checkin) >= new Date(checkout)) {
    mostrarMensagemErro(
      "A data de partida deve ser maior que a data de chegada."
    );
    return;
  }

  // Calcula o total das diárias (assumindo que o valor da diária é R$ 40,00)
  const valorDiaria = 40; // Valor fixo da diária
  const totalDiarias = calcularTotalDiarias(checkin, checkout, valorDiaria);

  // Gera um ID único para a nova reserva
  const id = gerarIdReserva();

  // Cria o objeto da nova reserva
  const novaReserva = {
    id: id,
    pet: pet,
    chegada: checkin,
    partida: checkout,
    status: status,
    total: totalDiarias,
    notas: notas,
  };

  // Armazena a nova reserva no localStorage
  const dados = JSON.parse(localStorage.getItem("hotelPetDados")) || {
    reservas: [],
  };
  dados.reservas.push(novaReserva);
  localStorage.setItem("hotelPetDados", JSON.stringify(dados));

  // Exibe mensagem de sucesso e limpa o formulário
  mostrarMensagemSucesso("Reserva criada com sucesso!");
  document.getElementById("nova-reserva-form").reset();
  return false; // Impede o recarregamento da página
}

// Função para calcular o total de diárias
function calcularTotalDiarias(checkin, checkout, valorDiaria) {
  const dataCheckin = new Date(checkin);
  const dataCheckout = new Date(checkout);
  const diferencaEmDias = (dataCheckout - dataCheckin) / (1000 * 60 * 60 * 24); // Converte milissegundos para dias
  return diferencaEmDias * valorDiaria;
}

// Função para gerar um ID único para a reserva
function gerarIdReserva() {
  const dados = JSON.parse(localStorage.getItem("hotelPetDados")) || {
    reservas: [],
  };
  return (dados.reservas.length + 1).toString(); // Simples geração de ID com base na contagem
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
