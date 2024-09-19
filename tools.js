// fix 
// function getPixelColorFromAllLayers(x, y) {
//     // Start from the top layer and go down
//     for (let i = layerCount; i >= 1; i--) {
//         if (layers[i] && contexts[i]) {
//             const ctx = contexts[i];
//             const pixelData = ctx.getImageData(x, y, 1, 1).data;
//             if (pixelData[3] > 0) {
//                 return `#${pixelData[0].toString(16).padStart(2, '0')}${pixelData[1].toString(16).padStart(2, '0')}${pixelData[2].toString(16).padStart(2, '0')}`;
//             }
//         }
//     }
    
//     // If no color is found in regular layers, check the background layer (100)
//     if (layers[100] && contexts[100]) {
//         const bgCtx = contexts[100];
//         const bgPixelData = bgCtx.getImageData(x, y, 1, 1).data;
//         if (bgPixelData[3] > 0) {
//             return `#${bgPixelData[0].toString(16).padStart(2, '0')}${bgPixelData[1].toString(16).padStart(2, '0')}${bgPixelData[2].toString(16).padStart(2, '0')}`;
//         }
//     }
    
//     // If still no color is found, return the background color
//     return backgroundPicker.value;
// }

// function handleEyedropperClick(e) {
//     if (isEyedropperActive) {
//         // Find the topmost visible layer
//         let topmostLayer = null;
//         for (let i = layerCount; i >= 1; i--) {
//             if (layers[i] && layers[i].style.display !== 'none') {
//                 topmostLayer = layers[i];
//                 break;
//             }
//         }

//         if (!topmostLayer) {
//             console.error('No visible layers found');
//             return;
//         }

//         const rect = topmostLayer.getBoundingClientRect();
//         // Get coordinates correctly for both touch and mouse events
//         const x = Math.floor((e.clientX || e.touches[0].clientX) - rect.left);
//         const y = Math.floor((e.clientY || e.touches[0].clientY) - rect.top);
        
//         const pickedColor = getPixelColorFromAllLayers(x, y);
//         document.getElementById('colorPicker').value = pickedColor;
//         setDrawingColor(pickedColor);
        
//         // Optionally deactivate eyedropper after picking
//         isEyedropperActive = false;
//         document.body.style.cursor = 'auto';
//         eyedropperBtn.classList.remove('active');
//     }
// }


// fix Пипетка(слева жмется, с права нет)


