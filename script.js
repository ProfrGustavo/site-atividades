// Captura os elementos do DOM
const wordInput = document.getElementById('wordInput');
const generateButton = document.getElementById('generateButton');
const crosswordDiv = document.getElementById('crossword');

// Função para gerar a cruzadinha
generateButton.addEventListener('click', () => {
    const words = wordInput.value.trim().split('\n'); // Separa as palavras por linha
    if (words.length === 0 || words[0] === "") {
        alert("Por favor, insira pelo menos uma palavra.");
        return;
    }

    // Exibe a lista de palavras como placeholder (substituirá pelo algoritmo de cruzadinha)
    crosswordDiv.innerHTML = `<p>Palavras inseridas:</p><ul>${words.map(word => `<li>${word}</li>`).join('')}</ul>`;

    // Aqui será onde a lógica para gerar a cruzadinha será implementada.
    console.log("Palavras recebidas:", words);
});
