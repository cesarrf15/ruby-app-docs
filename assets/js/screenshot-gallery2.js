document.addEventListener('DOMContentLoaded', () => {
    console.log('Galeria iniciada - Carregando imagens...');

    // Configuração direta
    const gallery = document.querySelector('.screenshot-gallery');
    const imgElement = document.createElement('img');
    imgElement.style.maxWidth = '100%';
    imgElement.style.border = '2px solid var(--ruby-red)';
    gallery.appendChild(imgElement);

    // Função para atualizar imagem
    const updateImage = () => {
        const isDark = document.documentElement.classList.contains('dark-mode');
        const theme = isDark ? 'dark' : 'light';
        const imgPath = `/ruby-app-docs/assets/img/screenshots/main-activity/${theme}/full.webp?nocache=${Date.now()}`;
        
        console.log(`Tentando carregar: ${imgPath}`);
        imgElement.src = imgPath;
        imgElement.alt = `Tela ${theme}`;
    };

    // Observador de tema
    const themeObserver = new MutationObserver(() => {
        console.log('Classe dark-mode alterada');
        updateImage();
    });

    themeObserver.observe(document.documentElement, {
        attributes: true,
        attributeFilter: ['class']
    });

    // Evento customizado (backup)
    document.addEventListener('themeChanged', updateImage);

    // Carregamento inicial
    updateImage();
});
