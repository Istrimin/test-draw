// Initialize canvases and contexts


// Eyedropper functionality
// let isBrushEyedropperActive = false;





function rgbToHex(r, g, b) {
  if (r > 255 || g > 255 || b > 255)
    throw "Invalid color component";
  return ((r << 16) | (g << 8) | b).toString(16);
}

const clearBtn = document.getElementById('clear');
const saveImageBtn = document.getElementById('saveImageBtn');
const imageInput = document.getElementById('imageInput');
const UploadButton = document.getElementById('UploadButton');
const symmetryButton = document.getElementById('symmetry');
const fillModeBtn = document.getElementById('fillModeBtn');

// Create and append value displays
const brushSizeValue = document.createElement('span');
const opacityValue = document.createElement('span');
brushSizeInput.parentNode.appendChild(brushSizeValue);
opacityInput.parentNode.appendChild(opacityValue);
brushSizeValue.classList.add('input-value');
opacityValue.classList.add('input-value');


let uploadedImage = null;
let clearedCanvasState = null;
let isFillMode = false;

// Check for pressure support
try {
  isPressureSupported = !!window.PointerEvent && 'pressure' in PointerEvent.prototype;
} catch (e) { }


brushSizeInput.value = 3;
brushSizeValue.textContent = brushSizeInput.value;
opacityValue.textContent = opacityInput.value;

// Event listeners
UploadButton.addEventListener('click', () => imageInput.click());
imageInput.addEventListener('change', handleImageUpload);
symmetryButton.addEventListener('click', toggleSymmetry);
saveImageBtn.addEventListener('click', downloadImage);
// undoBtn.addEventListener('click', undo);
// redoBtn.addEventListener('click', redo);
clearBtn.addEventListener('click', clearCanvas);


backgroundPicker.addEventListener('input', (event) => {
  // Apply background color to the current layer
  currentCtx.fillStyle = event.target.value;
  currentCtx.fillRect(0, 0, layers[2].width, layers[2].height);


});


// backgroundPicker.addEventListener('input', (event) => {
//   // Apply background color to the first layer
//   currentCtx.fillStyle = event.target.value;
//   currentCtx.fillRect(0, 0, layers[2].width, layers[2].height);

//   // Update the displayed background color for layer 2
//   layer2.style.backgroundColor = event.target.value;

//   // Redraw the canvas
//   redrawCanvas();
// });

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
function handleImageUpload(event) {
  const file = event.target.files[0];
  const reader = new FileReader();
  reader.onload = (e) => {
    uploadedImage = new Image();
    uploadedImage.onload = () => {currentCtx.drawImage(uploadedImage, 0, 0, layer2.width, layer2.height);
    };
    uploadedImage.src = e.target.result;
  };
  reader.readAsDataURL(file);
}



function toggleSymmetry() {
  symmetry = !symmetry;
  symmetryButton.classList.toggle('active', symmetry);
}



// Drawing functions


// Eyedropper functions



let isEyedropperActive = false;
let isBrushEyedropperActive = false;

function getPixelColor(x, y) {
  if (!currentCtx) {
    console.error('Error: currentCtx is undefined in getPixelColor. Current layer:', currentLayer);
    return;
  }
  const pixelData = currentCtx.getImageData(x, y, 1, 1).data;
  return `#${pixelData[0].toString(16).padStart(2, '0')}${pixelData[1].toString(16).padStart(2, '0')}${pixelData[2].toString(16).padStart(2, '0')}`;
}

function handleEyedropperClick(e) {
  if (isEyedropperActive || isBrushEyedropperActive) {
    const rect = layers[currentLayer].getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const pickedColor = getPixelColor(x, y);

    if (isEyedropperActive) {
      document.getElementById('colorPicker').value = pickedColor;
      setDrawingColor(pickedColor); // Update the drawing color
    } else if (isBrushEyedropperActive) {
      document.getElementById('colorPicker3').value = pickedColor; // Assuming you want to set colorPicker3
      setDrawingColor(pickedColor); // Update the drawing color
    }
  }
}

canvasContainer.addEventListener('click', handleEyedropperClick);

function toggleEyedropper() {
  isEyedropperActive = !isEyedropperActive;
  isBrushEyedropperActive = false; // Ensure only one eyedropper is active at a time
  if (isEyedropperActive) {
    canvasContainer.style.cursor = 'url(cursors/pipette.png), auto'; // Assuming you have a pipette cursor image
  } else {
    canvasContainer.style.cursor = 'default';
  }
}

function toggleBrushEyedropper() {
  isBrushEyedropperActive = !isBrushEyedropperActive;
  isEyedropperActive = false; // Ensure only one eyedropper is active at a time
  if (isBrushEyedropperActive) {
    canvasContainer.style.cursor = 'url(cursors/pipette.png), auto'; // Assuming you have a pipette cursor image
  } else {
    canvasContainer.style.cursor = 'default';
  }
}

function toggleEyedropper() {
  isEyedropperActive = !isEyedropperActive;
  document.body.style.cursor = isEyedropperActive ? 'url(cursors/pipette.png), auto' : 'default';
}

function toggleBrushEyedropper() {
  isBrushEyedropperActive = !isBrushEyedropperActive;
  document.body.style.cursor = isBrushEyedropperActive ? 'url(cursors/pipette.png), auto' : 'default';
}


// function undo() {
//   if (history[currentLayer].length > 1) {
//     redoHistory[currentLayer].push(history[currentLayer].pop());
//     let previousState = history[currentLayer][history[currentLayer].length - 1];
//     contexts[currentLayer].clearRect(0, 0, layers[currentLayer].width, layers[currentLayer].height);
//     contexts[currentLayer].putImageData(previousState, 0, 0);
//   }
// }

// function redo() {
//   if (redoHistory[currentLayer].length > 0) {
//     history[currentLayer].push(redoHistory[currentLayer].pop());
//     let nextState = history[currentLayer][history[currentLayer].length - 1];
//     contexts[currentLayer].clearRect(0, 0, layers[currentLayer].width, layers[currentLayer].height);
//     contexts[currentLayer].putImageData(nextState, 0, 0);
//   }
// }






function downloadImage() {
  // Create a temporary canvas to merge all layers
  const mergeCanvas = document.createElement('canvas');
  const mergeCtx = mergeCanvas.getContext('2d');
  mergeCanvas.width = layers[2].width; // Assuming all layers have the same size
  mergeCanvas.height = layers[2].height;

  // Draw each layer onto the temporary canvas
  for (let i = 2; i <= layerCount; i++) {
    mergeCtx.drawImage(layers[i], 0, 0);
  }

  // Create a link and trigger the download
  const link = document.createElement('a');
  link.download = 'my-drawing.png';
  link.href = mergeCanvas.toDataURL('image/png');
  link.click();
}


function resizeCanvas() {
  const rect = canvasContainer.getBoundingClientRect();
  Object.values(layers).forEach(layer => {
    layer.width = rect.width * devicePixelRatio;
    layer.height = rect.height * devicePixelRatio;
    layer.getContext('2d').scale(devicePixelRatio, devicePixelRatio);
  });
  Object.keys(layers).forEach(layerNum => initializeLayer(parseInt(layerNum)));
}

window.addEventListener('resize', resizeCanvas);

resizeCanvas();

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

// add

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

// add 
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

// Обновленная функция saveState




// flood fill

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
