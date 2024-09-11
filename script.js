const UploadButton = document.getElementById('UploadButton');
const symmetryButton = document.getElementById('symmetry');
const fillModeBtn = document.getElementById('fillModeBtn');
let uploadedImage = null;
let clearedCanvasState = null;
let isFillMode = false;
// Check for pressure support
// try {
//   isPressureSupported = !!window.PointerEvent && 'pressure' in PointerEvent.prototype;
// } catch (e) { }
backgroundPicker.addEventListener('input', (event) => {
  // Apply background color to the current layer
  currentCtx.fillStyle = event.target.value;
  currentCtx.fillRect(0, 0, layers[2].width, layers[2].height);
  });
// *toggle eraser
        eraserBtn.addEventListener('click', toggleEraser);
        function toggleEraser() {
            isErasing = !isErasing;
            eraserBtn.classList.toggle('active', isErasing);
            // Change the cursor to indicate eraser mode
            if (isErasing) {
                document.body.style.cursor = 'url(cursors/eraser.png), auto'; // Assuming you have an eraser cursor image
            } else {
                document.body.style.cursor = 'default';
            }
        }

brushSizeInput.addEventListener('input', () => {
  brushSizeValue.textContent = brushSizeInput.value;
  });
opacityInput.addEventListener('input', () => {
  opacityValue.textContent = opacityInput.value;
  currentCtx.globalAlpha = opacityInput.value / 100;
  });
// Layer switching
  document.querySelectorAll('.layer-button').forEach(button => {
    button.addEventListener('click', function () {
      // Remove active class from previously active layer
      document.querySelector('.active-layer').classList.remove('active-layer');
      // Add active class to the clicked layer
      this.classList.add('active-layer');
      // Update currentLayer and currentCtx
      currentLayer = parseInt(this.dataset.layer);
      currentCtx = window['ctx' + currentLayer];
      // Ensure no drawing is happening when switching layers
      isDrawing = false;
    });
  });
// Functions
function importImage(event) {
  const file = event.target.files[0];
  const reader = new FileReader();
  reader.onload = (e) => {
    uploadedImage = new Image();
    uploadedImage.onload = () => {
      currentCtx.drawImage(uploadedImage, 0, 0, layer2.width, layer2.height);
    };
    uploadedImage.src = e.target.result;
  };
  reader.readAsDataURL(file);
}
function toggleSymmetry() {
  symmetry = !symmetry;
  symmetryButton.classList.toggle('active', symmetry);
}
// function resizeCanvas() {
//   const rect = canvasContainer.getBoundingClientRect();
//   Object.values(layers).forEach(layer => {
//     layer.width = rect.width * devicePixelRatio;
//     layer.height = rect.height * devicePixelRatio;
//     layer.getContext('2d').scale(devicePixelRatio, devicePixelRatio);
//   });
//   Object.keys(layers).forEach(layerNum => initializeLayer(parseInt(layerNum)));
//   }
//   window.addEventListener('resize', resizeCanvas);
//   resizeCanvas();
// Exit functionality
  const exitLink = document.getElementById('exitLink');
  const doorSound = new Howl({
    src: ['sounds/door-close.wav']
  });
  exitLink.addEventListener('click', () => {
    doorSound.play();
    doorSound.once('end', () => {
      window.location.href = 'index.html';
    });
  });
  function setDrawingColor(color) {
    if (currentCtx) {
      // Store the color for the current layer
      layerColors[currentLayer] = color;
      // Update the current context's color for immediate visual feedback
      currentCtx.strokeStyle = color;
      // Update button color when drawing color changes
      updateLayerButtonColor(currentLayer);
    }
  }
// Функция отмены
  function undo() {
    if (history[currentLayer] && history[currentLayer].length > 0) {
      if (history[currentLayer].length === 1) {
        // Если это последнее состояние, сохраняем текущее состояние перед очисткой
        const currentState = currentCtx.getImageData(0, 0, layers[currentLayer].width, layers[currentLayer].height);
        redoHistory[currentLayer].push(currentState);
        // Очищаем холст
        currentCtx.clearRect(0, 0, layers[currentLayer].width, layers[currentLayer].height);
      } else {
        // Сохраняем текущее состояние в redoHistory
        const currentState = currentCtx.getImageData(0, 0, layers[currentLayer].width, layers[currentLayer].height);
        redoHistory[currentLayer].push(currentState);
        // Возвращаемся к предыдущему состоянию
        const previousState = history[currentLayer].pop();
        currentCtx.putImageData(previousState, 0, 0);
      }
    }
  }
  // Функция повтора
  function redo() {
    if (redoHistory[currentLayer] && redoHistory[currentLayer].length > 0) {
      const nextState = redoHistory[currentLayer].pop();
      // Сохраняем текущее состояние в history перед применением redo
      const currentState = currentCtx.getImageData(0, 0, layers[currentLayer].width, layers[currentLayer].height);
      history[currentLayer].push(currentState);
      currentCtx.putImageData(nextState, 0, 0);
    }
  }
