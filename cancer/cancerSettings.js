// Отключаем перетаскивание для всех элементов
  	document.querySelectorAll('*').forEach(element => element.setAttribute('draggable', 'false'));

// Отключаем стандартные действия клавиатуры, но разрешаем для полей ввода
	document.addEventListener('keydown', (e) => {
	    if (e.target.tagName !== 'INPUT' && e.target.tagName !== 'TEXTAREA') {
	        e.preventDefault();
	    }
	});
	// Отключаем контекстное меню
  	document.addEventListener('contextmenu', event => event.preventDefault());
// Добавляем обработчики событий для предотвращения стандартных действий
	['touchstart', 'mousedown', 'pointerleave', 'mouseleave', 'touchmove'].forEach(event => {
		document.addEventListener(event, preventDefault, { passive: false });
		});
// Обработчик события начала перетаскивания
	document.addEventListener('dragstart', (event) => {
		event.preventDefault(); // Предотвращаем стандартное поведение перетаскивания
		event.dataTransfer.effectAllowed = 'none'; // Указываем, что перетаскивание не разрешено
		document.body.style.cursor = 'not-allowed'; // Меняем курсор на "нельзя"
	});
// Обработчик события окончания перетаскивания
	document.addEventListener('dragend', () => {
		document.body.style.cursor = 'auto'; // Сбрасываем курсор на стандартный
	});
// Отключаем стандартные действия клавиатуры
  	document.addEventListener('keydown', (e) => e.preventDefault());
	// Добавляем класс для иконок
  	document.querySelectorAll('a, button').forEach(icon => icon.classList.add('icon-hover'));


// Функция для предотвращения стандартных действий для определенных событий
	const preventDefault = (e) => {
	    // Проверяем, является ли целевой элемент кнопкой или полем ввода
	    if (e.target.tagName !== 'BUTTON' && e.target.tagName !== 'INPUT') {
	        e.preventDefault();
	    }
	};

