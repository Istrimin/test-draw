document.addEventListener('keydown', function(event) {
  // Use a single switch for better organization
  switch (event.code) {
    case 'KeyA':
      document.getElementById('eyedropperBtn').click();
      break;
    case 'KeyZ':
      undo();
      break;
    case 'KeyX':
      redo();
      break;
    case 'KeyB': // Background color
      event.preventDefault();
      triggerColorPicker('backgroundPicker');
      break;
    case 'KeyC': // Drawing color
      event.preventDefault();
      triggerColorPicker('colorPicker');
      break;
    case 'KeyE': // Eraser
      event.preventDefault();
      document.getElementById('eraser').click();
      break;
    case 'KeyS': // Symmetry
      event.preventDefault();
      document.getElementById('symmetry').click();
      break;
    case 'KeyF': // Fill Mode
      event.preventDefault();
      document.getElementById('fillModeBtn').click();
      break;
    case 'KeyU': // Upload Image
      event.preventDefault();
      document.getElementById('UploadButton').click();
      break;

  }
});

function triggerColorPicker(pickerId) {
  const picker = document.getElementById(pickerId);

  // Check if the picker is already open
  if (document.activeElement === picker) {
    // Picker is open, so close it by blurring
    picker.blur();
  } else {
    // Picker is closed, so open it
    picker.click();

    // Create a temporary element to click on (for reliable closing)
    const tempElement = document.createElement('div');
    tempElement.style.position = 'absolute'; 
    tempElement.style.top = '-9999px';
    tempElement.style.left = '-9999px';
    document.body.appendChild(tempElement);

    // Simulate a click on the temporary element to ensure closure
    tempElement.click();

    // Remove the temporary element
    document.body.removeChild(tempElement);
  }
}

