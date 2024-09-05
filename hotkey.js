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
            // document.getElementById('undoBtn').click();
            break;
        case 'KeyX':
            redo(); 
            // document.getElementById('redoBtn').click();
            break;
        case 'KeyB':
            event.preventDefault();
            document.getElementById('backgroundPicker').click();
            break;
        case 'KeyE':
            event.preventDefault();
            document.getElementById('eraserBtn').click();
            break;
        case 'KeyS':
            event.preventDefault();
            document.getElementById('saveImageBtn').click();
            break;
        case 'KeyR':
            event.preventDefault();
            document.getElementById('clear').click();
            break;
        case 'KeyQ':
            event.preventDefault();
            document.getElementById('symmetry').click();
            break;
        case 'KeyF':
            event.preventDefault();
            document.getElementById('fillModeBtn').click();
            break;
        case 'KeyU':
            event.preventDefault();
            document.getElementById('UploadButton').click();
            break;
        case 'KeyW':
            event.preventDefault();
            togglePreviousLayer();
            break;
    }
});

// пипетка
document.getElementById('eyedropperBtn').addEventListener('click', toggleEyedropper);
document.getElementById('brushEyedropperBtn').addEventListener('click', toggleBrushEyedropper);

// Keyboard shortcuts
document.addEventListener('keydown', (event) => {

  const keyCode = event.code;

  if (keyCode === 'KeyA') {
    toggleEyedropper();
  } else if (keyCode === 'KeyD') {
    toggleBrushEyedropper();
  }
});
