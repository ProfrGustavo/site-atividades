// Captura os elementos do DOM
const wordInput = document.getElementById('wordInput'); // Campo de entrada
const generateButton = document.getElementById('generateButton'); // Botão de gerar
const crosswordDiv = document.getElementById('crossword'); // Área para exibir a cruzadinha

// Função para criar uma matriz vazia
function createMatrix(size) {
    // Cria uma matriz `size x size` preenchida com espaços vazios
    return Array.from({ length: size }, () => Array(size).fill(' '));
}

// Função para exibir a matriz no navegador
function displayMatrix(matrix) {
    crosswordDiv.innerHTML = matrix
        .map(row => row.map(cell => (cell === ' ' ? '&nbsp;' : cell)).join(' ')) // Substitui espaços por HTML
        .map(row => `<div>${row}</div>`) // Envolve cada linha em uma div
        .join('');
}

// Função para posicionar as palavras na matriz (horizontalmente por enquanto)
function addWordsToMatrix(words, size) {
    const matrix = createMatrix(size); // Cria a matriz inicial

    words.forEach((word, index) => {
        if (index < size) { // Garante que não exceda o tamanho da matriz
            for (let i = 0; i < word.length && i < size; i++) {
                matrix[index][i] = word[i]; // Posiciona as letras horizontalmente
            }
        }
    });

    return matrix; // Retorna a matriz preenchida
}

// Evento do botão "Gerar Cruzadinha"
generateButton.addEventListener('click', () => {
    const words = wordInput.value.trim().split('\n').map(w => w.toUpperCase()); // Captura as palavras
    if (words.length === 0 || words[0] === "") {
        alert("Por favor, insira pelo menos uma palavra.");
        return;
    }

    const size = 10; // Define o tamanho da matriz (10x10 por padrão)
    const matrix = addWordsToMatrix(words, size); // Gera a matriz com as palavras
    displayMatrix(matrix); // Exibe a matriz no navegador

    console.log("Cruzadinha gerada:", matrix); // Loga a matriz no console para debugging
});
