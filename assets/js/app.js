// Sistema de Tema Aprimorado
class ThemeManager {
    static init() {
        this.setupInitialTheme();
        this.setupThemeButton();
        this.setupThemeListeners();
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
        
        this.updateThemeIcon(isDark);
        this.updateThemeImages(isDark);
    }

    static updateThemeIcon(isDark) {
        const icon = document.getElementById('theme-icon');
        if (icon) {
            icon.textContent = isDark ? '☀️' : '🌙';
            icon.setAttribute('aria-label', isDark ? 'Alternar para tema claro' : 'Alternar para tema escuro');
        }
    }

    static updateThemeImages(isDark) {
        document.querySelectorAll('.theme-sensitive-img').forEach(img => {
            img.style.display = img.dataset.theme === (isDark ? 'dark' : 'light') ? 'block' : 'none';
        });
    }

    static setupThemeButton() {
        const button = document.getElementById('theme-toggle');
        if (button) {
            button.style.display = 'flex'; // Garante que o botão é visível
            button.addEventListener('click', () => {
                const isDark = !document.documentElement.classList.contains('dark-mode');
                this.applyTheme(isDark);
            });
        }
    }

    static setupThemeListeners() {
        // Responde a mudanças no tema do sistema
        window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', e => {
            if (!localStorage.getItem('theme')) {
                this.applyTheme(e.matches);
            }
        });
    }
}

// Inicialização segura
document.addEventListener('DOMContentLoaded', () => {
    ThemeManager.init();
    
    // Inicializa MathJax se existir na página
    if (typeof MathJax !== 'undefined') {
        MathJax.typesetPromise();
    }
});
