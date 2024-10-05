
// фильтры

                        const filterSliders = [
                            'lightnessSlider',
                            'saturationSlider',
                            'contrastSlider',
                            'hueShiftSlider'
                        ];

                        filterSliders.forEach(sliderId => {
                            gel(sliderId).addEventListener('input', updateFilters);
                        });

                        function updateFilters() {
                            const brightness = lightnessSlider.value;
                            const saturation = saturationSlider.value;
                            const contrast = contrastSlider.value;
                            const hueShift = hueShiftSlider.value;

                            lightnessValue.textContent = brightness;
                            saturationValue.textContent = saturation;
                            contrastValue.textContent = contrast;
                            hueShiftValue.textContent = hueShift;

                            const filterString = `brightness(${brightness}%) saturate(${saturation}%) contrast(${contrast}%) hue-rotate(${hueShift}deg)`;

                            // Сохраняем фильтр для текущего слоя
                            layerFilters[currentLayer] = filterString;

                            // Применяем фильтр к текущему слою
                            layers[currentLayer].style.filter = filterString;
                        }
                        // Функция для применения фильтров к слою
                        function applyFiltersToLayer(layerId) {
                            const brightness = lightnessSlider.value;
                            const saturation = saturationSlider.value;
                            const contrast = contrastSlider.value;
                            const hueShift = hueShiftSlider.value;

                            layers[layerId].style.filter = `brightness(${brightness}%) saturate(${saturation}%) contrast(${contrast}%) hue-rotate(${hueShift}deg)`;
                        }

    
// панель настроек settings panel
    const imageGallery = document.getElementById('backgroundImageGallery');
    const backgroundGalleryImages = ['cancer.jpg', 'logo.jpg', 'cancer3.jpg'];
    const canvasGalleryImages = ['canvas1.jpg'];

    function loadImages(gallery, images, onClick, onMouseOver) {
        gallery.innerHTML = '';
        images.forEach(imageSrc => {
            const img = document.createElement('img');
            img.src = imageSrc.startsWith('data:') ? imageSrc : `images/${imageSrc}`;
            img.style.cssText = 'width: 100px; height: 100px; margin: 5px; cursor: pointer;';
            img.onclick = onClick(img.src);
            img.onmouseover = onMouseOver(img.src);
            gallery.appendChild(img);
        });
        }

    function setImage(element, src, modal) {
        element.style.backgroundImage = `url(${src})`;
        if (modal) modal.style.display = "none";
        }

    function loadBackgroundImages() {
        loadImages(imageGallery, backgroundGalleryImages, 
            src => () => setImage(document.body, src, backgroundSettingsModal),
            src => () => setImage(document.body, src));
        }

    function loadCanvasImages() {
            loadImages(canvasImageGallery, canvasGalleryImages, 
                src => () => setCanvasImage(src), 
                src => () => updateCanvasPreview(src));

            const transparentBtn = document.createElement('button');
            transparentBtn.onclick = setCanvasTransparent;
            transparentBtn.style.cssText = 'width: 100px; height: 100px; margin: 5px; cursor: pointer;';
            canvasImageGallery.appendChild(transparentBtn);
        }
    function loadImageAndDraw(src, canvas, clear = false) {
        const img = new Image();
        img.onload = () => {
            const ctx = canvas.getContext('2d');
            if (clear) {
                ctx.clearRect(0, 0, canvas.width, canvas.height);
            }
            ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
            if (canvas === layers[back]) {
                canvasSettingsModal.style.display = "none";
            }
        };
        img.src = src;
        }

    function setCanvasImage(src) {
        loadImageAndDraw(src, layers[back]);
        }

    function updateCanvasPreview(src) {
        loadImageAndDraw(src, layers[back], true);
        }

    function setCanvasTransparent() {
        layers[back].getContext('2d').clearRect(0, 0, layers[back].width, layers[back].height);
        canvasSettingsModal.style.display = "none";
        }

    function handleFileInput(input, galleryImages, loadFunction) {
        Array.from(input.files).forEach(file => {
            const reader = new FileReader();
            reader.onload = e => {
                galleryImages.push(e.target.result);
                loadFunction();
            };
            reader.readAsDataURL(file);
        });
        }

    backgroundSettingsBtn.onclick = () => {
        loadBackgroundImages();
        backgroundSettingsModal.style.display = "block";
        };

    canvasSettingsBtn.onclick = () => {
        loadCanvasImages();
        canvasSettingsModal.style.display = "block";
        };

    closeModal.onclick = () => backgroundSettingsModal.style.display = "none";
    closeCanvasModal.onclick = () => canvasSettingsModal.style.display = "none";
    // выбор цеета для бэка
    backgroundColorPicker.addEventListener('input', function() {
        document.body.style.backgroundColor = this.value;
        });

    canvasColorPicker.addEventListener('input', function() {
        const ctx = layers[back].getContext('2d');
        ctx.fillStyle = this.value;
        ctx.fillRect(0, 0, layers[back].width, layers[back].height);
        updateCanvasPreview(layers[back].toDataURL());
        });

    function setupFileInput(inputElement, galleryImages, loadFunction) {
        inputElement.addEventListener('change', function() {
            handleFileInput(this, galleryImages, loadFunction);
        });
        }

    setupFileInput(backgroundImageInput, backgroundGalleryImages, loadBackgroundImages);
    setupFileInput(canvasImageInput, canvasGalleryImages, loadCanvasImages);
    // применение выбранного изображения
    [backgroundImageInput, canvasImageInput].forEach((input, index) => {
        handleFileInput(input, index === 0 ? backgroundGalleryImages : canvasGalleryImages, index === 0 ? loadBackgroundImages : loadCanvasImages);
        });

    // Initialize
    loadBackgroundImages();
    loadCanvasImages();


// // заливка
//     const FillBtn = gel('FillBtn');
//     let isFloodFillActive = false;
//     // Add event listener for canvasContainer
//     canvasContainer.addEventListener('click', (e) => {
//         if (isFloodFillActive) {
//             floodFill(e);
//         }
//     });
//     FillBtn.addEventListener('click', () => {
//         isFloodFillActive = !isFloodFillActive;
//         FillBtn.classList.toggle('active', isFloodFillActive);
//     });
// function floodFill(e) {
//     // Проверяем, активна ли функция заливки и существует ли текущий контекст
//     if (!isFloodFillActive || !curCtx) return;

