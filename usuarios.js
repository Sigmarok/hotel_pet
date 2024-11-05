// Inicia o carregamento dos usuários quando o conteúdo do documento for carregado
document.addEventListener("DOMContentLoaded", function () {
    carregarUsuarios();
});

// Função para carregar todos os usuários e exibi-los na tabela
function carregarUsuarios() {
    const dados = JSON.parse(localStorage.getItem("hotelPetDados"));
    const tabelaUsuarios = document.querySelector(".lista-usuarios tbody");
    tabelaUsuarios.innerHTML = ""; // Limpa o conteúdo atual da tabela

    if (dados && dados.usuarios) {
        // Itera sobre cada usuário e adiciona uma linha na tabela
        dados.usuarios.forEach(usuario => {
            const row = document.createElement("tr");
            row.innerHTML = `
                <td>${usuario.id}</td>
                <td>${usuario.nome}</td>
                <td>${usuario.email}</td>
                <td>${usuario.funcao}</td>
                <td>
                    <button onclick="window.location.href='editar_usuario_gerente.html?id=${usuario.id}'">Editar</button>
                    <button onclick="window.location.href='detalhes_usuarios_gerente.html?id=${usuario.id}'">Visualizar</button>
                    <button onclick="abrirModalExcluir('${usuario.id}')">Excluir</button>
                </td>
            `;
            tabelaUsuarios.appendChild(row);
        });
    }
}

// Função para abrir o modal de confirmação de exclusão
function abrirModalExcluir(id) {
    const modal = document.getElementById("modal-excluir");
    modal.classList.add("show");
    modal.dataset.usuarioId = id; // Armazena o ID do usuário a ser excluído
}

// Função para fechar o modal
function fecharModal() {
    document.getElementById("modal-excluir").classList.remove("show");
}

// Função para confirmar e excluir o usuário
function confirmarExclusao() {
    const usuarioId = document.getElementById("modal-excluir").dataset.usuarioId;
    const dados = JSON.parse(localStorage.getItem("hotelPetDados"));
    
    // Remove o usuário dos dados e salva no localStorage
    dados.usuarios = dados.usuarios.filter(usuario => usuario.id !== usuarioId);
    localStorage.setItem("hotelPetDados", JSON.stringify(dados));

    fecharModal();
    mostrarMensagemSucesso("Usuário excluído com sucesso.");
    carregarUsuarios(); // Recarrega a lista de usuários
}

// Função para mostrar mensagem de sucesso
function mostrarMensagemSucesso(mensagem) {
    alert(mensagem); // Você pode alterar isso para mostrar em um elemento HTML
}

// Função para editar um usuário específico
function editarUsuario(id) {
    window.location.href = `editar_usuario_gerente.html?id=${id}`; // Redireciona para a página de edição
}