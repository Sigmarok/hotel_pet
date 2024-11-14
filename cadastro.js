// cadastro.js

function realizarCadastro(event) {
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
        senha: senha
    };

    console.log(novoUsuario);
    

    // Obtém os dados existentes do localStorage
    const dados = JSON.parse(localStorage.getItem("hotelPetDados")) || { usuarios: [] };
    console.log(dados);
    if(dados.usuarios == undefined)
        dados.usuarios = [];

    // Adiciona o novo usuário à lista
    dados.usuarios.push(novoUsuario);

    // Salva os dados atualizados no localStorage
    localStorage.setItem("hotelPetDados", JSON.stringify(dados));

    // Exibe a mensagem de sucesso
    mostrarMensagemSucesso();

    

    // Redireciona para a página de login após um curto período
    setTimeout(() => {
        window.location.href = "login.html";
    }, 2000);
}
// Função para redirecionar ao login com efeito de fade-out
function voltar_pagina() {
    document.body.classList.add("fade-out"); // Aplica a classe de fade-out
    setTimeout(() => {
        window.location.href = "login.html";
    }, 800); // Atraso de 800ms para permitir que o efeito seja exibido
}
