
// function createLayerBelowCurrent() {
//     // Находим индекс текущего слоя в списке слоев
//     const layerButtons = Array.from(document.querySelectorAll('.layer-button'));
//     const currentIndex = layerButtons.findIndex(btn => parseInt(btn.dataset.layer) === currentLayer);
    
//     // Создаем новый слой
//     layerCount++;
//     const newLayerNum = layerCount;
    
//     // Создаем canvas для нового слоя
//     const canvas = document.createElement('canvas');
//     canvas.id = `layer${newLayerNum}`;
//     canvas.width = 700;
//     canvas.height = 500;
//     canvas.style.position = 'absolute';
//     canvas.style.top = '0';
//     canvas.style.left = '0';
    
//     // Вставляем новый canvas в контейнер
//     canvasContainer.appendChild(canvas);
    
//     // Инициализируем слой
//     layers[newLayerNum] = canvas;
//     contexts[newLayerNum] = canvas.getContext('2d');
//     layerColors[newLayerNum] = '#' + Math.floor(Math.random() * 16777215).toString(16);
    
//     // Создаем кнопку для нового слоя
//     const button = document.createElement('button');
//     button.textContent = " ❤ ";
//     button.classList.add('layer-button');
//     button.dataset.layer = newLayerNum;
    
//     // Вставляем кнопку ниже текущего слоя
//     if (currentIndex !== -1 && currentIndex < layerButtons.length - 1) {
//         layerButtons[currentIndex + 1].parentNode.insertBefore(button, layerButtons[currentIndex + 1]);
//     } else {
//         layerButtons.appendChild(button);
//     }
    
//     // Добавляем обработчики событий
//     button.addEventListener('click', function () {
//         setCurrentLayer(parseInt(this.dataset.layer));
//     });
//     addEventListenersToLayer(canvas);
    
//     // Инициализируем историю для нового слоя
//     history[newLayerNum] = [];
//     redoHistory[newLayerNum] = [];
    
//     // Устанавливаем новый слой как текущий
//     setCurrentLayer(newLayerNum);
//     initializeLayer(newLayerNum);
//     updateLayerButtonColor(newLayerNum);
    
//     // Обновляем z-index всех слоев
//     updateLayerOrder();
// }

// Обновите функцию updateLayerOrder
// function updateLayerOrder() {
//     const layerButtons = document.querySelectorAll('.layer-button');
//     layerButtons.forEach((button, index) => {
//         const layerId = parseInt(button.dataset.layer);
//         if (layers[layerId]) {
//             layers[layerId].style.zIndex = layerButtons.length - index;
//         }
//     });
// }