// полный экран.

    const fullscreenBtn = document.getElementById('fullscreenBtn');
    const baseContainer = document.querySelector('.base-container');

    fullscreenBtn.addEventListener('click', toggleFullscreen);
    function toggleFullscreen() {
        if (!document.fullscreenElement) {
            if (baseContainer.requestFullscreen) {
                baseContainer.requestFullscreen();
            } else if (baseContainer.mozRequestFullScreen) { // Firefox
                baseContainer.mozRequestFullScreen();
            } else if (baseContainer.webkitRequestFullscreen) { // Chrome, Safari and Opera
                baseContainer.webkitRequestFullscreen();
            } else if (baseContainer.msRequestFullscreen) { // IE/Edge
                baseContainer.msRequestFullscreen();
            }
        } else {
            if (document.exitFullscreen) {
                document.exitFullscreen();
            } else if (document.mozCancelFullScreen) { // Firefox
                document.mozCancelFullScreen();
            } else if (document.webkitExitFullscreen) { // Chrome, Safari and Opera
                document.webkitExitFullscreen();
            } else if (document.msExitFullscreen) { // IE/Edge
                document.msExitFullscreen();
            }
        }
    }

    function handleFullscreenChange() {
        if (document.fullscreenElement) {
            enterFullscreenMode();
        } else {
            exitFullscreenMode();
        }
    }

    function enterFullscreenMode() {
        baseContainer.classList.add('fullscreen-mode');
        resizeCanvas();
    }

    function exitFullscreenMode() {
        baseContainer.classList.remove('fullscreen-mode');
        resetCanvasSize();
    }
    function resizeCanvas() {
        const fullscreenWidth = window.innerWidth - sidebar.offsetWidth;
        const fullscreenHeight = window.innerHeight;
        
        Object.values(layers).forEach(layer => {
            const ctx = layer.getContext('2d');
            const tempCanvas = document.createElement('canvas');
            const tempCtx = tempCanvas.getContext('2d');
            
            // Сохраняем текущее содержимое
            tempCanvas.width = layer.width;
            tempCanvas.height = layer.height;
            tempCtx.drawImage(layer, 0, 0);
            
            // Изменяем размер канваса
            layer.width = fullscreenWidth;
            layer.height = fullscreenHeight;
            
            // Восстанавливаем содержимое с учетом зума
            ctx.save();
            ctx.scale(zoomLevel, zoomLevel);
            ctx.drawImage(tempCanvas, -offsetX / zoomLevel, -offsetY / zoomLevel);
            ctx.restore();
        });
        
        updateZoom();
    }

    function resetCanvasSize() {
        const originalWidth = 600;
        const originalHeight = 400;
        
        Object.values(layers).forEach(layer => {
            const ctx = layer.getContext('2d');
            const tempCanvas = document.createElement('canvas');
            const tempCtx = tempCanvas.getContext('2d');
            
            // Сохраняем текущее содержимое
            tempCanvas.width = layer.width;
            tempCanvas.height = layer.height;
            tempCtx.drawImage(layer, 0, 0);
            
            // Возвращаем исходный размер канваса
            layer.width = originalWidth;
            layer.height = originalHeight;
            
            // Восстанавливаем содержимое с учетом зума
            ctx.save();
            ctx.scale(1 / zoomLevel, 1 / zoomLevel);
            ctx.drawImage(tempCanvas, offsetX, offsetY);
            ctx.restore();
        });
        
        // Сбрасываем зум и смещение
        zoomLevel = 1;
        offsetX = 0;
        offsetY = 0;
        
        updateZoom();
    }

    function updateZoom() {
        const container = document.getElementById('canvasContainer');
        const containerRect = container.getBoundingClientRect();
        
        Object.values(layers).forEach(layer => {
            layer.style.transformOrigin = '0 0';
            layer.style.transform = `scale(${zoomLevel})`;
            
            // Обновляем позицию с учетом зума
            const layerRect = layer.getBoundingClientRect();
            offsetX = Math.min(Math.max(offsetX, containerRect.width - layerRect.width), 0);
            offsetY = Math.min(Math.max(offsetY, containerRect.height - layerRect.height), 0);
            
            layer.style.left = `${offsetX}px`;
            layer.style.top = `${offsetY}px`;
        });
        
        canvasContainer.style.overflow = 'hidden';
        document.getElementById('zoomLevelDisplay').textContent = `🔎${(zoomLevel * 100).toFixed(0)}%`;
    }

    // Обновляем обработчик изменения размера окна
    window.addEventListener('resize', () => {
        if (document.fullscreenElement) {
            resizeCanvas();
        }
    });


    // Добавляем слушатель события изменения полноэкранного режима
    document.addEventListener('fullscreenchange', handleFullscreenChange);
    document.addEventListener('webkitfullscreenchange', handleFullscreenChange);
    document.addEventListener('mozfullscreenchange', handleFullscreenChange);
    document.addEventListener('MSFullscreenChange', handleFullscreenChange);

    // Обновляем стили для полноэкранного режима
    const style = document.createElement('style');
    style.textContent = `
        .base-container.fullscreen-mode {
            display: flex;
            width: 100vw;
            height: 100vh;
        }
        .base-container.fullscreen-mode .sidebar {
            height: 100vh;
            overflow-y: auto;
        }
        .base-container.fullscreen-mode .canvas-and-sliders {
            flex-grow: 1;
            height: 100vh;
            overflow: hidden;
        }
        .base-container.fullscreen-mode .canvas-container {
            width: 100%;
            height: 100%;
        }
    `;
    document.head.appendChild(style);



// Слушатели и константы
// курсоры
    const canvasContainer = document.getElementById('canvasContainer');
    // const changeCursorBtn = document.getElementById('changeCursorBtn');
    // const cursorPanel = document.getElementById('cursorPanel');
    // const cursorList = document.getElementById('cursorList');

// Удаление всего
    const deleteAllBtn = document.getElementById('deleteAllBtn');
    deleteAllBtn.addEventListener('click', () => {
        if (confirm('Вы уверены, что хотите удалить содержимое всех слоев?')) {
            deleteAllLayers();
        }
    });
