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