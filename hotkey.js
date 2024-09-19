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
    KeyQ: 'symmetry',
    KeyF: 'fillModeBtn',
    KeyU: 'UploadButton',
    KeyW: togglePreviousLayer, 
    KeyT: 'drawOnExistingBtn',
    KeyV: toggleSpider,
  };

  const element = elementMap[keyCode];

  if (typeof element === 'string') {
    event.preventDefault();
    document.getElementById(element).click();
  } else if (typeof element === 'function') {
    event.preventDefault();
    element();
  }
});
