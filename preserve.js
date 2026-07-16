
// // function createLayerBelowCurrent() {
// //     // Находим индекс текущего слоя в списке слоев
// //     const layerButtons = Array.from(document.querySelectorAll('.layer-button'));
// //     const currentIndex = layerButtons.findIndex(btn => parseInt(btn.dataset.layer) === currentLayer);
    
// //     // Создаем новый слой
// //     layerCount++;
// //     const newLayerNum = layerCount;
    
// //     // Создаем canvas для нового слоя
// //     const canvas = document.createElement('canvas');
// //     canvas.id = `layer${newLayerNum}`;
// //     canvas.width = 700;
// //     canvas.height = 500;
// //     canvas.style.position = 'absolute';
// //     canvas.style.top = '0';
// //     canvas.style.left = '0';
    
// //     // Вставляем новый canvas в контейнер
// //     canvasContainer.appendChild(canvas);
    
// //     // Инициализируем слой
// //     layers[newLayerNum] = canvas;
// //     contexts[newLayerNum] = canvas.getContext('2d');
// //     layerColors[newLayerNum] = '#' + Math.floor(Math.random() * 16777215).toString(16);
    
// //     // Создаем кнопку для нового слоя
// //     const button = document.createElement('button');
// //     button.textContent = " ❤ ";
// //     button.classList.add('layer-button');
// //     button.dataset.layer = newLayerNum;
    
// //     // Вставляем кнопку ниже текущего слоя
// //     if (currentIndex !== -1 && currentIndex < layerButtons.length - 1) {
// //         layerButtons[currentIndex + 1].parentNode.insertBefore(button, layerButtons[currentIndex + 1]);
// //     } else {
// //         layerButtons.appendChild(button);
// //     }
    
// //     // Добавляем обработчики событий
// //     button.addEventListener('click', function () {
// //         setCurrentLayer(parseInt(this.dataset.layer));
// //     });
// //     addEventListenersToLayer(canvas);
    
// //     // Инициализируем историю для нового слоя
// //     history[newLayerNum] = [];
// //     redoHistory[newLayerNum] = [];
    
// //     // Устанавливаем новый слой как текущий
// //     setCurrentLayer(newLayerNum);
// //     initializeLayer(newLayerNum);
// //     updateLayerButtonColor(newLayerNum);
    
// //     // Обновляем z-index всех слоев
// //     updateLayerOrder();
// // }

// // Обновите функцию updateLayerOrder
// // function updateLayerOrder() {
// //     const layerButtons = document.querySelectorAll('.layer-button');
// //     layerButtons.forEach((button, index) => {
// //         const layerId = parseInt(button.dataset.layer);
// //         if (layers[layerId]) {
// //             layers[layerId].style.zIndex = layerButtons.length - index;
// //         }
// //     });
// // }




//         function createLayer() {
//             layerCount++;
//             layerColors[layerCount] = '#' + Math.floor(Math.random() * 16777215).toString(16);

//             const canvas = document.createElement('canvas');
//             canvas.id = `layer${layerCount}`;
//             if (layerCount === 1) {
//                 canvas.style.visibility = 'hidden'; // Hide the first layer
//             }
//             canvas.width = 700;
//             canvas.height = 500;
//             canvas.style.position = 'absolute';
//             canvas.style.top = '0';
//             canvas.style.left = '0';

//             // Insert the new canvas at the beginning of the container
//             canvasContainer.insertBefore(canvas, canvasContainer.firstChild);

//             layers[layerCount] = canvas;
//             contexts[layerCount] = canvas.getContext('2d');

//             const button = document.createElement('button');
//             button.textContent = " ❤ ";
//             button.classList.add('layer-button');
//             button.dataset.layer = layerCount;

//             // Insert the new button at the beginning of the layer buttons
//             layerButtons.insertBefore(button, layerButtons.firstChild);

//             button.addEventListener('click', function () {
//                 setCurrentLayer(parseInt(this.dataset.layer));
//             });

//             addEventListenersToLayer(canvas);
//             setCurrentLayer(layerCount);
//             initializeLayer(layerCount);

