const $e = (event, handler, options) => document.addEventListener(event, handler, options);


const preventDefault = (e) => {
    // Проверяем, является ли e.target элементом
    if (e.target instanceof Element && !['BUTTON', 'INPUT'].includes(e.target.tagName) && !e.target.closest('.slider')) {
        e.preventDefault();
    }
};
document.querySelectorAll('*').forEach(element => element.setAttribute('draggable', 'false'));

const events = ['touchstart', 'mousedown', 'pointerleave', 'mouseleave', 'touchmove', 'keydown'];
events.forEach(event => $e(event, preventDefault, { passive: false }));


$e('contextmenu', e => e.preventDefault());

$e('DOMContentLoaded', () => {
    document.querySelectorAll('a, button').forEach(icon => icon.classList.add('icon-hover'));
});