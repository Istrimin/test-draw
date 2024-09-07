
// new

// пипетка
backgroundCanvas.style.cursor = 'url(../cursors/pipette.png), auto';
function toggleEyedropper() {
  isEyedropperActive = !isEyedropperActive;
  isBrushEyedropperActive = false;
  backgroundCanvas.style.cursor = isEyedropperActive ? 'url(cursors/pipette.png), auto' : 'default';
}

function toggleEyedropper() {
  isEyedropperActive = !isEyedropperActive;
  eyedropperBtn.classList.toggle('active', isEyedropperActive);

  if (isEyedropperActive) {
    drawingCanvas.style.cursor = 'url(cursors/3.png), auto';

    drawingCanvas.addEventListener('click', pickColor, { once: true });
  } else {
    drawingCanvas.style.cursor = 'default';
  }
}

function pickColor(e) {
  const rect = drawingCanvas.getBoundingClientRect();
  const x = e.clientX - rect.left;
  const y = e.clientY - rect.top;
  const pixelData = ctx.getImageData(x, y, 1, 1).data;
  const pickedColor = `rgb(${pixelData[0]}, ${pixelData[1]}, ${pixelData[2]})`;

  colorPicker.value = rgbToHex(pickedColor);

  toggleEyedropper();
}

function rgbToHex(rgb) {
  rgb = rgb.match(/^rgb\((\d+),\s*(\d+),\s*(\d+)\)$/);
  function hex(x) {
    return ("0" + parseInt(x).toString(16)).slice(-2);
  }
  return "#" + hex(rgb[1]) + hex(rgb[2]) + hex(rgb[3]);
}

		eyedropperBtn.addEventListener('click', toggleEyedropper);