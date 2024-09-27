// self.onmessage = function(e) {
//     const { sourceData, width, height, size, isInner } = e.data;
//     const outlineData = new Uint8ClampedArray(width * height * 4);
//     const outlineColor = [0, 0, 0, 255];

//     for (let y = 0; y < height; y++) {
//         for (let x = 0; x < width; x++) {
//             const index = (y * width + x) * 4;
//             if ((isInner && sourceData[index + 3] > 0) || (!isInner && sourceData[index + 3] === 0)) {
//                 let shouldOutline = false;
//                 for (let dy = -size; dy <= size && !shouldOutline; dy++) {
//                     for (let dx = -size; dx <= size && !shouldOutline; dx++) {
//                         const nx = x + dx;
//                         const ny = y + dy;
//                         if (nx >= 0 && nx < width && ny >= 0 && ny < height) {
//                             const neighborIndex = (ny * width + nx) * 4;
//                             if ((isInner && sourceData[neighborIndex + 3] === 0) || (!isInner && sourceData[neighborIndex + 3] > 0)) {
//                                 shouldOutline = true;
//                                 break;
//                             }
//                         }
//                     }
//                 }
//                 if (shouldOutline) {
//                     outlineData.set(outlineColor, index);
//                 } else if (isInner) {
//                     outlineData.set(sourceData.subarray(index, index + 4), index);
//                 }
//             }
//         }
//     }

//     self.postMessage({ outlineData }, [outlineData.buffer]);
// };