//             history[layerCount] = [];
//             redoHistory[layerCount] = [];

//             updateLayerButtonColor(layerCount);
//             updateLayerOrder();
//         }



//         function setCurrentLayer(layerNum) {
//             // Update previousLayer ONLY if the layer is actually changing
//             if (currentLayer !== layerNum) {
//                 previousLayer = currentLayer;
//             }

//             currentLayer = layerNum;
//             currentCtx = contexts[currentLayer];

//             document.querySelectorAll('.layer-button').forEach(btn => {
//                 btn.classList.remove('active-layer');
//                 if (parseInt(btn.dataset.layer) === currentLayer) {
//                     btn.classList.add('active-layer');
//                 }
//             });

//             // Update button colors when switching layers
//             if (!isErasing) {
//                 updateLayerButtonColor(layerNum);
//             }

//             if (layerColors[layerNum]) {
//                 currentCtx.strokeStyle = layerColors[layerNum];
//             }
//         }





//         function updateLayerButtonColor(layerNum) {
//             const button = document.querySelector(`.layer-button[data-layer="${layerNum}"]`);
//             if (button && layerColors[layerNum]) {
//                 button.style.backgroundColor = layerColors[layerNum];
//             }
//         }

//         // !!!??? 
//         function initializeLayer(layerNum) {
//             if (layerNum === 0) {
//                 contexts[layerNum].fillStyle = '#' + Math.floor(Math.random() * 16777215).toString(16);
//             } else {
//                 contexts[layerNum].fillStyle = 'rgba(0,0,0,0)'; // Transparent
//             }
//             contexts[layerNum].fillRect(0, 0, layers[layerNum].width, layers[layerNum].height);
//         }

//         function saveState() {
//             if (!currentCtx) {
//                 console.error('ошибка в функции saveState', currentLayer);
//                 return;
//             }
//             history[currentLayer].push(currentCtx.getImageData(0, 0, layers[currentLayer].width, layers[currentLayer].height));
//             redoHistory[currentLayer] = [];
//         }


//         function startDrawing(e) {
//             if (!currentCtx) {
//                 console.error('Error: currentCtx is undefined in startDrawing.', currentLayer);
//                 return;
//             }
//             isDrawing = true;
//             const rect = layers[currentLayer].getBoundingClientRect();
//             [lastX, lastY] = [e.clientX - rect.left, e.clientY - rect.top];

//             saveState();
//         }

//         function draw(e) {
//             if (!isDrawing || !currentCtx) {
//                 if (!currentCtx) {
//                     console.error('Error: currentCtx is undefined in draw. Current layer:', currentLayer);
//                 }
//                 return;
//             }
//             // e.preventDefault();
//             const rect = layers[currentLayer].getBoundingClientRect();
//             const x = e.clientX - rect.left;
//             const y = e.clientY - rect.top;
//             const pressure = e.pressure || 1;

//             currentCtx.lineWidth = brushSizeInput.value * pressure;
//             currentCtx.lineCap = 'round';
//             currentCtx.lineJoin = 'round';
//             currentCtx.globalAlpha = opacityInput.value / 100;

//             if (isErasing) {
//                 currentCtx.globalCompositeOperation = 'destination-out';
//             } else {
//                 currentCtx.globalCompositeOperation = 'source-over';
//             }

//             currentCtx.beginPath();
//             currentCtx.moveTo(lastX, lastY);
//             currentCtx.lineTo(x, y);
//             currentCtx.stroke();

//             if (symmetry) {
//                 const centerX = layers[currentLayer].width / 2;
//                 const symmetricLastX = centerX + (centerX - lastX);
//                 const symmetricX = centerX + (centerX - x);
//                 currentCtx.beginPath();
//                 currentCtx.moveTo(symmetricLastX, lastY);
//                 currentCtx.lineTo(symmetricX, y);
//                 currentCtx.stroke();
//             }

//             [lastX, lastY] = [x, y];

//             if (isPressureSupported) {
//                 pressureBar.value = pressure * 10000;
//                 pressureBar.nextElementSibling.textContent = Math.round(pressure * 100); // Add this line

