// Adiciona um evento de submit ao formulário
document.getElementById('novo-pet-form').addEventListener('submit', function(event) {
    event.preventDefault(); // Impede o envio padrão do formulário
    
    // Coleta os dados do formulário
    const novoPet = {
        id: Date.now().toString(), // Gera um ID único
        proprietario: document.getElementById('proprietario').value,
        nome: document.getElementById('nome-pet').value,
        tipo: document.getElementById('tipo-pet').value,
        raca: document.getElementById('raca-pet').value,
        tamanho: document.getElementById('tamanho-pet').value,
        // Aqui você pode adicionar lógica para lidar com a foto, se necessário
    };

    // Obtém os dados existentes no localStorage
    const dados = JSON.parse(localStorage.getItem("hotelPetDados")) || { pets: [] };
    dados.pets.push(novoPet); // Adiciona o novo pet ao array

    // Salva os dados atualizados no localStorage
    localStorage.setItem("hotelPetDados", JSON.stringify(dados));

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
