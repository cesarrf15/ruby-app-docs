// Adicione no INÍCIO do arquivo, antes da classe ThemeManager
(function() {
    // Aplicação IMEDIATA do tema antes do DOM carregar
    const savedTheme = localStorage.getItem('theme');
    const systemDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    const isDark = savedTheme ? savedTheme === 'dark' : systemDark;
    
    // Aplica as variáveis CSS instantaneamente
    const root = document.documentElement;
    root.style.setProperty('--bg-color', isDark ? '#121212' : '#ffffff');
    root.style.setProperty('--text-color', isDark ? '#f0f0f0' : '#333333');
    root.style.setProperty('--card-bg', isDark ? '#1e1e1e' : '#f9f9f9');
    root.style.setProperty('--border-color', isDark ? '#444444' : '#dddddd');
    root.style.setProperty('--ruby-red', isDark ? '#ff4d4d' : '#9b111e');
    
    // Marca o tema no HTML
    if (isDark) document.documentElement.classList.add('dark-mode');
})();



// Sistema Único de Gerenciamento de Tema
class ThemeManager {
    static init() {
        this.setupInitialTheme();
        this.setupThemeButton();
        this.setupThemeSync();
        this.preventFlash();
    }

    static setupInitialTheme() {
        const savedTheme = localStorage.getItem('theme');
        const systemDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
        const initialTheme = savedTheme || (systemDark ? 'dark' : 'light');
        
        this.applyTheme(initialTheme === 'dark');
    }

    static applyTheme(isDark) {       
        
        // Aplica classes
        document.documentElement.classList.toggle('dark-mode', isDark);
        
        // Atualiza variáveis CSS
        const root = document.documentElement;
        root.style.setProperty('--bg-color', isDark ? '#121212' : '#ffffff');
        root.style.setProperty('--text-color', isDark ? '#f0f0f0' : '#333333');
        root.style.setProperty('--card-bg', isDark ? '#1e1e1e' : '#f9f9f9');
        root.style.setProperty('--border-color', isDark ? '#444444' : '#dddddd');
        root.style.setProperty('--ruby-red', isDark ? '#ff4d4d' : '#9b111e');

        // Atualiza ícone
        const icon = document.getElementById('theme-icon');
        if (icon) icon.textContent = isDark ? '☀️' : '🌙';
        
        // Salva preferência
        localStorage.setItem('theme', isDark ? 'dark' : 'light');

        console.log(`Aplicando tema: ${isDark ? 'dark' : 'light'}`); // ← Adicione esta linha

        // Notifica a galeria para atualizar
        document.dispatchEvent(new CustomEvent('themeChanged', {
        detail: { isDark }
        }));
        
    }

    static setupThemeButton() {
        const button = document.getElementById('theme-toggle');
        if (button) {
            button.style.display = 'block';
            button.addEventListener('click', () => {
                const current = document.documentElement.classList.contains('dark-mode');
                this.applyTheme(!current);
            });
        }
    }

    static setupThemeSync() {
        window.addEventListener('storage', (e) => {
            if (e.key === 'theme') this.applyTheme(e.newValue === 'dark');
        });
    }

    static preventFlash() {
        document.documentElement.style.visibility = 'hidden';
        setTimeout(() => {
            document.documentElement.style.visibility = '';
        }, 50);
    }
}

// Inicialização
document.addEventListener('DOMContentLoaded', () => ThemeManager.init());