//             }
//         }

//         function stopDrawing() {
//             if (isDrawing) {
//                 isDrawing = false;
//             }
//         }

//         const colorPickers = document.querySelectorAll('input[type="color"]');
//         colorPickers.forEach((picker, index) => {
//             picker.addEventListener('input', (event) => {
//                 setDrawingColor(event.target.value);
//             });
//             // Назначаем горячие клавиши для выбора цветов
//             document.addEventListener('keydown', (e) => {
//                 if (e.key === (index + 1).toString()) {
//                     setDrawingColor(picker.value);
//                 }
//             });
//         });
// // ? тут странно, может быть проблемой
//         function addEventListenersToLayer(layer) {
//             layer.addEventListener('pointerdown', startDrawing);
//             layer.addEventListener('pointermove', draw);
//             layer.addEventListener('pointerup', stopDrawing);
//             layer.addEventListener('pointerout', stopDrawing);
//             layer.addEventListener('pointercancel', stopDrawing);
//         }

//         document.querySelectorAll('button, input').forEach(element => {
//             element.addEventListener('pointerdown', (e) => {
//                 e.stopPropagation();
//             });
//         });


//         // Initialize the first layer
//         createLayer();


//         // Добавляем слушатели событий к существующим слоям
//         Object.values(layers).forEach(addEventListenersToLayer);




//         function togglePreviousLayer() {
//             // Swap currentLayer and previousLayer
//             [currentLayer, previousLayer] = [previousLayer, currentLayer];

//             // Simulate a click on the corresponding layer button
//             const layerButton = document.querySelector(`.layer-button[data-layer="${currentLayer}"]`);
//             if (layerButton) {
//                 layerButton.click(); // This will trigger the button's click event
//             }
//         }

//         function redrawCanvas() {
//             currentCtx.fillStyle = backgroundPicker.value;
//             currentCtx.fillRect(0, 0, layer2.width, layer2.height);
//             if (uploadedImage) {
//                 currentCtx.drawImage(uploadedImage, 0, 0, layer2.width, layer2.height);
//             }
//         }
//         function setBackground() {
//             if (contexts[1]) {
//                 contexts[1].fillStyle = backgroundPicker.value;
//                 contexts[1].fillRect(0, 0, layers[1].width, layers[1].height);
//                 saveState();
//             }
//         }

//         // идентификатор слоев
//         let isIdentifyingLayer = false;
//         let wasDrawing = false;  // Moved `wasDrawing` to global scope

//         const identifyLayerBtn = $('identifyLayerBtn');

//         // Add a single click event listener to the canvas container

//         // Canvas container click event to identify layers
//         canvasContainer.addEventListener('click', (e) => {
//             if (isIdentifyingLayer) {
//                 identifyLayerClickHandler(e);

//                 // Reset cursor and drawing state AFTER layer identification
//                 canvasContainer.style.cursor = 'default';
//                 isDrawing = wasDrawing;  // Restore drawing state

//                 // Deactivate layer identification mode
//                 isIdentifyingLayer = false;
//                 identifyLayerBtn.classList.remove('active');
//             }
//         });

//         // Button click event to toggle layer identification mode
//         identifyLayerBtn.addEventListener('click', () => {


//             if (isIdentifyingLayer) {
//                 // Temporarily disable drawing when identifying the layer
//                 wasDrawing = isDrawing;  // Save current drawing state
//                 isDrawing = false;

//                 canvasContainer.style.cursor = 'crosshair';
//             } else {
//                 // Restore default cursor when exiting identification mode
//                 canvasContainer.style.cursor = 'default';
//                 isDrawing = wasDrawing;  // Restore drawing state
//             }
//         });

//         // Handler to identify the clicked layer
//         function identifyLayerClickHandler(e) {

//             isIdentifyingLayer = !isIdentifyingLayer;

//             identifyLayerBtn.classList.toggle('active', isIdentifyingLayer);
//             const rect = layers[1].getBoundingClientRect();
//             const x = e.clientX - rect.left;
//             const y = e.clientY - rect.top;

