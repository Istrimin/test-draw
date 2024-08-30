// let lastX = 0;
// let lastY = 0;
// let isDrawing = false;

// canvas.addEventListener('pointerdown', startDrawing, { passive: false });
// canvas.addEventListener('pointermove', draw);
// canvas.addEventListener('pointerup', stopDrawing);
// canvas.addEventListener('pointerout', stopDrawing);
// canvas.addEventListener('pointercancel', stopDrawing);

// canvas.addEventListener('touchstart', (e) => {
//     e.preventDefault();
//     const touch = e.touches[0];
//     startDrawing({offsetX: touch.clientX - canvas.offsetLeft, offsetY: touch.clientY - canvas.offsetTop});
// }, { passive: false });

// canvas.addEventListener('touchmove', (e) => {
//     e.preventDefault();
//     const touch = e.touches[0];
//     draw({offsetX: touch.clientX - canvas.offsetLeft, offsetY: touch.clientY - canvas.offsetTop});
// }, { passive: false });

// canvas.addEventListener('touchend', stopDrawing);

// function startDrawing(e) {
//     isDrawing = true;
//     [lastX, lastY] = [e.offsetX, e.offsetY];
// }

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

//     [lastX, lastY] = [x, y];
// }

// function stopDrawing() {
//     isDrawing = false;
// }
