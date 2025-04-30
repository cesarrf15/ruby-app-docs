// Configurações gerais
document.addEventListener('DOMContentLoaded', function() {

    const themeToggle = document.getElementById('theme-toggle');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)');
    
    // Verifica preferência salva ou do sistema
    const currentTheme = localStorage.getItem('theme') || 
                        (prefersDark.matches ? 'dark' : 'light');
    
    // Botão de alternância
    themeToggle.addEventListener('click', () => {
        document.body.classList.toggle('dark-mode');
        const isDark = document.body.classList.contains('dark-mode');
        localStorage.setItem('theme', isDark ? 'dark' : 'light');
        updateToggleIcon(isDark);
    });
    
    // Atualiza ícone inicial
    updateToggleIcon(currentTheme === 'dark');
    
    // Observa mudanças no sistema
    prefersDark.addListener(e => {
        if (!localStorage.getItem('theme')) {
            document.body.classList.toggle('dark-mode', e.matches);
            updateToggleIcon(e.matches);
        }
    });

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

function updateToggleIcon(isDark) {
    const icon = document.getElementById('theme-toggle');
    icon.textContent = isDark ? '☀️' : '🌙';
    icon.setAttribute('aria-label', isDark ? 'Light mode' : 'Dark mode');
}



// Exporta funções para uso global
window.app = {
    renderMath: renderMathEquations
};
