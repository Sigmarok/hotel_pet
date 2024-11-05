document.addEventListener("DOMContentLoaded", function () {
    const urlParams = new URLSearchParams(window.location.search);
    const petId = urlParams.get("id");
    if (petId) {
        carregarDetalhesPet(petId);
    }
});

// Função para carregar os detalhes do pet
function carregarDetalhesPet(id) {
    const dados = JSON.parse(localStorage.getItem("hotelPetDados"));
    const pet = dados.pets.find(p => p.id === id);
    
    if (pet) {
        const detalhesPetSection = document.getElementById("detalhes-pet");
        detalhesPetSection.innerHTML = `
            <p><strong>Nome:</strong> ${pet.nome}</p>
            <p><strong>Proprietário:</strong> ${pet.proprietario}</p>
            <p><strong>Tipo de Animal:</strong> ${pet.tipo}</p>
            <p><strong>Raça:</strong> ${pet.raca}</p>
            <p><strong>Tamanho:</strong> ${pet.tamanho}</p>
            <p><strong>Foto:</strong> <img src="${pet.foto || 'path/to/default.jpg'}" alt="Foto de ${pet.nome}" width="100"></p>
        `;
    } else {
        alert("Pet não encontrado.");
    }
}
