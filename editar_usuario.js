// Adiciona um evento ao formulário para gerenciar o envio
document.getElementById("editar-usuario-form").addEventListener("submit", function(event) {
    event.preventDefault(); // Impede o envio padrão do formulário
    atualizarUsuario(); // Chama a função para atualizar o usuário
});
//carregar os dados do usuario na pagina
// Obtém os dados existentes do localStorage
const dados = JSON.parse(localStorage.getItem("hotelPetDados")) || { usuarios: [] };

// Encontra o usuário com base no email (ou ID se preferir)
const url = new URLSearchParams(window.location.search)
const usuarioIndex = dados.usuarios.findIndex(usuario => usuario.id === url.get("id"));
//Preenchendo os dados no html/pagina
document.getElementById("nome").value = dados.usuarios[usuarioIndex].nome;
document.getElementById("email").value = dados.usuarios[usuarioIndex].email;
document.getElementById("funcao").value = dados.usuarios[usuarioIndex].funcao;

// Função para atualizar os dados do usuário
function atualizarUsuario() {
    const nome = document.getElementById("nome").value;
    const email = document.getElementById("email").value;
    const funcao = document.getElementById("funcao").value;
    
    if (usuarioIndex !== -1) {
        // Atualiza os dados do usuário encontrado
        dados.usuarios[usuarioIndex].nome = nome;
        dados.usuarios[usuarioIndex].email = email;
        dados.usuarios[usuarioIndex].funcao = funcao;

        // Salva os dados atualizados no localStorage
        localStorage.setItem("hotelPetDados", JSON.stringify(dados));

        // Exibe a mensagem de sucesso
        mostrarMensagemSucesso();
    } else {
        alert("Usuário não encontrado.");
    }
}

// Função para mostrar mensagem de sucesso
function mostrarMensagemSucesso() {
    const msgSucesso = document.getElementById("msg-sucesso");
    msgSucesso.style.display = "block";
    setTimeout(() => {
        msgSucesso.style.display = "none";
    }, 3000); // Oculta a mensagem após 3 segundos
}
