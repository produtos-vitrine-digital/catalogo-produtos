// === Alternância de tema claro/escuro ===
const toggleThemeButton = document.getElementById('toggle-theme');
const bodyElement = document.body;

// Aplica o tema salvo ao carregar a página
if (localStorage.getItem('theme') === 'dark') {
  document.body.classList.add('dark-mode');
}

// Alterna o tema ao clicar no botão
toggleThemeButton.addEventListener('click', () => {
  bodyElement.classList.toggle('dark-mode');
  const temaAtual = bodyElement.classList.contains('dark-mode') ? 'dark' : 'light';
  localStorage.setItem('theme', temaAtual);
});

// === Lista de produtos carregada do JSON ===
let todosProdutos = [];

// === Função para exibir produtos na tela ===
function exibirProdutos(categoriaOuLista) {
  const container = document.getElementById('catalogo');
  container.innerHTML = ''; // Limpa o conteúdo anterior

  // Decide se vai filtrar por categoria ou usar uma lista personalizada
  const produtosFiltrados = Array.isArray(categoriaOuLista)
    ? categoriaOuLista
    : categoriaOuLista === 'todos'
    ? todosProdutos
    : todosProdutos.filter(p => p.categoria === categoriaOuLista);

  // Se não houver produtos, mostra mensagem
  if (produtosFiltrados.length === 0) {
    container.innerHTML = `<p style="text-align:center;">Nenhum produto encontrado 😕</p>`;
    return;
  }

  // Cria os cards de produto
  produtosFiltrados.forEach(produto => {
    const card = document.createElement('div');
    card.className = 'card';
    card.innerHTML = `
      <img src="${produto.imagem}" alt="${produto.nome}">
      <h3>${produto.nome}</h3>
      <p><strong>R$ ${produto.preco}</strong></p>
      <a href="detalhes.html?id=${produto.id}" class="botao-contato">
        <i class="fas fa-search"></i> Ver detalhes
      </a>
    `;
    container.appendChild(card);
  });
}

// === Carrega os produtos do arquivo JSON ===
fetch('produtos.json')
  .then(res => res.json())
  .then(produtos => {
    todosProdutos = produtos;
    exibirProdutos('todos'); // Exibe todos ao carregar
  });

  // === Filtro por categoria ao clicar no menu ===
document.querySelectorAll('nav a').forEach(link => {
  link.addEventListener('click', (e) => {
    e.preventDefault();
    const categoria = link.getAttribute('data-categoria');
    exibirProdutos(categoria);

    // Atualiza o estilo do link ativo
    document.querySelectorAll('nav a').forEach(l => l.classList.remove('ativo'));
    link.classList.add('ativo');
  });
});

// === Filtro por categoria ao clicar no menu ===
document.querySelectorAll('nav a').forEach(link => {
  link.addEventListener('click', (e) => {
    e.preventDefault();
    const categoria = link.getAttribute('data-categoria');
    exibirProdutos(categoria);

    document.querySelectorAll('nav a').forEach(l => l.classList.remove('ativo'));
    link.classList.add('ativo');
  });
});


// === Filtro por nome ao digitar na busca ===
document.getElementById('busca').addEventListener('input', (e) => {
  const termo = e.target.value.toLowerCase();
  const filtrados = todosProdutos.filter(p => p.nome.toLowerCase().includes(termo));
  exibirProdutos(filtrados);
});
