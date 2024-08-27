import { downloadImage, handleImageUpload } from './canvas.js';
import { toggleSymmetry, toggleEraser, undo, redo, clearCanvas } from './tools.js';

export function initUI() {
    const saveImageBtn = document.getElementById('saveImageBtn');
    const symmetryButton = document.getElementById('symmetry');
    const eraserBtn = document.getElementById('eraser');
    const undoBtn = document.getElementById('undo');
    const redoBtn = document.getElementById('redo');
    const clearBtn = document.getElementById('clear');
    const imageInput = document.getElementById('imageInput');
    const customUploadButton = document.getElementById('customUploadButton');
    const backgroundPicker = document.getElementById('backgroundPicker');
    
    saveImageBtn.addEventListener('click', downloadImage);
    symmetryButton.addEventListener('click', toggleSymmetry);
    eraserBtn.addEventListener('click', toggleEraser);
    undoBtn.addEventListener('click', undo);
    redoBtn.addEventListener('click', redo);
    clearBtn.addEventListener('click', clearCanvas);
    customUploadButton.addEventListener('click', () => imageInput.click());
    imageInput.addEventListener('change', handleImageUpload);
    
    backgroundPicker.addEventListener('input', (event) => {
        canvas.style.backgroundColor = event.target.value;
        redrawCanvas();
    });
    
    document.addEventListener('keydown', (event) => {
        if (event.code === 'KeyZ') {
            undo();
        } else if (event.code === 'KeyX') {
            redo();
        }
    });
    
    initInputValues();
}

function initInputValues() {
    const brushSizeInput = document.getElementById('brushSize');
    const opacityInput = document.getElementById('opacity');
    
    const brushSizeValue = document.createElement('span');
    const opacityValue = document.createElement('span');
    
    brushSizeValue.textContent = brushSizeInput.value;
    opacityValue.textContent = opacityInput.value;
    
    brushSizeValue.classList.add('input-value');
    opacityValue.classList.add('input-value');
    
    brushSizeInput.parentNode.insertBefore(brushSizeValue, brushSizeInput.nextSibling);
    opacityInput.parentNode.insertBefore(opacityValue, opacityInput.nextSibling);
    
    brushSizeInput.addEventListener('input', updateInputValue);
    opacityInput.addEventListener('input', updateInputValue);
}

function updateInputValue(event) {
    const valueSpan = event.target.nextSibling;
    valueSpan.textContent = event.target.value;
    
    if (event.target.id === 'opacity') {
        ctx.globalAlpha = event.target.value / 100;
    }
}
