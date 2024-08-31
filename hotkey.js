document.addEventListener('keydown', function(event) {
  // Use a single switch for better organization
  switch (event.code) {
    case 'KeyA':
      document.getElementById('eyedropperBtn').click();
      break;
    case 'KeyZ':
      undo();
      break;
    case 'KeyX':
      redo();
      break;
    case 'KeyB': // Background color
      event.preventDefault();
      document.getElementById('backgroundPicker').click();
      break;
    // case 'KeyC': // Drawing color
    //   event.preventDefault();
    //   document.getElementById('colorPicker').click();

    //   break;
    case 'KeyE': // Eraser
      event.preventDefault();
      document.getElementById('eraser').click();
      break;
    case 'KeyS': // Save
      event.preventDefault();
      document.getElementById('saveImageBtn').click();
      break;
    case 'KeyR': // Clear
      event.preventDefault();
      document.getElementById('clear').click();
      break;

    case 'KeyQ': // Symmetry
      event.preventDefault();
      document.getElementById('symmetry').click();
      break;
    case 'KeyF': // Fill Mode
      event.preventDefault();
      document.getElementById('fillModeBtn').click();
      break;
    case 'KeyU': // Upload Image
      event.preventDefault();
      document.getElementById('UploadButton').click();
      break;

  }
});

// document.addEventListener('keydown', function(event) {
//   if (event.key === '1') {
//     // Активируем первый колорпикер
//     colorPicker.click(); 
//     setDrawingColor(colorPicker.value);
//   } else if (event.key === '2') {
//     // Активируем второй колорпикер
//     colorPicker2.click();
//     setDrawingColor(colorPicker2.value);
//   } else if (event.key === '3') {
//     // Активируем третий колорпикер
//     colorPicker3.click();
//     setDrawingColor(colorPicker3.value);
//   } else if (event.key === '4') {
//     // Активируем четвертый колорпикер
//     colorPicker4.click();
//     setDrawingColor(colorPicker4.value);
//   }
// });

// // Функция для установки цвета рисования
// function setDrawingColor(color) {
//   ctx.strokeStyle = color; 
// }
