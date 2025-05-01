document.addEventListener('DOMContentLoaded', () => {
    console.log("[GALERIA] Iniciando...");

    const IMAGE_MANIFEST = {
        'main-activity': ['full.webp']
    };

    // Sistema de fallback
    const loadImage = (theme) => {
        const imgUrl = `/ruby-app-docs/assets/img/screenshots/main-activity/${theme}/full.webp?t=${Date.now()}`;
        console.log(`[GALERIA] Carregando: ${imgUrl}`);
        
        return new Promise((resolve) => {
            const img = new Image();
            img.onload = () => resolve(imgUrl);
            img.onerror = () => {
                console.warn(`[GALERIA] Fallback para tema ${theme === 'dark' ? 'light' : 'dark'}`);
                resolve(`/ruby-app-docs/assets/img/screenshots/main-activity/${
                    theme === 'dark' ? 'light' : 'dark'}/full.webp?t=${Date.now()}`);
            };
            img.src = imgUrl;
        });
    };

    // Renderização
    const updateGallery = async () => {
        const isDark = document.documentElement.classList.contains('dark-mode');
        const theme = isDark ? 'dark' : 'light';
        console.log(`[GALERIA] Atualizando para tema: ${theme}`);
        
        const imgUrl = await loadImage(theme);
        const gallery = document.querySelector('.screenshot-gallery');
        
        gallery.innerHTML = `
            <img src="${imgUrl}" 
                 alt="Tela ${theme}"
                 style="max-width:100%; border:2px solid var(--ruby-red)">
        `;
    };

    // Listeners
    document.addEventListener('themeChanged', (e) => {
        console.log('[GALERIA] Evento recebido', e.detail);
        updateGallery();
    });

    // Inicialização
    updateGallery();
});
