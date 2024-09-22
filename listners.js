

    document.addEventListener('DOMContentLoaded', () => {
                    for (let i = 1; i < 100; i++) {
                        createLayer();
                        setCurrentLayer(50);
                        const layerButtonsContainer = document.querySelector('.layer-panel');
                        layerButtonsContainer.scrollTop = (layerButtonsContainer.scrollHeight / 120) * 50;
                    }
                });
