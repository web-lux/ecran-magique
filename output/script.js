"use strict";
const canvasEl = document.querySelector("main");
const sizeInputEl = document.querySelector("#size-input-container input");
const colorInput = document.querySelector("#color-picker-container input");
const paletteColorEls = document.querySelectorAll("#palette div");
function createGridFromInput() {
    let userInput = parseInt(sizeInputEl.value);
    if (!userInput || userInput < 1 || userInput > 100) {
        alert("Merci d'entrer un nombre entre 1 et 100 sans caractères spéciaux, + et - inclus.");
        sizeInputEl.style.backgroundColor = "red";
        return;
    }
    sizeInputEl.style.backgroundColor = "white";
    makeGrid(userInput);
}
function makeGrid(size) {
    let result = [];
    for (let i = 0; i < size * size; i++) {
        result.push(document.createElement("div"));
    }
    canvasEl.replaceChildren(...result);
    canvasEl.style.gridTemplate = `repeat(${size}, 1fr) / repeat(${size}, 1fr)`;
    [...canvasEl.children].forEach((div) => div.addEventListener("mouseover", paint));
}
function rgbToHex(rgb) {
    let regexResult = rgb.match(/^rgb\((\d+),\s*(\d+),\s*(\d+)\)$/);
    let result = regexResult === null || regexResult === void 0 ? void 0 : regexResult.slice(1).map((n) => parseInt(n, 10).toString(16).padStart(2, "0")).join("");
    return `#${result}`;
}
function paint() {
    this.style.background = colorInput.value;
}
paletteColorEls.forEach((div) => {
    div.addEventListener("click", () => {
        colorInput.value = rgbToHex(div.style.backgroundColor);
    });
});
sizeInputEl.addEventListener("change", function () {
    createGridFromInput();
});
createGridFromInput();
