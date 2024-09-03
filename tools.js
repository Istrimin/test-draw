// // tools.js

// // Пипетка
// const eyedropperBtn = document.getElementById('eyedropperBtn');

// let isEyedropperActive = false;

// eyedropperBtn.addEventListener('click', () => {
//     isEyedropperActive = !isEyedropperActive;
//     document.body.style.cursor = isEyedropperActive ? 'crosshair' : 'default';

//     // Toggle the "active" class on the button
//     eyedropperBtn.classList.toggle('active'); 

//     // Immediately stop drawing when eyedropper is activated
//     if (isEyedropperActive) {
//         isDrawing = false; 
//     }
// });

// layer1.addEventListener('click', (e) => {
//     if (isEyedropperActive) {
//         const x = e.offsetX;
//         const y = e.offsetY;
//         const pixelData = ctx1.getImageData(x, y, 1, 1).data;
//         const hexColor = rgbToHex(pixelData[0], pixelData[1], pixelData[2]);
//         colorPicker.value = hexColor;

//         // Деактивируем пипетку и убираем подсветку кнопки
//         isEyedropperActive = false; 
//         document.body.style.cursor = 'default';
//         eyedropperBtn.classList.remove('active'); // Убираем класс 'active'
//     }
// });

// function rgbToHex(r, g, b) {
//     return "#" + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1);
// }


// // toggle

// // fillModeBtn.addEventListener('click', toggleFillMode);
// // function toggleFillMode() {
// //   isFillMode = !isFillMode;
// //   // Optionally add visual indication of fill mode being active or inactive
// //   fillModeBtn.classList.toggle('active', isFillMode); 
// // }

// // // fill

// // // Flood Fill Functionality
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
