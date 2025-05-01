// Versão 1: Formato Classe (Recomendado)
class ScreenshotGallery {
    constructor() {
        this.manifest = {
            'main-activity': ['full.webp', 'controls.webp'],
            'pressure-to-wavenumber': ['calculation.webp'],
            'wavenumber-to-pressure': ['785nm.webp']
        };
    }

    init() {
        this.setupThemeListener();
        this.renderAllGalleries();
    }

    renderAllGalleries() {
        document.querySelectorAll('.screenshot-gallery').forEach(gallery => {
            this.renderGallery(gallery);
        });
    }

    renderGallery(gallery) {
        const folder = gallery.dataset.folder;
        const theme = document.body.classList.contains('dark-mode') ? 'dark' : 'light';

        if (this.manifest[folder]) {
            gallery.innerHTML = `
                <div class="gallery-grid">
                    ${this.manifest[folder].map(img => `
                        <figure>
                            <img src="/ruby-app-docs/assets/img/screenshots/${folder}/${theme}/${img}" 
                                 alt="${folder.replace('-', ' ')} - ${img.replace('.webp', '')}"
                                 loading="lazy">
                            <figcaption>${this.formatCaption(img)}</figcaption>
                        </figure>
                    `).join('')}
                </div>
            `;
        }
    }

    setupThemeListener() {
        document.addEventListener('themeChanged', () => {
            this.renderAllGalleries();
        });
    }

    formatCaption(filename) {
        return filename.replace('.webp', '')
                      .replace(/-/g, ' ')
                      .replace(/\b\w/g, l => l.toUpperCase());
    }
}

// Inicialização
document.addEventListener('DOMContentLoaded', () => {
    new ScreenshotGallery().init();
});