// Назначаем горячие клавиши для выбора цветов(это не влияет на выбор цвет бэка)
//Set the background color
    function setBackgroundColor(color) {
        backgroundColor = color; 
        const backgroundCtx = contexts[0]; 
        backgroundCtx.fillStyle = color;
        backgroundCtx.fillRect(0, 0, canvas.width, canvas.height);
    }


    // Update color picker setup 
        const colorPickers = document.querySelectorAll('input[type="color"]');
        colorPickers.forEach((picker, index) => {
            picker.addEventListener('input', (event) => {
                if (picker.id === 'backgroundPicker') {
                    setBackgroundColor(event.target.value);
                } else {
                    setDrawingColor(event.target.value);
                }
            });
            document.addEventListener('keydown', (e) => {
                if (e.key === (index + 1).toString()) {

                        setDrawingColor(picker.value);
                }
            });
        });
// Сохранение изображения
    export function exportImage() {
        const mergeCanvas = document.createElement('canvas');
        const mergeCtx = mergeCanvas.getContext('2d');
        mergeCanvas.width = layers[1].width;
        mergeCanvas.height = layers[1].height;
        const layerButtons = Array.from(document.querySelectorAll('.layer-button'));
        layerButtons.sort((a, b) => {
            const layerA = layers[parseInt(a.dataset.layer)];
            const layerB = layers[parseInt(b.dataset.layer)];
            return parseInt(layerA.style.zIndex || 0) - parseInt(layerB.style.zIndex || 0);
        });
        layerButtons.forEach((button) => {
            const layerId = parseInt(button.dataset.layer);
            // *Exclude layer 100 from the export
            if (layers[layerId] && layerId !== 100) { 
                mergeCtx.drawImage(layers[layerId], 0, 0);
            }
        });
        const link = document.createElement('a');
        link.download = 'my-drawing.png';
        link.href = mergeCanvas.toDataURL('image/png');
        link.click();
    }


// Удаление всего
    function deleteAllLayers() {
        Object.keys(layers).forEach(layerNum => {
            const ctx = contexts[layerNum];
            ctx.clearRect(0, 0, layers[layerNum].width, layers[layerNum].height);
            saveState();
        });
        // Обновляем отображение
        Object.values(layers).forEach(layer => {
            layer.style.display = 'block';
        });
    }
// Объединяем слои
    // Получаем ссылку на кнопку объединения слоев
    const mergeLayersBtn = document.getElementById('mergeLayers');
    // Добавляем обработчик события для кнопки
    mergeLayersBtn.addEventListener('click', mergeLayers);
    // Функция для объединения слоев
    function mergeLayers() {
        // Создаем новый холст для объединенного изображения
        const mergedCanvas = document.createElement('canvas');
        const mergedCtx = mergedCanvas.getContext('2d');
        mergedCanvas.width = layers[1].width;
        mergedCanvas.height = layers[1].height;
        // Получаем все кнопки слоев и сортируем их по z-index
        const layerButtons = Array.from(document.querySelectorAll('.layer-button'));
        layerButtons.sort((a, b) => {
            const layerA = layers[parseInt(a.dataset.layer)];
            const layerB = layers[parseInt(b.dataset.layer)];
            return parseInt(layerA.style.zIndex || 0) - parseInt(layerB.style.zIndex || 0);
        });
        // Рисуем каждый слой на объединенном холсте
        layerButtons.forEach((button) => {
            const layerId = parseInt(button.dataset.layer);
            if (layers[layerId]) {
                mergedCtx.drawImage(layers[layerId], 0, 0);
            }
        });
        // Удаляем все существующие слои
        layerButtons.forEach((button) => {
            const layerId = parseInt(button.dataset.layer);
            if (layers[layerId]) {
                canvasContainer.removeChild(layers[layerId]);
                delete layers[layerId];
                delete contexts[layerId];
                delete layerColors[layerId];
                delete history[layerId];
                delete redoHistory[layerId];
            }
            button.remove();
        });
        // Сбрасываем счетчик слоев
        layerCount = 0;
        // Создаем новый слой с объединенным изображением
        createLayer();
        currentCtx.drawImage(mergedCanvas, 0, 0);
        // Обновляем интерфейс
        updateLayerOrder();
        setCurrentLayer(1);
    }
