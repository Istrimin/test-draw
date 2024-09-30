// ! время
const gameStartTime = new Date();
setInterval(() => {
    const elapsedSeconds = Math.floor((new Date() - gameStartTime) / 1000);
    gel('elapsedTime').textContent = `${Math.floor(elapsedSeconds / 60).toString().padStart(2, '0')}:${(elapsedSeconds % 60).toString().padStart(2, '0')}`;
}, 1000);

// ! слово наверху канвас
const fetchWords = async () => {
    try {
        const response = await fetch('../Quizz.txt');
        return (await response.text()).split(/[\s,]+/).map(word => word.trim());
    } catch (error) {
        console.error('Error loading words:', error);
        return [];
    }
};

document.addEventListener('DOMContentLoaded', async () => {
    const wordList = await fetchWords();
    let currentWordIndex = Math.floor(Math.random() * wordList.length);
    const updateWord = () => gel("Quizz").textContent = wordList[currentWordIndex];

    gel("previousWord").addEventListener("click", () => {
        currentWordIndex = (currentWordIndex - 1 + wordList.length) % wordList.length;
        updateWord();
    });

    gel("nextWord").addEventListener("click", () => {
        currentWordIndex = (currentWordIndex + 1) % wordList.length; 
        updateWord();
    });

    updateWord(); 
});

// Brush size and opacity
const updateValue = (slider, valueDisplay) => slider.addEventListener("input", () => valueDisplay.textContent = slider.value);
updateValue(gel("brushSize"), gel("brushSizeValue"));
updateValue(gel("opacity"), gel("opacityValue"));