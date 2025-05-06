// Controle completo do tema - Versão 2.0
(function() {
    // Executa imediatamente ao carregar o script
    const savedTheme = localStorage.getItem('theme');
    const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    const currentTheme = savedTheme || (systemPrefersDark ? 'dark' : 'light');
    const html = document.documentElement;

    // Aplica o tema ANTES do DOM carregar
    html.classList.toggle('dark-mode', currentTheme === 'dark');
    
    // Configuração inicial das imagens
    const initImages = () => {
        document.querySelectorAll('.theme-sensitive-img').forEach(img => {
            img.style.display = img.dataset.theme === currentTheme ? 'block' : 'none';
        });
    };    
        
        document.addEventListener('DOMContentLoaded', function() {
        const languageSelector = document.querySelector('.language-selector select');
        
        if (languageSelector) {
            languageSelector.addEventListener('change', function() {
                const selectedLanguage = this.value;
                // Monta o caminho absoluto correto
                const newUrl = `/ruby-app-docs/${selectedLanguage}/index.html`;
                window.location.href = newUrl;
            });
            
            // Atualiza o seletor com o idioma atual
            const pathParts = window.location.pathname.split('/');
            const langIndex = pathParts.indexOf('ruby-app-docs') + 1;
            if (langIndex > 0 && langIndex < pathParts.length) {
                const currentLang = pathParts[langIndex];
                if (['pt', 'en', 'es', 'ru', 'zh'].includes(currentLang)) {
                    languageSelector.value = currentLang;
                }
            }
        }
    });

    
    // Espera o DOM estar pronto para o restante
    document.addEventListener('DOMContentLoaded', function() {
        const themeToggle = document.getElementById('theme-toggle');
        const themeIcon = document.getElementById('theme-icon');

        // Configura ícone inicial
        themeIcon.textContent = currentTheme === 'dark' ? '☀️' : '🌙';

        // Ouvinte do botão
        themeToggle.addEventListener('click', () => {
            const isDark = html.classList.toggle('dark-mode');
            const newTheme = isDark ? 'dark' : 'light';
            
            localStorage.setItem('theme', newTheme);
            themeIcon.textContent = isDark ? '☀️' : '🌙';
            
            // Atualiza imagens com timeout para garantir renderização
            requestAnimationFrame(() => {
                document.querySelectorAll('.theme-sensitive-img').forEach(img => {
                    img.style.display = img.dataset.theme === newTheme ? 'block' : 'none';
                });
            });
        });

        // Inicializa imagens após pequeno delay
        setTimeout(initImages, 10);
    });

    // Fallback para imagens caso DOM demore
    window.addEventListener('load', initImages);
})();
