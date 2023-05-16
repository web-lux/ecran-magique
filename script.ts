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
const randomBtn = document.querySelector("button#random-btn") as HTMLElement;
const toolboxEl = document.querySelector("#toolbox") as HTMLElement;
const penBtn = document.querySelector("#pen-btn") as HTMLElement;
const eraserBtn = document.querySelector("#eraser-btn") as HTMLElement;
const bucketBtn = document.querySelector("#bucket-btn") as HTMLElement;
const pickerBtn = document.querySelector("#picker-btn") as HTMLElement;

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
		[...canvasEl.children].forEach((div) => {
			div.addEventListener("mouseover", handleHover);
			div.addEventListener("click", handleClick);
		});
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

function handleHover(this: any) {
	if (penBtn.classList.contains("activated")) {
		this.style.backgroundColor = randomBtn.classList.contains("activated")
			? getRandomHex()
			: colorInput.value;
	} else if (eraserBtn.classList.contains("activated")) {
		this.style.backgroundColor = "white";
	} else return;
}

function handleClick(this: any) {
	if (bucketBtn.classList.contains("activated")) {
		[...canvasEl.children].forEach((div: any) => {
			div.style.backgroundColor = randomBtn.classList.contains("activated")
				? getRandomHex()
				: colorInput.value;
		});
	} else if (pickerBtn.classList.contains("activated")) {
		colorInput.value = rgbToHex(this.style.backgroundColor);
	} else return;
}

function clearCanvas() {
	[...canvasEl.children].forEach(
		(div: any) => (div.style.backgroundColor = "white")
	);
}

function displayGrid() {
	canvasEl.classList.toggle("grid");
}

function getRandomHex(): string {
	const possibleCharacters = "0123456789ABCDEF";
	let color = "#";

	for (let i = 0; i < 6; i++) {
		const randomIndex = Math.floor(Math.random() * possibleCharacters.length);
		color += possibleCharacters[randomIndex];
	}

	return color;
}

function classToggle(element: any) {
	if (element.parentNode.id == "toolbox") {
		[...toolboxEl.children].forEach((el) => {
			el.classList.remove("activated");
		});
	}
	element.classList.toggle("activated");
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

bucketBtn.addEventListener("click", (event) => {
	classToggle(event.target);
});

pickerBtn.addEventListener("click", (event) => {
	classToggle(event.target);
});

/* INITIALISATION */

createGridFromInput();
