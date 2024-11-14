// login.js

function realizarLogin(event) {
    event.preventDefault(); // Evita o envio do formulário

    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;
    const errorMessage = document.getElementById("error-message");

    // Verifica as credenciais de login
    if (username === "gerente" && password === "gerente") {
        // Redireciona para o dashboard do gerente
        window.location.href = "dashboard_gerente.html";
    } else {
        // Exibe uma mensagem de erro se as credenciais estiverem incorretas
        errorMessage.textContent = "Usuário ou senha incorretos.";
        errorMessage.style.display = "block";
    }
}
