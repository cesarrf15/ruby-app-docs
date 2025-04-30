// Configurações gerais
document.addEventListener('DOMContentLoaded', function() {

       // Sistema de tema
    const themeToggle = document.getElementById('theme-toggle');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)');
    
    function applyTheme(isDark) {
        document.body.classList.toggle('dark-mode', isDark);
        localStorage.setItem('theme', isDark ? 'dark' : 'light');
        themeToggle.textContent = isDark ? '☀️' : '🌙';
    }

    // Verifica preferência
    const savedTheme = localStorage.getItem('theme');
    const systemPrefersDark = prefersDark.matches;
    const initialTheme = savedTheme ? savedTheme === 'dark' : systemPrefersDark;
    
    applyTheme(initialTheme);

    // Botão de alternância
    themeToggle.addEventListener('click', () => {
        const isDark = !document.body.classList.contains('dark-mode');
        applyTheme(isDark);
    });

    // Observa mudanças no sistema
    prefersDark.addListener(e => {
        if (!localStorage.getItem('theme')) {
            applyTheme(e.matches);
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