//     const rect = layers[currentLayer].getBoundingClientRect();
//     // Вычисляем начальные координаты с учетом масштабирования
//     const startX = Math.floor((e.clientX - rect.left) / zoomLevel);
//     const startY = Math.floor((e.clientY - rect.top) / zoomLevel);

//     // Создаем временный канвас для работы
//     const tempCanvas = document.createElement('canvas');
//     const tempCtx = tempCanvas.getContext('2d');
//     tempCanvas.width = realWidth;
//     tempCanvas.height = realHeight;

//     // Копируем содержимое всех слоев на временный канвас, кроме слоев 0, 1 и текущего
//     Object.entries(layers).forEach(([index, layer]) => {
//         if (index !== '0' && index !== '1' && parseInt(index) !== currentLayer) {
//             tempCtx.drawImage(layer, 0, 0);
//         }
//     });

//     const imageData = tempCtx.getImageData(0, 0, realWidth, realHeight);
//     const data = imageData.data;
//     const targetColor = getPixelColor(startX, startY, data, realWidth);
    
//     // Получаем цвет заливки для текущего слоя
//     const fillColor = layerColors[currentLayer] ? hexToRgba(layerColors[currentLayer]) : [0, 0, 0, 255];
//     const tolerance = 30; // Допустимое отклонение цвета

//     // Проверяем, не совпадает ли целевой цвет с цветом заливки
//     if (colorMatch(targetColor, fillColor, tolerance)) return;

//     const stack = [[startX, startY]];
//     const visited = new Uint8Array(realWidth * realHeight);

//     // Алгоритм заливки
//     while (stack.length) {
//         const [x, y] = stack.pop();
//         const index = y * realWidth + x;
//         if (visited[index]) continue;
//         visited[index] = 1;

//         const pixelIndex = index * 4;
//         const currentColor = data.slice(pixelIndex, pixelIndex + 4);

//         // Заливаем, если цвет совпадает с целевым или это сплошной цвет
//         if (colorMatch(currentColor, targetColor, tolerance) || isSolidColor(currentColor, tolerance)) {
//             setPixelColor(data, x, y, realWidth, fillColor);
//             // Проверяем соседние пиксели
//             if (x > 0 && !isContourPixel(x - 1, y, data, realWidth, realHeight, targetColor, tolerance)) stack.push([x - 1, y]);
//             if (x < realWidth - 1 && !isContourPixel(x + 1, y, data, realWidth, realHeight, targetColor, tolerance)) stack.push([x + 1, y]);
//             if (y > 0 && !isContourPixel(x, y - 1, data, realWidth, realHeight, targetColor, tolerance)) stack.push([x, y - 1]);
//             if (y < realHeight - 1 && !isContourPixel(x, y + 1, data, realWidth, realHeight, targetColor, tolerance)) stack.push([x, y + 1]);
//         }
//     }

//     // Применяем изменения к текущему контексту
//     curCtx.putImageData(imageData, 0, 0);
//     saveState();
//     layerDrawnOn[currentLayer] = true;
//     updateLayerEyeIcon(currentLayer);
// }

// // Проверяет, является ли цвет сплошным (близким к белому)
// function isSolidColor(color, tolerance) {
//     return color[0] >= 255 - tolerance && color[1] >= 255 - tolerance && color[2] >= 255 - tolerance;
// }

// // Проверяет, является ли пиксель частью контура
// function isContourPixel(x, y, data, width, height, targetColor, tolerance) {
//     const currentColor = getPixelColor(x, y, data, width);
//     return !colorMatch(currentColor, targetColor, tolerance);
// }

// // Устанавливает цвет пикселя
// function setPixelColor(data, x, y, width, color) {
//     const index = (y * width + x) * 4;
//     data[index] = color[0];
//     data[index + 1] = color[1];
//     data[index + 2] = color[2];
//     data[index + 3] = color[3];
// }

// // Преобразует HEX-цвет в RGBA
// function hexToRgba(hex) {
//     const r = parseInt(hex.slice(1, 3), 16);
//     const g = parseInt(hex.slice(3, 5), 16);
//     const b = parseInt(hex.slice(5, 7), 16);
//     return [r, g, b, 255];
// }

// // Проверяет, совпадают ли цвета с учетом допуска
// function colorMatch(a, b, tolerance) {
//     return Math.abs(a[0] - b[0]) <= tolerance &&
//            Math.abs(a[1] - b[1]) <= tolerance &&
//            Math.abs(a[2] - b[2]) <= tolerance &&
//            (a.length < 4 || b.length < 4 || Math.abs(a[3] - b[3]) <= tolerance);
// }

// // Получает цвет пикселя по координатам
// function getPixelColor(x, y, data, width) {
//     x = Math.floor(x);
//     y = Math.floor(y);
//     if (x < 0 || x >= width || y < 0 || y >= data.length / 4 / width) {
//         return [0, 0, 0, 0]; // Возвращаем прозрачный цвет для пикселей вне границ
//     }
//     const index = (y * width + x) * 4;
//     return [data[index], data[index + 1], data[index + 2], data[index + 3]];
// }





// Функция сохранения текущего состояния
        function saveCurrentState() {
            const currentState = curCtx.getImageData(0, 0, layers[currentLayer].width, layers[currentLayer].height);
            history[currentLayer].push(currentState);
        }

// закомментированное
    // try {
    //   isPressureSupported = !!window.PointerEvent && 'pressure' in PointerEvent.prototype;
    // } catch (e) { }
    //             const isPressureSupported = 'onpointermove' in window;
// *toggle eraser
        eraserBtn.addEventListener('click', toggleEraser);
        function toggleEraser() {
            isErasing = !isErasing;
            eraserBtn.classList.toggle('active', isErasing);
        }



// Layer switching
  document.querySelectorAll('.layer-button').forEach(button => {
    button.addEventListener('click', function () {
      document.querySelector('.active-layer').classList.remove('active-layer');
      this.classList.add('active-layer');
      currentLayer = parseInt(this.dataset.layer);
      curCtx = window[`ctx${currentLayer}`];
      isDrawing = false;
      });
    });

