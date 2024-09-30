const $e = (event, handler, options) => document.addEventListener(event, handler, options);

const preventDefault = (e) => {
    if (e.target.tagName !== 'BUTTON' && e.target.tagName !== 'INPUT' && !e.target.closest('.slider')) {
        e.preventDefault();
    }
};

const toggleCursor = (isDisabled) => {
    document.body.style.cursor = isDisabled ? 'not-allowed' : 'auto';
};

document.querySelectorAll('*').forEach(element => element.setAttribute('draggable', 'false'));

['touchstart', 'mousedown', 'pointerleave', 'mouseleave', 'touchmove', 'keydown'].forEach(event => {
    $e(event, preventDefault, { passive: false });
});

$e('dragstart', () => toggleCursor(true));
$e('dragend', () => toggleCursor(false));
$e('contextmenu', e => e.preventDefault());

$e('DOMContentLoaded', () => {
    document.querySelectorAll('a, button').forEach(icon => icon.classList.add('icon-hover'));
});

$e('touchmove', preventDefault, { passive: false, capture: true });
$e('mousemove', preventDefault, { passive: false });