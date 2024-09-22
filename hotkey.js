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

  const element = elementMap[keyCode];

  if (element) {
    event.preventDefault();
    if (typeof element === 'string') {
      document.getElementById(element).click();
    } else if (typeof element === 'function') {
      element();
    }
  } else if (event.ctrlKey && (event.key === 'ArrowUp' || event.key === 'ArrowDown')) {
    event.preventDefault();
    moveLayerInStack(event.key === 'ArrowUp' ? -1 : 1);
  } else if (event.key === 'ArrowUp' || event.key === 'ArrowDown') {
    event.preventDefault();
    moveLayerFocus(event.key === 'ArrowUp' ? -1 : 1);
  }
});

function moveLayerFocus(direction) {
  const layerButtons = document.querySelectorAll('.layer-button');
  let currentLayerIndex = Array.from(layerButtons).findIndex(button => button.classList.contains('active-layer'));

  let newIndex = (currentLayerIndex + direction + layerButtons.length) % layerButtons.length; // Wrap around
  layerButtons[newIndex].click();
}