// загрузка изображения
  function importImage(event) {
    saveState();
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.onload = (e) => {
      uploadedImage = new Image();
      uploadedImage.onload = () => {
        const canvas = layers[currentLayer];
        const ctx = contexts[currentLayer];
       
        // Рассчитываем новые размеры, сохраняя пропорции
        let newWidth;
        let newHeight;
        const ratio = uploadedImage.width / uploadedImage.height;
       
        if (ratio > canvas.width / canvas.height) {
          // Изображение шире, чем канвас
          newWidth = canvas.width;
          newHeight = newWidth / ratio;
        } else {
          // Изображение выше, чем канвас или равно по пропорциям
          newHeight = canvas.height;
          newWidth = newHeight * ratio;
        }
       
        // Очищаем текущий слой
        ctx.clearRect(0, 0, canvas.width, canvas.height);
       
        // Рисуем изображение по центру канваса
        function calculateCenteredX(canvasWidth, newWidth) {
            return (canvasWidth - newWidth) / 2;
        }
        // Usage
        const x = calculateCenteredX(canvas.width, newWidth);
        ctx.drawImage(uploadedImage, x, y, newWidth, newHeight);
       
        // Обновляем состояние слоя
        layerDrawnOn[currentLayer] = true;
        updateLayerEyeIcon(currentLayer);

        // Применяем текущие фильтры к слою
        applyFiltersToLayer(currentLayer);
      };
      uploadedImage.src = e.target.result;
    };
    reader.readAsDataURL(file);
  }


// Exit functionality
  const exitLink = gel('exitLink');
  // const doorSound = new Howl({
  //   src: ['sounds/door-close.wav']
  // });
  exitLink.addEventListener('click', () => {
    doorSound.play();
    doorSound.once('end', () => {
      window.location.href = 'index.html';
    });
  });
// установка цвета кисти
  function setDrawingColor(color) {
    if (!curCtx) {
      return;
    }
    layerColors[currentLayer] = color;
    curCtx.strokeStyle = color;
    updateLayerButtonColor(currentLayer);
  }
// Функция отмены
    function undo() {
      if (history[currentLayer] && history[currentLayer].length > 0) {
        if (history[currentLayer].length === 1) {
          // Если это последнее состояние, сохраняем текущее состояние перед очисткой
          const currentState = curCtx.getImageData(0, 0, layers[currentLayer].width, layers[currentLayer].height);
          redoHistory[currentLayer].push(currentState);
          // Очищаем холст
          curCtx.clearRect(0, 0, layers[currentLayer].width, layers[currentLayer].height);
        } else {
          // Сохраняем текущее состояние в redoHistory
          const currentState = curCtx.getImageData(0, 0, layers[currentLayer].width, layers[currentLayer].height);
          redoHistory[currentLayer].push(currentState);
          // Возвращаемся к предыдущему состоянию
          const previousState = history[currentLayer].pop();
          curCtx.putImageData(previousState, 0, 0);
        }
      }
    }
// Функция повтора
    function redo() {
      if (!(redoHistory[currentLayer] && redoHistory[currentLayer].length > 0)) {
        return;
      }
      const nextState = redoHistory[currentLayer].pop();
    saveCurrentState();
      curCtx.putImageData(nextState, 0, 0);
    }

// горячие клавиши hotkey
    const buttonMap = {
      KeyA: 'eyedropperBtn',
      KeyB: 'backgroundPicker',
      KeyE: 'eraserBtn',
      KeyS: 'saveImageBtn',
      KeyR: 'clear',
      KeyF: 'FillBtn',
      KeyU: 'UploadButton',

      KeyT: 'drawOnExistingBtn',
    };

    const functionMap = {
      KeyZ: undo, 
      KeyX: redo, 
      KeyQ: toggleSymmetry,
      KeyV: toggleSpider,
      KeyW: togglePreviousLayer, 
    };

    document.addEventListener('keydown', (event) => {
      const keyCode = event.code;

      if (buttonMap[keyCode]) { 
        gel(buttonMap[keyCode]).click();
      } else if (functionMap[keyCode]) {
        functionMap[keyCode]();
      }
    // });
      // Check for Ctrl + Arrow keys first for canvas movement
      if (event.ctrlKey && (['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight'].includes(event.key))) {
        const moveAmount = 1; // Количество пикселей для перемещения
        switch(event.key) {
            case 'ArrowLeft':
                moveCanvasContent(currentLayer, 'left', moveAmount);
                break;
            case 'ArrowRight':
                moveCanvasContent(currentLayer, 'right', moveAmount);
                break;
            case 'ArrowUp':
                moveCanvasContent(currentLayer, 'up', moveAmount);
                break;
            case 'ArrowDown':
                moveCanvasContent(currentLayer, 'down', moveAmount);
                break;
        }
      // } else if (elementMap[keyCode]) { 
      //   const element = elementMap[keyCode];

      //   if (typeof element === 'string') {
      //     gel(element).click();
      //   } else if (typeof element === 'function') {
      //     element();
      //   } 
      } else if (event.altKey && (event.key === 'ArrowUp' || event.key === 'ArrowDown')) { // Move layer in stack with Alt + Up/Down

        moveLayerInStack(event.key === 'ArrowUp' ? -1 : 1);
      } else if (event.key === 'ArrowUp' || event.key === 'ArrowDown') { 

        moveLayerFocus(event.key === 'ArrowUp' ? -1 : 1);
      }
    });


    function moveLayerFocus(direction) {
      const lB = document.querySelectorAll('.layer-button');
      const currentLayerIndex = Array.from(lB).findIndex(button => button.classList.contains('active-layer'));

      const newIndex = (currentLayerIndex + direction + lB.length) % lB.length; // Wrap around
      lB[newIndex].click();
    }

// buttons
    const imageInput = gel('imageInput');
    UploadB.addEventListener('click', () => imageInput.click());
    imageInput.addEventListener('change', importImage);
    undoBtn.addEventListener('click', undo);
    redoBtn.addEventListener('click', redo);

