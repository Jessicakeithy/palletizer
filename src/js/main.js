const paletas = [
    {
        nome: "Olhos Azuis",
        cores: ["#5882d8", "#00abf0", "#0468aa", "#0469ff"]
    },
    {
        nome: "Café Aconchegante",
        cores: ["#d8ad6d", "#694c0c", "#311607", "#221a17"]
    },
    {
        nome: "Pôr do Sol Romântico",
        cores: ["#f3ba3efd", "#d14b0d", "#e23c55", "#940a0a"]
    },
    {
        nome: "Jardim Botânico Suave",
        cores: ["#a6eb4b", "#86efac", "#22c55e", "#14532d"]
    },
    {
        nome: "Noite Estrelada",
        cores: ["#0f172a", "#011e9e", "#100df7", "#5f55f0"]
    },
    {
        nome: "Toscana Impressionista",
        cores: ["#7c2d82", "#e11d48", "#eab308", "#15803d"]
    },
    {
        nome: "Pôr do Sol Dourado",
        cores: ["#4c1d95", "#831843", "#f97316", "#facc15"]
    },
    {
        nome: "Cipreste & Campo Amarelo",
        cores: ["#064e3b", "#047857", "#ca8a04", "#fef08a"]
    },
    {
        nome: "Céu Púrpura & Mel",
        cores: ["#2e1065", "#581c87", "#c084fc", "#fde047"]
    },
    {
        nome: "Tons de Violeta",
        cores: ["#300864", "#8601df", "#8b5cf6", "#be73f0"]
    }
];

const botaoGerar = document.getElementById("btn-gerar");
const containerPaleta = document.getElementById("paleta-container");
const nomePaletaTexto = document.getElementById("nome-paleta");
const toast = document.getElementById("toast");

function gerarPaleta(indiceEspecifico) {
    let indiceAleatorio;

    if (indiceEspecifico !== undefined) {
        indiceAleatorio = indiceEspecifico;
    } else {
        indiceAleatorio = Math.floor(Math.random() * paletas.length);
        localStorage.setItem("ultimaPaletaIndex", indiceAleatorio);
    }

    const paletaSorteada = paletas[indiceAleatorio];

    nomePaletaTexto.textContent = paletaSorteada.nome;
    containerPaleta.innerHTML = "";

    paletaSorteada.cores.forEach((corHex, index) => {
        const bloco = document.createElement("div");
        bloco.classList.add("bloco-cor");
        bloco.style.backgroundColor = corHex;

        bloco.style.animationDelay = `${index * 0.12}s`;

        const tagTexto = document.createElement("span");
        tagTexto.textContent = corHex;
        bloco.appendChild(tagTexto);

        bloco.addEventListener("click", () => {
            navigator.clipboard.writeText(corHex);
            mostrarToast(corHex);
        });

        containerPaleta.appendChild(bloco);
    });
}

botaoGerar.addEventListener("click", () => {
    gerarPaleta();
});

window.addEventListener("DOMContentLoaded", () => {
    const indiceSalvo = localStorage.getItem("ultimaPaletaIndex");

    if (indiceSalvo !== null) {
        gerarPaleta(Number(indiceSalvo));
    } else {
        gerarPaleta();
    }
});

function mostrarToast(cor) {
    toast.textContent = `Cor ${cor} copiada com sucesso!`;
    toast.classList.add("mostrar");

    setTimeout(() => {
        toast.classList.remove("mostrar");
    }, 2000);
}
