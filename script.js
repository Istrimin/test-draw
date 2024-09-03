    // Initialize canvases and contexts


        // Eyedropper functionality
        let isBrushEyedropperActive = false;

        function toggleEyedropper() {
            isEyedropperActive = !isEyedropperActive;
            isBrushEyedropperActive = false;
            document.body.style.cursor = isEyedropperActive ? 'url(cursors/pipette.png), auto' : 'default';
        }

        function toggleBrushEyedropper() {
            isBrushEyedropperActive = !isBrushEyedropperActive;
            isEyedropperActive = false;
            document.body.style.cursor = isBrushEyedropperActive ? 'url(cursors/pipette.png), auto' : 'default';
        }

        document.getElementById('eyedropperBtn').addEventListener('click', toggleEyedropper);
        document.getElementById('brushEyedropperBtn').addEventListener('click', toggleBrushEyedropper);

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
} catch (e) {}


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
  layer1.style.backgroundColor = event.target.value;
  redrawCanvas();
});
brushSizeInput.addEventListener('input', () => {
  brushSizeValue.textContent = brushSizeInput.value;
});
opacityInput.addEventListener('input', () => {
  opacityValue.textContent = opacityInput.value;
  currentCtx.globalAlpha = opacityInput.value / 100;
});

// Layer switching
document.querySelectorAll('.layer-button').forEach(button => {
  button.addEventListener('click', function() {
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
    uploadedImage.onload = () => {
      currentCtx.drawImage(uploadedImage, 0, 0, layer1.width, layer1.height);
    };
    uploadedImage.src = e.target.result;
  };
  reader.readAsDataURL(file);
}


function redrawCanvas() {
  currentCtx.fillStyle = backgroundPicker.value;
  currentCtx.fillRect(0, 0, layer1.width, layer1.height);
  if (uploadedImage) {
    currentCtx.drawImage(uploadedImage, 0, 0, layer1.width, layer1.height);
  }
  history.forEach(imageData => currentCtx.putImageData(imageData, 0, 0));
}


function toggleSymmetry() {
  symmetry = !symmetry;
  symmetryButton.classList.toggle('active', symmetry);
}



// Drawing functions

// Keyboard shortcuts
document.addEventListener('keydown', (event) => {
  if (event.code >= 'Digit1' && event.code <= 'Digit9') {
    const index = parseInt(event.code.replace('Digit', '')) - 1;
    if (index < colorPickers.length) {
      const color = colorPickers[index].value;
      setDrawingColor(color);
    }
  } else if (event.code === 'KeyA') {
    toggleEyedropper();
  } else if (event.code === 'KeyD') {
    toggleBrushEyedropper();
  }
});

// Eyedropper functions
function toggleEyedropper() {
  isEyedropperActive = !isEyedropperActive;
  document.body.style.cursor = isEyedropperActive ? 'url(cursors/pipette.png), auto' : 'default';
}

function toggleBrushEyedropper() {
  isBrushEyedropperActive = !isBrushEyedropperActive;
  document.body.style.cursor = isBrushEyedropperActive ? 'url(cursors/pipette.png), auto' : 'default';
}

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