//             for (let i = layerCount; i >= 1; i--) {
//                 const ctx = contexts[i];
//                 const pixelData = ctx.getImageData(x, y, 1, 1).data;

//                 if (pixelData[3] > 0) {  // Alpha value > 0 means something is drawn
//                     setCurrentLayer(i);
//                     console.log('Found drawing on layer:', i);
//                     updateLayerButtonColor(i);
//                     break;  // Exit the loop after finding the top-most layer
//                 }
//             }
//         }


//         const layerPanel = document.querySelector('.layer-panel');

//         let isDraggingScroll = false;
//         let startY;

//         layerPanel.addEventListener('pointerdown', (e) => {
//             e.preventDefault(); // Prevents drawing from interfering with scrolling
//             isDraggingScroll = true;
//             startY = e.clientY;
//         });

//         layerPanel.addEventListener('pointermove', (e) => {
//             if (isDraggingScroll) {
//                 const deltaY = e.clientY - startY;
//                 layerPanel.scrollTop += deltaY;
//                 startY = e.clientY;
//             }
//         });

//         layerPanel.addEventListener('pointerup', () => {
//             isDraggingScroll = false;
//         });



//         canvasContainer.addEventListener('mousedown', handleCanvasClick);
//         canvasContainer.addEventListener('pointerdown', handleCanvasClick);

//         function handleCanvasClick(e) {
//             if (e.altKey) {
//                 e.preventDefault();
//                 identifyLayerClickHandler(e);
//             }
//         }

//         function identifyLayerClickHandler(e) {
//             const rect = layers[1].getBoundingClientRect();
//             const x = e.clientX - rect.left;
//             const y = e.clientY - rect.top;

//             for (let i = layerCount; i >= 1; i--) {
//                 const ctx = contexts[i];
//                 const pixelData = ctx.getImageData(x, y, 1, 1).data;
//                 if (pixelData[3] > 0) {
//                     setCurrentLayer(i);
//                     console.log('Switched to layer:', i);
//                     updateLayerButtonColor(i);
//                     break;
//                 }
//             }
//         }


//         // Добавьте этот код в начало вашего скрипта или в подходящее место
//         document.addEventListener('keydown', function (e) {
//             // Проверяем, была ли нажата клавиша Tab
//             if (e.key === 'Tab') {
//                 e.preventDefault(); // Предотвращаем стандартное поведение Tab
//                 createLayerBelowCurrent();
//             }
//         });

//         function createLayerBelowCurrent() {
//             const layerButtons = Array.from(document.querySelectorAll('.layer-button'));
//             const currentIndex = layerButtons.findIndex(btn => parseInt(btn.dataset.layer) === currentLayer);

//             layerCount++;
//             const newLayerNum = layerCount;

//             const canvas = document.createElement('canvas');
//             canvas.id = `layer${newLayerNum}`;
//             canvas.width = 700;
//             canvas.height = 500;
//             canvas.style.position = 'absolute';
//             canvas.style.top = '0';
//             canvas.style.left = '0';

//             // Insert the new canvas at the correct position
//             if (currentIndex !== -1) {
//                 canvasContainer.insertBefore(canvas, layers[currentLayer]);
//             } else {
//                 canvasContainer.appendChild(canvas);
//             }

//             layers[newLayerNum] = canvas;
//             contexts[newLayerNum] = canvas.getContext('2d');
//             layerColors[newLayerNum] = '#' + Math.floor(Math.random() * 16777215).toString(16);

//             const button = document.createElement('button');
//             button.textContent = " ❤ ";
//             button.classList.add('layer-button');
//             button.dataset.layer = newLayerNum;

//             // Insert the button at the correct position
//             if (currentIndex !== -1) {
//                 layerButtons[currentIndex].parentNode.insertBefore(button, layerButtons[currentIndex].nextSibling);
//             } else {
//                 layerButtons.appendChild(button);
//             }

//             button.addEventListener('click', function () {
//                 setCurrentLayer(parseInt(this.dataset.layer));
//             });
//             addEventListenersToLayer(canvas);

