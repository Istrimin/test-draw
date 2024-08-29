// let lastDrawTime = 0;
// let lastX, lastY;
let lastX=0;
let lastY=0;
function draw(e) {
    if (!isDrawing) return;
    e.preventDefault();
    const x = e.offsetX;
    const y = e.offsetY;
    const pressure = e.pressure || 1;
    ctx.lineWidth = brushSizeInput.value * pressure;
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';
    ctx.strokeStyle = isEraser ? backgroundPicker.value : colorPicker.value;
    ctx.globalAlpha = opacityInput.value / 100;
    ctx.beginPath();
    ctx.moveTo(lastX, lastY);
    ctx.lineTo(x, y);
    ctx.stroke();
    if (symmetry) {
        const centerX = canvas.width / 2;
        ctx.save();
        ctx.scale(-1, 1);
        ctx.translate(-canvas.width, 0);
        ctx.beginPath();
        ctx.moveTo(2 * centerX - lastX, lastY);
        ctx.lineTo(2 * centerX - x, y);
        ctx.stroke();
        ctx.restore();
    }
    lastX = x;
    lastY = y;
}
function stopDrawing() {
    isDrawing = false;
}