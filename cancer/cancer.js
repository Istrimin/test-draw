if (window.PointerEvent) {
    console.log('Pointer events are supported');
} else {
    console.log('Pointer events are not supported');
}


// ---------- UI Elements ----------
// const backgroundPicker = document.getElementById('backgroundPicker');

// const brushSizeInput = document.getElementById('brushSize');
const opacityInput = document.getElementById('opacity');
// const undoBtn = document.getElementById('undo');
// const redoBtn = document.getElementById('redo');
// const clearBtn = document.getElementById('clear');
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

let uploadedImage = null;
let clearedCanvasState = null;
let isFillMode = false;

// ---------- Initialization ----------
ctx.fillStyle = '#' + Math.floor(Math.random() * 16777215).toString(16);
ctx.fillRect(0, 0, Canvasdrawing .width, Canvasdrawing .height);
brushSizeInput.value = 3;
brushSizeValue.textContent = brushSizeInput.value;

// ---------- Event Listeners ----------

// clearBtn.addEventListener('click', clearCanvasdrawing );


backgroundPicker.addEventListener('input', (event) => {
    Canvasdrawing .style.backgroundColor = event.target.value;
    redrawCanvasdrawing ();
});

brushSizeInput.addEventListener('input', () => {
  brushSizeValue.textContent = brushSizeInput.value;
});


// ---------- Functions ----------

// function resizeCanvasdrawing () {
//     const rect = Canvasdrawing .getBoundingClientRect();
//     Canvasdrawing .width = rect.width * devicePixelRatio;
//     Canvasdrawing .height = rect.height * devicePixelRatio;
//     ctx.scale(devicePixelRatio, devicePixelRatio);
// }

function resizeCanvasdrawing () {
  // Get the Canvasdrawing  element's dimensions relative to the viewport
  const rect = Canvasdrawing .getBoundingClientRect();

  // Update the Canvasdrawing 's internal width and height, taking device pixel ratio into account
  // This ensures the Canvasdrawing  renders sharply on high-resolution displays
  Canvasdrawing .width = rect.width * devicePixelRatio;
  Canvasdrawing .height = rect.height * devicePixelRatio;

  // Adjust the Canvasdrawing  context's scaling to match the device pixel ratio
  // This ensures that drawing operations are scaled appropriately for the display
  ctx.scale(devicePixelRatio, devicePixelRatio);

  // Redraw the Canvasdrawing  content after resizing
  // This prevents the drawing from being stretched or distorted
  redrawCanvasdrawing (); 
}



window.addEventListener('resize', resizeCanvasdrawing );
resizeCanvasdrawing ();

function redrawCanvasdrawing () {
    ctx.fillStyle = 
backgroundPicker.value;
    ctx.fillRect(0, 0, Canvasdrawing .width, Canvasdrawing .height);
    if (uploadedImage) {
      ctx.drawImage(uploadedImage, 0, 0, Canvasdrawing .width, Canvasdrawing .height);
    }
    history.forEach(imageData => ctx.putImageData(imageData, 0, 0));
}





saveImageBtn.addEventListener('click', () => {
  const link = document.createElement('a');
  link.download = 'my-drawing.png';
  link.href = Canvasdrawing .toDataURL('image/png');
  link.click();
});

// new
Canvasdrawing .style.cursor = 'url(../cursors/pipette.png), auto';
function toggleEyedropper() {
  isEyedropperActive = !isEyedropperActive;
  isBrushEyedropperActive = false;
  Canvasdrawing .style.cursor = isEyedropperActive ? 'url(cursors/pipette.png), auto' : 'default';
}