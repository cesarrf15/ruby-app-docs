/**
 * Auto-Gerador de Galeria de Screenshots
 * 
 * Como usar:
 * 1. Coloque este arquivo em /assets/js/
 * 2. Adicione <div class="screenshot-gallery" data-folder="nome-da-pasta"></div>
 * 3. As imagens serão carregadas automaticamente de /assets/img/screenshots/nome-da-pasta/
 */

document.addEventListener('DOMContentLoaded', () => {
    const galleries = document.querySelectorAll('.screenshot-gallery');
    
    galleries.forEach(gallery => {
        const folder = gallery.dataset.folder;
        const theme = document.body.classList.contains('dark-mode') ? 'dark' : 'light';
        const imgPath = `/assets/img/screenshots/${folder}/${theme}/`;
        
        // Simulação - na prática, você precisaria de:
        // 1. Listagem de arquivos via API do GitHub Pages, ou
        // 2. Pré-definir um manifest.json com os arquivos
        const mockImages = [
            'full.webp',
            'controls.webp',
            'calculation.webp'
        ];

        gallery.innerHTML = `
            <div class="gallery-container">
                ${mockImages.map(img => `
                    <figure class="gallery-item">
                        <img src="${imgPath}${img}" 
                             alt="Captura de tela ${folder}" 
                             loading="lazy">
                        <figcaption>${img.replace('.webp', '').replace('-', ' ')}</figcaption>
                    </figure>
                `).join('')}
            </div>
        `;
    });
});
