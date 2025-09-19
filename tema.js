// Aplica o tema salvo ao carregar
const rootElement = document.documentElement;
if (localStorage.getItem('theme') === 'dark') {
  rootElement.classList.add('dark-mode');
}

// Alterna o tema ao clicar
document.addEventListener('DOMContentLoaded', () => {
  const toggleThemeButton = document.getElementById('toggle-theme');
  if (toggleThemeButton) {
    toggleThemeButton.addEventListener('click', () => {
      rootElement.classList.toggle('dark-mode');
      const temaAtual = rootElement.classList.contains('dark-mode') ? 'dark' : 'light';
      localStorage.setItem('theme', temaAtual);
    });
  }
});
