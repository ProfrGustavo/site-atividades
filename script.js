// Função para verificar se uma palavra pode ser colocada
function canPlaceWord(matrix, word, row, col, direction) {
    if (direction === 'horizontal' && col + word.length > matrix[0].length) return false;
    if (direction === 'vertical' && row + word.length > matrix.length) return false;

    // Verificar se não há conflito com as letras existentes
    for (let i = 0; i < word.length; i++) {
        const currentRow = direction === 'horizontal' ? row : row + i;
        const currentCol = direction === 'horizontal' ? col + i : col;

        if (matrix[currentRow][currentCol] !== ' ' && matrix[currentRow][currentCol] !== word[i]) {
            return false; // Se já houver uma letra diferente, não pode colocar
        }
    }

    return true;
}

// Função para verificar se a palavra pode compartilhar uma letra com as palavras já colocadas
function hasCommonLetter(matrix, word, row, col, direction) {
    for (let i = 0; i < word.length; i++) {
        const currentRow = direction === 'horizontal' ? row : row + i;
        const currentCol = direction === 'horizontal' ? col + i : col;

        // Verifica se a posição já tem uma letra e se é igual à letra da palavra
        if (matrix[currentRow][currentCol] !== ' ' && matrix[currentRow][currentCol] === word[i]) {
            return true; // A palavra pode ser inserida com a letra comum
        }
    }
    return false;
}

// Função para inserir a palavra de forma que ela compartilhe pelo menos uma letra com as anteriores
function placeWord(matrix, word, wordsPlaced) {
    let placed = false;

    // Tentamos todas as posições e direções
    for (let i = 0; i < matrix.length && !placed; i++) {
        for (let j = 0; j < matrix[i].length && !placed; j++) {
            for (let direction of ['horizontal', 'vertical']) {
                // Verifica se a palavra pode ser colocada e compartilha uma letra com as palavras já colocadas
                if (canPlaceWord(matrix, word, i, j, direction) && hasCommonLetter(matrix, word, i, j, direction)) {
                    // Coloca a palavra na matriz
                    if (direction === 'horizontal') {
                        for (let k = 0; k < word.length; k++) {
                            matrix[i][j + k] = word[k];
                        }
                    } else if (direction === 'vertical') {
                        for (let k = 0; k < word.length; k++) {
                            matrix[i + k][j] = word[k];
                        }
                    }
                    wordsPlaced.push(word); // Marca a palavra como já colocada
                    placed = true;
                }
            }
        }
    }
}

// Função para inicializar o quadro e adicionar palavras
function initializeCrossword(words) {
    // Criar uma matriz 30x30 inicializada com espaços
    const matrix = Array.from({ length: 30 }, () => Array(30).fill(' '));
    const wordsPlaced = [];

    // Colocar a primeira palavra no centro do quadro
    const firstWord = words.pop(); // Retira a primeira palavra da lista
    const firstDirection = Math.random() < 0.5 ? 'horizontal' : 'vertical'; // Direção aleatória
    const firstRow = Math.floor(matrix.length / 2);
    const firstCol = Math.floor(matrix[0].length / 2) - Math.floor(firstWord.length / 2); // Centraliza

    // Coloca a primeira palavra no centro
    if (firstDirection === 'horizontal') {
        for (let i = 0; i < firstWord.length; i++) {
            matrix[firstRow][firstCol + i] = firstWord[i];
        }
    } else {
        for (let i = 0; i < firstWord.length; i++) {
            matrix[firstRow + i][firstCol] = firstWord[i];
        }
    }
    wordsPlaced.push(firstWord); // Marca a primeira palavra como colocada

    // Colocar as palavras subsequentes
    while (words.length > 0) {
        const nextWord = words.pop(); // Retira uma palavra aleatória da lista
        placeWord(matrix, nextWord, wordsPlaced); // Coloca a palavra
    }

    return matrix;
}

// Função para exibir o quadro na tela
function displayMatrix(matrix) {
    let html = '<table>';
    for (let row of matrix) {
        html += '<tr>';
        for (let cell of row) {
            html += `<td>${cell === ' ' ? '&nbsp;' : cell}</td>`;
        }
        html += '</tr>';
    }
    html += '</table>';
    document.getElementById('crossword').innerHTML = html;
}

// Exemplo de uso:
const words = ["ALGORITMO", "INTERNET", "TECNOLOGIA", "ESTUDO", "DESAFIO"];
const matrix = initializeCrossword(words);
displayMatrix(matrix);
