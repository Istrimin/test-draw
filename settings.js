  document.addEventListener('DOMContentLoaded', () => {
// отключаем перетаскивание
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
        // document.addEventListener('contextmenu', event => event.preventDefault());
        // $(function () {
        //     $("#message-container").resizable();
        // });
    });
// настройки планшета
        document.addEventListener('touchstart', function (e) {
            if (e.target.tagName !== 'BUTTON' && e.target.tagName !== 'INPUT') {
                e.preventDefault();
            }
        }, { passive: false });
// отключаем все стандарные настройки кнопок
  document.addEventListener('keydown', function(e) 
  {
    e.preventDefault(); 
  });
// отключаем обры линии при выходе из канваса
  document.addEventListener('pointerleave',function(e)
  {
      e.preventDefault();
  });
  document.addEventListener('mouseleave',function(e)
  {
      e.preventDefault();
  });
// блокируем контекстное меню
        document.addEventListener('contextmenu', event => event.preventDefault());
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
// // Отключение скроллинга колесиком мыши для всего документа, кроме слайдеров
  // document.addEventListener('wheel', function(e) {
  //     // Проверяем, находится ли курсор над слайдером
  //     if (!e.target.closest('.slider')) {
  //         e.preventDefault();
  //     }
  // }, {
  //     passive: false,  // Важно для работы preventDefault в современных браузерах
  //     capture: true    // Перехватываем событие на этапе перехвата
  // });
// //Блокировка стандартного поведения для touchmove на мобильных устройствах
  document.addEventListener('touchmove', function(e) {
      // Проверяем, происходит ли касание на слайдере
      if (!e.target.closest('.slider')) {
          e.preventDefault();
      }
  }, {
      passive: false,
      capture: true
  });
  // // отключаем альт 
  // document.addEventListener('keydown', function(e) {
  //   if (e.altKey) { 
  //     e.preventDefault();
  //   }
  // });
  // // Функция для предотвращения действия по умолчанию
  // function preventDefaultAction(event) {
  //   event.preventDefault();
  //   event.stopPropagation();
  //   return false;
  // }
  // // Перехватываем все события keydown
  // document.addEventListener('keydown', function(event) {
  //   // Разрешаем только F12
  //   if (event.key !== 'F12') {
  //     return preventDefaultAction(event);
  //   }
  // }, true);
  // // Перехватываем все события keyup
  // document.addEventListener('keyup', function(event) {
  //   // Разрешаем только F12
  //   if (event.key !== 'F12') {
  //     return preventDefaultAction(event);
  //   }
  // }, true);
  // // Перехватываем все события keypress
  // document.addEventListener('keypress', function(event) {
  //   // Разрешаем только F12
  //   if (event.key !== 'F12') {
  //     return preventDefaultAction(event);
  //   }
  // }, true);
  // // Дополнительно перехватываем beforeunload для предотвращения обновления страницы
  // window.addEventListener('beforeunload', function(event) {
  //   event.preventDefault();
  //   event.returnValue = '';
  // });
  // // Перехватываем contextmenu для отключения контекстного меню
  // document.addEventListener('contextmenu', function(event) {
  //   event.preventDefault();
  // });
  // В файле main.js, после инициализации кнопок слоёв
  // Обновленная функция saveState
