import { canvas, ctx, redrawCanvas } from './canvas.js';

let isDrawing = false;
let lastX = 0;
let lastY = 0;
export let history = [];
export let redoHistory = [];
let isEraser = false;
let symmetry = true;

export function initTools() {
    canvas.addEventListener('mousedown', startDrawing);
    canvas.addEventListener('mousemove', draw);
    canvas.addEventListener('mouseup', stopDrawing);
    canvas.addEventListener('mouseout', stopDrawing);
    canvas.addEventListener('click', floodFill);
}

function startDrawing(e) {
    isDrawing = true;
    lastX = e.offsetX;
    lastY = e.offsetY;
    saveState();
}

function draw(e) {
    if (!isDrawing) return;
    ctx.lineWidth = brushSize.value;
    ctx.lineCap = 'round';
    ctx.strokeStyle = isEraser ? backgroundPicker.value : colorPicker.value;
    ctx.globalAlpha = opacity.value / 100;
    ctx.beginPath();
    ctx.moveTo(lastX, lastY);
    ctx.lineTo(e.offsetX, e.offsetY);
    ctx.stroke();
    if (symmetry) {
        const centerX = canvas.width / 2;
        const mirroredX = 2 * centerX - e.offsetX;
        ctx.beginPath();
        ctx.moveTo(2 * centerX - lastX, lastY);
        ctx.lineTo(mirroredX, e.offsetY);
        ctx.stroke();
    }
    lastX = e.offsetX;
    lastY = e.offsetY;
}

function stopDrawing() {
    isDrawing = false;
}

export function toggleSymmetry() {
    symmetry = !symmetry;
    symmetryButton.classList.toggle('active', symmetry);
}

export function toggleEraser() {
    isEraser = !isEraser;
    eraserBtn.textContent = isEraser ? '🖌️' : '💩';
    if (isEraser) {
        setEraserCursor();
    } else {
        setDrawingCursor();
    }
}

export function setDrawingCursor() {
    canvas.classList.add('drawingCursor');
    canvas.classList.remove('eraserCursor');
}

export function setEraserCursor() {
    canvas.classList.add('eraserCursor');
    canvas.classList.remove('drawingCursor');
}

export function undo() {
    if (history.length > 1) {
        redoHistory.push(history.pop());
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        if (history.length === 0 && clearedCanvasState) {
            ctx.putImageData(clearedCanvasState, 0, 0);
        } else {
            redrawCanvas();
        }
    }
}

export function redo() {
    if (redoHistory.length > 0) {
        history.push(redoHistory.pop());
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        redrawCanvas();
    }
}

export function saveState() {
    history.push(ctx.getImageData(0, 0, canvas.width, canvas.height));
    redoHistory = [];
}

function floodFill(e) {
    const targetColor = ctx.getImageData(e.offsetX, e.offsetY, 1, 1).data;
    const fillColor = hexToRgba(colorPicker.value);
    const tolerance = 90;
    if (!colorMatch(targetColor, fillColor, tolerance)) {
        const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
        const data = imageData.data;
        const width = imageData.width;
        const stack = [[e.offsetX, e.offsetY]];
        while (stack.length) {
            const [x, y] = stack.pop();
            const index = (y * width + x) * 4;
            if (index < 0 || index > data.length - 4 ||
                !colorMatch(data.slice(index, index + 4), targetColor, tolerance)) {
                continue;
            }
            data[index] = fillColor[0];
            data[index + 1] = fillColor[1];
            data[index + 2] = fillColor[2];
            data[index + 3] = fillColor[3];
            stack.push([x + 1, y], [x - 1, y], [x, y + 1], [x, y - 1]);
        }
        ctx.putImageData(imageData, 0, 0);
        saveState();
    }
}

function hexToRgba(hex) {
    const r = parseInt(hex.slice(1, 3), 16);
    const g = parseInt(hex.slice(3, 5), 16);
    const b = parseInt(hex.slice(5, 7), 16);
    return [r, g, b, 255];
}

function colorMatch(a, b, tolerance) {
    return Math.abs(a[0] - b[0]) <= tolerance &&
           Math.abs(a[1] - b[1]) <= tolerance &&
           Math.abs(a[2] - b[2]) <= tolerance &&
           Math.abs(a[3] - b[3]) <= tolerance;
}
