    const $ = id => document.getElementById(id);

    const [
      colorPicker, backgroundPicker, 

      symmetryButton, brushSizeInput, eyedropperBtn, clearBtn,
      eraserBtn, 
undoBtn, redoBtn,
 saveImageBtn, 
      
    ] = [
      'colorPicker', 'backgroundPicker', 
      'symmetryBtn', 'brushSize', 'eyedropperBtn', 'clearBtn',
      'eraserBtn', 'undo', 'redo', 'saveImageBtn', 
    ].map($);

    const ctx = drawingCanvas.getContext('2d');
    const bgCtx = backgroundCanvas.getContext('2d');
    const overlayCtx = overlayCanvas.getContext('2d');

        let isDrawing = false;
        let lastX = 0;
        let lastY = 0;
        let isEyedropperActive = false;
        let symmetryBtn = true;
        let isErasing = false;
        let history = [];
        let redoHistory = [];
        let overlayActive = false;
        let currentCursor = 'url(../cursorsNum/1.png), auto';
        let previousCursor = currentCursor;
        let isSmoothDrawing = false; 
        let points = []; 

        ctx.imageSmoothingEnabled = false;
        ctx.willReadFrequently = true;



        function saveState() {
            history.push(ctx.getImageData(0, 0, drawingCanvas.width, drawingCanvas.height));
            redoHistory = [];
            updateUndoRedoButtons();
        }

        function updateUndoRedoButtons() {
            undoBtn.disabled = history.length <= 1;
            redoBtn.disabled = redoHistory.length === 0;
        }

        function startDrawing(e) {
            isDrawing = true;
            [lastX, lastY] = getCoordinates(e);
            if (isSmoothDrawing) {
                points.push({ x: lastX, y: lastY }); // Start new stroke
            }
        }

        function draw(e) {
            if (!isDrawing) return;
            e.preventDefault();

            const [x, y] = getCoordinates(e);

            const pressure = e.pressure || 1;
            ctx.lineWidth = brushSizeInput.value * pressure;
            ctx.lineCap = 'round';
            ctx.lineJoin = 'round';

            if (isErasing) {
                ctx.globalCompositeOperation = 'destination-out';
            } else {
                ctx.globalCompositeOperation = 'source-over';
                ctx.strokeStyle = colorPicker.value;
            }

            if (isSmoothDrawing) {
                drawSmoothLine(lastX, lastY, x, y);
            } else {
                ctx.beginPath();
                ctx.moveTo(lastX, lastY);
                ctx.lineTo(x, y);
                ctx.stroke();
            }

            if (symmetryBtn) {
                const centerX = drawingCanvas.width / 2;
                const symmetricX = 2 * centerX - x;
                if (isSmoothDrawing) {
                    drawSmoothLine(2 * centerX - lastX, lastY, symmetricX, y);
                } else {
                    ctx.beginPath();
                    ctx.moveTo(2 * centerX - lastX, lastY);
                    ctx.lineTo(symmetricX, y);
                    ctx.stroke();
                }
            }

            [lastX, lastY] = [x, y];
        }

        function stopDrawing() {
            if (isDrawing) {
                isDrawing = false;
                saveState();
                if (isSmoothDrawing) {
                    points.length = 0; 
                }
            }
        }

        function getCoordinates(e) {
            const rect = drawingCanvas.getBoundingClientRect();
            return [
                e.clientX - rect.left,
                e.clientY - rect.top
            ];
        }

