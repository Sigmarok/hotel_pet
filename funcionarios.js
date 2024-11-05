// Inicia o carregamento dos dados dos funcionários ao carregar o conteúdo do documento
document.addEventListener("DOMContentLoaded", function () {
    carregarFuncionarios();
});

// Função para carregar todos os funcionários e exibi-los na tabela de funcionários
function carregarFuncionarios() {
    // Obtém os dados do localStorage
    const dados = JSON.parse(localStorage.getItem("hotelPetDados"));
    const tabelaFuncionarios = document.querySelector(".lista-funcionarios tbody");

    // Limpa o conteúdo atual da tabela antes de adicionar os funcionários
    //tabelaFuncionarios.innerHTML = "";

    // Itera sobre cada funcionário e cria uma linha na tabela
    dados.funcionarios.forEach(funcionario => {
        const row = document.createElement("tr");
        row.innerHTML = `
            <td>${funcionario.id}</td>
            <td>${funcionario.nome}</td>
            <td>${funcionario.cargo}</td>
            <td>
                <button onclick="editarFuncionario('${funcionario.id}')">Editar</button>
                <button onclick="excluirFuncionario('${funcionario.id}')">Excluir</button>
            </td>
        `;
        // Adiciona a linha do funcionário na tabela de funcionários
        tabelaFuncionarios.appendChild(row);
    });
}

// Função para abrir o formulário de edição de um funcionário específico
function editarFuncionario(id) {
    // Exibe o modal de edição de funcionário com base no ID (implementação não detalhada aqui)
    alert(`Editar funcionário: ${id}`);
}

// Função para excluir um funcionário específico
function excluirFuncionario(id) {
    // Remove o funcionário do array de dados e salva as alterações no localStorage
    const dados = JSON.parse(localStorage.getItem("hotelPetDados"));
    dados.funcionarios = dados.funcionarios.filter(f => f.id !== id);
    localStorage.setItem("hotelPetDados", JSON.stringify(dados));

    // Exibe uma mensagem de sucesso e recarrega a lista de funcionários
    mostrarModal("Funcionário excluído com sucesso.");
    carregarFuncionarios();
}
