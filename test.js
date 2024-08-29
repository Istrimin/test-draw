// let lastDrawTime = 0;
// let lastX, lastY;
let lastX=0;
let lastY=0;


// function startDrawing(e) {
//     e.preventDefault();
//     isDrawing = true;
//     points = [];
//     points.push({
//         x: e.offsetX,
//         y: e.offsetY,
//         pressure: e.pressure || 1
//     });
//     saveState();
//     e.target.setPointerCapture(e.pointerId);
// }

function startDrawing(e) {
    isDrawing = true;
    [lastX, lastY] = [e.offsetX, e.offsetY];
}
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

    [lastX, lastY] = [x, y];
}

// canvas.addEventListener('mousedown', startDrawing);
// canvas.addEventListener('mousemove', draw);
// canvas.addEventListener('mouseup', stopDrawing);
// canvas.addEventListener('mouseout', stopDrawing);

// Для поддержки сенсорных устройств
canvas.addEventListener('touchstart', (e) => {
    e.preventDefault();
    const touch = e.touches[0];
    startDrawing({offsetX: touch.clientX - canvas.offsetLeft, offsetY: touch.clientY - canvas.offsetTop});
});
canvas.addEventListener('touchmove', (e) => {
    e.preventDefault();
    const touch = e.touches[0];
    draw({offsetX: touch.clientX - canvas.offsetLeft, offsetY: touch.clientY - canvas.offsetTop});
});
canvas.addEventListener('touchend', stopDrawing);



// function draw(e) {
//     if (!isDrawing) return;
//     e.preventDefault();
//     const x = e.offsetX;
//     const y = e.offsetY;
//     const pressure = e.pressure || 1;
//     ctx.lineWidth = brushSizeInput.value * pressure;
//     ctx.lineCap = 'round';
//     ctx.lineJoin = 'round';
//     ctx.strokeStyle = isEraser ? backgroundPicker.value : colorPicker.value;
//     ctx.globalAlpha = opacityInput.value / 100;
//     ctx.beginPath();
//     ctx.moveTo(lastX, lastY);
//     ctx.lineTo(x, y);
//     ctx.stroke();
//     if (symmetry) {
//         const centerX = canvas.width / 2;
//         ctx.save();
//         ctx.scale(-1, 1);
//         ctx.translate(-canvas.width, 0);
//         ctx.beginPath();
//         ctx.moveTo(2 * centerX - lastX, lastY);
//         ctx.lineTo(2 * centerX - x, y);
//         ctx.stroke();
//         ctx.restore();
//     }
//     lastX = x;
//     lastY = y;
// }
// function stopDrawing() {
//     isDrawing = false;
// }