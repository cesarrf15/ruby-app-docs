document.addEventListener('DOMContentLoaded', () => {
    // Mapeamento das imagens por seção (substitua com seus arquivos reais)
    const IMAGE_MANIFEST = {
        'main-activity': [
            'full.webp',
            'controls.webp',
            'modes.webp'
        ],
        'pressure-to-wavenumber': [
            'default.webp',
            'calculation.webp'
        ],
        'wavenumber-to-pressure': [
            'normal.webp',
            '785nm.webp'
        ]
    };

    // Cria as galerias baseadas no manifest
    document.querySelectorAll('.screenshot-gallery').forEach(gallery => {
        const folder = gallery.dataset.folder;
        const theme = document.body.classList.contains('dark-mode') ? 'dark' : 'light';
        
        if (IMAGE_MANIFEST[folder]) {
            gallery.innerHTML = `
                <div class="gallery-grid">
                    ${IMAGE_MANIFEST[folder].map(img => `
                        <figure>
                            <img src="/ruby-app-docs/assets/img/screenshots/${folder}/${theme}/${img}" 
                                 alt="${folder.replace('-', ' ')} - ${img.replace('.webp', '')}"
                                 loading="lazy">
                            <figcaption>${formatCaption(img)}</figcaption>
                        </figure>
                    `).join('')}
                </div>
            `;
        } else {
            gallery.innerHTML = `<p class="error">Seção "${folder}" não encontrada</p>`;
        }
    });

    function formatCaption(filename) {
        return filename
            .replace('.webp', '')
            .replace(/-/g, ' ')
            .replace(/\b\w/g, l => l.toUpperCase());
    }
});
