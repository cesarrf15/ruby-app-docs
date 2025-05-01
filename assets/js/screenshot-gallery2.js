document.addEventListener('DOMContentLoaded', () => {
    // Configuração
    const IMAGE_MANIFEST = {
        'main-activity': ['full.webp']
    };

    // Elementos da DOM
    const galleryContainer = document.querySelector('.screenshot-gallery');
    let currentImgElement = null;

    // Função principal
    function updateGalleryImage() {
        const isDark = document.documentElement.classList.contains('dark-mode');
        const theme = isDark ? 'dark' : 'light';
        const folder = 'main-activity';
        const imgName = 'full.webp';
        const newSrc = `/ruby-app-docs/assets/img/screenshots/${folder}/${theme}/${imgName}?v=${Date.now()}`;

        // Se a imagem já existe, apenas atualize o src
        if (currentImgElement) {
            currentImgElement.src = newSrc;
        } 
        // Se não existe, crie a imagem
        else {
            currentImgElement = document.createElement('img');
            currentImgElement.alt = `Tela ${theme
