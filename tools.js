export function exportImage() {
  // Create a temporary canvas to merge all layers
  const mergeCanvas = document.createElement('canvas');
  const mergeCtx = mergeCanvas.getContext('2d');
  mergeCanvas.width = layers[1].width;
  mergeCanvas.height = layers[1].height;

  // Get all layer buttons in their current order
  const layerButtons = document.querySelectorAll('.layer-button');

  // Draw each layer onto the temporary canvas in the correct order
  layerButtons.forEach((button) => {
    const layerId = parseInt(button.dataset.layer);
    if (layers[layerId]) {
      mergeCtx.drawImage(layers[layerId], 0, 0);
    }
  });

  // Create a link and trigger the download
  const link = document.createElement('a');
  link.download = 'my-drawing.png';
  link.href = mergeCanvas.toDataURL('image/png');
  link.click();
}


// // Пипетка
const eyedropperBtn = document.getElementById('eyedropperBtn');
let isEyedropperActive = false;
// Function to handle both click and touch events for eyedropper activation
function handleEyedropperActivation(e) {
  isEyedropperActive = !isEyedropperActive;
  document.body.style.cursor = isEyedropperActive ? 'url(cursors/pipette.png), auto' : 'default';
  eyedropperBtn.classList.toggle('active');
  if (isEyedropperActive) {
    isDrawing = false;
  }
}
// Add event listeners for both click and touchstart
eyedropperBtn.addEventListener('click', handleEyedropperActivation);
eyedropperBtn.addEventListener('touchstart', handleEyedropperActivation);
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
// Add event listeners for both click and touchstart on the canvas container
canvasContainer.addEventListener('click', handleEyedropperClick);
canvasContainer.addEventListener('touchstart', handleEyedropperClick);



// ~Двигаем слой
// переход по слоям
const moveLayerUpBtn = document.getElementById('moveLayerUp');
const moveLayerDownBtn = document.getElementById('moveLayerDown');
moveLayerUpBtn.addEventListener('click', () => {
  moveLayerInStack(-1);
});
moveLayerDownBtn.addEventListener('click', () => {
  moveLayerInStack(1);
});

function moveLayerInStack(direction) {
  const currentLayerButton = document.querySelector(`.layer-button[data-layer="${currentLayer}"]`);
  const targetLayerButton = direction === -1 ? currentLayerButton.previousElementSibling : currentLayerButton.nextElementSibling;
  if (targetLayerButton) {
    // Swap button positions in the DOM
    if (direction === -1) {
      currentLayerButton.parentNode.insertBefore(currentLayerButton, targetLayerButton);
    } else {
      currentLayerButton.parentNode.insertBefore(targetLayerButton, currentLayerButton);
    }
    // Update z-index of canvases
    updateLayerOrder();
    // Simulate click to update active layer
    currentLayerButton.click();
  }
}
// Получаем контейнер для кнопок слоёв
const layerButtonsContainer = document.getElementById('layerButtons');
// Делаем кнопки слоёв перетаскиваемыми
$(function () {
  $(layerButtonsContainer).sortable({
    // Обновляем порядок слоёв после перетаскивания
    update: function (event, ui) {
      updateLayerOrder();
    }
  });
  $(layerButtonsContainer).disableSelection();
});
// Функция для обновления порядка слоёв
function updateLayerOrder() {
  // Получаем все кнопки слоёв в новом порядке
  const layerButtons = layerButtonsContainer.querySelectorAll('.layer-button');
  // Обновляем z-index каждого слоя в соответствии с новым порядком кнопок
  layerButtons.forEach((button, index) => {
    const layerId = `layer${button.dataset.layer}`;
    const canvas = document.getElementById(layerId);
    canvas.style.zIndex = index + 1; // z-index начинается с 1
  });
}









// // ~Двигаем слой
// // переход по слоям
// const moveLayerUpBtn = document.getElementById('moveLayerUp');
// const moveLayerDownBtn = document.getElementById('moveLayerDown');
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
// const layerButtonsContainer = document.getElementById('layerButtons');
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
//     const canvas = document.getElementById(layerId);
//     canvas.style.zIndex = index + 1; // z-index начинается с 1
//   });
// }


// // tools.js
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