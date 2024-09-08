document.addEventListener('keydown', function(event) {
    // Получаем код клавиши независимо от раскладки
    const keyCode = event.code;

    // Используем switch-case для обработки разных клавиш
    switch (keyCode) {
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

