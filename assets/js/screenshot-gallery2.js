document.addEventListener('DOMContentLoaded', () => {
    const gallery = document.querySelector('.screenshot-gallery');
    const imgElement = document.createElement('img');
    imgElement.style.maxWidth = '100%';
    gallery.appendChild(imgElement);

    // Função para carregar a imagem CORRETA conforme o tema
    const loadCorrectImage = () => {
        const isDark = document.documentElement.classList.contains('dark-mode');
        const theme = isDark ? 'dark' : 'light';
        const imgPath = `/ruby-app-docs/assets/img/screenshots/main-activity/${theme}/full.webp?t=${Date.now()}`;
        
        console.log(`Carregando imagem do tema ${theme}`);
        imgElement.src = imgPath;
        imgElement.alt = `Tela ${theme}`;
    };

    // Observador de tema (para mudanças dinâmicas)
    new MutationObserver(loadCorrectImage).observe(document.documentElement, {
        attributes: true,
        attributeFilter: ['class']
    });

    // Carrega a imagem correta INICIALMENTE
    loadCorrectImage();
});
