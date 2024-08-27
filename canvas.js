export const canvas = document.getElementById('drawingCanvas');
export const ctx = canvas.getContext('2d');

let uploadedImage = null;
let clearedCanvasState = null;

export function initCanvas() {
    ctx.imageSmoothingEnabled = false;
    ctx.fillStyle = '#' + Math.floor(Math.random() * 16777215).toString(16);
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    
    window.addEventListener('resize', resizeCanvas);
    resizeCanvas();
}

export function resizeCanvas() {
    canvas.width = canvas.parentElement.offsetWidth;
    canvas.height = canvas.parentElement.offsetHeight;
}

export function redrawCanvas() {
    ctx.fillStyle = backgroundPicker.value;
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    if (uploadedImage) {
      ctx.drawImage(uploadedImage, 0, 0, canvas.width, canvas.height);
    }
    history.forEach(imageData => ctx.putImageData(imageData, 0, 0));
}

export function clearCanvas() {
    clearedCanvasState = ctx.getImageData(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = backgroundPicker.value;
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    history.push(clearedCanvasState);
    redoHistory = [];
}

export function handleImageUpload(event) {
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.onload = (e) => {
        uploadedImage = new Image();
        uploadedImage.onload = () => {
            ctx.drawImage(uploadedImage, 0, 0, canvas.width, canvas.height);
        };
        uploadedImage.src = e.target.result;
    };
    reader.readAsDataURL(file);
}

export function downloadImage() {
    const link = document.createElement('a');
    link.download = 'my-drawing.png';
    link.href = canvas.toDataURL('image/png');
    link.click();
}
