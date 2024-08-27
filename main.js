import { initCanvas } from './canvas.js';
import { initTools } from './tools.js';
import { initUI } from './ui.js';
import { initVKAPI } from './vkApi.js';

document.addEventListener('DOMContentLoaded', function() {
    initCanvas();
    initTools();
    initUI();
    initVKAPI();
    window.initCursors();
});
