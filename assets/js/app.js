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
    // Aplica classe ao body
    document.body.classList.toggle('dark-mode', isDark);
    
    // Atualiza todas as variáveis CSS
    const root = document.documentElement;
    root.style.setProperty('--bg-color', isDark ? '#121212' : '#ffffff');
    root.style.setProperty('--text-color', isDark ? '#f0f0f0' : '#333333');
    root.style.setProperty('--card-bg', isDark ? '#1e1e1e' : '#f9f9f9');
    
    // Atualiza MathJax
    if (window.MathJax) {
        MathJax.typesetPromise().then(() => {
            document.querySelectorAll('.mjx-chtml').forEach(el => {
                el.style.color = isDark ? '#f0f0f0' : '#333333';
            });
        });
    }
    
    // Atualiza ícone
    updateThemeIcon(isDark);
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