// перемещение изображения по координатам
                        function moveCanvasContent(layerId, direction, amount) {
                            const canvas = layers[layerId];
                            const ctx = contexts[layerId];

                            // Сохраняем текущее состояние канваса
                            const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);

                            // Очищаем канвас
                            ctx.clearRect(0, 0, canvas.width, canvas.height);

                            // Вычисляем смещение
                            let offsetX = 0;
                            let offsetY = 0;
                            switch (direction) {
                                case 'left':
                                    offsetX = -amount;
                                    break;
                                case 'right':
                                    offsetX = amount;
                                    break;
                                case 'up':
                                    offsetY = -amount;
                                    break;
                                case 'down':
                                    offsetY = amount;
                                    break;
                            }

                            // Рисуем содержимое канваса со смещением
                            ctx.putImageData(imageData, offsetX, offsetY);

                            // Если часть изображения вышла за пределы канваса, рисуем ее с другой стороны
                            if (offsetX > 0) {
                                ctx.putImageData(imageData, offsetX - canvas.width, 0, canvas.width - offsetX, 0, offsetX, canvas.height);
                            } else if (offsetX < 0) {
                                ctx.putImageData(imageData, canvas.width + offsetX, 0, 0, 0, -offsetX, canvas.height);
                            }

                            if (offsetY > 0) {
                                ctx.putImageData(imageData, 0, offsetY - canvas.height, 0, canvas.height - offsetY, canvas.width, offsetY);
                            } else if (offsetY < 0) {
                                ctx.putImageData(imageData, 0, canvas.height + offsetY, 0, 0, canvas.width, -offsetY);
                            }

                            // Обновляем состояние слоя
                            layerDrawnOn[layerId] = true;
                            updateLayerEyeIcon(layerId);
                        }


// идентификатор слоя
        canvasContainer.addEventListener('pointerdown', handleCanvasClick);
        function handleCanvasClick(e) {
            if (!e.altKey) {
                return;
            }
            isDrawing = false;
            e.preventDefault();
            identifyLayerClickHandler(e);
        }
        canvasContainer.addEventListener('click', (e) => {
            if (!isIdentifyingLayer) {
                return;
            }
            identifyLayerClickHandler(e);
            canvasContainer.style.cursor = 'auto';
            isDrawing = wasDrawing;
            isIdentifyingLayer = false;
            identifyLayerBtn.classList.remove('active');
        });
        identifyLayerBtn.addEventListener('click', () => {
            isIdentifyingLayer = !isIdentifyingLayer;
            identifyLayerBtn.classList.toggle('active', isIdentifyingLayer);
            if (isIdentifyingLayer) {
                wasDrawing = isDrawing;
                isDrawing = false;
                canvasContainer.style.cursor = 'crosshair';
                return;
            }
            canvasContainer.style.cursor = 'auto';
            isDrawing = wasDrawing;
        });
    function identifyLayerClickHandler(e) {
        const rect = canvasContainer.getBoundingClientRect();
        const x = (e.clientX - rect.left) * (realWidth / displayWidth);
        const y = (e.clientY - rect.top) * (realHeight / displayHeight);
        
        // Collect all layer IDs except the background
        const layerIds = Object.keys(layers).filter(key => key !== back.toString());
        layerIds.sort((a, b) => parseInt(layers[b].style.zIndex) - parseInt(layers[a].style.zIndex));
        
        // Iterate through layers from top to bottom
        for (const layerId of layerIds) {
            const ctx = contexts[layerId];
            const pixelData = ctx.getImageData(Math.floor(x), Math.floor(y), 1, 1).data;
            if (pixelData[3] > 0) {
                setCurrentLayer(parseInt(layerId));
                updateLayerButtonColor(parseInt(layerId));
                return;
            }
        }
    }

// слияние с нижележащим слоем
    const mergeDownBtn = gel('mergeDownBtn');

    mergeDownBtn.addEventListener('click', mergeLayerDown);

    function mergeLayerDown() {
        const currentLayerIndex = parseInt(currentLayer);
        const layerBelow = findLayerBelow(currentLayerIndex);

        if (layerBelow === null) {
            showMessage("Нет слоя ниже для слияния.");
            return;
        }

        // Создаем временный canvas для объединения слоев
        const tempCanvas = document.createElement('canvas');
        tempCanvas.width = layers[currentLayer].width;
        tempCanvas.height = layers[currentLayer].height;
        const tempCtx = tempCanvas.getContext('2d');

        // Рисуем нижний слой
        tempCtx.drawImage(layers[layerBelow], 0, 0);

        // Рисуем текущий слой поверх
        tempCtx.globalAlpha = layerOpacities[currentLayer] / 100;
        tempCtx.drawImage(layers[currentLayer], 0, 0);

        // Очищаем нижний слой и копируем на него результат
        contexts[layerBelow].clearRect(0, 0, layers[layerBelow].width, layers[layerBelow].height);
        contexts[layerBelow].drawImage(tempCanvas, 0, 0);

        // Удаляем текущий слой
        deleteLayer(currentLayerIndex);

        // Устанавливаем нижний слой как текущий
        setCurrentLayer(layerBelow);

        // Обновляем отображение слоев
        updateLayerList();
        showMessage("Слои объединены.");
    }
    function findLayerBelow(currentLayerIndex) {
        const layerIds = Object.keys(layers)
            .filter(id => id !== back.toString())
            .sort((a, b) => parseInt(layers[b].style.zIndex) - parseInt(layers[a].style.zIndex));

        const currentLayerPosition = layerIds.indexOf(currentLayerIndex.toString());
        if (currentLayerPosition < layerIds.length - 1) {
            return parseInt(layerIds[currentLayerPosition + 1]);
        }
        return null;
    }


// удаление слоя
    function deleteLayer(layerId) {
        // Удаляем canvas слоя
        layers[layerId].remove();
        
        // Удаляем слой из всех объектов
        delete layers[layerId];
        delete contexts[layerId];
        delete layerColors[layerId];
        delete layerOpacities[layerId];
        delete history[layerId];
        delete redoHistory[layerId];
        
        // Удаляем кнопку слоя
        const layerButton = document.querySelector(`.layer-button[data-layer="${layerId}"]`);
        if (layerButton) {
            layerButton.remove();
        }
        
        // Если у слоя была обводка, удаляем и ее
        if (!outlineLayers[layerId]) {
            return;
        }
        const outlineLayerId = outlineLayers[layerId].id;
        layers[outlineLayerId].remove();
        delete layers[outlineLayerId];
        delete contexts[outlineLayerId];
        delete outlineLayers[layerId];
    }

