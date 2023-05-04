"use strict";
const canvasEl = document.querySelector("#paint-container");
const canvasSizeEl = document.querySelector("#grid-size");
canvasSizeEl.addEventListener("change", () => {
    createGrid(parseInt(canvasSizeEl.value));
});
function createGrid(size) {
    if (size <= 0 || size > 100 || isNaN(size)) {
        canvasSizeEl.style.backgroundColor = "red";
        return;
    }
    canvasSizeEl.style.backgroundColor = "white";
    canvasEl.style.gridTemplate = `repeat(${size}, 1fr) / repeat(${size}, 1fr)`;
    for (let i = 0; i < size * size; i++) {
        canvasEl.innerHTML += `<div></div>`;
    }
}
