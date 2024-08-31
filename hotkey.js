document.addEventListener('keydown', function(event) {
  if (event.key === 'a') {
    // Activate the eyedropper tool (assuming your existing code handles this)
    document.getElementById('eyedropperBtn').click(); 

    const rect = canvas.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;
    // const pixelData = ctx.getImageData(x, y, 1, 1).data; 
    // const color = `rgb(${pixelData[0]}, ${pixelData[1]}, ${pixelData[2]})`;

    // Set the picked color to your color input
    // document.getElementById('colorPicker').value = color; 
  }
});


document.addEventListener('keydown', (event) => {
  if (event.code === 'KeyZ') { 
    undo();
  } else if (event.code === 'KeyX') { 
    redo();
  }
});


// colorpicker
document.addEventListener('keydown', (event) => {
  if (event.key === 'b' || event.code === 'KeyB') { // Проверяем и 'b', и 'KeyB'
    event.preventDefault();
    const backgroundPicker = document.getElementById('backgroundPicker');
    backgroundPicker.click(); 

    // Эмулируем нажатие Esc
    const escEvent = new KeyboardEvent('keydown', {
      bubbles: true, // Позволяем событию всплывать
      cancelable: true, // Позволяем отменить действие по умолчанию
      key: 'Escape', // Устанавливаем клавишу Esc
      code: 'Escape' // Устанавливаем код клавиши Esc
    });
    backgroundPicker.dispatchEvent(escEvent); // Отправляем событие

  } else if (event.key === 'c' || event.code === 'KeyC') { // Проверяем и 'c', и 'KeyC'
    event.preventDefault();
    const colorPicker = document.getElementById('colorPicker');
    colorPicker.click();

    // Эмулируем нажатие Esc
    const escEvent = new KeyboardEvent('keydown', {
      bubbles: true,
      cancelable: true,
      key: 'Escape',
      code: 'Escape'
    });
    colorPicker.dispatchEvent(escEvent); 
  }
});

