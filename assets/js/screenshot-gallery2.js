document.addEventListener('DOMContentLoaded', () => {
    const testDiv = document.createElement('div');
    testDiv.innerHTML = `
        <h4>Teste Script Galeria</h4>
        <img src="/ruby-app-docs/assets/img/screenshots/main-activity/dark/full.webp" 
             alt="Teste script" 
             loading="lazy"
             onerror="this.style.display='none'">
        <p>Caminho usado: <code>/ruby-app-docs/assets/img/screenshots/main-activity/dark/full.webp</code></p>
    `;
    document.body.appendChild(testDiv);
});
