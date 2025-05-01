// Sistema Único de Gerenciamento de Tema
class ThemeManager {
    static init() {
        this.setupInitialTheme();
        this.setupThemeButton();
        console.log("Tema inicializado"); // Debug
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
        
        console.log(`Tema aplicado: ${isDark ? 'dark' : 'light'}`); // Debug
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
}

// Inicialização segura
document.addEventListener('DOMContentLoaded', () => {
    ThemeManager.init();
});
