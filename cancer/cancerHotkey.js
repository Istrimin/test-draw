document.addEventListener('keydown', function(event) {
    const action = {
        'KeyA': 'eyedropperBtn',
        'KeyZ': 'undo',
        'KeyX': 'redo',
        'KeyB': 'backgroundPicker',
        'KeyE': 'eraserBtn',
        'KeyS': 'saveImageBtn',
        'KeyR': 'clear',
        'KeyQ': 'symmetryBtn',
        'KeyV': 'smoothDrawingBtn',
        'KeyD': createOverlayLayer,
        'KeyG': toggleOverlayOpacity,
    }[event.code];

    if (action) {
        event.preventDefault();
        typeof action === 'string' ? document.getElementById(action)?.click() : action();
    }
});