// применение обводки
    const applyOutlineBtn = gel('applyOutlineBtn');

    applyOutlineBtn.addEventListener('click', () => {
        mergeOutlineWithCurrentLayer();
    });

    function mergeOutlineWithCurrentLayer() {
        if (!outlineLayers[currentLayer]) {
            showMessage("Нет обводки для слияния.");
            return;
        }

        const outlineLayerId = outlineLayers[currentLayer].id;
        const outlineCanvas = layers[outlineLayerId];
        const currentCanvas = layers[currentLayer];

        // Создаем временный canvas для объединения слоев
        const tempCanvas = document.createElement('canvas');
        tempCanvas.width = currentCanvas.width;
        tempCanvas.height = currentCanvas.height;
        const tempCtx = tempCanvas.getContext('2d');

        // Рисуем текущий слой
        tempCtx.drawImage(currentCanvas, 0, 0);

        // Рисуем слой обводки поверх
        tempCtx.drawImage(outlineCanvas, 0, 0);

        // Очищаем текущий слой и копируем на него результат
        contexts[currentLayer].clearRect(0, 0, currentCanvas.width, currentCanvas.height);
        contexts[currentLayer].drawImage(tempCanvas, 0, 0);

        // Удаляем слой обводки
        canvasContainer.removeChild(outlineCanvas);
        delete layers[outlineLayerId];
        delete contexts[outlineLayerId];
        delete outlineLayers[currentLayer];

        // Обновляем отображение слоев
        updateLayerList();
        
        // Добавляем информацию об обводке в историю текущего слоя
        saveState();
    }
// Функция для объединения слоев
    const mergeLayersBtn = gel('mergeLayers');
    mergeLayersBtn.addEventListener('click', mergeLayers);
        function mergeLayers() {
            const mergedCanvas = document.createElement('canvas');
            const mergedCtx = mergedCanvas.getContext('2d', { willReadFrequently: true });
            mergedCanvas.width = layers[1].width;
            mergedCanvas.height = layers[1].height;
            const layerButtons = Array.from(document.querySelectorAll('.layer-button'));
            layerButtons.sort((a, b) => {
                const layerA = layers[parseInt(a.dataset.layer)];
                const layerB = layers[parseInt(b.dataset.layer)];
                return parseInt(layerA.style.zIndex || 0) - parseInt(layerB.style.zIndex || 0);
            });
            layerButtons.forEach((button) => {
                const layerId = parseInt(button.dataset.layer);
                if (layers[layerId] && layerId !== back) {
                    mergedCtx.drawImage(layers[layerId], 0, 0);
                    if (layerId !== currentLayer) {
                        const ctx = contexts[layerId];
                        ctx.clearRect(0, 0, layers[layerId].width, layers[layerId].height);
                    }
                }
            });
            curCtx.drawImage(mergedCanvas, 0, 0);
            updateLayerOrder();
        }
// рисование на нарисованном
    export function drawOn(startX, startY, endX, endY, ctx) {
        const imageData = ctx.getImageData(0, 0, ctx.canvas.width, ctx.canvas.height);
        const data = imageData.data;
        const tempCanvas = document.createElement('canvas');
        tempCanvas.width = ctx.canvas.width;
        tempCanvas.height = ctx.canvas.height;
        const tempCtx = tempCanvas.getContext('2d');
        tempCtx.imageSmoothingEnabled = false;
        tempCtx.strokeStyle = ctx.strokeStyle;
        tempCtx.lineWidth = ctx.lineWidth;
        tempCtx.lineCap = ctx.lineCap;
        tempCtx.lineJoin = ctx.lineJoin;
        tempCtx.beginPath();
        tempCtx.moveTo(startX, startY);
        tempCtx.lineTo(endX, endY);
        tempCtx.stroke();
        const lineData = tempCtx.getImageData(0, 0, ctx.canvas.width, ctx.canvas.height).data;
        const lineWidth = ctx.lineWidth;
        for (let x = Math.floor(Math.min(startX, endX) - lineWidth); x <= Math.ceil(Math.max(startX, endX) + lineWidth); x++) {
            for (let y = Math.floor(Math.min(startY, endY) - lineWidth); y <= Math.ceil(Math.max(startY, endY) + lineWidth); y++) {
                if (x >= 0 && x < ctx.canvas.width && y >= 0 && y < ctx.canvas.height) {
                    const i = (y * ctx.canvas.width + x) * 4;
                    // Проверяем, находится ли пиксель на линии и есть ли уже что-то нарисованное в этом месте
                    if (lineData[i + 3] > 0 && data[i + 3] > 0) {
                        const alpha = ctx.globalAlpha;
                        const existingAlpha = data[i + 3] / 255;
                        const newAlpha = alpha + existingAlpha * (1 - alpha);
                        // Смешиваем цвета с учетом прозрачности
                        data[i] = (lineData[i] * alpha + data[i] * existingAlpha * (1 - alpha)) / newAlpha;
                        data[i + 1] = (lineData[i + 1] * alpha + data[i + 1] * existingAlpha * (1 - alpha)) / newAlpha;
                        data[i + 2] = (lineData[i + 2] * alpha + data[i + 2] * existingAlpha * (1 - alpha)) / newAlpha;
                        data[i + 3] = newAlpha * 255;
                    }
                }
            }
        }
        ctx.putImageData(imageData, 0, 0);
    }
