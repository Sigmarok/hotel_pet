document.addEventListener("DOMContentLoaded", function() {
    carregarConfiguracoes();
});

document.getElementById("configuracoes-form").addEventListener("submit", function(event) {
    event.preventDefault();
    salvarConfiguracoes();
    mostrarMensagemSucesso();
});

function salvarConfiguracoes() {
    const valorDiaria = document.getElementById("valor-diaria").value;
    const vagasDisponiveis = document.getElementById("vagas-disponiveis").value;

    const configuracoes = {
        valorDiaria: valorDiaria,
        vagasDisponiveis: vagasDisponiveis
    };

    localStorage.setItem("hotelPetConfiguracoes", JSON.stringify(configuracoes));
}

function carregarConfiguracoes() {
    const configuracoesSalvas = JSON.parse(localStorage.getItem("hotelPetConfiguracoes"));

    if (configuracoesSalvas) {
        document.getElementById("valor-diaria").value = configuracoesSalvas.valorDiaria;
        document.getElementById("vagas-disponiveis").value = configuracoesSalvas.vagasDisponiveis;
    }
}

function mostrarMensagemSucesso() {
    const msgSucesso = document.getElementById("msg-sucesso");
    msgSucesso.style.display = "block";
    setTimeout(() => {
        msgSucesso.style.display = "none";
    }, 3000);
}
