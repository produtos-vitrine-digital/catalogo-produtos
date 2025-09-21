/* LÓGICA DO CATÁLOGO DE PRODUTOS */


/* === LISTA DE PRODUTOS === */
/* Armazena todos os produtos carregados do JSON */
let todosProdutos = [];



/* === FUNÇÃO: Exibe os produtos na tela === */
/* Recebe uma categoria ou uma lista filtrada e renderiza os cards */
function exibirProdutos(categoriaOuLista) {
  const container = document.getElementById('catalogo');
  container.innerHTML = ''; // Limpa o conteúdo anterior

  // Filtra os produtos com base na categoria ou lista recebida
  const produtosFiltrados = Array.isArray(categoriaOuLista)
    ? categoriaOuLista
    : categoriaOuLista === 'todos'
      ? todosProdutos
      : todosProdutos.filter(p => p.categoria === categoriaOuLista);

  // Se não houver produtos, exibe mensagem
  if (produtosFiltrados.length === 0) {
    container.innerHTML = `<p style="text-align:center;">Nenhum produto encontrado 😕</p>`;
    return;
  }

  // Cria e insere os cards de produto
  produtosFiltrados.forEach(produto => {
    const card = document.createElement('div');
    card.className = 'card';
    card.innerHTML = `
      <img src="${produto.imagem}" alt="${produto.nome}" onerror="this.src='img/padrao.jpg'">
      <h3>${produto.nome}</h3>
      <p><strong>R$ ${Number(produto.preco).toFixed(2)}</strong></p>
      <a href="detalhes.html?id=${produto.id}" class="botao-contato">
        <i class="fas fa-search"></i> Ver detalhes
      </a>
    `;
    container.appendChild(card);
  });
}



/* === CARREGAMENTO INICIAL DOS PRODUTOS === */
/* Busca os dados do arquivo JSON e exibe todos os produtos */
fetch('produtos.json')
  .then(res => res.json())
  .then(produtos => {
    todosProdutos = produtos;
    exibirProdutos('todos'); // Exibe todos ao carregar
  })
  .catch(error => {
    console.error("Erro ao carregar o catálogo de produtos:", error);
    document.getElementById('catalogo').innerHTML = "<p>Não foi possível carregar os produtos. Tente novamente mais tarde.</p>";
  });



/* === FILTRO POR CATEGORIA === */
/* Adiciona evento de clique nos links do menu para filtrar por categoria */
document.querySelectorAll('nav a').forEach(link => {
  link.addEventListener('click', (e) => {
    e.preventDefault(); // Evita o comportamento padrão do link
    const categoria = link.getAttribute('data-categoria');
    exibirProdutos(categoria);

    // Atualiza o estilo do link ativo
    document.querySelectorAll('nav a').forEach(l => l.classList.remove('ativo'));
    link.classList.add('ativo');
  });
});



/* === FILTRO POR NOME === */
/* Filtra os produtos conforme o usuário digita no campo de busca */
document.getElementById('busca').addEventListener('input', (e) => {
  const termo = e.target.value.toLowerCase();
  const filtrados = todosProdutos.filter(p => p.nome.toLowerCase().includes(termo));
  exibirProdutos(filtrados);
});