// добавляем слой под текущим
    document.addEventListener('keydown', (e) => {
        if (e.key !== 'Tab') {
            return;
        }
        e.preventDefault();
        createLayer(currentLayer, true);
        updateZoom();
    });

    function createLayer(referenceLayer, isBelow) {
        const layerButtons = Array.from(document.querySelectorAll('.layer-button'));
        const currentIndex = layerButtons.findIndex(btn => parseInt(btn.dataset.layer) === referenceLayer);
        layerCount++;
        const newLayerNum = layerCount;
        const canvas = document.createElement('canvas');
        canvas.id = `layer${newLayerNum}`;
        canvas.width = realWidth;
        canvas.height = realHeight;
        canvas.style.width = `${displayWidth}px`;
        canvas.style.height = `${displayHeight}px`;
        canvas.style.position = 'absolute';
        canvas.style.top = '0';
        canvas.style.left = '0';

        // Устанавливаем z-index на основе текущего слоя
        const currentZIndex = parseInt(layers[referenceLayer].style.zIndex);
        canvas.style.zIndex = isBelow ? currentZIndex : currentZIndex + 1;

        if (currentIndex === -1) {
            canvasContainer.appendChild(canvas);
        } else {
            const targetIndex = isBelow ? currentIndex : currentIndex + 1;
            canvasContainer.insertBefore(canvas, layers[targetIndex]);
        }

        layers[newLayerNum] = canvas;
        contexts[newLayerNum] = canvas.getContext('2d', { willReadFrequently: true });
        layerColors[newLayerNum] = `#${Math.floor(Math.random() * 16_777_215).toString(16)}`;

        const button = document.createElement('button');
        button.textContent = " ❤ ";
        button.classList.add('layer-button');
        button.dataset.layer = newLayerNum;

        const eyeIcon = document.createElement('span');
        eyeIcon.textContent = "👁️";
        eyeIcon.style.display = 'inline';
        eyeIcon.classList.add('eye-icon');
        button.appendChild(eyeIcon);

        if (currentIndex === -1) {
            document.querySelector('.layer-buttons').appendChild(button);
        } else {
            layerButtons[currentIndex].parentNode.insertBefore(button, layerButtons[currentIndex].nextSibling);
        }

        button.addEventListener('click', function () {
            setCurrentLayer(parseInt(this.dataset.layer));
        });

        addEventListenersToLayer(canvas);
        history[newLayerNum] = [];
        redoHistory[newLayerNum] = [];
        setCurrentLayer(newLayerNum);
        initializeLayer(newLayerNum);
        updateLayerButtonColor(newLayerNum);
        updateLayerOrder();
        layerDrawnOn[newLayerNum] = true;
        updateLayerEyeIcon(newLayerNum);
        updateZoom();
        
        outlineLayers[newLayerNum] = null;
        outlineSizes[newLayerNum] = 0;
        updateLayerList();
    }

// добавляем слой над текущим
    document.addEventListener('keydown', (e) => {
        if (e.code !== 'Backquote') {
            return;
        }
        e.preventDefault();
        createLayer(currentLayer, false);
        updateZoom();
    });
// *рисование под нарисованным
    // export function drawOn(startX, startY, endX, endY, ctx) {
    //     const imageData = ctx.getImageData(0, 0, ctx.canvas.width, ctx.canvas.height);
    //     const data = imageData.data;
    //     const tempCanvas = document.createElement('canvas');
    //     tempCanvas.width = ctx.canvas.width;
    //     tempCanvas.height = ctx.canvas.height;
    //     const tempCtx = tempCanvas.getContext('2d');
    //     tempCtx.imageSmoothingEnabled = false;
    //     tempCtx.strokeStyle = ctx.strokeStyle;
    //     tempCtx.lineWidth = ctx.lineWidth;
    //     tempCtx.lineCap = ctx.lineCap;
    //     tempCtx.lineJoin = ctx.lineJoin;
    //     tempCtx.beginPath();
    //     tempCtx.moveTo(startX, startY);
    //     tempCtx.lineTo(endX, endY);
    //     tempCtx.stroke();
    //     const lineData = tempCtx.getImageData(0, 0, ctx.canvas.width, ctx.canvas.height).data;
    //     const lineWidth = ctx.lineWidth;
    //     for (let x = Math.floor(Math.min(startX, endX) - lineWidth); x <= Math.ceil(Math.max(startX, endX) + lineWidth); x++) {
    //         for (let y = Math.floor(Math.min(startY, endY) - lineWidth); y <= Math.ceil(Math.max(startY, endY) + lineWidth); y++) {
    //             if (x >= 0 && x < ctx.canvas.width && y >= 0 && y < ctx.canvas.height) {
    //                 const i = (y * ctx.canvas.width + x) * 4;
    //                 // Проверяем, находится ли пиксель на линии и не является ли он полностью прозрачным
    //                 if (lineData[i + 3] > 0 && data[i + 3] < 255) {
    //                     const alpha = ctx.globalAlpha;
    //                     const existingAlpha = data[i + 3] / 255;
    //                     const newAlpha = alpha + existingAlpha * (1 - alpha);
    //                     data[i] = (lineData[i] * alpha + data[i] * existingAlpha * (1 - alpha)) / newAlpha;
    //                     data[i + 1] = (lineData[i + 1] * alpha + data[i + 1] * existingAlpha * (1 - alpha)) / newAlpha;
    //                     data[i + 2] = (lineData[i + 2] * alpha + data[i + 2] * existingAlpha * (1 - alpha)) / newAlpha;
    //                     data[i + 3] = newAlpha * 255;
    //                 }
    //             }
    //         }
    //     }
    //     ctx.putImageData(imageData, 0, 0);
    // }
// Сохранение изображения
    saveImageBtn.addEventListener('click', exportImage);
    
    function exportImage() {
        const exportCanvas = document.createElement('canvas');
        const exportCtx = exportCanvas.getContext('2d');
        exportCanvas.width = realWidth;
        exportCanvas.height = realHeight;

        // Создаем массив всех слоев, включая обводки
        const allLayers = Object.keys(layers).reduce((acc, layerId) => {
            if (layerId !== back.toString()) {
                acc.push({id: layerId, type: 'main', zIndex: parseInt(layers[layerId].style.zIndex)});
                if (outlineLayers[layerId]) {
                    acc.push({id: outlineLayers[layerId].id, type: 'outline', zIndex: parseInt(layers[outlineLayers[layerId].id].style.zIndex)});
                }
            }
            return acc;
        }, []);

        // Сортируем все слои по z-index
        allLayers.sort((a, b) => a.zIndex - b.zIndex);

        // Отрисовываем слои в правильном порядке
        allLayers.forEach((layer) => {
            const layerId = layer.id;
            const canvas = layers[layerId];

            // Создаем временный канвас для применения фильтров
            const tempCanvas = document.createElement('canvas');
            tempCanvas.width = realWidth;
            tempCanvas.height = realHeight;
            const tempCtx = tempCanvas.getContext('2d');

            // Копируем содержимое слоя на временный канвас
            tempCtx.drawImage(canvas, 0, 0);

            // Применяем фильтры
            if (layerFilters[layerId]) {
                tempCtx.filter = layerFilters[layerId];
                tempCtx.drawImage(tempCanvas, 0, 0);
                tempCtx.filter = 'none';
            }

            // Устанавливаем прозрачность
            exportCtx.globalAlpha = layerOpacities[layerId] / 100;

            // Отрисовываем содержимое слоя на экспортируемый канвас
            exportCtx.drawImage(tempCanvas, 0, 0);
        });

        exportCtx.globalAlpha = 1;

        // Создаем ссылку для скачивания
        const link = document.createElement('a');
        link.download = 'my-drawing.png';
        link.href = exportCanvas.toDataURL('image/png');
        link.click();
    }

