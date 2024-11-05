// Adiciona um evento de submit ao formulário
document.getElementById('editar-pet-form').addEventListener('submit', function(event) {
    event.preventDefault(); // Impede o envio padrão do formulário
    
    // Coleta os dados do formulário
    const petId = // Aqui você precisa definir como vai passar o ID do pet a ser editado, por exemplo:
        new URLSearchParams(window.location.search).get('id'); // Assumindo que o ID é passado como parâmetro na URL
    
    const petAtualizado = {
        id: petId,
        proprietario: document.getElementById('proprietario').value,
        nome: document.getElementById('nome-pet').value,
        tipo: document.getElementById('tipo-pet').value,
        raca: document.getElementById('raca-pet').value,
        tamanho: document.getElementById('tamanho-pet').value,
        // Aqui você pode adicionar lógica para lidar com a foto, se necessário
    };

    // Obtém os dados existentes no localStorage
    const dados = JSON.parse(localStorage.getItem("hotelPetDados")) || { pets: [] };
    
    // Encontra o índice do pet a ser atualizado
    const index = dados.pets.findIndex(pet => pet.id === petId);
    if (index !== -1) {
        dados.pets[index] = petAtualizado; // Atualiza o pet
        localStorage.setItem("hotelPetDados", JSON.stringify(dados)); // Salva as alterações
    }

    // Mostra a mensagem de sucesso
    mostrarMensagemSucesso();
});

// Função para mostrar a mensagem de sucesso
function mostrarMensagemSucesso() {
    const msgSucesso = document.getElementById('msg-sucesso');
    msgSucesso.style.display = 'block';
    setTimeout(() => {
        msgSucesso.style.display = 'none'; // Oculta a mensagem após 3 segundos
    }, 3000);
}
