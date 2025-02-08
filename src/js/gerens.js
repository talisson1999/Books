async function buscarLivros(genre) {
    const url = `https://openlibrary.org/subjects/${genre}.json?limit=100`; 
    const container = document.getElementById('livros-grid');
    
    
   

    try {
        const resposta = await fetch(url);
        const dados = await resposta.json();
        exibirLivros(dados);
    } catch (erro) {
        console.error(`Erro ao buscar livros de ${genre}:`, erro);
        container.innerHTML = '<p>Não foi possível carregar os livros no momento. Tente novamente mais tarde.</p>';
    }
}

function exibirLivros(dados) {
    const livros = dados.works;
    const container = document.getElementById('livros-grid');
    container.innerHTML = ''; // Limpa o conteúdo atual

    livros.forEach(livro => {
        const livroDiv = document.createElement('div');
        livroDiv.classList.add('livro');
        const imagemUrl = livro.cover_id 
            ? `https://covers.openlibrary.org/b/id/${livro.cover_id}-M.jpg` 
            : 'https://via.placeholder.com/150';

        livroDiv.innerHTML = `
          <img src="${imagemUrl}" alt="${livro.title}">
          <h3>${livro.title}</h3>
          <p class="autor">${livro.authors?.map(author => author.name).join(', ') || 'Autor desconhecido'}</p>
          <p class="descricao">${livro.first_publish_year ? `Publicado em ${livro.first_publish_year}` : 'Ano de publicação não disponível'}</p>
          <a href="https://openlibrary.org${livro.key}" target="_blank" class="botao-vermais">Ver Mais</a>
        `;
        container.appendChild(livroDiv);
    });

    // Após exibir os livros, esconda a tela de carregamento
    document.getElementById('loading').style.display = 'none';
    // Exiba o conteúdo da página
    document.querySelector('.container').style.display = 'block';
}

// Ação ao carregar a página
window.onload = () => {
    const genre = document.body.dataset.genre || 'fantasy'; // Defina `data-genre` no HTML ou padrão para 'fantasy'
    buscarLivros(genre);
};
