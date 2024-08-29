document.addEventListener('keydown', function(event) {
  if (event.key === 'a') {
    // Toggle eyedropperActive state
    eyedropperActive = !eyedropperActive;

    // Update the cursor based on eyedropperActive state
    if (eyedropperActive) {
      canvas.style.cursor = 'url("path/to/your/eyedropper/cursor.png"), auto'; // Replace with your actual cursor path
    } else {
      canvas.style.cursor = 'crosshair'; // Or your default cursor
    }
  }
});
