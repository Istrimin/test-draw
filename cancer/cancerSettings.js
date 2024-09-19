document.addEventListener('DOMContentLoaded', () => {
  // Prevent default dragging for all elements
  document.querySelectorAll('*').forEach(element => {
    element.setAttribute('draggable', 'false'); 
  });

  // Optional: Add visual feedback (cursor change) on drag attempt
  document.addEventListener('dragstart', (event) => {
    event.preventDefault(); // Prevent default drag behavior
    event.dataTransfer.effectAllowed = 'none'; // Indicate dragging is not allowed
    document.body.style.cursor = 'not-allowed'; // Change cursor to "not-allowed"
  });

  // Optional: Reset cursor when dragging stops
  document.addEventListener('dragend', () => {
    document.body.style.cursor = 'auto'; // Reset cursor to default
  });

  // !блокировка контекстного меню 
  document.addEventListener('contextmenu', event => event.preventDefault());
});

// настройки планшета
document.addEventListener('touchstart', function (e) {
  if (e.target.tagName !== 'BUTTON' && e.target.tagName !== 'INPUT') {
    e.preventDefault();
  }
}, { passive: false });

// обработка мыши
document.addEventListener('mousedown', function (e) {
  if (e.target.tagName !== 'BUTTON' && e.target.tagName !== 'INPUT') {
    e.preventDefault();
  }
}, { passive: false });

// отключаем все стандарные настройки кнопок
document.addEventListener('keydown', function(e) {
  e.preventDefault(); 
});

// отключаем обры линии при выходе из канваса
document.addEventListener('pointerleave', function(e) {
  e.preventDefault();
});
document.addEventListener('mouseleave', function(e) {
  e.preventDefault();
});

// добавляем класс для красивых иконок
document.addEventListener('DOMContentLoaded', () => {
  // Select all icon elements. 
  // Modify this selector to accurately target your icons if needed.
  const icons = document.querySelectorAll('a, button'); 
  // Add the class to each icon
  icons.forEach(icon => {
    icon.classList.add('icon-hover');
  });
});

document.addEventListener('touchmove', function(e) {
  // Проверяем, происходит ли касание на слайдере
  if (!e.target.closest('.slider')) {
    e.preventDefault();
  }
}, {
  passive: false,
  capture: true
});


// копия
// document.addEventListener('DOMContentLoaded', () => {
//   // Prevent default dragging for all elements
//     document.querySelectorAll('*').forEach(element => {
//       element.setAttribute('draggable', 'false'); 
//     });

//   // Optional: Add visual feedback (cursor change) on drag attempt
//     document.addEventListener('dragstart', (event) => {
//       event.preventDefault(); // Prevent default drag behavior
//       event.dataTransfer.effectAllowed = 'none'; // Indicate dragging is not allowed
//       document.body.style.cursor = 'not-allowed'; // Change cursor to "not-allowed"
//     });

//   // Optional: Reset cursor when dragging stops
//   document.addEventListener('dragend', () => {
//   document.body.style.cursor = 'auto'; // Reset cursor to default
//   });


// // !блокировка контекстного меню

//         document.addEventListener('contextmenu', event => event.preventDefault());

//   });



// // копия
// document.addEventListener('DOMContentLoaded', () => {
//   // отключаем перетаскивание
//   // Prevent default dragging for all elements
//   document.querySelectorAll('*').forEach(element => {
//     element.setAttribute('draggable', 'false'); 
//   });
//   // Optional: Add visual feedback (cursor change) on drag attempt
//   document.addEventListener('dragstart', (event) => {
//     event.preventDefault(); // Prevent default drag behavior
//     event.dataTransfer.effectAllowed = 'none'; // Indicate dragging is not allowed
//     document.body.style.cursor = 'not-allowed'; // Change cursor to "not-allowed"
//   });
//   // Optional: Reset cursor when dragging stops
//   document.addEventListener('dragend', () => {
//     document.body.style.cursor = 'auto'; // Reset cursor to default
//   });
//   // !блокировка контекстного меню 
//   // document.addEventListener('contextmenu', event => event.preventDefault());
//   // добавляем ресайз для контейнера с сообщениями
//   // $(function () {
//   //     $("#message-container").resizable();
//   // });
// });

// // настройки планшета
// document.addEventListener('touchstart', function (e) {
//     if (e.target.tagName !== 'BUTTON' && e.target.tagName !== 'INPUT') {
//         e.preventDefault();
//     }
// }, { passive: false });

// // обработка мыши
// document.addEventListener('mousedown', function (e) {
//     if (e.target.tagName !== 'BUTTON' && e.target.tagName !== 'INPUT') {
//         e.preventDefault();
//     }
// }, { passive: false });

// // отключаем все стандарные настройки кнопок
// document.addEventListener('keydown', function(e) {
//   e.preventDefault(); 
// });

// // отключаем обры линии при выходе из канваса
// document.addEventListener('pointerleave', function(e) {
//     e.preventDefault();
// });
// document.addEventListener('mouseleave', function(e) {
//     e.preventDefault();
// });

// // блокируем контекстное меню
// document.addEventListener('contextmenu', event => event.preventDefault());

// // добавляем класс для красивых иконок
// document.addEventListener('DOMContentLoaded', () => {
//   // Select all icon elements. 
//   // Modify this selector to accurately target your icons if needed.
//   const icons = document.querySelectorAll('a, button'); 
//   // Add the class to each icon
//   icons.forEach(icon => {
//     icon.classList.add('icon-hover');
//   });
// });

// document.addEventListener('touchmove', function(e) {
//     // Проверяем, происходит ли касание на слайдере
//     if (!e.target.closest('.slider')) {
//         e.preventDefault();
//     }
// }, {
//     passive: false,
//     capture: true
// });



