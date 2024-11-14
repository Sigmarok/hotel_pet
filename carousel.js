// carousel.js

let currentImageIndex = 0;
const images = document.querySelectorAll(".carousel-image");

function showNextImage() {
    // Oculta todas as imagens
    images.forEach((img, index) => {
        img.style.display = (index === currentImageIndex) ? "block" : "none";
    });

    // Atualiza o índice da imagem para a próxima
    currentImageIndex = (currentImageIndex + 1) % images.length;
}

// Intervalo para mudar as imagens a cada 3 segundos
setInterval(showNextImage, 3000);

// Exibe a primeira imagem no carregamento da página
showNextImage();
