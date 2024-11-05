// comum.js

function obterDadosDoLocalStorage() {
    const dados = JSON.parse(localStorage.getItem("hotelPetDados"));
    return dados || {
        reservas: [],
        pets: [],
        usuarios: [],
        funcionarios: [],
        configuracoes: { diaria: "0.00", vagas: "0" }
    };
}

function salvarDadosNoLocalStorage(dados) {
    localStorage.setItem("hotelPetDados", JSON.stringify(dados));
}
