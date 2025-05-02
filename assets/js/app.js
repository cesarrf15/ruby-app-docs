document.addEventListener('DOMContentLoaded', function() {
  // Elementos do tema
  const themeToggle = document.getElementById('theme-toggle');
  const themeIcon = document.getElementById('theme-icon');
  
  // Verifica o tema atual
  function getCurrentTheme() {
    const savedTheme = localStorage.getItem('theme');
    const systemDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    return savedTheme ? savedTheme === 'dark' : systemDark;
  }
  
  // Aplica o tema
  function applyTheme(isDark) {
    document.documentElement.classList.toggle('dark-mode', isDark);
    localStorage.setItem('theme', isDark ? 'dark' : 'light');
    
    // Atualiza o ícone
    if (themeIcon) {
      themeIcon.textContent = isDark ? '☀️' : '🌙';
    }
    
    // Atualiza imagens sensíveis ao tema
    document.querySelectorAll('.theme-sensitive-img').forEach(img => {
      img.style.display = (img.dataset.theme === (isDark ? 'dark' : 'light')) ? 'block' : 'none';
    });
  }
  
  // Inicializa o tema
  applyTheme(getCurrentTheme());
  
  // Configura o botão de tema
  if (themeToggle) {
    themeToggle.style.display = 'flex'; // Garante que está visível
    themeToggle.addEventListener('click', () => {
      const isDark = !document.documentElement.classList.contains('dark-mode');
      applyTheme(isDark);
    });
  }
  
  // Responde a mudanças no tema do sistema
  window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', e => {
    if (!localStorage.getItem('theme')) {
      applyTheme(e.matches);
    }
  });
});
