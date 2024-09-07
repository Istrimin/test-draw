document.addEventListener('keydown', function(event) {
    // Получаем код клавиши независимо от раскладки
    const keyCode = event.code;

    // Используем switch-case для обработки разных клавиш
    switch (keyCode) {
        case 'KeyA':
            document.getElementById('eyedropperBtn').click();
            break;
        case 'KeyZ':
            document.getElementById('undo').click();
                break;
        case 'KeyX':
            event.preventDefault();
            document.getElementById('redo').click();
            break;
        case 'KeyB': // Background color
            event.preventDefault();
            document.getElementById('backgroundPicker').click();
            break;
        case 'KeyE': // Eraser
            event.preventDefault();
            document.getElementById('eraserBtn').click();
            break;
        case 'KeyS': // Save
            event.preventDefault();
            document.getElementById('saveImageBtn').click();
            break;
        case 'KeyR': // Clear
            event.preventDefault();
            document.getElementById('clear').click();
            break;
        case 'KeyQ': // Symmetry
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
        case 'KeyW': // Toggle previous layer
            event.preventDefault();
            togglePreviousLayer();
            break;
    }
});

// // пипетка
// document.getElementById('eyedropperBtn').addEventListener('click', toggleEyedropper);
// document.getElementById('brushEyedropperBtn').addEventListener('click', toggleBrushEyedropper);

// // Keyboard shortcuts
// document.addEventListener('keydown', (event) => {
//   // ... (your existing number key logic)

//   // Используем код клавиши, не зависящий от раскладки
//   const keyCode = event.code;

//   if (keyCode === 'KeyA') {
//     toggleEyedropper();
//   } else if (keyCode === 'KeyD') {
//     toggleBrushEyedropper();
//   }
// });
