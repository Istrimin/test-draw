# TODO - fix save image on cancer.html

- [x] Analyse current `saveImage()` implementation and how canvases are resized/scaled.
- [x] Reproduce/identify runtime error source (e.g. `toDataURL`/`SecurityError` tainted canvas) via adding guarded logging.
- [x] Fix bug: prevent repeated `ctx.scale()` accumulation in `resizeCanvases()` by resetting transform before scaling.
- [x] Add robust save logic: wrap `toDataURL()` in try/catch and log errors; ensure final exported canvas uses correct sizes.
- [ ] If taint is detected: ensure any images drawn into canvases are loaded with proper CORS and/or avoid drawing tainted canvas.
- [ ] Verify save works with/without overlay.


