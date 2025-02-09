// Certifique-se de que o botão de busca existe antes de adicionar o evento
const searchBtn = document.getElementById('search-btn');
if (searchBtn) {
    searchBtn.addEventListener('click', searchBooks);
}

// Função para tradução ou manipulação de texto
function translateText(title, description, author, image) {
    showPopup(title, description, author, image, "popup-busca");
}

// Função para buscar livros na API do Google Books
async function searchBooks() {
    const query = document.querySelector('.search-input').value;
    if (!query) {
        console.log("Campo de pesquisa vazio!");
        return;
    }
    console.log("Buscando por:", query);

    // Garantir que o contêiner de resultados existe antes de usá-lo
    const searchResultsContainer = document.querySelector('.search-results');
    if (searchResultsContainer) {
        searchResultsContainer.innerHTML = "Carregando..."; // Exibe a mensagem de carregamento
    }

    try {
        const response = await fetch(`https://www.googleapis.com/books/v1/volumes?q=${encodeURIComponent(query)}`);
        if (!response.ok) {
            console.log("Erro ao buscar livros", response.status);
            throw new Error('Erro ao buscar livros');
        }
        const data = await response.json();
        console.log("Resposta da API:", data);

        if (data.items && data.items.length > 0) {
            const book = data.items[0].volumeInfo;
            const title = book.title || "Título não disponível";
            const description = book.description || "Sem descrição disponível.";
            const author = book.authors ? book.authors.join(', ') : "Autor desconhecido";
            const image = book.imageLinks ? book.imageLinks.thumbnail : "https://via.placeholder.com/150";

            translateText(title, description, author, image);

            // Exibe os resultados
            if (searchResultsContainer) {
                searchResultsContainer.innerHTML = `
                    <h3>${title}</h3>
                    <p><strong>Autor:</strong> ${author}</p>
                    <p>${description}</p>
                    <img src="${image}" alt="Imagem do livro" class="book-image">
                `;
            }
        } else {
            console.log("Nenhum livro encontrado.");
            if (searchResultsContainer) {
                searchResultsContainer.innerHTML = "Nenhum livro encontrado.";
            }
        }
    } catch (error) {
        console.error("Erro:", error);
        if (searchResultsContainer) {
            searchResultsContainer.innerHTML = "Ocorreu um erro. Tente novamente.";
        }
    }
}

// Função para exibir pop-ups diferentes
function showPopup(title, description, author, image, popupId) {
    let popup = document.getElementById(popupId);

    if (!popup) {
        popup = document.createElement('div');
        popup.id = popupId;
        popup.classList.add('popup');
        document.body.appendChild(popup);
    }

    popup.innerHTML = `
        <div class="popup-content">
            <img src="${image}" alt="Imagem do livro" class="book-image">
            <p><strong>Autor:</strong> ${author}</p>
            <h3>${title}</h3>
            <p>${description}</p>
            <button class="close-popup">Fechar</button>
        </div>
    `;
    popup.style.display = "block";

    popup.querySelector('.close-popup').addEventListener('click', () => {
        popup.style.display = "none";
    });
}

// Manipulação correta do pop-up de inscrição
const btnInscrever = document.getElementById("btn-inscrever");
const popupInscricao = document.getElementById("popup-inscricao");
const fecharPopupInscricao = document.getElementById("fechar-popup");
const formPopup = document.getElementById("form-popup");

if (btnInscrever && popupInscricao) {
    btnInscrever.addEventListener("click", function () {
        popupInscricao.style.display = "flex";
    });

    fecharPopupInscricao.addEventListener("click", function () {
        popupInscricao.style.display = "none";
    });

    formPopup.addEventListener("submit", function (event) {
        event.preventDefault();
        const nome = document.getElementById("nome").value;
        const telefone = document.getElementById("telefone").value;

        if (nome && telefone) {
            alert(`Inscrição realizada com sucesso!\nNome: ${nome}\nTelefone: ${telefone}`);
            popupInscricao.style.display = "none";
        } else {
            alert("Por favor, preencha todos os campos.");
        }
    });
}

// Remover a tela de carregamento e exibir o conteúdo da página
window.onload = function() {
    const loadingElement = document.getElementById('loading');
    const contentElement = document.querySelector('.content');

    if (loadingElement) {
        loadingElement.style.display = 'none';
    }

    if (contentElement) {
        contentElement.style.display = 'block';
    }
};
