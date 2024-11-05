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