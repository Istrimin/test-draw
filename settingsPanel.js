// JavaScript for background settings modal
// const backgroundSettingsBtn = gel('backgroundSettingsBtn'),
//   backgroundSettingsModal = gel('backgroundSettingsModal'),
//   closeModal = gel('closeModal'),
//   backgroundColorPicker = gel('backgroundColorPicker'),
//   backgroundImageInput = gel('backgroundImageInput'),
//   setBackgroundImageBtn = gel('setBackgroundImageBtn');




  const imageGallery = gel('backgroundImageGallery');

const initialImages = ['cancer.jpg', 'logo.jpg', 'cancer3.jpg'];
const backgroundGalleryImages = [...initialImages];

function loadBackgroundImages() {
    imageGallery.innerHTML = '';
    backgroundGalleryImages.forEach(imageSrc => {
        const img = document.createElement('img');
        img.src = imageSrc.startsWith('data:') ? imageSrc : `images/${imageSrc}`;
        img.style.width = '100px';
        img.style.height = '100px';
        img.style.margin = '5px';
        img.style.cursor = 'pointer';

        img.onclick = () => {
            document.body.style.backgroundImage = `url(${img.src})`;
            backgroundSettingsModal.style.display = "none";
        };

        img.onmouseover = () => {
            document.body.style.backgroundImage = `url(${img.src})`;
        };

        imageGallery.appendChild(img);
    });
}

backgroundSettingsBtn.onclick = () => {
    loadBackgroundImages();
    backgroundSettingsModal.style.display = "block";
}

closeModal.onclick = () => {
    backgroundSettingsModal.style.display = "none";
}

backgroundColorPicker.addEventListener('input', function() {
    document.body.style.backgroundColor = this.value;
});

backgroundImageInput.addEventListener('change', function() {
    const files = this.files;
    for (const file of files) {
        const reader = new FileReader();
        reader.onload = (e) => {
            backgroundGalleryImages.push(e.target.result);
            loadBackgroundImages();
        }
        reader.readAsDataURL(file);
    }
});

const initialCanvasImages = ['canvas1.jpg'];
const canvasGalleryImages = [...initialCanvasImages];

function loadCanvasImages() {
    canvasImageGallery.innerHTML = '';
    canvasGalleryImages.forEach(imageSrc => {
        const img = document.createElement('img');
        img.src = imageSrc.startsWith('data:') ? imageSrc : `images/${imageSrc}`;
        img.style.width = '100px';
        img.style.height = '100px';
        img.style.margin = '5px';
        img.style.cursor = 'pointer';

        img.onclick = () => {
            setCanvasImage(img.src);
        };

        img.onmouseover = () => {
            updateCanvasPreview(img.src);
        };

        canvasImageGallery.appendChild(img);
    });
    // Добавляем кнопку для установки прозрачного фона
    const transparentBtn = document.createElement('button');
    transparentBtn.onclick = () => {
        setCanvasTransparent();
    };

    // Применяем стили к кнопке
    transparentBtn.style.width = '100px';
    transparentBtn.style.height = '100px';
    transparentBtn.style.margin = '5px';
    transparentBtn.style.cursor = 'pointer'; 

    canvasImageGallery.appendChild(transparentBtn);
}
function setCanvasImage(src) {
    const canvas = layers[back];
    const ctx = canvas.getContext('2d');
    const img = new Image();
    img.onload = () => {
        ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
        canvasSettingsModal.style.display = "none";
    }
    img.src = src;
}

function updateCanvasPreview(src) {
    const previewCtx = contexts[back]; 
    const img = new Image();
    img.onload = () => {
        previewCtx.clearRect(0, 0, layers[back].width, layers[back].height);
        previewCtx.drawImage(img, 0, 0, layers[back].width, layers[back].height);
    }
    img.src = src;
}

// Функция для установки прозрачного фона
    function setCanvasTransparent() {
        const canvas = layers[back];
        const ctx = canvas.getContext('2d');
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        canvasSettingsModal.style.display = "none";
    }

canvasSettingsBtn.onclick = () => {
    loadCanvasImages();
    canvasSettingsModal.style.display = "block";
}

closeCanvasModal.onclick = () => {
    canvasSettingsModal.style.display = "none";
}

canvasColorPicker.addEventListener('input', function() {
    const canvas = layers[back];
    const ctx = canvas.getContext('2d');
    ctx.fillStyle = this.value;
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    updateCanvasPreview(canvas.toDataURL());
});

canvasImageInput.addEventListener('change', function() {
    const files = this.files;
    for (const file of files) {
        const reader = new FileReader();
        reader.onload = (e) => {
            canvasGalleryImages.push(e.target.result);
            loadCanvasImages();
        }
        reader.readAsDataURL(file);
    }
});


window.onclick = (event) => {
    if (event.target === backgroundSettingsModal) {
        backgroundSettingsModal.style.display = "none";
    }
    if (event.target === canvasSettingsModal) {
        canvasSettingsModal.style.display = "none";
    }
}

// Initialize
loadBackgroundImages();
loadCanvasImages();

