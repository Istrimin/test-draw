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
                    document.getElementById('backgroundPicker').click();
                    break;
                case 'KeyE': // Eraser
                    event.preventDefault();
                    document.getElementById('eraser').click();
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
            }
        });

// кнопки
// ... (Your existing JavaScript code) ...

// Get the undo and redo buttons by their IDs
const undoButton = document.getElementById('undo');
const redoButton = document.getElementById('redo');

// Add event listeners for 'click' events
undoButton.addEventListener('click', undo);
redoButton.addEventListener('click', redo);

// ... (Rest of your JavaScript code) ...
