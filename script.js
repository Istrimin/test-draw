// В начале или в конце вашего основного файла script.js
document.addEventListener('DOMContentLoaded', function() {
    // Инициализация логики курсоров
    window.initCursors();
});


// ---------- Canvas and Context ----------
const canvas = document.getElementById('drawingCanvas');
const ctx = canvas.getContext('2d');
ctx.imageSmoothingEnabled = false;

// ---------- UI Elements ----------
const backgroundPicker = document.getElementById('backgroundPicker');
const colorPicker = document.getElementById('colorPicker');
const brushSize = document.getElementById('brushSize');
const opacity = document.getElementById('opacity');
const eraserBtn = document.getElementById('eraser');
const undoBtn = document.getElementById('undo');
const redoBtn = document.getElementById('redo');
const clearBtn = document.getElementById('clear');
const inviteFriendsBtn = document.getElementById('inviteFriends');
const saveImageBtn = document.getElementById('saveImageBtn');
const imageInput = document.getElementById('imageInput');
const customUploadButton = document.getElementById('customUploadButton');
const symmetryButton = document.getElementById('symmetry');


// ---------- Drawing State ----------
let symmetry = true;
let isDrawing = false;
let lastX = 0;
let lastY = 0;
let history = [];
let redoHistory = [];
let isEraser = false;
let uploadedImage = null;
let clearedCanvasState = null; // Variable to store the cleared state

// ---------- Initialization ----------
ctx.fillStyle = '#' + Math.floor(Math.random() * 16777215).toString(16);
ctx.fillRect(0, 0, canvas.width, canvas.height);
brushSize.value = 3; 

// ---------- Event Listeners ----------

// VK API Interactions
inviteFriendsBtn.addEventListener('click', inviteFriends);

// Image Upload
customUploadButton.addEventListener('click', () => imageInput.click());
imageInput.addEventListener('change', handleImageUpload);

// Drawing Tools
symmetryButton.addEventListener('click', toggleSymmetry);
eraserBtn.addEventListener('click', toggleEraser); // Using eraserBtn consistently
eraserBtn.addEventListener('click', setEraserCursor); // If this is needed, consider renaming for clarity
setDrawingCursor(); // Set initial cursor

// Canvas Interactions
canvas.addEventListener('mousedown', startDrawing);
canvas.addEventListener('mousemove', draw);
canvas.addEventListener('mouseup', stopDrawing);
canvas.addEventListener('mouseout', stopDrawing);
canvas.addEventListener('click', floodFill); // Add flood fill on click


document.addEventListener('keydown', (event) => {
  // Используем event.code вместо event.key
  if (event.code === 'KeyZ') { 
    undo();
  } else if (event.code === 'KeyX') { 
    redo();
  }
});






// Control Buttons
saveImageBtn.addEventListener('click', downloadImage);
undoBtn.addEventListener('click', undo);
redoBtn.addEventListener('click', redo);
clearBtn.addEventListener('click', clearCanvas);

// Background and Color
backgroundPicker.addEventListener('input', (event) => {
    canvas.style.backgroundColor = event.target.value;
    redrawCanvas();
});


// Добавьте обработчики событий для обновления значений при изменении input
brushSizeInput.addEventListener('input', () => {
  brushSizeValue.textContent = brushSizeInput.value;
});


opacityInput.addEventListener('input', () => {
  opacityValue.textContent = opacityInput.value;
  // Update the ctx.globalAlpha property
  ctx.globalAlpha = opacityInput.value / 100; 
});



// thickenLinesBtn.addEventListener('click', thickenLines); 





// ---------- Functions ----------



// Image Handling
function handleImageUpload(event) {
  const file = event.target.files[0];
  const reader = new FileReader();

  reader.onload = (e) => {
    uploadedImage = new Image();
    uploadedImage.onload = () => {
      ctx.drawImage(uploadedImage, 0, 0, canvas.width, canvas.height);
    };
    uploadedImage.src = e.target.result;
  };
  reader.readAsDataURL(file);
}




function setDrawingCursor() {
    canvas.classList.add('drawingCursor');
    canvas.classList.remove('eraserCursor');
}

function setEraserCursor() {
    canvas.classList.add('eraserCursor');
    canvas.classList.remove('drawingCursor');
}

