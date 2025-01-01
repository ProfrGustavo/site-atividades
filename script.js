// Passo 1: Criação do Quadro 30x30
function createMatrix(size) {
    return Array.from({ length: size }, () => Array(size).fill(' ')); // Matriz vazia de tamanho 30x30
}

// Passo 2: Inserir a Primeira Palavra no Centro
function placeFirstWord(matrix, word) {
    const centerX = Math.floor(matrix.length / 2); // Linha central
    const centerY = Math.floor(matrix[0].length / 2); // Coluna central

    for (let i = 0; i < word.length; i++) {
        matrix[centerX][centerY + i] = word[i]; // Coloca a palavra na linha central, começando da coluna central
    }
}

// Função para verificar se a palavra pode ser colocada
function canPlaceWord(matrix, word, row, col, direction) {
    if (direction === 'horizontal' && col + word.length > matrix[0].length) return false;
    if (direction === 'vertical' && row + word.length > matrix.length) return false;

    for (let i = 0; i < word.length; i++) {
        const currentRow = direction === 'horizontal' ? row : row + i;
        const currentCol = direction === 'horizontal' ? col + i : col;

        if (matrix[currentRow][currentCol] !== ' ' && matrix[currentRow][currentCol] !== word[i]) {
            return false; // Se já houver uma letra diferente, não pode colocar
        }
    }

    return true;
}

// Função para inserir a palavra de forma aleatória
function placeWord(matrix, word, wordsPlaced) {
    let placed = false;

    // Tentamos todas as posições e direções
    for (let i = 0; i < matrix.length && !placed; i++) {
        for (let j = 0; j < matrix[i].length && !placed; j++) {
            for (let direction of ['horizontal', 'vertical']) {
                if (canPlaceWord(matrix, word, i, j, direction)) {
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

// Função para exibir a matriz no HTML
function displayMatrix(matrix) {
    const crosswordDiv = document.getElementById('crossword');
    crosswordDiv.innerHTML = matrix.map(row => 
        `<div>${row.map(cell => (cell === ' ' ? '&nbsp;' : cell)).join(' ')}</div>`
    ).join('');
}

// Função Principal para Gerenciar a Cruzadinha
function generateCrossword(words) {
    const matrix = createMatrix(30);
    const wordsPlaced = [];

    // Coloca a primeira palavra no centro
    placeFirstWord(matrix, words[0]);
    wordsPlaced.push(words[0]);

    // Coloca as palavras restantes
    for (let i = 1; i < words.length; i++) {
        placeWord(matrix, words[i], wordsPlaced);
    }

    return matrix;
}

// Função para pegar as palavras do input e gerar a cruzadinha
function generateAndDisplayCrossword() {
    const input = document.getElementById('words-input').value.trim();
    const words = input.split(',').map(word => word.trim().toUpperCase());

    if (words.length === 0) {
        alert("Por favor, insira pelo menos uma palavra.");
        return;
    }

    const crossword = generateCrossword(words);
    displayMatrix(crossword);
}
