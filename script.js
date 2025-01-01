// Captura os elementos do DOM
const wordInput = document.getElementById('wordInput'); // Campo de entrada
const generateButton = document.getElementById('generateButton'); // Botão de gerar
const crosswordDiv = document.getElementById('crossword'); // Área para exibir a cruzadinha

// Função para criar a matriz 30x30
function createMatrix(size) {
    return Array.from({ length: size }, () => Array(size).fill(' '));
}

// Função para exibir a matriz no navegador
function displayMatrix(matrix) {
    crosswordDiv.innerHTML = matrix
        .map(row => row.map(cell => (cell === ' ' ? '&nbsp;' : cell)).join(' ')) // Substitui espaços por HTML
        .map(row => `<div>${row}</div>`) // Envolve cada linha em uma div
        .join('');
}

// Função para colocar uma palavra na matriz, horizontal ou vertical
function placeWord(matrix, word, row, col, direction) {
    for (let i = 0; i < word.length; i++) {
        if (direction === 'horizontal') {
            matrix[row][col + i] = word[i];
        } else if (direction === 'vertical') {
            matrix[row + i][col] = word[i];
        }
    }
}

// Função para verificar se uma palavra pode ser colocada na matriz (horizontal ou vertical)
function canPlaceWord(matrix, word, row, col, direction) {
    if (direction === 'horizontal') {
        if (col + word.length > matrix[row].length) return false; // Verifica se cabe na linha

        for (let i = 0; i < word.length; i++) {
            if (matrix[row][col + i] !== ' ' && matrix[row][col + i] !== word[i]) {
                return false; // Se já houver uma letra diferente, não pode colocar
            }
        }
    } else if (direction === 'vertical') {
        if (row + word.length > matrix.length) return false; // Verifica se cabe na coluna

        for (let i = 0; i < word.length; i++) {
            if (matrix[row + i][col] !== ' ' && matrix[row + i][col] !== word[i]) {
                return false; // Se já houver uma letra diferente, não pode colocar
            }
        }
    }

    return true; // Se passou por todas as verificações, pode colocar
}

// Função para verificar se a palavra tem uma letra em comum com as palavras já usadas
function hasCommonLetter(matrix, word) {
    for (let row = 0; row < matrix.length; row++) {
        for (let col = 0; col < matrix[row].length; col++) {
            if (matrix[row][col] !== ' ' && word.includes(matrix[row][col])) {
                return { row, col, letter: matrix[row][col] }; // Retorna a posição da letra comum
            }
        }
    }
    return null; // Retorna null se não houver letras em comum
}

// Função para escolher uma palavra aleatória da lista
function chooseRandomWord(words, usedWords) {
    let availableWords = words.filter(word => !usedWords.has(word));
    if (availableWords.length === 0) return null;
    const randomIndex = Math.floor(Math.random() * availableWords.length);
    return availableWords[randomIndex];
}

// Função para gerar a cruzadinha
function generateCrossword(words, size) {
    const matrix = createMatrix(size); // Cria a matriz 30x30
    let usedWords = new Set(); // Conjunto de palavras já usadas
    let direction = 'horizontal'; // A primeira palavra será horizontal

    // Escolher a primeira palavra e colocá-la no centro
    let firstWord = chooseRandomWord(words, usedWords);
    if (!firstWord) {
        alert("Não há palavras suficientes para gerar a cruzadinha.");
        return matrix;
    }

    let wordStartRow = Math.floor(size / 2);
    let wordStartCol = Math.floor(size / 2) - Math.floor(firstWord.length / 2);

    placeWord(matrix, firstWord, wordStartRow, wordStartCol, direction);
    usedWords.add(firstWord);

    // Alterna a direção para a próxima palavra
    direction = direction === 'horizontal' ? 'vertical' : 'horizontal';

    // Tentar colocar as palavras seguintes
    let failedWords = [];
    words.forEach(word => {
        if (!usedWords.has(word)) {
            let commonLetter = hasCommonLetter(matrix, word);
            if (commonLetter) {
                let placed = false;

                // Determina a posição de onde a palavra será colocada
                let { row, col, letter } = commonLetter;
                if (direction === 'horizontal') {
                    // Coloca a palavra verticalmente
                    if (canPlaceWord(matrix, word, row - Math.floor(word.length / 2), col, 'vertical')) {
                        placeWord(matrix, word, row - Math.floor(word.length / 2), col, 'vertical');
                        usedWords.add(word);
                        placed = true;
                    }
                } else if (direction === 'vertical') {
                    // Coloca a palavra horizontalmente
                    if (canPlaceWord(matrix, word, row, col - Math.floor(word.length / 2), 'horizontal')) {
                        placeWord(matrix, word, row, col - Math.floor(word.length / 2), 'horizontal');
                        usedWords.add(word);
                        placed = true;
                    }
                }

                if (!placed) {
                    failedWords.push(word);
                }
            }
        }
    });

    // Se houver palavras não colocadas, exibe o erro
    if (failedWords.length > 0) {
        alert(`As palavras não puderam ser colocadas: ${failedWords.join(', ')}`);
    }

    return matrix; // Retorna a matriz com as palavras
}

// Evento do botão "Gerar Cruzadinha"
generateButton.addEventListener('click', () => {
    const words = wordInput.value.trim().split('\n').map(w => w.toUpperCase()); // Captura as palavras
    if (words.length === 0 || words[0] === "") {
        alert("Por favor, insira pelo menos uma palavra.");
        return;
    }

    const size = 30; // Define o tamanho da matriz (30x30)
    const matrix = generateCrossword(words, size); // Gera a matriz com as palavras
    displayMatrix(matrix); // Exibe a matriz no navegador

    console.log("Cruzadinha gerada:", matrix); // Loga a matriz no console para debugging
});
