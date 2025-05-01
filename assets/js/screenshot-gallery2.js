document.addEventListener('DOMContentLoaded', () => {
    const gallery = document.querySelector('.screenshot-gallery');
    const theme = 'light'; // Força light inicialmente (substitua por 'dark' se preferir)
    
    gallery.innerHTML = `
        <img src="/ruby-app-docs/assets/img/screenshots/main-activity/${theme}/full.webp" 
             alt="Tela principal"
             style="max-width:100%; border:2px solid var(--ruby-red)">
    `;
});
