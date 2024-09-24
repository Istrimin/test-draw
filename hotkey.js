document.addEventListener('keydown', (event) => {
  const keyCode = event.code;
  const elementMap = {
    KeyA: 'eyedropperBtn',
    KeyZ: undo, 
    KeyX: redo, 
    KeyB: 'backgroundPicker',
    KeyE: 'eraserBtn',
    KeyS: 'saveImageBtn',
    KeyR: 'clear',
    KeyQ: toggleSymmetry,
    KeyF: 'fillModeBtn',
    KeyU: 'UploadButton',
    KeyW: togglePreviousLayer, 
    KeyT: 'drawOnExistingBtn',
    KeyV: toggleSpider,
  };

  // Check for Ctrl + Arrow keys first for canvas movement
  if (event.ctrlKey && (event.key === 'ArrowUp' || event.key === 'ArrowDown' || event.key === 'ArrowLeft' || event.key === 'ArrowRight')) {
    const moveAmount = 1; // Количество пикселей для перемещения
    switch(event.key) {
        case 'ArrowLeft':
            moveCanvasContent(currentLayer, 'left', moveAmount);
            break;
        case 'ArrowRight':
            moveCanvasContent(currentLayer, 'right', moveAmount);
            break;
        case 'ArrowUp':
            moveCanvasContent(currentLayer, 'up', moveAmount);
            break;
        case 'ArrowDown':
            moveCanvasContent(currentLayer, 'down', moveAmount);
            break;
    }
  } else if (elementMap[keyCode]) { 
    const element = elementMap[keyCode];

    if (typeof element === 'string') {
      document.getElementById(element).click();
    } else if (typeof element === 'function') {
      element();
    } 
  } else if (event.altKey && (event.key === 'ArrowUp' || event.key === 'ArrowDown')) { // Move layer in stack with Alt + Up/Down

    moveLayerInStack(event.key === 'ArrowUp' ? -1 : 1);
  } else if (event.key === 'ArrowUp' || event.key === 'ArrowDown') { 

    moveLayerFocus(event.key === 'ArrowUp' ? -1 : 1);
  }
});


function moveLayerFocus(direction) {
  const lB = document.querySelectorAll('.layer-button');
  let currentLayerIndex = Array.from(lB).findIndex(button => button.classList.contains('active-layer'));

  let newIndex = (currentLayerIndex + direction + lB.length) % lB.length; // Wrap around
  lB[newIndex].click();
}

// buttons
    const imageInput = document.getElementById('imageInput');
    UploadB.addEventListener('click', () => imageInput.click());
    imageInput.addEventListener('change', importImage);
    undoBtn.addEventListener('click', undo);
    redoBtn.addEventListener('click', redo);