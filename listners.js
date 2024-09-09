import * as tools from './tools.js';
// buttons
    const imageInput = document.getElementById('imageInput');
// listnerst
    UploadButton.addEventListener('click', () => imageInput.click());
    imageInput.addEventListener('change', importImage);
    symmetryButton.addEventListener('click', toggleSymmetry);
    undoBtn.addEventListener('click', undo);
    redoBtn.addEventListener('click', redo);
    // saveImageBtn.addEventListener('click', exportImage);
    saveImageBtn.addEventListener('click', tools.exportImage);
    document.addEventListener('DOMContentLoaded', () => {
                    for (let i = 1; i < 100; i++) {
                        createLayer();
                        setCurrentLayer(50);
                        const layerButtonsContainer = document.querySelector('.layer-panel');
                        layerButtonsContainer.scrollTop = (layerButtonsContainer.scrollHeight / 120) * 50;
                    }
                });
