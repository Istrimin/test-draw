// JavaScript for background settings modal
const backgroundSettingsBtn = document.getElementById('backgroundSettingsBtn');
const backgroundSettingsModal = document.getElementById('backgroundSettingsModal');
const closeModal = document.getElementById('closeModal');
const backgroundColorPicker = document.getElementById('backgroundColorPicker');
const backgroundImageInput = document.getElementById('backgroundImageInput');
const setBackgroundImageBtn = document.getElementById('setBackgroundImageBtn');
const imageGallery = document.getElementById('backgroundImageGallery');

const initialImages = ['cancer.jpg', 'logo.jpg', 'cancer3.jpg'];
let backgroundGalleryImages = [...initialImages];

function loadBackgroundImages() {
    imageGallery.innerHTML = '';
    backgroundGalleryImages.forEach(imageSrc => {
        const img = document.createElement('img');
        img.src = imageSrc.startsWith('data:') ? imageSrc : `images/${imageSrc}`;
        img.style.width = '100px';
        img.style.height = '100px';
        img.style.margin = '5px';
        img.style.cursor = 'pointer';

        img.onclick = function() {
            document.body.style.backgroundImage = `url(${img.src})`;
            backgroundSettingsModal.style.display = "none";
        };

        img.onmouseover = function() {
            document.body.style.backgroundImage = `url(${img.src})`;
        };

        imageGallery.appendChild(img);
    });
}

backgroundSettingsBtn.onclick = function() {
    loadBackgroundImages();
    backgroundSettingsModal.style.display = "block";
}

closeModal.onclick = function() {
    backgroundSettingsModal.style.display = "none";
}

backgroundColorPicker.addEventListener('input', function() {
    document.body.style.backgroundColor = this.value;
});

backgroundImageInput.addEventListener('change', function() {
    const files = this.files;
    for (let i = 0; i < files.length; i++) {
        const file = files[i];
        const reader = new FileReader();
        reader.onload = function(e) {
            backgroundGalleryImages.push(e.target.result);
            loadBackgroundImages();
        }
        reader.readAsDataURL(file);
    }
});

// JavaScript for canvas settings modal
const elements = [
  'canvasSettingsBtn',
  'canvasSettingsModal',
  'closeCanvasModal',
  'canvasColorPicker',
  'canvasImageInput',
  'setCanvasImageBtn',
  'canvasImageGallery'
];

const obj = Object.fromEntries(
  elements.map(id => [id, document.getElementById(id)])
);

const canvasPreview = document.getElementById('canvasPreview');

const initialCanvasImages = ['canvas1.jpg'];
let canvasGalleryImages = [...initialCanvasImages];

function loadCanvasImages() {
    canvasImageGallery.innerHTML = '';
    canvasGalleryImages.forEach(imageSrc => {
        const img = document.createElement('img');
        img.src = imageSrc.startsWith('data:') ? imageSrc : `images/${imageSrc}`;
        img.style.width = '100px';
        img.style.height = '100px';
        img.style.margin = '5px';
        img.style.cursor = 'pointer';

        img.onclick = function() {
            setCanvasImage(img.src);
        };

        img.onmouseover = function() {
            updateCanvasPreview(img.src);
        };

        canvasImageGallery.appendChild(img);
    });
    // Добавляем кнопку для установки прозрачного фона
    const transparentBtn = document.createElement('button');
    transparentBtn.onclick = function() {
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
    img.onload = function() {
        ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
        canvasSettingsModal.style.display = "none";
    }
    img.src = src;
}

function updateCanvasPreview(src) {
    const previewCtx = contexts[back]; 
    const img = new Image();
    img.onload = function() {
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

canvasSettingsBtn.onclick = function() {
    loadCanvasImages();
    canvasSettingsModal.style.display = "block";
}

closeCanvasModal.onclick = function() {
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
    for (let i = 0; i < files.length; i++) {
        const file = files[i];
        const reader = new FileReader();
        reader.onload = function(e) {
            canvasGalleryImages.push(e.target.result);
            loadCanvasImages();
        }
        reader.readAsDataURL(file);
    }
});


window.onclick = function(event) {
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

