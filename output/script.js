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
const bucketBtn = document.querySelector("#bucket-btn");
const pickerBtn = document.querySelector("#picker-btn");
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
    let userInput = getUserInput(); //getUserInput fait office de validateur
    if (userInput) {
        // s'il ne renvoie pas undefined, renderGrid peut se lancer
        renderGrid(userInput);
        [...canvasEl.children].forEach((div) => {
            /* le spread operator permet d'itérer sur la collection HTML comme sur un array */
            div.addEventListener("mouseover", handleHover); // mouseover gère le pen et l'eraser
            div.addEventListener("click", handleClick); // click gère le bucket et le picker
        });
    }
}
function renderGrid(size) {
    // la fonction crée un array d'élement div en fonction de la valeur de sizeInput
    let result = [];
    for (let i = 0; i < size * size; i++) {
        result.push(document.createElement("div"));
    }
    canvasEl.replaceChildren(...result);
    canvasEl.style.gridTemplate = `repeat(${size}, 1fr) / repeat(${size}, 1fr)`; // modifie le CSS de la grid en fonction de la valeur de sizeInput
}
function rgbToHex(rgb) {
    // fonction utilisée par le bouton colorPicker et lorsqu'on sélectionne une couleur prédéfinie de la palette
    let regexResult = rgb.match(/^rgb\((\d+),\s*(\d+),\s*(\d+)\)$/);
    let result = regexResult === null || regexResult === void 0 ? void 0 : regexResult.slice(1).map((n) => parseInt(n, 10).toString(16).padStart(2, "0")).join("");
    return `#${result}`;
}
function handleHover() {
    if (penBtn.classList.contains("activated")) {
        this.style.backgroundColor = randomBtn.classList.contains("activated") // vérifie si le bouton random est activé ou non et adapte la couleur en conséquence
            ? getRandomHex()
            : colorInput.value;
    }
    else if (eraserBtn.classList.contains("activated")) {
        this.style.backgroundColor = "";
    }
    else
        return;
}
function handleClick() {
    if (bucketBtn.classList.contains("activated")) {
        [...canvasEl.children].forEach((div) => {
            div.style.backgroundColor = randomBtn.classList.contains("activated") // vérifie si le bouton random est activé ou non et adapte la couleur en conséquence
                ? getRandomHex()
                : colorInput.value;
        });
    }
    else if (pickerBtn.classList.contains("activated")) {
        console.log(this.style.backgroundColor);
        if (this.style.backgroundColor != "") {
            colorInput.value = rgbToHex(this.style.backgroundColor);
        }
    }
    else
        return;
}
function clearCanvas() {
    [...canvasEl.children].forEach((div) => (div.style.backgroundColor = ""));
}
function displayGrid() {
    canvasEl.classList.toggle("grid");
}
function getRandomHex() {
    // utilisée pour le pen et le bucket
    const possibleCharacters = "0123456789ABCDEF";
    let color = "#";
    for (let i = 0; i < 6; i++) {
        const randomIndex = Math.floor(Math.random() * possibleCharacters.length);
        color += possibleCharacters[randomIndex];
    }
    return color;
}
function classToggle(element) {
    // utilisée par les event listeners
    if (element.parentNode.id == "toolbox") {
        // dans le cas où l'élement cliqué a la toolbox comme container parent, empêche d'avoir plusieurs outils sélectionnés en même temps via un reset
        [...toolboxEl.children].forEach((el) => {
            el.classList.remove("activated");
        });
    }
    element.classList.toggle("activated");
}
/* EVENT LISTENER */
paletteColorEls.forEach((div) => {
    // itère sur tous les élements de la palette pour que cliquer
    // sur l'un d'eux remplace la valeur de colorInput par la valeur de la couleur du fond
    div.addEventListener("click", () => {
        colorInput.value = rgbToHex(div.style.backgroundColor);
    });
});
sizeInputEl.addEventListener("change", function () {
    createGridFromInput();
});
clearBtn.addEventListener("click", clearCanvas);
gridBtn.addEventListener("click", (event) => {
    displayGrid();
});
[randomBtn, penBtn, eraserBtn, bucketBtn, pickerBtn, gridBtn].forEach(
// pour être plus DRY, la fonction réunit tous les boutons activables (et surtout, qui restent "pressés" via css) dans un array
(element) => {
    element.addEventListener("click", (event) => {
        classToggle(event.target);
    });
});
/* INITIALISATION */
createGridFromInput();
