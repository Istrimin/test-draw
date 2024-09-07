if (window.PointerEvent) {
    console.log('Pointer events are supported');
} else {
    console.log('Pointer events are not supported');
}


// ---------- UI Elements ----------
const opacityInput = document.getElementById('opacity');
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
ctx.fillRect(0, 0, drawingCanvas .width, drawingCanvas .height);
brushSizeInput.value = 3;
brushSizeValue.textContent = brushSizeInput.value;

// ---------- Event Listeners ----------

// clearBtn.addEventListener('click', clearCanvasdrawing );


backgroundPicker.addEventListener('input', (event) => {
    drawingCanvas .style.backgroundColor = event.target.value;
    redrawCanvasdrawing ();
});

brushSizeInput.addEventListener('input', () => {
  brushSizeValue.textContent = brushSizeInput.value;
});


// ---------- Functions ----------

// function resizeCanvasdrawing () {
//     const rect = drawingCanvas .getBoundingClientRect();
//     drawingCanvas .width = rect.width * devicePixelRatio;
//     drawingCanvas .height = rect.height * devicePixelRatio;
//     ctx.scale(devicePixelRatio, devicePixelRatio);
// }

function resizeCanvasdrawing () {
  // Get the drawingCanvas  element's dimensions relative to the viewport
  const rect = drawingCanvas .getBoundingClientRect();

  // Update the drawingCanvas 's internal width and height, taking device pixel ratio into account
  // This ensures the drawingCanvas  renders sharply on high-resolution displays
  drawingCanvas .width = rect.width * devicePixelRatio;
  drawingCanvas .height = rect.height * devicePixelRatio;

  // Adjust the drawingCanvas  context's scaling to match the device pixel ratio
  // This ensures that drawing operations are scaled appropriately for the display
  ctx.scale(devicePixelRatio, devicePixelRatio);

  // Redraw the drawingCanvas  content after resizing
  // This prevents the drawing from being stretched or distorted
  redrawCanvasdrawing (); 
}



window.addEventListener('resize', resizeCanvasdrawing );
resizeCanvasdrawing ();

function redrawCanvasdrawing () {
    ctx.fillStyle = 
backgroundPicker.value;
    ctx.fillRect(0, 0, drawingCanvas .width, drawingCanvas .height);
    if (uploadedImage) {
      ctx.drawImage(uploadedImage, 0, 0, drawingCanvas .width, drawingCanvas .height);
    }
    history.forEach(imageData => ctx.putImageData(imageData, 0, 0));
}





saveImageBtn.addEventListener('click', () => {
  const link = document.createElement('a');
  link.download = 'my-drawing.png';
  link.href = drawingCanvas .toDataURL('image/png');
  link.click();
});

// new
drawingCanvas .style.cursor = 'url(../cursors/pipette.png), auto';
function toggleEyedropper() {
  isEyedropperActive = !isEyedropperActive;
  isBrushEyedropperActive = false;
  drawingCanvas .style.cursor = isEyedropperActive ? 'url(cursors/pipette.png), auto' : 'default';
}