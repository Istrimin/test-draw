// Курсоры
    document.addEventListener('DOMContentLoaded', () => {
    			const cursorPanel = document.getElementById('cursorPanel');
    			const cursorList = document.getElementById('cursorList');
    			const changeCursorBtn = document.getElementById('changeCursorBtn');
                const canvas = document.getElementById('yourCanvasId'); 
    function loadCursors() {
        cursorList.innerHTML = '';
        
        for (let i = 1; i <= 80; i++) {
            const cursorUrl = `cursorsNum/${i}.png`;

            // Создаем новый объект изображения
            const image = new Image();
            image.src = cursorUrl;

            // Обработчик события загрузки изображения
            image.onload = () => {
                // Получаем размеры изображения
                let targetWidth = image.width;
                let targetHeight = image.height;

                // Максимальный размер для курсора
                const maxSize = 128;

                // Проверяем, нужно ли изменять размер
                if (targetWidth > maxSize || targetHeight > maxSize) {
                    const aspectRatio = targetWidth / targetHeight;
                    if (targetWidth > targetHeight) {
                        targetWidth = maxSize;
                        targetHeight = maxSize / aspectRatio;
                    } else {
                        targetHeight = maxSize;
                        targetWidth = maxSize * aspectRatio;
                    }
                }

                // Создаем канвас для изменения размера
                const canvas = document.createElement('canvas');
                const ctx = canvas.getContext('2d');
                canvas.width = targetWidth;
                canvas.height = targetHeight;
                ctx.drawImage(image, 0, 0, targetWidth, targetHeight);
                const resizedCursorUrl = canvas.toDataURL();

                // Создаем элемент изображения для курсора
                const cursorImg = document.createElement('img');
                cursorImg.src = resizedCursorUrl;
                cursorImg.alt = `cursor${i}`;
                cursorImg.style.maxWidth = `${maxSize}px`;

                cursorImg.addEventListener('click', () => {
                    canvasContainer.style.cursor = `url(${resizedCursorUrl}), auto`;
                    cursorPanel.style.display = 'none';
                });
                // ! добавляю, чтобы работали клики еще и от планшета!
                cursorImg.addEventListener('pointerup', () => {
                    canvasContainer.style.cursor = `url(${resizedCursorUrl}), auto`;
                    cursorPanel.style.display = 'none';
                });

                // Добавляем изображение курсора в список
                cursorList.appendChild(cursorImg);
            };
        }
    }

    // Обработчик события клика на кнопку изменения курсора
    changeCursorBtn.addEventListener('click', () => {
        cursorPanel.style.display = cursorPanel.style.display === 'none' ? 'block' : 'none';
    });

    // Загружаем курсоры
    loadCursors();
    });


