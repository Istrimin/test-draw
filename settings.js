
// // из cancer
// const $e = (event, handler, options) => document.addEventListener(event, handler, options);

// const preventDefault = (e) => {
//     // Проверяем, является ли e.target элементом
//     if (e.target instanceof Element && !['BUTTON', 'INPUT'].includes(e.target.tagName) && !e.target.closest('.slider')) {
//         e.preventDefault();
//     }
// };
// document.querySelectorAll('*').forEach(element => element.setAttribute('draggable', 'false'));

// const events = ['touchstart', 'mousedown', 'pointerleave', 'mouseleave', 'touchmove', 'keydown'];
// events.forEach(event => $e(event, preventDefault, { passive: false }));


// $e('contextmenu', e => e.preventDefault());

// $e('DOMContentLoaded', () => {
//     document.querySelectorAll('a, button').forEach(icon => icon.classList.add('icon-hover'));
// });

// оригинал
// const $e =document.addEventListener;
const $e = (event, handler) => document.addEventListener(event, handler);
 $e('DOMContentLoaded', () => {
  // отключаем перетаскивание
  document.querySelectorAll('*').forEach(element => {
    element.setAttribute('draggable', 'false'); 
  });
  // Optional: Add visual feedback (cursor change) on drag attempt
   $e('dragstart', (event) => {
    event.preventDefault(); // Prevent default drag behavior
    event.dataTransfer.effectAllowed = 'none'; // Indicate dragging is not allowed
    document.body.style.cursor = 'not-allowed'; // Change cursor to "not-allowed"
  });
  // Optional: Reset cursor when dragging stops
   $e('dragend', () => {
    document.body.style.cursor = 'auto'; // Reset cursor to default
  });
  // !блокировка контекстного меню 
  //  $e('contextmenu', event => event.preventDefault());
  // добавляем ресайз для контейнера с сообщениями
  // $(function () {
  //     $("#message-container").resizable();
  // });
});


// настройки планшета
 $e('touchstart', function (e) {
    if (e.target.tagName !== 'BUTTON' && e.target.tagName !== 'INPUT') {
        e.preventDefault();
    }
}, { passive: false });

// обработка мыши
 $e('mousedown', function (e) {
    if (e.target.tagName !== 'BUTTON' && e.target.tagName !== 'INPUT') {
        e.preventDefault();
    }
}, { passive: false });

// add commented 22 Sep 21:50 отключаем все стандарные настройки кнопок
const preventDefault = (e) => e.preventDefault();

 $e('keydown', preventDefault);
 $e('pointerleave', preventDefault);
 $e('mouseleave', preventDefault);

// блокируем контекстное меню
 $e('contextmenu', event => event.preventDefault());

// добавляем класс для красивых кнопок?
 $e('DOMContentLoaded', () => {
  const icons = document.querySelectorAll('a, button'); 
  // Add the class to each icon
  icons.forEach(icon => {
    icon.classList.add('icon-hover');
  });
});

// //Блокировка стандартного поведения для touchmove на мобильных устройствах
 $e('touchmove', function(e) {
    // Проверяем, происходит ли касание на слайдере
    if (!e.target.closest('.slider')) {
        e.preventDefault();
    }
}, {
    passive: false,
    capture: true
});

