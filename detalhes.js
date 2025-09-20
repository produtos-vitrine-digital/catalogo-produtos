// LÓGICA DOS DETALHES DO PRODUTO //


// === Captura o ID da URL === //
const urlParams = new URLSearchParams(window.location.search);
const id = parseInt(urlParams.get('id'));

// === Busca os dados do JSON === //
fetch('produtos.json')
  .then(res => res.json())
  .then(produtos => {
    const produto = produtos.find(p => p.id === id);
    const container = document.getElementById('detalhes-produto');

    if (!produto) {
      container.innerHTML = "<p>Produto não encontrado.</p>";
      return;
    }

    // === Exibe os detalhes do produto === //
    container.innerHTML = `
      <div class="detalhes-card">
        <img src="${produto.imagem}" alt="${produto.nome}" onerror="this.src='img/padrao.jpg'">
        <h2>${produto.nome}</h2>
        <p>${produto.detalhes || "Detalhes não disponível"}</p>
        <p><strong>R$ ${produto.preco.toFixed(2)}</strong></p>
        
        <a href="https://wa.me/5566999348834?text=Olá! Tenho interesse no ${encodeURIComponent(produto.nome)}" class="botao-contato" target="_blank">
          <i class="fab fa-whatsapp"></i> Falar no WhatsApp
        </a>
        
        <a href="index.html" class="botao-contato">
          <i class="fas fa-arrow-left"></i> Voltar ao Catálogo
        </a>
      </div>
    `;
  })
  .catch(error => {
    console.error("Erro ao carregar os detalhes:", error);
    document.getElementById('detalhes-produto').innerHTML = "<p>Erro ao carregar o produto.</p>";
  });
