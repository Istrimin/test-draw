# Вывод теста, без потери форматирования
	Чтобы текст из текстового файла отображался в HTML с сохранением форматирования, включая параграфы и отступы, необходимо использовать HTML-теги, которые сохраняют форматирование. Наиболее подходящим для этого является тег <pre>, который отображает текст с сохранением пробелов и переносов строк.

	Я предлагаю изменить функцию showMessage в вашем JavaScript-коде, чтобы она оборачивала текст, полученный из файла, в тег <pre>. Это позволит сохранить форматирование текста.

	Вот как можно изменить функцию showMessage:

	function showMessage(message) {
	    messageText.innerHTML = `<pre>${message}</pre>`; // Используем <pre> для сохранения форматирования
	    messageContainer.style.display = 'block';
	}
	Теперь, когда вы будете загружать текст из файла, он будет отображаться с сохранением всех отступов и переносов строк.

	Если вы хотите, чтобы текст отображался в виде обычного текста, но с сохранением форматирования, вы также можете использовать CSS для управления стилями. Например, вы можете добавить стиль для элемента messageText, чтобы он отображался как блочный элемент с отступами.