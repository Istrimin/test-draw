function loadCursors() {
    cursorList.innerHTML = '';
    for (let i = 1; i <= 1000; i++) {
        const cursorUrl = `cursors/${i}.png`;

        const image = new Image();
        image.src = cursorUrl;
        image.onload = () => {
            // --- Resizing Logic ---
            let targetWidth = image.width;
            let targetHeight = image.height;

            // Set maximum size to 32 pixels for testing
            const maxSize = 32;

            if (targetWidth > maxSize || targetHeight > maxSize) {
                const aspectRatio = targetWidth / targetHeight;
                if (targetWidth > targetHeight) {
                    targetWidth = maxSize;
                    targetHeight = maxSize / aspectRatio;
                } else {
                    targetHeight = maxSize;
                    targetWidth = maxSize * aspectRatio;
                }
            }

            const canvas = document.createElement('canvas');
            const ctx = canvas.getContext('2d');
            canvas.width = targetWidth;
            canvas.height = targetHeight;
            ctx.drawImage(image, 0, 0, targetWidth, targetHeight);
            const resizedCursorUrl = canvas.toDataURL();
            // --- End of Resizing Logic ---

            const cursorImg = document.createElement('img');
            cursorImg.src = resizedCursorUrl; // Use resized image for preview
            cursorImg.alt = `cursor${i}`;
            cursorImg.style.maxWidth = `${maxSize}px`; // Limit preview size in the panel

            cursorImg.addEventListener('click', () => {
                drawingCanvas.style.cursor = `url(${resizedCursorUrl}), auto`; // Use resized URL for cursor
                cursorPanel.style.display = 'none';
            });

            cursorList.appendChild(cursorImg);
        };
    }
}

// Function to initialize the cursor change button handler
function initChangeCursorButton() {
    document.getElementById('changeCursorBtn').addEventListener('click', function() {
        const cursorPanel = document.getElementById('cursorPanel');
        if (cursorPanel.style.display === 'none') {
            cursorPanel.style.display = 'block';
            loadCursors();
        } else {
            cursorPanel.style.display = 'none';
        }
    });
}