// Прозрачность слоев
        layerOpacitySlider.addEventListener('input', function() {
            const opacity = this.value;
            layerOpacityValue.textContent = opacity;
            setLayerOpacity(currentLayer, opacity / 100);
            layerOpacities[currentLayer] = opacity; 
        });
        function setLayerOpacity(layerNum, opacity) {
            if (layers[layerNum]) {
                layers[layerNum].style.opacity = opacity;
                layerOpacities[layerNum] = Math.round(opacity * 100); 
            }
        }
// полный экран.
    // const fullscreenBtn = gel('fullscreenBtn');
    // const baseContainer = document.querySelector('.base-container');
    // fullscreenBtn.addEventListener('click', toggleFullscreen);
    // function toggleFullscreen() {
    //     if (!document.fullscreenElement) {
    //         if (baseContainer.requestFullscreen) {
    //             baseContainer.requestFullscreen();
    //         } else if (baseContainer.mozRequestFullScreen) { // Firefox
    //             baseContainer.mozRequestFullScreen();
    //         } else if (baseContainer.webkitRequestFullscreen) { // Chrome, Safari and Opera
    //             baseContainer.webkitRequestFullscreen();
    //         } else if (baseContainer.msRequestFullscreen) { // IE/Edge
    //             baseContainer.msRequestFullscreen();
    //         }
    //     } else {
    //         if (document.exitFullscreen) {
    //             document.exitFullscreen();
    //         } else if (document.mozCancelFullScreen) { // Firefox
    //             document.mozCancelFullScreen();
    //         } else if (document.webkitExitFullscreen) { // Chrome, Safari and Opera
    //             document.webkitExitFullscreen();
    //         } else if (document.msExitFullscreen) { // IE/Edge
    //             document.msExitFullscreen();
    //         }
    //     }
    // }
    // function handleFullscreenChange() {
    //     if (document.fullscreenElement) {
    //         enterFullscreenMode();
    //     } else {
    //         exitFullscreenMode();
    //     }
    // }
    // function enterFullscreenMode() {
    //     baseContainer.classList.add('fullscreen-mode');
    //     resizeCanvas();
    // }
    // function exitFullscreenMode() {
    //     baseContainer.classList.remove('fullscreen-mode');
    //     resetCanvasSize();
    // }
    // function resizeCanvas() {
    //     const fullscreenWidth = window.innerWidth - sidebar.offsetWidth;
    //     const fullscreenHeight = window.innerHeight;
    //     Object.values(layers).forEach(layer => {
    //         const ctx = layer.getContext('2d');
    //         const tempCanvas = document.createElement('canvas');
    //         const tempCtx = tempCanvas.getContext('2d');
    //         // Сохраняем текущее содержимое
    //         tempCanvas.width = layer.width;
    //         tempCanvas.height = layer.height;
    //         tempCtx.drawImage(layer, 0, 0);
    //         // Изменяем размер канваса
    //         layer.width = fullscreenWidth;
    //         layer.height = fullscreenHeight;
    //         // Восстанавливаем содержимое с учетом зума
    //         ctx.save();
    //         ctx.scale(zoomLevel, zoomLevel);
    //         ctx.drawImage(tempCanvas, -offsetX / zoomLevel, -offsetY / zoomLevel);
    //         ctx.restore();
    //     });
    //     updateZoom();
    // }
    // function resetCanvasSize() {
    //     const originalWidth = 600;
    //     const originalHeight = 400;
    //     Object.values(layers).forEach(layer => {
    //         const ctx = layer.getContext('2d');
    //         const tempCanvas = document.createElement('canvas');
    //         const tempCtx = tempCanvas.getContext('2d');
    //         // Сохраняем текущее содержимое
    //         tempCanvas.width = layer.width;
    //         tempCanvas.height = layer.height;
    //         tempCtx.drawImage(layer, 0, 0);
    //         // Возвращаем исходный размер канваса
    //         layer.width = originalWidth;
    //         layer.height = originalHeight;
    //         // Восстанавливаем содержимое с учетом зума
    //         ctx.save();
    //         ctx.scale(1 / zoomLevel, 1 / zoomLevel);
    //         ctx.drawImage(tempCanvas, offsetX, offsetY);
    //         ctx.restore();
    //     });
    //     // Сбрасываем зум и смещение
    //     zoomLevel = 1;
    //     offsetX = 0;
    //     offsetY = 0;
    //     updateZoom();
    // }
    // function updateZoom() {
    //     const container = gel('canvasContainer');
    //     const containerRect = container.getBoundingClientRect();
    //     Object.values(layers).forEach(layer => {
    //         layer.style.transformOrigin = '0 0';
    //         layer.style.transform = `scale(${zoomLevel})`;
    //         // Обновляем позицию с учетом зума
    //         const layerRect = layer.getBoundingClientRect();
    //         offsetX = Math.min(Math.max(offsetX, containerRect.width - layerRect.width), 0);
    //         offsetY = Math.min(Math.max(offsetY, containerRect.height - layerRect.height), 0);
    //         layer.style.left = `${offsetX}px`;
    //         layer.style.top = `${offsetY}px`;
    //     });
    //     canvasContainer.style.overflow = 'hidden';
    //     gel('zoomLevelDisplay').textContent = `🔎${(zoomLevel * 100).toFixed(0)}%`;
    // }
    // // Обновляем обработчик изменения размера окна
    // window.addEventListener('resize', () => {
    //     if (document.fullscreenElement) {
    //         resizeCanvas();
    //     }
    // });
    // // Добавляем слушатель события изменения полноэкранного режима
    // document.addEventListener('fullscreenchange', handleFullscreenChange);
    // document.addEventListener('webkitfullscreenchange', handleFullscreenChange);
    // document.addEventListener('mozfullscreenchange', handleFullscreenChange);
    // document.addEventListener('MSFullscreenChange', handleFullscreenChange);
    // // Обновляем стили для полноэкранного режима
    // const style = document.createElement('style');
    // style.textContent = `
    //     .base-container.fullscreen-mode {
    //         display: flex;
    //         width: 100vw;
    //         height: 100vh;
    //     }
    //     .base-container.fullscreen-mode .sidebar {
    //         height: 100vh;
    //         overflow-y: auto;
    //     }
    //     .base-container.fullscreen-mode .canvas-and-sliders {
    //         flex-grow: 1;
    //         height: 100vh;
    //         overflow: hidden;
    //     }
    //     .base-container.fullscreen-mode .canvas-container {
    //         width: 100%;
    //         height: 100%;
    //     }
    // `;
    // document.head.appendChild(style);


