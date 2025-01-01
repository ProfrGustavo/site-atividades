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

// Função para verificar se a palavra pode ser colocada na posição (linha, coluna) na direção horizontal
function canPlaceHorizontal(matrix, word, row, col) {
    if (col + word.length > matrix[row].length) return false; // Verifica se cabe na linha

    for (let i = 0; i < word.length; i++) {
        if (matrix[row][col + i] !== ' ' && matrix[row][col + i] !== word[i]) {
            return false; // Se houver uma letra diferente na posição, não pode colocar a palavra
        }
    }
    return true;
}

// Função para verificar se a palavra pode ser colocada na posição (linha, coluna) na direção vertical
function canPlaceVertical(matrix, word, row, col) {
    if (row + word.length > matrix.length) return false; // Verifica se cabe na coluna

    for (let i = 0; i < word.length; i++) {
        if (matrix[row + i][col] !== ' ' && matrix[row + i][col] !== word[i]) {
            return false; // Se houver uma letra diferente na posição, não pode colocar a palavra
        }
    }
    return true;
}

// Função para adicionar a palavra na matriz na direção horizontal
function placeHorizontal(matrix, word, row, col) {
    for (let i = 0; i < word.length; i++) {
        matrix[row][col + i] = word[i]; // Coloca a palavra na linha
    }
}

// Função para adicionar a palavra na matriz na direção vertical
function placeVertical(matrix, word, row, col) {
    for (let i = 0; i < word.length; i++) {
        matrix[row + i][col] = word[i]; // Coloca a palavra na coluna
    }
}

// Função para posicionar as palavras na matriz (horizontal e vertical)
function addWordsToMatrix(words, size) {
    const matrix = creat
