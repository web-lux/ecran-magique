/* HTML ELEMENT */

const canvasEl = document.querySelector("main") as HTMLElement;
const sizeInputEl = document.querySelector(
	"#size-input-container input"
) as HTMLInputElement;
const colorInput = document.querySelector(
	"#color-picker-container input"
) as HTMLInputElement;
const paletteColorEls = document.querySelectorAll("#palette div");
const clearBtn = document.querySelector(
	"button#clear-btn"
) as HTMLButtonElement;
const gridBtn = document.querySelector("button#grid-btn") as HTMLElement;

/* FUNCTION */

function getUserInput(): number | undefined {
	let userInput = parseInt(sizeInputEl.value);
	if (!userInput || userInput < 1 || userInput > 100) {
		alert(
			"Merci d'entrer un nombre entre 1 et 100 sans caractères spéciaux, + et - inclus."
		);
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
		[...canvasEl.children].forEach((div) =>
			div.addEventListener("mouseover", paint)
		);
	}
}

function renderGrid(size: number) {
	let result = [];
	for (let i = 0; i < size * size; i++) {
		result.push(document.createElement("div"));
	}
	canvasEl.replaceChildren(...result);
	canvasEl.style.gridTemplate = `repeat(${size}, 1fr) / repeat(${size}, 1fr)`;
}

function rgbToHex(rgb: string) {
	let regexResult = rgb.match(/^rgb\((\d+),\s*(\d+),\s*(\d+)\)$/);
	let result = regexResult
		?.slice(1)
		.map((n) => parseInt(n, 10).toString(16).padStart(2, "0"))
		.join("");
	return `#${result}`;
}

function paint(this: any) {
	this.style.background = colorInput.value;
}

function clearCanvas() {
	[...canvasEl.children].forEach(
		(div: any) => (div.style.backgroundColor = "white")
	);
}

function displayGrid() {
	canvasEl.classList.toggle("grid");
}

/* EVENT LISTENER */

paletteColorEls.forEach((div: any) => {
	div.addEventListener("click", () => {
		colorInput.value = rgbToHex(div.style.backgroundColor);
	});
});

sizeInputEl.addEventListener("change", function () {
	createGridFromInput();
});

clearBtn.addEventListener("click", clearCanvas);

gridBtn.addEventListener("click", function () {
	this.classList.toggle("activated");
	displayGrid();
});

/* INITIALISATION */

createGridFromInput();
