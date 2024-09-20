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
const canvasSettingsBtn = document.getElementById('canvasSettingsBtn');
const canvasSettingsModal = document.getElementById('canvasSettingsModal');
const closeCanvasModal = document.getElementById('closeCanvasModal');
const canvasColorPicker = document.getElementById('canvasColorPicker');
const canvasImageInput = document.getElementById('canvasImageInput');
const setCanvasImageBtn = document.getElementById('setCanvasImageBtn');
const canvasImageGallery = document.getElementById('canvasImageGallery');
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
}

function setCanvasImage(src) {
    const canvas = layers[100];
    const ctx = canvas.getContext('2d');
    const img = new Image();
    img.onload = function() {
        ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
        canvasSettingsModal.style.display = "none";
    }
    img.src = src;
}

function updateCanvasPreview(src) {
    const previewCtx = canvasPreview.getContext('2d');
    const img = new Image();
    img.onload = function() {
        previewCtx.clearRect(0, 0, canvasPreview.width, canvasPreview.height);
        previewCtx.drawImage(img, 0, 0, canvasPreview.width, canvasPreview.height);
    }
    img.src = src;
}

canvasSettingsBtn.onclick = function() {
    loadCanvasImages();
    canvasSettingsModal.style.display = "block";
}

closeCanvasModal.onclick = function() {
    canvasSettingsModal.style.display = "none";
}

canvasColorPicker.addEventListener('input', function() {
    const canvas = layers[100];
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

setCanvasImageBtn.addEventListener('click', function() {
    const file = canvasImageInput.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = function(e) {
            setCanvasImage(e.target.result);
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