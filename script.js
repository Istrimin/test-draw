
// ---------- UI Elements ----------
const 
backgroundPicker = document.getElementById('backgroundPicker');

// const colorPicker = document.getElementById('colorPicker');
// const colorPicker2 = document.getElementById('colorPicker2');
// const colorPicker3 = document.getElementById('colorPicker3');
// const colorPicker4 = document.getElementById('colorPicker4');

const brushSizeInput = document.getElementById('brushSize');
const opacityInput = document.getElementById('opacity');
const undoBtn = document.getElementById('undo');
const redoBtn = document.getElementById('redo');
const clearBtn = document.getElementById('clear');
// const inviteFriendsBtn = document.getElementById('inviteFriends');
const saveImageBtn = document.getElementById('saveImageBtn');
const imageInput = document.getElementById('imageInput');
const UploadButton = document.getElementById('UploadButton');
const symmetryButton = document.getElementById('symmetry');
const fillModeBtn = document.getElementById('fillModeBtn');

// Create elements to display brush size and opacity values
const brushSizeValue = document.createElement('span');
const opacityValue = document.createElement('span');

// Add the new elements to the DOM
brushSizeInput.parentNode.appendChild(brushSizeValue);
opacityInput.parentNode.appendChild(opacityValue);

// Optionally add classes for styling
brushSizeValue.classList.add('input-value');
opacityValue.classList.add('input-value');

// ---------- Drawing State ----------
let symmetry = true;
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
opacityValue.textContent = opacityInput.value;

// ---------- Event Listeners ----------
UploadButton.addEventListener('click', () => imageInput.click());
imageInput.addEventListener('change', handleImageUpload);
symmetryButton.addEventListener('click', toggleSymmetry);
saveImageBtn.addEventListener('click', downloadImage);
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

opacityInput.addEventListener('input', () => {
  opacityValue.textContent = opacityInput.value;
  ctx.globalAlpha = opacityInput.value / 100;
});

// ---------- Functions ----------
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

function toggleSymmetry() {
    symmetry = !symmetry;
    symmetryButton.classList.toggle('active', symmetry);
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

function saveState() {
    history.push(ctx.getImageData(0, 0, canvas.width, canvas.height));
    redoHistory = [];
}

function downloadImage() {
  const link = document.createElement('a');
  link.download = 'my-drawing.png';
  link.href = canvas.toDataURL('image/png');
  link.click();
}

canvas.addEventListener('pointerdown', startDrawing);
canvas.addEventListener('pointermove', draw);
canvas.addEventListener('pointerup', stopDrawing);
canvas.addEventListener('pointerout', stopDrawing);
canvas.addEventListener('pointercancel', stopDrawing);

function startDrawing(e) {
    isDrawing = true;
    [lastX, lastY] = [e.offsetX, e.offsetY];
}
function draw(e) {
  if (!isDrawing) return;

  e.preventDefault(); // Prevent default touch actions for smoother drawing
  const rect = canvas.getBoundingClientRect();
  const x = e.clientX - rect.left;
  const y = e.clientY - rect.top;
  const pressure = e.pressure || 1; // For pen pressure sensitivity

  ctx.lineWidth = brushSizeInput.value * pressure;
  ctx.lineCap = 'round';
  ctx.lineJoin = 'round';
  ctx.globalAlpha = opacityInput.value / 100;
  ctx.beginPath();
  ctx.moveTo(lastX, lastY);
  ctx.lineTo(x, y);
  ctx.stroke();

  if (symmetry) {
    const centerX = canvas.width / 2;
    ctx.save();
    ctx.scale(-1, 1);
    ctx.translate(-canvas.width, 0);
    ctx.beginPath();
    ctx.moveTo(2 * centerX - lastX, lastY);
    ctx.lineTo(2 * centerX - x, y);
    ctx.stroke();
    ctx.restore();
  }

  [lastX, lastY] = [x, y];
}


function stopDrawing() {
    if (isDrawing) {
        isDrawing = false;
        saveState();
    }
}




    function rgbToHex(r, g, b) {
        return "#" + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1);
    }
// new

const exitLink = document.getElementById('exitLink');
const doorSound = new Howl({
  src: ['sounds/door-close.wav'] 
});

exitLink.addEventListener('click', () => {
  doorSound.play();

  // Navigate after the sound finishes
  doorSound.once('end', () => {
    window.location.href = 'index.html';
  });
});


// colorpickers
    const colorPickers = document.querySelectorAll('input[type="color"]');
    let isEyedropperActive = false;
    let isBrushEyedropperActive=false;  


    function setDrawingColor(color) {
        ctx.strokeStyle = color;
    }

    function setFillColor(color) {
        // Здесь установите цвет заливки, если это необходимо
        // Например: ctx.fillStyle = color;
    }

    colorPickers.forEach(picker => {
        picker.addEventListener('input', (event) => {
            setDrawingColor(event.target.value);
        });
    });

// настройка по цифрам
document.addEventListener('keydown', (event) => {
  // Используем event.code вместо event.key для независимости от раскладки
  if (event.code >= 'Digit1' && event.code <= 'Digit9') {
    const index = parseInt(event.code.replace('Digit', '')) - 1;
    if (index < colorPickers.length) {
      const color = colorPickers[index].value;
      setDrawingColor(color);
    }


  } else if (event.code === 'KeyA') { // 'A' key regardless of layout
    toggleEyedropper();
  } else if (event.code === 'KeyD') { // 'D' key regardless of layout
    toggleBrushEyedropper();
  }
});



