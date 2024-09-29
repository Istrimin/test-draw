// 
		document.addEventListener('DOMContentLoaded', () => {
			const cursorPanel = gel('cursorPanel');
			const cursorList = gel('cursorList');
			const changeCursorBtn = gel('changeCursorBtn');

			function loadCursors() {
				cursorList.innerHTML = '';
				for (let i = 1; i <= 80; i++) {
					const cursorUrl = `../cursorsNum/${i}.png`;

					const image = new Image();
					image.src = cursorUrl;
					image.onload = () => {

						let targetWidth = image.width;
						let targetHeight = image.height;


						const maxSize = 128;

						if (targetWidth > maxSize || targetHeight > maxSize) {
							const aspectRatio = targetWidth / targetHeight;
							if (targetWidth > targetHeight) {
								targetWidth = maxSize;
								targetHeight = maxSize / aspectRatio;
							} else {
								targetHeight = maxSize;
								targetWidth = maxSize * aspectRatio;
							}
						}

						const canvas = document.createElement('canvas');
						const ctx = canvas.getContext('2d');
						canvas.width = targetWidth;
						canvas.height = targetHeight;
						ctx.drawImage(image, 0, 0, targetWidth, targetHeight);
						const resizedCursorUrl = canvas.toDataURL();


						const cursorImg = document.createElement('img');
						cursorImg.src = resizedCursorUrl;
						cursorImg.alt = `cursor${i}`;
						cursorImg.style.maxWidth = `${maxSize}px`;

						cursorImg.addEventListener('click', () => {
							drawingCanvas.style.cursor = `url(${resizedCursorUrl}), auto`;
							cursorPanel.style.display = 'none';
						});

						cursorList.appendChild(cursorImg);
					};
				}
			}

			changeCursorBtn.addEventListener('click', () => {
				cursorPanel.style.display = cursorPanel.style.display === 'none' ? 'block' : 'none';
			});

			loadCursors();
		});