// fix flood fill
  // // Flood Fill Functionality
  // function floodFill(e) {
  //   const startX = e.offsetX;
  //   const startY = e.offsetY;
  //   const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
  //   const data = imageData.data;
  //   const width = imageData.width;
  //   const height = imageData.height;
  //   const targetColor = getPixelColor(data, startX, startY, width);
  //   const fillColor = hexToRgba(colorPicker.value);
  //   const tolerance = 30;
  //   if (colorMatch(targetColor, fillColor, tolerance)) return;
  //   const stack = [[startX, startY]];
  //   const visited = new Uint8Array(width * height);
  //   while (stack.length) {
  //     const [x, y] = stack.pop();
  //     const index = y * width + x;
  //     if (visited[index]) continue;
  //     visited[index] = 1;
  //     const pixelIndex = index * 4;
  //     const currentColor = data.slice(pixelIndex, pixelIndex + 4);
  //     if (colorMatch(currentColor, targetColor, tolerance) || isContourPixel(x, y, data, width, height, targetColor, tolerance)) {
  //       setPixelColor(data, x, y, width, fillColor);
  //       if (x > 0) stack.push([x - 1, y]);
  //       if (x < width - 1) stack.push([x + 1, y]);
  //       if (y > 0) stack.push([x, y - 1]);
  //       if (y < height - 1) stack.push([x, y + 1]);
  //     }
  //   }
  //   // Оптимизированный дополнительный проход
  //   for (let y = 0; y < height; y++) {
  //     for (let x = 0; x < width; x++) {
  //       const index = (y * width + x) * 4;
  //       if (!colorMatch(data.slice(index, index + 4), fillColor, 0) && shouldFillPixel(x, y, data, width, height, fillColor)) {
  //         setPixelColor(data, x, y, width, fillColor);
  //       }
  //     }
  //   }
  //   ctx.putImageData(imageData, 0, 0);
  //   saveState();
  // }
  // function getPixelColor(data, x, y, width) {
  //   const index = (y * width + x) * 4;
  //   return data.slice(index, index + 4);
  // }
  // function setPixelColor(data, x, y, width, color) {
  //   const index = (y * width + x) * 4;
  //   data.set(color, index);
  // }
  // function isContourPixel(x, y, data, width, height, targetColor, tolerance) {
  //   const directions = [[-1, 0], [1, 0], [0, -1], [0, 1], [-1, -1], [-1, 1], [1, -1], [1, 1]];
  //   const currentColor = getPixelColor(data, x, y, width);
  //   if (colorMatch(currentColor, targetColor, tolerance)) return false;
  //   return directions.some(([dx, dy]) => {
  //     const nx = x + dx;
  //     const ny = y + dy;
  //     if (nx >= 0 && nx < width && ny >= 0 && ny < height) {
  //       const neighborColor = getPixelColor(data, nx, ny, width);
  //       return colorMatch(neighborColor, targetColor, tolerance);
  //     }
  //     return false;
  //   });
  // }
  // function shouldFillPixel(x, y, data, width, height, fillColor) {
  //   const directions = [[-1, 0], [1, 0], [0, -1], [0, 1], [-1, -1], [-1, 1], [1, -1], [1, 1]];
  //   let filledNeighbors = 0;
  //   for (const [dx, dy] of directions) {
  //     const nx = x + dx;
  //     const ny = y + dy;
  //     if (nx >= 0 && nx < width && ny >= 0 && ny < height) {
  //       const neighborColor = getPixelColor(data, nx, ny, width);
  //       if (colorMatch(neighborColor, fillColor, 0)) {
  //         filledNeighbors++;
  //       }
  //     }
  //   }
  //   return filledNeighbors >= 5;
  // }
  // function hexToRgba(hex) {
  //   const r = parseInt(hex.slice(1, 3), 16);
  //   const g = parseInt(hex.slice(3, 5), 16);
  //   const b = parseInt(hex.slice(5, 7), 16);
  //   return [r, g, b, 255];
  // }
  // function colorMatch(a, b, tolerance) {
  //   return Math.abs(a[0] - b[0]) <= tolerance &&
  //          Math.abs(a[1] - b[1]) <= tolerance &&
  //          Math.abs(a[2] - b[2]) <= tolerance &&
  //          Math.abs(a[3] - b[3]) <= tolerance;
  // }
  // // Modify the event listener for floodFill
  // canvas.addEventListener('click', (e) => {
  //   if (isFillMode) {
  //     floodFill(e);
  //   }
  // });