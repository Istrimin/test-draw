document.addEventListener('keydown', function(event) {
    // Normalize the key to be case-insensitive and layout-independent
    const keyPressed = event.key.toLowerCase(); 

    // Use a single switch for better organization
    switch (keyPressed) {
        case 'a': 
            document.getElementById('eyedropperBtn').click();
            break;
        case 'z':
            undo();
            break;
        case 'x':
            redo();
            break;
        case 'b': // Background color
            event.preventDefault();
            document.getElementById('backgroundPicker').click();
            break;
        case 'e': // Eraser
            event.preventDefault();
            document.getElementById('eraserBtn').click();
            break;
        case 's': // Save
            event.preventDefault();
            document.getElementById('saveImageBtn').click();
            break;
        case 'r': // Clear
            event.preventDefault();
            document.getElementById('clear').click();
            break;
        case 'q': // Symmetry
            event.preventDefault();
            document.getElementById('symmetry').click();
            break;
        case 'f': // Fill Mode
            event.preventDefault();
            document.getElementById('fillModeBtn').click();
            break;
        case 'u': // Upload Image
            event.preventDefault();
            document.getElementById('UploadButton').click();
            break;
        case 'w': // Toggle previous layer
            event.preventDefault(); 
            togglePreviousLayer();
            break;
    }
});

// ... rest of your hotkey.js code (togglePreviousLayer, etc.)

// ... (Your existing JavaScript code) ...

// ... (Your existing JavaScript code) ...

// пипетка
document.getElementById('eyedropperBtn').addEventListener('click', toggleEyedropper);
document.getElementById('brushEyedropperBtn').addEventListener('click', toggleBrushEyedropper);

// Keyboard shortcuts
document.addEventListener('keydown', (event) => {
  // ... (your existing number key logic)

  // Normalize the key for layout independence
  const keyPressed = event.code.toLowerCase(); 

  if (keyPressed === 'keya') {
    toggleEyedropper();
  } else if (keyPressed === 'keyd') {
    toggleBrushEyedropper();
  }
});
