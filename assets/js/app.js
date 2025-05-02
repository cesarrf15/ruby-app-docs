document.addEventListener('DOMContentLoaded', function() {
  // Elementos do tema
  const themeToggle = document.getElementById('theme-toggle');
  const themeIcon = document.getElementById('theme-icon');
  
  // Verifica e aplica o tema inicial
  function initTheme() {
    const savedTheme = localStorage.getItem('theme');
    const systemDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    const isDark = savedTheme ? savedTheme === 'dark' : systemDark;
    applyTheme(isDark);
  }
  
  // Aplica o tema
  function applyTheme(isDark) {
    document.documentElement.classList.toggle('dark-mode', isDark);
    localStorage.setItem('theme', isDark ? 'dark' : 'light');
    
    // Atualiza o ícone
    if (themeIcon) {
      themeIcon.textContent = isDark ? '☀️' : '🌙';
    }
    
    // Atualiza MathJax se existir
    if (typeof MathJax !== 'undefined') {
      MathJax.typesetPromise().then(() => {
        document.querySelectorAll('.mjx-chtml').forEach(el => {
          el.style.color = isDark ? '#f8f9fa' : '#333333';
        });
      });
    }
  }
  
  // Configura o botão
  if (themeToggle) {
    themeToggle.addEventListener('click', () => {
      const isDark = !document.documentElement.classList.contains('dark-mode');
      applyTheme(isDark);
    });
  }
  
  // Inicializa
  initTheme();
  
  // Observa mudanças no tema do sistema
  window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', e => {
    if (!localStorage.getItem('theme')) {
      applyTheme(e.matches);
    }
  });
});
