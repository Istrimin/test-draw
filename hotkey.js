function handleTouchMove(event) {
    const moveAmount = 1; 
    const key = event.type === 'touchmove' ? event.touches[0].clientY : event.clientY; 
    const directions = {
        ArrowLeft: 'left',
        ArrowRight: 'right',
        ArrowUp: 'up',
        ArrowDown: 'down'
    };

    if (directions[key]) {
        moveCanvasContent(currentLayer, directions[key], moveAmount);
    }
}

document.addEventListener('mousemove', handleTouchMove);
document.addEventListener('touchmove', handleTouchMove);