// Função para aplicar o tema consistentemente
function applyTheme(isDark) {
    // Aplica classe ao body
    document.body.classList.toggle('dark-mode', isDark);
    
    // Atualiza todas as variáveis CSS de forma explícita
    const root = document.documentElement;
    const styles = {
        '--bg-color': isDark ? '#121212' : '#ffffff',
        '--text-color': isDark ? '#f0f0f0' : '#333333',
        '--card-bg': isDark ? '#1e1e1e' : '#f9f9f9',
        '--border-color': isDark ? '#444444' : '#dddddd',
        '--ruby-red': isDark ? '#ff4d4d' : '#9b111e'
    };
    
    Object.entries(styles).forEach(([property, value]) => {
        root.style.setProperty(property, value);
    });
    
    // Atualiza MathJax se estiver disponível
    updateMathJaxColors(isDark);
    
    // Atualiza ícone
    updateThemeIcon(isDark);
    
    // Salva preferência com timestamp para evitar conflitos
    localStorage.setItem('theme', isDark ? 'dark' : 'light');
    localStorage.setItem('themeTimestamp', Date.now());
}

// Função para sincronizar o tema entre abas
function setupThemeSync() {
    window.addEventListener('storage', (event) => {
        if (event.key === 'theme') {
            const isDark = event.newValue === 'dark';
            applyTheme(isDark);
        }
    });
}

// Inicialização completa
document.addEventListener('DOMContentLoaded', function() {
    // Mostra o botão imediatamente para evitar flickering
    const themeToggle = document.getElementById('theme-toggle');
    if (themeToggle) themeToggle.style.display = 'block';
    
    // Sistema de tema robusto
    const savedTheme = localStorage.getItem('theme');
    const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    
    // Verifica se há um tema salvo recentemente (últimos 5 segundos)
    const themeTimestamp = localStorage.getItem('themeTimestamp');
    const isRecent = themeTimestamp && (Date.now() - parseInt(themeTimestamp) < 5000);
    
    const isDark = isRecent ? savedTheme === 'dark' : systemPrefersDark;
    applyTheme(isDark);
    
    // Configura o botão
    if (themeToggle) {
        themeToggle.addEventListener('click', () => {
            const newIsDark = !document.body.classList.contains('dark-mode');
            applyTheme(newIsDark);
        });
    }
    
    // Monitora mudanças do sistema
    window.matchMedia('(prefers-color-scheme: dark)').addListener(e => {
        if (!localStorage.getItem('theme')) {
            applyTheme(e.matches);
        }
    });
    
    // Sincronização entre abas
    setupThemeSync();
    
    // Força redraw para garantir consistência
    setTimeout(() => document.body.style.display = 'none', 0);
    setTimeout(() => document.body.style.display = '', 10);
});
