
const rect = drawingCanvas.getBoundingClientRect();
const pickColor = (e) => {
  
  const x = e.clientX - rect.left;
  const y = e.clientY - rect.top;
  const pixelData = ctx.getImageData(x, y, 1, 1).data;
  const pickedColor = `rgb(${pixelData[0]}, ${pixelData[1]}, ${pixelData[2]})`;

  colorPicker.value = rgbToHex(pickedColor);

  toggleEyedropper();
};

const rgbToHex = (rgb) => {
  rgb = rgb.match(/^rgb\((\d+),\s*(\d+),\s*(\d+)\)$/);
  const hex = (x) => {
    return (`0${parseInt(x).toString(16)}`).slice(-2);
  }
  return `#${hex(rgb[1])}${hex(rgb[2])}${hex(rgb[3])}`;
};

		eyedropperBtn.addEventListener('click', toggleEyedropper);