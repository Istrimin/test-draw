                // function updateTime() {
                //     const now = new Date();
                //     const hours = now.getHours().toString().padStart(2, '0');
                //     const minutes = now.getMinutes().toString().padStart(2, '0');
                //     const seconds = now.getSeconds().toString().padStart(2, '0');
                //     const timeString = `${hours}:${minutes}:${seconds}`;
                //     document.getElementById('time').textContent = timeString;
                // }
        
                // setInterval(updateTime, 1000); 

        document.addEventListener('contextmenu', event => event.preventDefault());

        $(function () {
            $("#message-container").resizable();
        });

fetch('quizz.txt')
    .then(response => response.text())
    .then(text => {
        const words = text.split(/\s+/); 
        const randomWord = words[Math.floor(Math.random() * words.length)];

        const cleanedWord = randomWord.replace(/,$/, ''); 

        document.getElementById('Quizz').textContent = cleanedWord.toUpperCase(); 

    })
    .catch(error => console.error('Ошибка при загрузке слова:', error));

        fetch('messages.txt')
            .then(response => response.text())
            .then(message => {
                document.getElementById('message').textContent = message;
            })
            .catch(error => console.error('Ошибка при загрузке сообщения:', error));

        const messageElement = document.getElementById('message');
        const containerElement = document.getElementById('message-container');
        const messageBtn = document.getElementById('myBtn');

        messageBtn.addEventListener('click', () => {
            containerElement.style.display = containerElement.style.display === 'none' ? 'block' : 'none';
            adjustFontSize();
        });

        function adjustFontSize() {
            let fontSize = parseInt(window.getComputedStyle(messageElement).fontSize, 10);
            while (messageElement.offsetWidth > containerElement.offsetWidth) {
                fontSize--;
                messageElement.style.fontSize = fontSize + 'px';
            }
        }

        window.addEventListener('resize', adjustFontSize);


function updateTime() {
        const now = new Date();
        const hours = now.getHours().toString().padStart(2, '0');
        const minutes = now.getMinutes().toString().padStart(2, '0');
        const seconds = now.getSeconds().toString().padStart(2, '0');
        const timeString = `${hours}:${minutes}:${seconds}`;
        document.getElementById('time').textContent = timeString;
    }

    const gameStartTime = new Date();

    const startTimeHours = gameStartTime.getHours().toString().padStart(2, '0');
    const startTimeMinutes = gameStartTime.getMinutes().toString().padStart(2, '0');
    const startTimeSeconds = gameStartTime.getSeconds().toString().padStart(2, '0');
    document.getElementById('startTime').textContent = `${startTimeHours}:${startTimeMinutes}:${startTimeSeconds}`;

    function updateElapsedTime() {
        const currentTime = new Date();
        let elapsedSeconds = Math.floor((currentTime - gameStartTime) / 1000);
        const elapsedMinutes = Math.floor(elapsedSeconds / 60);
        elapsedSeconds %= 60;
        document.getElementById('elapsedTime').textContent = `${elapsedMinutes.toString().padStart(2, '0')}:${elapsedSeconds.toString().padStart(2, '0')}`;
    }

    setInterval(updateTime, 1000); 

    setInterval(updateElapsedTime, 1000); 