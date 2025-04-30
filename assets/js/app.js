// Configurações gerais
document.addEventListener('DOMContentLoaded', function() {
    // Controle do tema claro/escuro
    const themeToggle = document.createElement('button');
    themeToggle.id = 'theme-toggle';
    themeToggle.textContent = '🌓';
    document.body.prepend(themeToggle);

    // Verifica preferência do usuário
    if (localStorage.getItem('theme') === 'dark' || 
        (window.matchMedia('(prefers-color-scheme: dark)').matches && !localStorage.getItem('theme'))) {
        document.body.classList.add('dark-mode');
    }

    // Armazena o idioma preferido
    if (!localStorage.getItem('appLanguage')) {
        localStorage.setItem('appLanguage', 
            navigator.language.startsWith('pt') ? 'pt' : 'en');
    }    

    // Alternar tema
    themeToggle.addEventListener('click', () => {
        document.body.classList.toggle('dark-mode');
        localStorage.setItem('theme', document.body.classList.contains('dark-mode') ? 'dark' : 'light');
    });

    // Smooth scrolling para âncoras
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });

    // Carregamento otimizado de imagens
    if ('IntersectionObserver' in window) {
        const lazyImages = document.querySelectorAll('img[loading="lazy"]');
        
        const imageObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src;
                    imageObserver.unobserve(img);
                }
            });
        });

        lazyImages.forEach(img => imageObserver.observe(img));
    }
});

// Funções específicas para as equações
function renderMathEquations() {
    if (window.MathJax) {
        MathJax.typesetPromise();
    }
}

// Exporta funções para uso global
window.app = {
    renderMath: renderMathEquations
};