// Удаление всего
    const deleteAllBtn = gel('deleteAllBtn');
    deleteAllBtn.addEventListener('click', () => {
        if (confirm('Вы уверены, что хотите удалить содержимое всех слоев?')) {
            deleteAllLayers();
        }
    });
    function deleteAllLayers() {
        Object.keys(layers).forEach(layerNum => {
            if (parseInt(layerNum) === back) {
                return;
            }
            const ctx = contexts[layerNum];
            ctx.clearRect(0, 0, layers[layerNum].width, layers[layerNum].height);
            saveState();
        });
        // Обновляем отображение
        Object.values(layers).forEach(layer => {
            layer.style.display = 'block';
        });
    }



// залитие слоя нужным цветом
            function setCurBackground(layerIndex) {
                const color = gel('backgroundPicker').value;
                contexts[layerIndex].fillStyle = color;
                contexts[layerIndex].fillRect(0, 0, layers[layerIndex].width, layers[layerIndex].height);
                layerColors[layerIndex] = color;
                updateLayerButtonColor(layerIndex);
                layerDrawnOn[layerIndex] = true;
                updateLayerEyeIcon(layerIndex);
            }
                
// применение цвета для слоя и кисти colorPickers
    const colorPickers = document.querySelectorAll('input[type="color"]');
    colorPickers.forEach((picker, index) => {
        picker.addEventListener('input', (event) => {
            if (picker.id === 'outlineColorPicker') {
                // Обработка изменения цвета обводки
                applyOutline(currentLayer, parseInt(outlineSizeInput.value));
            } else if (picker.id === 'backgroundPicker') {
                setCurBackground(currentLayer);
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
// Очистка канваса
    const clearBtn = gel('clear');
    clearBtn.addEventListener('click', clearCanvas);
    function clearCanvas() {
        saveState();
        if (!curCtx) return; 
        curCtx.clearRect(0, 0, layers[currentLayer].width, layers[currentLayer].height);
        saveState();
    }
    // Flood Fill Functionality
            // const floodFillBtn = gel('floodFillBtn');
            // let isFloodFillActive = false; // Флаг для отслеживания состояния заливки
            // floodFillBtn.addEventListener('click', () => {
            //     isFloodFillActive = !isFloodFillActive;
            //     floodFillBtn.classList.toggle('active', isFloodFillActive);
            // });
            // function floodFill(e) {
            //     if (!curCtx) {
            //         console.error('Error: curCtx is undefined in floodFill. Current layer:', currentLayer);
            //         return;
            //     }
            //     const startX = e.offsetX;
            //     const startY = e.offsetY;
            //     const imageData = curCtx.getImageData(0, 0, cu.width, cu.height); // Use drawingCanvas
            //     const data = imageData.data;
            //     const width = imageData.width;
            //     const height = imageData.height;
            //     const targetColor = getPixelColor(data, startX, startY, width);
            //     const fillColor = hexToRgba(colorPicker.value);
            //     const tolerance = 30;
            //     if (colorMatch(targetColor, fillColor, tolerance)) return;
            //     const stack = [[startX, startY]];
            //     const visited = new Uint8Array(width * height);
            //     while (stack.length) {
            //         const [x, y] = stack.pop();
            //         const index = y * width + x;
            //         if (visited[index]) continue;
            //         visited[index] = 1;
            //         const pixelIndex = index * 4;
            //         const currentColor = data.slice(pixelIndex, pixelIndex + 4);
            //         if (colorMatch(currentColor, targetColor, tolerance) || isContourPixel(x, y, data, width, height, targetColor, tolerance)) {
            //             setPixelColor(data, x, y, width, fillColor);
            //             if (x > 0) stack.push([x - 1, y]);
            //             if (x < width - 1) stack.push([x + 1, y]);
            //             if (y > 0) stack.push([x, y - 1]);
            //             if (y < height - 1) stack.push([x, y + 1]);
            //         }
            //     }
            //     // Оптимизированный дополнительный проход
            //     for (let y = 0; y < height; y++) {
            //         for (let x = 0; x < width; x++) {
            //             const index = (y * width + x) * 4;
            //             if (!colorMatch(data.slice(index, index + 4), fillColor, 0) && shouldFillPixel(x, y, data, width, height, fillColor)) {
            //                 setPixelColor(data, x, y, width, fillColor);
            //             }
            //         }
            //     }
            //     curCtx.putImageData(imageData, 0, 0);
            //     saveState();
            // }


// ..функция сшивания(копия)
        // function ntc(e, narrowFactor = 0.9) {
        //             if (!isDrawing || !curCtx || !isFinger) return;
        //             const rect = layers[currentLayer].getBoundingClientRect();
        //             const x = Math.floor((e.clientX - rect.left) / zoomLevel);
        //             const y = Math.floor((e.clientY - rect.top) / zoomLevel);
        //             const brushSize = parseInt(brushSizeInput.value);
        //             const halfBrushSize = brushSize / 2;
        //             const imageData = curCtx.getImageData(x - halfBrushSize, y - halfBrushSize, brushSize, brushSize);
        //             const newImageData = curCtx.createImageData(brushSize, brushSize);
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
        //             curCtx.putImageData(newImageData, x - halfBrushSize, y - halfBrushSize);
        //             // Обновляем последние координаты
        //             lastX = x;
        //             lastY = y;
        //         }
// Цвет заливки пикер(отдельно от пикера цвета)
    // Это инструмент, позволяющий рисвовать контур и затем сразу заливать его вторым цветом.
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
    //         gel('colorPicker').value = pickedColor;
    //         setDrawingColor(pickedColor);
    //         // Optionally deactivate eyedropper after picking
    //         isEyedropperActive = false;
    //         document.body.style.cursor = 'auto';
    //         eyedropperBtn.classList.remove('active');
    //     }
    // }
