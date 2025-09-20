/* === TEMA DO SITE - Alternância Claro/Escuro === */


/* === FUNÇÃO: Aplica o tema salvo no navegador === */
/* Verifica o localStorage e ativa o modo escuro se necessário */
function aplicarTema() {
  const temaSalvo = localStorage.getItem('theme'); // Recupera a preferência salva

  if (temaSalvo === 'dark') {
    document.documentElement.classList.add('dark-mode'); // Aplica modo escuro
  } else {
    document.documentElement.classList.remove('dark-mode'); // Aplica modo claro
  }
}



/* === EVENTO: Executa após o carregamento completo da página === */
document.addEventListener('DOMContentLoaded', () => {
  const toggleThemeButton = document.getElementById('toggle-theme'); // Botão de alternância de tema

  aplicarTema(); // Aplica o tema salvo ao carregar a página

  // === EVENTO: Clique no botão para alternar o tema ===
  if (toggleThemeButton) {
    toggleThemeButton.addEventListener('click', () => {
      document.documentElement.classList.toggle('dark-mode'); // Alterna entre claro/escuro

      // Atualiza a preferência no localStorage
      const temaAtual = document.documentElement.classList.contains('dark-mode') ? 'dark' : 'light';
      localStorage.setItem('theme', temaAtual);
    });
  }
});
