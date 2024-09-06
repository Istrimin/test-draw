if (window.PointerEvent) {
    console.log('Pointer events are supported');
} else {
    console.log('Pointer events are not supported');
}


// ---------- UI Elements ----------
const backgroundPicker = document.getElementById('backgroundPicker');

const brushSizeInput = document.getElementById('brushSize');
const opacityInput = document.getElementById('opacity');
const undoBtn = document.getElementById('undo');
const redoBtn = document.getElementById('redo');
const clearBtn = document.getElementById('clear');
const inviteFriendsBtn = document.getElementById('inviteFriends');
const saveImageBtn = document.getElementById('saveImageBtn');
const imageInput = document.getElementById('imageInput');
const UploadButton = document.getElementById('UploadButton');

const fillModeBtn = document.getElementById('fillModeBtn');

// Create elements to display brush size and opacity values
const brushSizeValue = document.createElement('span');
const opacityValue = document.createElement('span');

// Add the new elements to the DOM
brushSizeInput.parentNode.appendChild(brushSizeValue);

// Optionally add classes for styling
brushSizeValue.classList.add('input-value');

// ---------- Drawing State ----------
let isDrawing = false;
let lastX = 0;
let lastY = 0;
let history = [];
let redoHistory = [];
let uploadedImage = null;
let clearedCanvasState = null;
let isFillMode = false;

// ---------- Initialization ----------
ctx.fillStyle = '#' + Math.floor(Math.random() * 16777215).toString(16);
ctx.fillRect(0, 0, canvas.width, canvas.height);
brushSizeInput.value = 3;
brushSizeValue.textContent = brushSizeInput.value;

// ---------- Event Listeners ----------

undoBtn.addEventListener('click', undo);
redoBtn.addEventListener('click', redo);
clearBtn.addEventListener('click', clearCanvas);


backgroundPicker.addEventListener('input', (event) => {
    canvas.style.backgroundColor = event.target.value;
    redrawCanvas();
});

brushSizeInput.addEventListener('input', () => {
  brushSizeValue.textContent = brushSizeInput.value;
});


// ---------- Functions ----------

function resizeCanvas() {
    const rect = canvas.getBoundingClientRect();
    canvas.width = rect.width * devicePixelRatio;
    canvas.height = rect.height * devicePixelRatio;
    ctx.scale(devicePixelRatio, devicePixelRatio);
}

window.addEventListener('resize', resizeCanvas);
resizeCanvas();

function redrawCanvas() {
    ctx.fillStyle = 
backgroundPicker.value;
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    if (uploadedImage) {
      ctx.drawImage(uploadedImage, 0, 0, canvas.width, canvas.height);
    }
    history.forEach(imageData => ctx.putImageData(imageData, 0, 0));
}

function clearCanvas() {
    clearedCanvasState = ctx.getImageData(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = 
backgroundPicker.value;
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    history.push(clearedCanvasState);
    redoHistory = [];
}


function undo() {
    if (history.length > 1) {
        redoHistory.push(history.pop());
        ctx.clearRect(0, 0, canvas.width, canvas.height);
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



saveImageBtn.addEventListener('click', () => {
  const link = document.createElement('a');
  link.download = 'my-drawing.png';
  link.href = canvas.toDataURL('image/png');
  link.click();
});

// new
canvas.style.cursor = 'url(../cursors/pipette.png), auto';
function toggleEyedropper() {
  isEyedropperActive = !isEyedropperActive;
  isBrushEyedropperActive = false;
  canvas.style.cursor = isEyedropperActive ? 'url(cursors/pipette.png), auto' : 'default';
}