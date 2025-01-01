// Função para criar a matriz da cruzadinha
function createMatrix(size) {
    // Cria uma matriz vazia de `size x size`
    const matrix = Array.from({ length: size }, () => Array(size).fill(' '));
    return matrix;
}

// Função para exibir a matriz no navegador
function displayMatrix(matrix) {
    crosswordDiv.innerHTML = matrix
        .map(row => row.map(cell => (cell === ' ' ? '&nbsp;' : cell)).join(' '))
        .map(row => `<div>${row}</div>`)
        .join('');
}

// Função para posicionar as palavras (por enquanto, apenas linha reta)
function addWordsToMatrix(words, size) {
    const matrix = createMatrix(size);

    words.forEach((word, index) => {
        if (index < size) {
            for (let i = 0; i < word.length && i < size; i++) {
                matrix[index][i] = word[i];
            }
        }
    });

    return matrix;
}

// Atualiza o evento do botão para usar a nova lógica
generateButton.addEventListener('click', () => {
    const words = wordInput.value.trim().split('\n').map(w => w.toUpperCase());
    if (words.length === 0 || words[0] === "") {
        alert("Por favor, insira pelo menos uma palavra.");
        return;
    }

    const size = 10; // Define o tamanho da matriz
    const matrix = addWordsToMatrix(words, size);
    displayMatrix(matrix);

    console.log("Cruzadinha gerada:", matrix);
});
