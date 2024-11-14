// Função para redirecionar ao login com efeito de fade-out
function voltar_pagina() {
    document.body.classList.add("fade-out"); // Aplica a classe de fade-out
    setTimeout(() => {
        window.location.href = "login.html";
    }, 800); // Atraso de 800ms para permitir que o efeito seja exibido
}

// Adiciona um listener ao botão de salvar
document.addEventListener("DOMContentLoaded", () => {
    const salvarButton = document.getElementById("salvarButton");
    if (salvarButton) {
        salvarButton.addEventListener("click", cadastrarUsuario);
    } else {
        console.error("Botão de salvar não encontrado.");
    }
});

// Adiciona um evento ao formulário para gerenciar o envio
document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("cadastro-form");
    if (form) {
        form.addEventListener("submit", function(event) {
            event.preventDefault(); // Impede o envio padrão do formulário
            cadastrarUsuario(); // Chama a função para cadastrar o usuário
        });
    } else {
        console.error("Formulário de cadastro não encontrado.");
    }
});

// Função para cadastrar um novo usuário
function cadastrarUsuario() {
    const nome = document.getElementById("nome").value;
    const email = document.getElementById("email").value;
    const usuario = document.getElementById("usuario").value;
    const senha = document.getElementById("senha").value;

    // Gera um ID único para o novo usuário
    const novoUsuario = {
        id: Date.now().toString(), // Usando timestamp como ID único
        nome: nome,
        email: email,
        usuario: usuario,
        senha: senha,
        funcao: "Cliente"
    };

    console.log(novoUsuario);

    // Obtém os dados existentes do localStorage
    const dados = JSON.parse(localStorage.getItem("hotelPetDados")) || { usuarios: [] };
    console.log(dados);
    if (dados.usuarios == undefined)
        dados.usuarios = [];

    // Adiciona o novo usuário à lista
    dados.usuarios.push(novoUsuario);

    // Salva os dados atualizados no localStorage
    localStorage.setItem("hotelPetDados", JSON.stringify(dados));

    // Exibe a mensagem de sucesso
    mostrarMensagemSucesso();
}

// Função para mostrar mensagem de sucesso
function mostrarMensagemSucesso() {
    const msgSucesso = document.getElementById("msg-sucesso");
    msgSucesso.style.display = "block";
    setTimeout(() => {
        msgSucesso.style.display = "none";
    }, 3000); // Oculta a mensagem após 3 segundos
}
