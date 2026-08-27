const formLivro = document.getElementById("formLivro");

const titulo = document.getElementById("titulo");
const autor = document.getElementById("autor");
const ano = document.getElementById("ano");
const genero = document.getElementById("genero");
const descricao = document.getElementById("descricao");
const capa = document.getElementById("capa");

const listaLivros = document.getElementById("listaLivros");
const pesquisa = document.getElementById("pesquisa");
const botaoTema = document.getElementById("botaoTema");

const modalDetalhes = document.getElementById("modalDetalhes");
const detalhesLivro = document.getElementById("detalhesLivro");
const fecharModal = document.getElementById("fecharModal");

let livros = JSON.parse(localStorage.getItem("livros")) || [];


formLivro.addEventListener("submit", function (event) {

    event.preventDefault();

    const arquivo = capa.files[0];

    const leitor = new FileReader();

    leitor.onload = function () {

        const novoLivro = {

            id: Date.now(),

            titulo: titulo.value,

            autor: autor.value,

            ano: ano.value,

            genero: genero.value,

            descricao: descricao.value,

            capa: leitor.result
        };

        livros.push(novoLivro);

        localStorage.setItem(
            "livros",
            JSON.stringify(livros)
        );

        mostrarLivros();

        formLivro.reset();
    };

    leitor.readAsDataURL(arquivo);
});


function mostrarLivros(lista = livros) {

    listaLivros.innerHTML = "";

    if (lista.length === 0) {

        listaLivros.innerHTML = `
            <p class="mensagem-vazia">
                Nenhum livro encontrado.
            </p>
        `;

        return;
    }

    lista.forEach(function (livro) {

        listaLivros.innerHTML += `

            <article class="livro">

                <img
                    src="${livro.capa}"
                    alt="Capa do livro ${livro.titulo}"
                >

                <div class="livro-info">

                    <h3>
                        ${livro.titulo}
                    </h3>

                    <p>
                        ${livro.autor}
                    </p>

                    <span>
                        ${livro.ano || "Ano não informado"}
                        •
                        ${livro.genero || "Gênero não informado"}
                    </span>

                    <p>
                        ${livro.descricao || "Descrição não informada"}
                    </p>

                    <button
                        onclick="verDetalhes(${livro.id})"
                    >
                        Ver detalhes
                    </button>

                    <button
                        onclick="excluirLivro(${livro.id})"
                    >
                        Excluir
                    </button>

                </div>

            </article>
        `;
    });
}


pesquisa.addEventListener("input", function () {

    const textoPesquisa = pesquisa.value.toLowerCase();

    const livrosFiltrados = livros.filter(function (livro) {

        return (
            livro.titulo.toLowerCase().includes(textoPesquisa) ||
            livro.autor.toLowerCase().includes(textoPesquisa)
        );

    });

    mostrarLivros(livrosFiltrados);
});


function verDetalhes(id) {

    const livro = livros.find(function (livro) {

        return livro.id === id;
    });

    if (!livro) {
        return;
    }

    detalhesLivro.innerHTML = `

        <h2 class="detalhes-titulo">
            ${livro.titulo}
        </h2>

        <p class="detalhes-autor">
            ${livro.autor}
        </p>

        <p class="detalhes-info">
            ${livro.ano || "Ano não informado"}
            •
            ${livro.genero || "Gênero não informado"}
        </p>

        <h3 class="detalhes-subtitulo">
            Descrição
        </h3>

        <p class="detalhes-texto">
            ${livro.descricao || "Descrição não informada"}
        </p>
    `;

    modalDetalhes.style.display = "flex";
}


fecharModal.addEventListener("click", function () {

    modalDetalhes.style.display = "none";
});


modalDetalhes.addEventListener("click", function (event) {

    if (event.target === modalDetalhes) {

        modalDetalhes.style.display = "none";
    }
});


function excluirLivro(id) {

    livros = livros.filter(function (livro) {

        return livro.id !== id;
    });

    localStorage.setItem(
        "livros",
        JSON.stringify(livros)
    );

    mostrarLivros();
}


mostrarLivros();


let tema = 0;

botaoTema.addEventListener("click", function () {

    tema++;

    if (tema === 1) {
        document.body.dataset.tema = "escuro";
    }

    if (tema === 2) {
        document.body.dataset.tema = "papel";
    }

    if (tema === 3) {
        document.body.dataset.tema = "";
        tema = 0;
    }
});