// Прозрачность слоев
        layerOpacitySlider.addEventListener('input', function() {
            const opacity = this.value;
            layerOpacityValue.textContent = opacity;
            setLayerOpacity(currentLayer, opacity / 100);
            layerOpacities[currentLayer] = opacity; 
        });

        // Function to set the opacity of a specific layer
        function setLayerOpacity(layerNum, opacity) {
            if (layers[layerNum]) {
                layers[layerNum].style.opacity = opacity;
                layerOpacities[layerNum] = Math.round(opacity * 100); // Store the opacity as a percentage
            }
        }

// сглаживание линий(закгругление)
// Рисование по нарисованному
// Очистка канваса


    const clearBtn = document.getElementById('clear');
    clearBtn.addEventListener('click', clearCanvas);
    function clearCanvas() {
        saveState();
        if (!currentCtx) return; 
        currentCtx.clearRect(0, 0, layers[currentLayer].width, layers[currentLayer].height);
        saveState();
    }
// Курсоры

    document.addEventListener('DOMContentLoaded', () => {
    			const cursorPanel = document.getElementById('cursorPanel');
    			const cursorList = document.getElementById('cursorList');
    			const changeCursorBtn = document.getElementById('changeCursorBtn');
                const canvas = document.getElementById('yourCanvasId'); 
    // Функция для загрузки курсоров
    function loadCursors() {
        // Очищаем список курсоров
        cursorList.innerHTML = '';
        
        // Цикл для загрузки 100 курсоров
        for (let i = 1; i <= 80; i++) {
            // Формируем URL курсора
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

                // Обработчик события клика на изображение курсора
                cursorImg.addEventListener('click', () => {
                    // Устанавливаем курсор на канвасе
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








// fix fill 
    // add fill (не удалять)
    // // Flood Fill Functionality
    //         const floodFillBtn = document.getElementById('floodFillBtn');
    //         let isFloodFillActive = false; // Флаг для отслеживания состояния заливки
    //         floodFillBtn.addEventListener('click', () => {
    //             isFloodFillActive = !isFloodFillActive;
    //             floodFillBtn.classList.toggle('active', isFloodFillActive);
    //         });
    //         function floodFill(e) {
    //             if (!currentCtx) {
    //                 console.error('Error: currentCtx is undefined in floodFill. Current layer:', currentLayer);
    //                 return;
    //             }
    //             const startX = e.offsetX;
    //             const startY = e.offsetY;
    //             const imageData = currentCtx.getImageData(0, 0, drawingCanvas.width, drawingCanvas.height); // Use drawingCanvas
    //             const data = imageData.data;
    //             const width = imageData.width;
    //             const height = imageData.height;
    //             const targetColor = getPixelColor(data, startX, startY, width);
    //             const fillColor = hexToRgba(colorPicker.value);
    //             const tolerance = 30;
    //             if (colorMatch(targetColor, fillColor, tolerance)) return;
    //             const stack = [[startX, startY]];
    //             const visited = new Uint8Array(width * height);
    //             while (stack.length) {
    //                 const [x, y] = stack.pop();
    //                 const index = y * width + x;
    //                 if (visited[index]) continue;
    //                 visited[index] = 1;
    //                 const pixelIndex = index * 4;
    //                 const currentColor = data.slice(pixelIndex, pixelIndex + 4);
    //                 if (colorMatch(currentColor, targetColor, tolerance) || isContourPixel(x, y, data, width, height, targetColor, tolerance)) {
    //                     setPixelColor(data, x, y, width, fillColor);
    //                     if (x > 0) stack.push([x - 1, y]);
    //                     if (x < width - 1) stack.push([x + 1, y]);
    //                     if (y > 0) stack.push([x, y - 1]);
    //                     if (y < height - 1) stack.push([x, y + 1]);
    //                 }
    //             }
    //             // Оптимизированный дополнительный проход
    //             for (let y = 0; y < height; y++) {
    //                 for (let x = 0; x < width; x++) {
    //                     const index = (y * width + x) * 4;
    //                     if (!colorMatch(data.slice(index, index + 4), fillColor, 0) && shouldFillPixel(x, y, data, width, height, fillColor)) {
    //                         setPixelColor(data, x, y, width, fillColor);
    //                     }
    //                 }
    //             }
    //             currentCtx.putImageData(imageData, 0, 0);
    //             saveState();
    //         }
    //         // Modify the event listener for floodFill 
    //         // drawingCanvas.addEventListener('click', (e) => { // Use drawingCanvas here
    //         //   if (isFillMode) {
    //         //     floodFill(e);
    //         //   }
    //         // });
    // // // Flood Fill Functionality
    // // fillModeBtn.addEventListener('click', toggleFillMode);
    // // function toggleFillMode() {
    // //   isFillMode = !isFillMode;
    // //   // Optionally add visual indication of fill mode being active or inactive
    // //   fillModeBtn.classList.toggle('active', isFillMode);
    // // }
    // // // fill
    // // function floodFill(e) {
    // //   const startX = e.offsetX;
    // //   const startY = e.offsetY;
    // //   const imageData = ctx1.getImageData(0, 0, layer1.width, layer1.height);
    // //   const data = imageData.data;
    // //   const width = imageData.width;
    // //   const height = imageData.height;
    // //   const targetColor = getPixelColor(data, startX, startY, width);
    // //   const fillColor = hexToRgba(colorPicker.value);
    // //   const tolerance = 30;
    // //   if (colorMatch(targetColor, fillColor, tolerance)) return;
    // //   const stack = [[startX, startY]];
    // //   const visited = new Uint8Array(width * height);
    // //   while (stack.length) {
    // //     const [x, y] = stack.pop();
    // //     const index = y * width + x;
    // //     if (visited[index]) continue;
    // //     visited[index] = 1;
    // //     const pixelIndex = index * 4;
    // //     const currentColor = data.slice(pixelIndex, pixelIndex + 4);
    // //     if (colorMatch(currentColor, targetColor, tolerance) || isContourPixel(x, y, data, width, height, targetColor, tolerance)) {
    // //       setPixelColor(data, x, y, width, fillColor);
    // //       if (x > 0) stack.push([x - 1, y]);
    // //       if (x < width - 1) stack.push([x + 1, y]);
    // //       if (y > 0) stack.push([x, y - 1]);
    // //       if (y < height - 1) stack.push([x, y + 1]);
    // //     }
    // //   }
    // //   // Оптимизированный дополнительный проход
    // //   for (let y = 0; y < height; y++) {
    // //     for (let x = 0; x < width; x++) {
    // //       const index = (y * width + x) * 4;
    // //       if (!colorMatch(data.slice(index, index + 4), fillColor, 0) && shouldFillPixel(x, y, data, width, height, fillColor)) {
    // //         setPixelColor(data, x, y, width, fillColor);
    // //       }
    // //     }
    // //   }
    // //   ctx1.putImageData(imageData, 0, 0);
    // //   saveState();
    // // }
    // // function getPixelColor(data, x, y, width) {
    // //   const index = (y * width + x) * 4;
    // //   return data.slice(index, index + 4);
    // // }
    // // function setPixelColor(data, x, y, width, color) {
    // //   const index = (y * width + x) * 4;
    // //   data.set(color, index);
    // // }
    // // function isContourPixel(x, y, data, width, height, targetColor, tolerance) {
    // //   const directions = [[-1, 0], [1, 0], [0, -1], [0, 1], [-1, -1], [-1, 1], [1, -1], [1, 1]];
    // //   const currentColor = getPixelColor(data, x, y, width);
    // //   if (colorMatch(currentColor, targetColor, tolerance)) return false;
    // //   return directions.some(([dx, dy]) => {
    // //     const nx = x + dx;
    // //     const ny = y + dy;
    // //     if (nx >= 0 && nx < width && ny >= 0 && ny < height) {
    // //       const neighborColor = getPixelColor(data, nx, ny, width);
    // //       return colorMatch(neighborColor, targetColor, tolerance);
    // //     }
    // //     return false;
    // //   });
    // // }
    // // function shouldFillPixel(x, y, data, width, height, fillColor) {
    // //   const directions = [[-1, 0], [1, 0], [0, -1], [0, 1], [-1, -1], [-1, 1], [1, -1], [1, 1]];
    // //   let filledNeighbors = 0;
    // //   for (const [dx, dy] of directions) {
    // //     const nx = x + dx;
    // //     const ny = y + dy;
    // //     if (nx >= 0 && nx < width && ny >= 0 && ny < height) {
    // //       const neighborColor = getPixelColor(data, nx, ny, width);
    // //       if (colorMatch(neighborColor, fillColor, 0)) {
    // //         filledNeighbors++;
    // //       }
    // //     }
    // //   }
    // //   return filledNeighbors >= 5;
    // // }
    // // function hexToRgba(hex) {
    // //   const r = parseInt(hex.slice(1, 3), 16);
    // //   const g = parseInt(hex.slice(3, 5), 16);
    // //   const b = parseInt(hex.slice(5, 7), 16);
    // //   return [r, g, b, 255];
    // // }
    // // function colorMatch(a, b, tolerance) {
    // //   return Math.abs(a[0] - b[0]) <= tolerance &&
    // //          Math.abs(a[1] - b[1]) <= tolerance &&
    // //          Math.abs(a[2] - b[2]) <= tolerance &&
    // //          Math.abs(a[3] - b[3]) <= tolerance;
    // // }
    // // // Modify the event listener for floodFill
    // // layer1.addEventListener('click', (e) => {
    // //   if (isFillMode) {
    // //     floodFill(e);
    // //   }
    // // });

// ..функция сшивания(копия)
        // function ntc(e, narrowFactor = 0.9) {
        //             if (!isDrawing || !currentCtx || !isFinger) return;

        //             const rect = layers[currentLayer].getBoundingClientRect();
        //             const x = Math.floor((e.clientX - rect.left) / zoomLevel);
        //             const y = Math.floor((e.clientY - rect.top) / zoomLevel);

        //             const brushSize = parseInt(brushSizeInput.value);
        //             const halfBrushSize = brushSize / 2;
        //             const imageData = currentCtx.getImageData(x - halfBrushSize, y - halfBrushSize, brushSize, brushSize);
        //             const newImageData = currentCtx.createImageData(brushSize, brushSize);

        //             // Определяем направление движения кисти
        //             if (lastX !== null && lastY !== null) {
        //                 const dirX = x - lastX;
        //                 const dirY = y - lastY;
        //                 const length = Math.sqrt(dirX * dirX + dirY * dirY);
        //                 const normDirX = dirX / length;
        //                 const normDirY = dirY / length;

        //                 for (let i = 0; i < brushSize; i++) {
        //                     for (let j = 0; j < brushSize; j++) {
        //                         const index = (j * brushSize + i) * 4;
                                
        //                         // Вычисляем расстояние от текущего пикселя до центра кисти
        //                         const distX = i - halfBrushSize;
        //                         const distY = j - halfBrushSize;
        //                         const distance = Math.sqrt(distX * distX + distY * distY);
                                
        //                         if (distance < halfBrushSize) {
        //                             // Вычисляем новую позицию пикселя
        //                             const newDist = distance * narrowFactor;

        //                             // Сжимаем пиксель в направлении кисти
        //                             const newX = Math.round(halfBrushSize + (distX / distance) * newDist);
        //                             const newY = Math.round(halfBrushSize + (distY / distance) * newDist);
                                    
        //                             if (newX >= 0 && newX < brushSize && newY >= 0 && newY < brushSize) {
        //                                 const newIndex = (newY * brushSize + newX) * 4;
                                        
        //                                 // Копируем пиксель в новую позицию только если он непрозрачный
        //                                 if (imageData.data[index + 3] > 0) { // Проверяем альфа-канал
        //                                     newImageData.data[newIndex] = imageData.data[index];     // R
        //                                     newImageData.data[newIndex + 1] = imageData.data[index + 1]; // G
        //                                     newImageData.data[newIndex + 2] = imageData.data[index + 2]; // B
        //                                     newImageData.data[newIndex + 3] = 255; // A (полностью непрозрачный)
        //                                 }
        //                             }
        //                         }
        //                     }
        //                 }
        //             }

        //             // Смешиваем новое изображение с оригинальным
        //             for (let i = 0; i < imageData.data.length; i += 4) {
        //                 if (newImageData.data[i + 3] === 0) { // Если пиксель прозрачный в новом изображении
        //                     newImageData.data[i] = imageData.data[i];
        //                     newImageData.data[i + 1] = imageData.data[i + 1];
        //                     newImageData.data[i + 2] = imageData.data[i + 2];
        //                     newImageData.data[i + 3] = imageData.data[i + 3];
        //                 }
        //             }

        //             currentCtx.putImageData(newImageData, x - halfBrushSize, y - halfBrushSize);

        //             // Обновляем последние координаты
        //             lastX = x;
        //             lastY = y;
        //         }


