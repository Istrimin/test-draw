// Слушатели и константы
    // курсоры
    const canvasContainer = document.getElementById('canvasContainer');
    const changeCursorBtn = document.getElementById('changeCursorBtn');
    const cursorPanel = document.getElementById('cursorPanel');
    const cursorList = document.getElementById('cursorList');
    // пипетка
    const eyedropperBtn = document.getElementById('eyedropperBtn');
    let isEyedropperActive = false;
    canvasContainer.addEventListener('click', handleEyedropperClick);
    canvasContainer.addEventListener('touchstart', handleEyedropperClick);
    eyedropperBtn.addEventListener('click', handleEyedropperActivation);
    eyedropperBtn.addEventListener('touchstart', handleEyedropperActivation);
    // Удаление всего
    const deleteAllBtn = document.getElementById('deleteAllBtn');
    deleteAllBtn.addEventListener('click', () => {
        if (confirm('Вы уверены, что хотите удалить содержимое всех слоев?')) {
            deleteAllLayers();
        }
    });
// Назначаем горячие клавиши для выбора цветов
        const colorPickers = document.querySelectorAll('input[type="color"]');
        colorPickers.forEach((picker, index) => {
            picker.addEventListener('input', (event) => {
                setDrawingColor(event.target.value);
            });
            // Назначаем горячие клавиши для выбора цветов
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
            if (layers[layerId]) {
                mergeCtx.drawImage(layers[layerId], 0, 0);
            }
        });
        const link = document.createElement('a');
        link.download = 'my-drawing.png';
        link.href = mergeCanvas.toDataURL('image/png');
        link.click();
    }
// Пипетка
    function handleEyedropperActivation(e) {
    isEyedropperActive = !isEyedropperActive;
    document.body.style.cursor = isEyedropperActive ? 'url(cursors/pipette.png), auto' : 'default';
    eyedropperBtn.classList.toggle('active');
    if (isEyedropperActive) {
        isDrawing = false;
    }
    }
    // Function to get pixel color from all layers
    function getPixelColorFromAllLayers(x, y) {
    for (let i = layerCount; i >= 1; i--) {
        const ctx = contexts[i];
        const pixelData = ctx.getImageData(x, y, 1, 1).data;
        if (pixelData[3] > 0) {
        return `#${pixelData[0].toString(16).padStart(2, '0')}${pixelData[1].toString(16).padStart(2, '0')}${pixelData[2].toString(16).padStart(2, '0')}`;
        }
    }
    return backgroundPicker.value;
    }
    // Function to handle eyedropper click/touch events
    function handleEyedropperClick(e) {
    if (isEyedropperActive) {
        const rect = layers[1].getBoundingClientRect();
        // Get coordinates correctly for both touch and mouse events
        const x = (e.clientX || e.touches[0].clientX) - rect.left;
        const y = (e.clientY || e.touches[0].clientY) - rect.top;
        const pickedColor = getPixelColorFromAllLayers(x, y);
        document.getElementById('colorPicker').value = pickedColor;
        setDrawingColor(pickedColor);
        // Optionally deactivate eyedropper after picking
        isEyedropperActive = false;
        document.body.style.cursor = 'default';
        eyedropperBtn.classList.remove('active');
    }
    }
// Удаление всего
    function deleteAllLayers() {
        Object.keys(layers).forEach(layerNum => {
            const ctx = contexts[layerNum];
            ctx.clearRect(0, 0, layers[layerNum].width, layers[layerNum].height);
            // Если это первый слой (фон), заполняем его белым цветом
            // if (layerNum === '1') {
            //     ctx.fillStyle = '#ffffff';
            //     ctx.fillRect(0, 0, layers[layerNum].width, layers[layerNum].height);
            // }
            // Сохраняем состояние после очистки
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
    const cursors = [
        { name: 'default', url: 'cursors/default.png' },
        { name: 'pencil', url: 'cursors/pencil.png' },
        { name: 'brush', url: 'cursors/brush.png' },
        // Добавьте больше курсоров по необходимости
    ];
    function createCursorPanel() {
        cursors.forEach(cursor => {
            const cursorItem = document.createElement('div');
            cursorItem.className = 'cursor-item';
            cursorItem.innerHTML = `<img src="${cursor.url}" alt="${cursor.name}">`;
            cursorItem.addEventListener('click', () => {
                canvasContainer.style.cursor = `url(${cursor.url}), auto`;
                cursorPanel.style.display = 'none';
            });
            cursorList.appendChild(cursorItem);
        });
    }
    changeCursorBtn.addEventListener('click', () => {
        cursorPanel.style.display = cursorPanel.style.display === 'none' ? 'block' : 'none';
    });
    createCursorPanel();
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