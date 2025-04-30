document.addEventListener('DOMContentLoaded', function() {
    // Sistema de tema robusto
    const themeToggle = document.getElementById('theme-toggle');
    
    // Verifica preferência salva ou do sistema
    const savedTheme = localStorage.getItem('theme');
    const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    const isDark = savedTheme ? savedTheme === 'dark' : systemPrefersDark;
    
    // Aplica tema inicial
    applyTheme(isDark);
    
    // Configura o botão
    themeToggle.addEventListener('click', toggleTheme);
    
    // Monitora mudanças do sistema
    window.matchMedia('(prefers-color-scheme: dark)').addListener(e => {
        if (!localStorage.getItem('theme')) {
            applyTheme(e.matches);
        }
    });
});

function applyTheme(isDark) {
    document.body.classList.toggle('dark-mode', isDark);
    localStorage.setItem('theme', isDark ? 'dark' : 'light');
    updateThemeIcon(isDark);
    updateMathJaxColors(isDark);
}

function toggleTheme() {
    const isDark = !document.body.classList.contains('dark-mode');
    applyTheme(isDark);
}

function updateThemeIcon(isDark) {
    const themeToggle = document.getElementById('theme-toggle');
    themeToggle.innerHTML = isDark ? '☀️' : '🌙';
    themeToggle.setAttribute('aria-label', isDark ? 'Modo claro' : 'Modo escuro');
}

function updateMathJaxColors(isDark) {
    if (window.MathJax) {
        MathJax.typesetPromise();
    }
}