// паутинка

        function toggleSmoothDrawing() {

            isSmoothDrawing = !isSmoothDrawing;
            smoothDrawingBtn.classList.toggle('active', isSmoothDrawing);
        }

        function toggleSymmetry() {
            symmetryBtn = !symmetryBtn;
            symmetryButton.classList.toggle('active', symmetryBtn);
        }

        function undo() {
            if (history.length > 1) {
                redoHistory.push(history.pop());
                ctx.putImageData(history[history.length - 1], 0, 0);
                updateUndoRedoButtons();
            }
        }

        function redo() {
            if (redoHistory.length > 0) {
                const state = redoHistory.pop();
                history.push(state);
                ctx.putImageData(state, 0, 0);
                updateUndoRedoButtons();
            }
        }

        function clearCanvas() {
            ctx.clearRect(0, 0, drawingCanvas.width, drawingCanvas.height);
            saveState();
        }

        function saveImage() {
            const tempCanvas = document.createElement('canvas');
            tempCanvas.width = drawingCanvas.width;
            tempCanvas.height = drawingCanvas.height;
            const tempCtx = tempCanvas.getContext('2d');

            tempCtx.drawImage(drawingCanvas, 0, 0);

            if (overlayActive) {
                tempCtx.globalAlpha = parseFloat(overlayCanvas.style.opacity);
                tempCtx.drawImage(overlayCanvas, 0, 0);
                tempCtx.globalAlpha = 1.0;
            }

            const link = document.createElement('a');
            link.download = 'my-drawing.png';
            link.href = tempCanvas.toDataURL('image/png');
            link.click();
        }

        function resizeCanvas() {
            const rect = backgroundCanvas.getBoundingClientRect();
            backgroundCanvas.width = rect.width * devicePixelRatio;
            backgroundCanvas.height = rect.height * devicePixelRatio;
            drawingCanvas.width = rect.width * devicePixelRatio;
            drawingCanvas.height = rect.height * devicePixelRatio;
            ctx.scale(devicePixelRatio, devicePixelRatio);
            bgCtx.scale(devicePixelRatio, devicePixelRatio);
            initializeCanvas();
        }

        function createOverlayLayer() {
            overlayActive = true;
            overlayCtx.clearRect(0, 0, overlayCanvas.width, overlayCanvas.height);
            overlayCtx.drawImage(drawingCanvas, 0, 0);
            overlayCanvas.style.opacity = '0.5';
            clearCanvas();
        }

        function toggleOverlayOpacity() {
            if (overlayActive) {
                overlayCanvas.style.opacity = overlayCanvas.style.opacity === '0.5' ? '1' : '0.5';
            }
        }

        function toggleEraser() {
            isErasing = !isErasing;
            eraserBtn.classList.toggle('active', isErasing);
            if (isErasing) {
                previousCursor = drawingCanvas.style.cursor;
                drawingCanvas.style.cursor = 'url(../cursorsNum/2.png), auto';
            } else {
                drawingCanvas.style.cursor = previousCursor;
            }
        }

        function toggleEyedropper() {
            isEyedropperActive = !isEyedropperActive;
            eyedropperBtn.classList.toggle('active', isEyedropperActive);
            if (isEyedropperActive) {
                previousCursor = drawingCanvas.style.cursor;
                drawingCanvas.style.cursor = 'url(../cursorsNum/3.png), auto';
                drawingCanvas.addEventListener('click', pickColor, { once: true });
            } else {
                drawingCanvas.style.cursor = previousCursor;
            }
        }

        function initializeCursor() {
            drawingCanvas.style.cursor = currentCursor;
        }

        // Smooth Drawing Functions
        function drawSmoothLine(startX, startY, endX, endY) {
            ctx.globalAlpha = 0.5; // Set opacity
            ctx.strokeStyle = colorPicker.value; // Set color
            ctx.lineWidth = 5; // Increased line width for better visibility
            ctx.lineJoin = 'round'; // Rounded corners
            ctx.lineCap = 'round'; // Rounded line ends

            ctx.beginPath();
            ctx.moveTo(startX, startY);
            ctx.quadraticCurveTo(startX, startY, endX, endY); // Use quadratic curve for smoother lines
            ctx.stroke();

            points.push({ x: endX, y: endY }); // Store the current point

            // Draw neighbor points with a fill effect
            for (let i = 0; i < points.length; i++) {
                const dx = points[i].x - endX;
                const dy = points[i].y - endY;
                const dd = dx * dx + dy * dy;

                if (dd < 1000) {
                    ctx.beginPath();
                    ctx.moveTo(endX + (dx * 0.2), endY + (dy * 0.2));
                    ctx.lineTo(points[i].x - (dx * 0.2), points[i].y - (dy * 0.2));
                    ctx.stroke();
                }
            }
        }

        function pickBgColor(){   
         bgCtx.fillStyle = backgroundPicker.value;
            bgCtx.fillRect(0, 0, backgroundCanvas.width, backgroundCanvas.height);}


        // Event Listeners
        colorPicker.addEventListener('input', () => ctx.strokeStyle = colorPicker.value);
        backgroundPicker.addEventListener('input', pickBgColor); 

        document.addEventListener('pointerdown', startDrawing);
        document.addEventListener('pointermove', draw);
        document.addEventListener('pointerup', stopDrawing);
        document.addEventListener('pointercancel', stopDrawing);

        symmetryButton.addEventListener('click', toggleSymmetry);
        undoBtn.addEventListener('click', undo);
        redoBtn.addEventListener('click', redo);
        clearBtn.addEventListener('click', clearCanvas);
        eraserBtn.addEventListener('click', toggleEraser);
        saveImageBtn.addEventListener('click', saveImage);
        eyedropperBtn.addEventListener('click', toggleEyedropper);
        smoothDrawingBtn.addEventListener('click', toggleSmoothDrawing); 
        window.addEventListener('resize', resizeCanvas);

        // Initialization
        initializeCanvas();
        resizeCanvas();
        initializeCursor();

        if (window.PointerEvent) {
            console.log('Pointer events are supported');
        } else {
            console.log('Pointer events are not supported');
        }

        document.addEventListener('DOMContentLoaded', () => {
            document.querySelectorAll('a, button').forEach(icon => icon.classList.add('icon-hover'));
        });