//             history[newLayerNum] = [];
//             redoHistory[newLayerNum] = [];

//             setCurrentLayer(newLayerNum);
//             initializeLayer(newLayerNum);
//             updateLayerButtonColor(newLayerNum);

//             // updateLayerOrder();
//         }

//         function updateLayerOrder() {
//             const layerButtons = Array.from(document.querySelectorAll('.layer-button'));
//             layerButtons.forEach((button, index) => {
//                 const layerId = parseInt(button.dataset.layer);
//                 if (layers[layerId]) {
//                     layers[layerId].style.zIndex = layerButtons.length - index;
//                 }
//             });
//         }




// // ~Двигаем слой
// // переход по слоям
// const moveLayerUpBtn = $('moveLayerUp');
// const moveLayerDownBtn = $('moveLayerDown');
// moveLayerUpBtn.addEventListener('click', () => {
//   moveLayerInStack(-1);
// });
// moveLayerDownBtn.addEventListener('click', () => {
//   moveLayerInStack(1);
// });

// function moveLayerInStack(direction) {
//   const currentLayerButton = document.querySelector(`.layer-button[data-layer="${currentLayer}"]`);
//   const targetLayerButton = direction === -1 ? currentLayerButton.previousElementSibling : currentLayerButton.nextElementSibling;
//   if (targetLayerButton) {
//     // Swap button positions in the DOM
//     if (direction === -1) {
//       currentLayerButton.parentNode.insertBefore(currentLayerButton, targetLayerButton);
//     } else {
//       currentLayerButton.parentNode.insertBefore(targetLayerButton, currentLayerButton);
//     }
//     // Update z-index of canvases
//     updateLayerOrder();
//     // Simulate click to update active layer
//     currentLayerButton.click();
//   }
// }
// // Получаем контейнер для кнопок слоёв
// const layerButtonsContainer = $('layerButtons');
// // Делаем кнопки слоёв перетаскиваемыми
// $(function () {
//   $(layerButtonsContainer).sortable({
//     // Обновляем порядок слоёв после перетаскивания
//     update: function (event, ui) {
//       updateLayerOrder();
//     }
//   });
//   $(layerButtonsContainer).disableSelection();
// });
// // Функция для обновления порядка слоёв
// function updateLayerOrder() {
//   // Получаем все кнопки слоёв в новом порядке
//   const layerButtons = layerButtonsContainer.querySelectorAll('.layer-button');
//   // Обновляем z-index каждого слоя в соответствии с новым порядком кнопок
//   layerButtons.forEach((button, index) => {
//     const layerId = `layer${button.dataset.layer}`;
//     const canvas = $(layerId);
//     canvas.style.zIndex = index + 1; // z-index начинается с 1
//   });
// }
// function exportImage() {
//   // Create a temporary canvas to merge all layers
//   const mergeCanvas = document.createElement('canvas');
//   const mergeCtx = mergeCanvas.getContext('2d');
//   mergeCanvas.width = layers[1].width;
//   mergeCanvas.height = layers[1].height;

//   // Get all layer buttons
//   const layerButtons = Array.from(document.querySelectorAll('.layer-button'));

//   // Sort layers based on their z-index (lowest to highest)
//   layerButtons.sort((a, b) => {
//     const layerA = layers[parseInt(a.dataset.layer)];
//     const layerB = layers[parseInt(b.dataset.layer)];
//     return parseInt(layerB.style.zIndex || 0) - parseInt(layerA.style.zIndex || 0);
//   });

//   // Draw each layer onto the temporary canvas in the correct order (from bottom to top)
//   layerButtons.forEach((button) => {
//     const layerId = parseInt(button.dataset.layer);
//     if (layers[layerId]) {
//       mergeCtx.drawImage(layers[layerId], 0, 0);
//     }
//   });

//   // Create a link and trigger the download
//   const link = document.createElement('a');
//   link.download = 'my-drawing.png';
//   link.href = mergeCanvas.toDataURL('image/png');
//   link.click();
// }

