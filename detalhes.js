// Pega o ID da URL
const params = new URLSearchParams(window.location.search);
const id = parseInt(params.get('id'));

// Busca os dados do JSON
fetch('produtos.json')
  .then(res => res.json())
  .then(produtos => {
    const produto = produtos.find(p => p.id === id);
    if (!produto) return;

    // Monta o HTML do produto
    const container = document.getElementById('detalhes-produto');
    container.innerHTML = `
      <div class="detalhes-card">
        <img src="${produto.imagem}" alt="${produto.nome}">
        <h2>${produto.nome}</h2>
        <p>${produto.descricao}</p>
        <p><strong>R$ ${produto.preco}</strong></p>
        <a href="https://wa.me/5566999348834?text=Olá! Tenho interesse no ${produto.nome}" class="botao-contato">
        <i class="fab fa-whatsapp"></i> Falar no WhatsApp
        </a>
      </div>
    `;
  
});
let todosProdutos = [];