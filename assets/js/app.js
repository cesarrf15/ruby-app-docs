// Sistema Único de Gerenciamento de Tema
class ThemeManager {
    static init() {
        this.setupInitialTheme();
        this.setupThemeButton();
        this.setupThemeSensitiveImages();
        console.log("Tema inicializado");
    }

    static setupInitialTheme() {
        const savedTheme = localStorage.getItem('theme');
        const systemDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
        const isDark = savedTheme ? savedTheme === 'dark' : systemDark;
        
        this.applyTheme(isDark);
    }

    static applyTheme(isDark) {
        document.documentElement.classList.toggle('dark-mode', isDark);
        localStorage.setItem('theme', isDark ? 'dark' : 'light');
        
        const icon = document.getElementById('theme-icon');
        if (icon) icon.textContent = isDark ? '☀️' : '🌙';
        
        this.updateThemeImages(isDark);
    }

    static setupThemeButton() {
        const button = document.getElementById('theme-toggle');
        if (button) {
            button.addEventListener('click', () => {
                const isDark = !document.documentElement.classList.contains('dark-mode');
                this.applyTheme(isDark);
            });
        }
    }

    static setupThemeSensitiveImages() {
        // Mostra apenas as imagens do tema atual
        this.updateThemeImages(document.documentElement.classList.contains('dark-mode'));
    }

    static updateThemeImages(isDark) {
        document.querySelectorAll('.theme-sensitive-img').forEach(img => {
            const imgTheme = img.dataset.theme;
            img.style.display = (imgTheme === (isDark ? 'dark' : 'light')) ? 'block' : 'none';
        });
    }
}

// Inicialização segura para todas as páginas
document.addEventListener('DOMContentLoaded', () => {
    ThemeManager.init();
    
    // Inicializa MathJax se existir na página
    if (typeof MathJax !== 'undefined') {
        MathJax.typesetPromise();
    }
});