function undo() {
    if (history.length > 1) { // Check if there's more than one state in history
        redoHistory.push(history.pop());
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        // If history is empty after popping, restore from clearedCanvasState
        if (history.length === 0 && clearedCanvasState) {
            ctx.putImageData(clearedCanvasState, 0, 0);
        } else {
            redrawCanvas(); 
        }
    }
}

function redo() {
    if (redoHistory.length > 0) {
        history.push(redoHistory.pop());
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        redrawCanvas(); 
    }
}

function saveState() {
    history.push(ctx.getImageData(0, 0, canvas.width, canvas.height));
    redoHistory = []; 
}

// Download Image
function downloadImage() {
  const link = document.createElement('a');
  link.download = 'my-drawing.png'; 
  link.href = canvas.toDataURL('image/png');
  link.click();
}

// add resize canvas
function resizeCanvas() {
    canvas.width = canvas.parentElement.offsetWidth; // Or desired width
    canvas.height = canvas.parentElement.offsetHeight; // Or desired height
}

// Call resizeCanvas initially and on window resize
resizeCanvas();
window.addEventListener('resize', resizeCanvas);

// Flood Fill Functionality
function floodFill(e) {
  const targetColor = ctx.getImageData(e.offsetX, e.offsetY, 1, 1).data;
  const fillColor = hexToRgba(colorPicker.value);

  // Tolerance Level (adjust as needed)
  const tolerance = 90; // Allow a difference of 10 in RGB values

  if (!colorMatch(targetColor, fillColor, tolerance)) { // Pass tolerance to colorMatch
    const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    const data = imageData.data;
    const width = imageData.width;
    const stack = [[e.offsetX, e.offsetY]];

    while (stack.length) {
      const [x, y] = stack.pop();
      const index = (y * width + x) * 4;

      if (index < 0 || index > data.length - 4 || 
          !colorMatch(data.slice(index, index + 4), targetColor, tolerance)) { // Check with tolerance
        continue;
      }

      data[index] = fillColor[0];
      data[index + 1] = fillColor[1];
      data[index + 2] = fillColor[2];
      data[index + 3] = fillColor[3];

      stack.push([x + 1, y], [x - 1, y], [x, y + 1], [x, y - 1]);
    }

    ctx.putImageData(imageData, 0, 0);
    saveState();
  }
}

// Helper Functions for Flood Fill
function hexToRgba(hex) {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  return [r, g, b, 255]; // Assuming full opacity
}

function colorMatch(a, b, tolerance) {
  return Math.abs(a[0] - b[0]) <= tolerance &&
         Math.abs(a[1] - b[1]) <= tolerance &&
         Math.abs(a[2] - b[2]) <= tolerance &&
         Math.abs(a[3] - b[3]) <= tolerance;
}



// add  хинты и прочее
// Найдите элементы input для размера кисти и прозрачности
const brushSizeInput = document.getElementById('brushSize');
const opacityInput = document.getElementById('opacity');

// Создайте элементы <span> для отображения значений
const brushSizeValue = document.createElement('span');
const opacityValue = document.createElement('span');

// Добавьте начальные значения в <span>
brushSizeValue.textContent = brushSizeInput.value;
opacityValue.textContent = opacityInput.value;

// Добавьте классы к <span> для стилизации (необязательно)
brushSizeValue.classList.add('input-value');
opacityValue.classList.add('input-value');

// Вставьте <span> после соответствующих input
brushSizeInput.parentNode.insertBefore(brushSizeValue, brushSizeInput.nextSibling);
opacityInput.parentNode.insertBefore(opacityValue, opacityInput.nextSibling);

// ... (your existing code) ...

// function thickenLines() {
//   alert("Кнопка утолщения линий нажата!"); 
// }

//   if (history.length > 0) {
//     const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
//     const originalImageData = ctx.createImageData(canvas.width, canvas.height);
//     originalImageData.data.set(imageData.data); 

//     // Increase line width (you can adjust the increment value)
//     let newBrushSize = parseInt(brushSize.value) + 1; 
//     brushSize.value = newBrushSize; 

//     // Redraw all strokes with the thicker brush size
//     ctx.clearRect(0, 0, canvas.width, canvas.height);
//     history.forEach(state => {
//       ctx.putImageData(state, 0, 0);
//     }); 
//     redrawCanvas(); // Call redrawCanvas AFTER applying all states

//     // Save the thickened state as a new state in history
//     history.push(ctx.getImageData(0, 0, canvas.width, canvas.height));
//     redoHistory = []; 
//   }
