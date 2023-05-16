"use strict";
/* HTML ELEMENT */
const canvasEl = document.querySelector("main");
const sizeInputEl = document.querySelector("#size-input-container input");
const colorInput = document.querySelector("#color-picker-container input");
const paletteColorEls = document.querySelectorAll("#palette div");
const clearBtn = document.querySelector("button#clear-btn");
const gridBtn = document.querySelector("button#grid-btn");
const randomBtn = document.querySelector("button#random-btn");
const toolboxEl = document.querySelector("#toolbox");
const penBtn = document.querySelector("#pen-btn");
const eraserBtn = document.querySelector("#eraser-btn");
/* FUNCTION */
function getUserInput() {
    let userInput = parseInt(sizeInputEl.value);
    if (!userInput || userInput < 1 || userInput > 100) {
        alert("Merci d'entrer un nombre entre 1 et 100 sans caractères spéciaux, + et - inclus.");
        sizeInputEl.style.backgroundColor = "red";
        return;
    }
    sizeInputEl.style.backgroundColor = "white";
    return userInput;
}
function createGridFromInput() {
    let userInput = getUserInput();
    if (userInput) {
        renderGrid(userInput);
        [...canvasEl.children].forEach((div) => div.addEventListener("mouseover", paint));
    }
}
function renderGrid(size) {
    let result = [];
    for (let i = 0; i < size * size; i++) {
        result.push(document.createElement("div"));
    }
    canvasEl.replaceChildren(...result);
    canvasEl.style.gridTemplate = `repeat(${size}, 1fr) / repeat(${size}, 1fr)`;
}
function rgbToHex(rgb) {
    let regexResult = rgb.match(/^rgb\((\d+),\s*(\d+),\s*(\d+)\)$/);
    let result = regexResult === null || regexResult === void 0 ? void 0 : regexResult.slice(1).map((n) => parseInt(n, 10).toString(16).padStart(2, "0")).join("");
    return `#${result}`;
}
function paint() {
    if (penBtn.classList.contains("activated")) {
        this.style.backgroundColor = randomBtn.classList.contains("activated")
            ? getRandomHex()
            : colorInput.value;
    }
    else if (eraserBtn.classList.contains("activated")) {
        this.style.backgroundColor = "white";
    }
}
function clearCanvas() {
    [...canvasEl.children].forEach((div) => (div.style.backgroundColor = "white"));
}
function displayGrid() {
    canvasEl.classList.toggle("grid");
}
function getRandomHex() {
    const possibleCharacters = "0123456789ABCDEF";
    let color = "#";
    for (let i = 0; i < 6; i++) {
        const randomIndex = Math.floor(Math.random() * possibleCharacters.length);
        color += possibleCharacters[randomIndex];
    }
    return color;
}
function classToggle(element) {
    if (element.parentNode.id == "toolbox") {
        [...toolboxEl.children].forEach((el) => {
            el.classList.remove("activated");
        });
    }
    element.classList.toggle("activated");
}
/* EVENT LISTENER */
paletteColorEls.forEach((div) => {
    div.addEventListener("click", () => {
        colorInput.value = rgbToHex(div.style.backgroundColor);
    });
});
sizeInputEl.addEventListener("change", function () {
    createGridFromInput();
});
clearBtn.addEventListener("click", clearCanvas);
gridBtn.addEventListener("click", (event) => {
    classToggle(event.target);
    displayGrid();
});
randomBtn.addEventListener("click", (event) => {
    classToggle(event.target);
});
penBtn.addEventListener("click", (event) => {
    classToggle(event.target);
});
eraserBtn.addEventListener("click", (event) => {
    classToggle(event.target);
});
/* INITIALISATION */
createGridFromInput();
