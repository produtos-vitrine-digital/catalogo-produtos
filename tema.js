// Aplica o tema salvo ao carregar
const bodyElement = document.body;
if (localStorage.getItem('theme') === 'dark') {
  bodyElement.classList.add('dark-mode');
}

// Alterna o tema ao clicar
document.addEventListener('DOMContentLoaded', () => {
  const toggleThemeButton = document.getElementById('toggle-theme');
  if (toggleThemeButton) {
    toggleThemeButton.addEventListener('click', () => {
      bodyElement.classList.toggle('dark-mode');
      const temaAtual = bodyElement.classList.contains('dark-mode') ? 'dark' : 'light';
      localStorage.setItem('theme', temaAtual);
    });
  }
});
