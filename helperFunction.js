// ! время
function updateTime() {
const now = new Date(),
      hours = now.getHours().toString().padStart(2, '0'),
      minutes = now.getMinutes().toString().padStart(2, '0'),
      seconds = now.getSeconds().toString().padStart(2, '0'),
      timeString = `${hours}:${minutes}:${seconds}`;

}

const gameStartTime = new Date();

const startTimeHours = gameStartTime.getHours().toString().padStart(2, '0');
const startTimeMinutes = gameStartTime.getMinutes().toString().padStart(2, '0');
const startTimeSeconds = gameStartTime.getSeconds().toString().padStart(2, '0');


function updateElapsedTime() {
    const currentTime = new Date();
    let elapsedSeconds = Math.floor((currentTime - gameStartTime) / 1000);
    const elapsedMinutes = Math.floor(elapsedSeconds / 60);
    elapsedSeconds %= 60;

    gel('elapsedTime').textContent = `${elapsedMinutes.toString().padStart(2, '0')}:${elapsedSeconds.toString().padStart(2, '0')}`;
}

setInterval(updateTime, 1000);

setInterval(updateElapsedTime, 1000);




// ! слово наверху канвас

async function fetchWords() {
    try {
        const response = await fetch('cancerQuizz.txt');
        const text = await response.text();
        // Разделяем текст на слова по любым пробелам или запятым
        return text.split(/[\s,]+/).map(word => word.trim());
    } catch (error) {
        console.error('Error loading words:', error);
        return [];
    }
}
document.addEventListener('DOMContentLoaded', async function () {
    const wordList = await fetchWords();
    let currentWordIndex = Math.floor(Math.random() * wordList.length); // Start with a random word
    const wordElement = gel("Quizz");
    const previousWordButton = gel("previousWord");
    const nextWordButton = gel("nextWord");

    function updateWord() {
        wordElement.textContent = wordList[currentWordIndex];
    }

    previousWordButton.addEventListener("click", () => {
        currentWordIndex = (currentWordIndex - 1 + wordList.length) % wordList.length;
        updateWord();
    });

    nextWordButton.addEventListener("click", () => {
        currentWordIndex = (currentWordIndex + 1) % wordList.length; 
        updateWord();
    });

    updateWord(); // Display the initial random word
});




const brushSizeSlider = gel("brushSize"),
      brushSizeValue = gel("brushSizeValue"),
      opacityValue = gel("opacityValue"),
      opacitySlider = gel("opacity");


const updateValue = (slider, valueDisplay) => {
    slider.addEventListener("input", () => {
        valueDisplay.textContent = slider.value;
    });
};

updateValue(brushSizeSlider, brushSizeValue);
updateValue(opacitySlider, opacityValue);