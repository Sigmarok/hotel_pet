// Inicia o carregamento dos dados dos pets ao carregar o conteúdo do documento
document.addEventListener("DOMContentLoaded", function () {
    carregarPets();
});

// Função para carregar todos os pets e exibi-los na tabela de pets
function carregarPets() {
    // Obtém os dados do localStorage
    const dados = JSON.parse(localStorage.getItem("hotelPetDados"));
    console.log(dados);
    const tabelaPets = document.querySelector(".lista-pets table tbody");
    console.log("tabelaPets:", tabelaPets);

    // Limpa o conteúdo atual da tabela antes de adicionar os pets
    tabelaPets.innerHTML = "";
    //verificação se tabelapets não é null
    if (!tabelaPets) {
        console.error("Elemento .lista-pets tbody não encontrado.");
        return;
    }


    // Itera sobre cada pet e cria uma linha na tabela
    dados.pets.forEach(pet => {
        const row = document.createElement("tr");
        row.innerHTML = `
            <td>${pet.id}</td>
            <td>${pet.nome}</td>
            <td>${pet.proprietario}</td>
            <td>${pet.tipo}</td>
            <td>${pet.raca}</td>
            <td>
                <button onclick="window.location.href='editar_pet_gerente.html?id=${pet.id}'">Editar</button>
                <button onclick="window.location.href='detalhes_pet_gerente.html?id=${pet.id}'">Visualizar</button>
                <button onclick="excluirPet('${pet.id}')">Excluir</button>
            </td>
        `;
        // Adiciona a linha do pet na tabela de pets
        tabelaPets.appendChild(row);
    });
}

// Função para excluir um pet específico
function excluirPet(id) {
    // Confirmação antes de excluir
    if (confirm("Tem certeza que deseja excluir este pet?")) {
        // Remove o pet do array de dados e salva as alterações no localStorage
        const dados = JSON.parse(localStorage.getItem("hotelPetDados"));
        dados.pets = dados.pets.filter(p => p.id !== id);
        localStorage.setItem("hotelPetDados", JSON.stringify(dados));

        // Exibe uma mensagem de sucesso e recarrega a lista de pets
        mostrarModal("Pet excluído com sucesso.");
        carregarPets();
    } else {
        // Se o usuário cancelar a exclusão, não faz nada
        mostrarModal("Exclusão cancelada.");
    }
}
