
// Sistema de Tema Global
class ThemeSystem {
    static init() {
        // 1. Configura tema inicial
        this.applyTheme(this.getSavedTheme());
        
        // 2. Configura botões em todas as páginas
        this.setupThemeButtons();
        
        // 3. Sincronização entre abas
        window.addEventListener('storage', (e) => {
            if (e.key === 'theme') this.applyTheme(e.newValue === 'dark');
        });
    }

    static getSavedTheme() {
        const saved = localStorage.getItem('theme');
        const systemDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
        return saved || (systemDark ? 'dark' : 'light');
    }

    static applyTheme(isDark) {
        // Aplica ao documento
        document.documentElement.classList.toggle('dark-mode', isDark);
        
        // Atualiza ícones em TODAS as páginas
        document.querySelectorAll('.theme-icon').forEach(icon => {
            icon.textContent = isDark ? '☀️' : '🌙';
        });
        
        // Salva preferência
        localStorage.setItem('theme', isDark ? 'dark' : 'light');
    }

    static setupThemeButtons() {
        document.querySelectorAll('.theme-toggle').forEach(button => {
            button.style.display = 'block';
            button.addEventListener('click', () => {
                const current = document.documentElement.classList.contains('dark-mode');
                this.applyTheme(!current);
            });
        });
    }
}

// Inicialização
document.addEventListener('DOMContentLoaded', () => ThemeSystem.init());


// TemaManager - Controle centralizado do tema
const ThemeManager = {
    init() {
        this.setupTheme();
        this.setupThemeSync();
        this.setupThemeButton();
        this.preventFlash();
    },

    setupTheme() {
        const savedTheme = localStorage.getItem('theme');
        const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
        const initialTheme = savedTheme || (systemPrefersDark ? 'dark' : 'light');
        
        this.applyTheme(initialTheme === 'dark');
    },

    applyTheme(isDark) {
        // Aplica ao DOM
        document.documentElement.classList.toggle('dark-mode', isDark);
        document.body.classList.toggle('dark-mode', isDark);
        
        // Atualiza variáveis CSS
        const root = document.documentElement;
        root.style.setProperty('--bg-color', isDark ? '#121212' : '#ffffff');
        root.style.setProperty('--text-color', isDark ? '#f0f0f0' : '#333333');
        root.style.setProperty('--card-bg', isDark ? '#1e1e1e' : '#f9f9f9');
        root.style.setProperty('--border-color', isDark ? '#444444' : '#dddddd');
        root.style.setProperty('--ruby-red', isDark ? '#ff4d4d' : '#9b111e');

        // Atualiza localStorage
        localStorage.setItem('theme', isDark ? 'dark' : 'light');
        localStorage.setItem('theme-last-updated', Date.now());

        // Atualiza ícone
        this.updateThemeIcon(isDark);
    },

    updateThemeIcon(isDark) {
        const icon = document.getElementById('theme-icon');
        if (icon) {
            icon.textContent = isDark ? '☀️' : '🌙';
        }
    },

    setupThemeButton() {
        const button = document.getElementById('theme-toggle');
        if (button) {
            button.style.display = 'block';
            button.addEventListener('click', () => {
                const currentIsDark = document.documentElement.classList.contains('dark-mode');
                this.applyTheme(!currentIsDark);
            });
        }
    },

    setupThemeSync() {
        window.addEventListener('storage', (event) => {
            if (event.key === 'theme') {
                this.applyTheme(event.newValue === 'dark');
            }
        });
    },

    preventFlash() {
        // Garante que o tema seja aplicado antes da renderização
        document.documentElement.style.visibility = 'hidden';
        setTimeout(() => {
            document.documentElement.style.visibility = '';
        }, 50);
    }
};

// Inicialização quando o DOM estiver pronto
document.addEventListener('DOMContentLoaded', () => ThemeManager.init());

// Fallback para páginas que carregam muito rápido
if (document.readyState === 'interactive' || document.readyState === 'complete') {
    ThemeManager.init();
}
