document.addEventListener('DOMContentLoaded', () => {
    const IMAGE_MANIFEST = {
        'main-activity': ['full.webp']
    };

    function getCurrentTheme() {
        const isDark = document.documentElement.classList.contains('dark-mode');
        console.log('Tema atual:', isDark ? 'dark' : 'light'); // Debug
        return isDark ? 'dark' : 'light';
    }

    function renderGallery() {
        const theme = getCurrentTheme();
        const folder = 'main-activity'; // Foco apenas na pasta problemática
        
        console.log(`Tentando carregar imagem de: /${folder}/${theme}/full.webp`); // Debug

        document.querySelector('.screenshot-gallery').innerHTML = `
            <img src="/ruby-app-docs/assets/img/screenshots/${folder}/${theme}/full.webp"
                 alt="Teste de tema"
                 style="max-width:100%; border: 2px solid red"
                 onerror="console.error('Falha ao carregar imagem!')">
        `;
    }

    // Inicialização
    renderGallery();
    
    // Observador de mudança de tema
    document.addEventListener('themeChanged', () => {
        console.log('Evento themeChanged recebido!'); // Debug
        renderGallery();
    });
});
