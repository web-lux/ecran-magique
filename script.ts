const canvasEl = document.querySelector("main") as HTMLElement;
const sizeInputEl = document.querySelector(
	"#size-input-container input"
) as HTMLInputElement;

window.addEventListener("load", () => {
	createGrid(sizeInputEl);
});

sizeInputEl.addEventListener("change", function () {
	createGrid(this);
});

function createGrid(userInputEl: HTMLInputElement) {
	let userInput = parseInt(userInputEl.value);
	if (!userInput || userInput < 1 || userInput > 100) {
		alert(
			"Merci d'entrer un nombre entre 1 et 100 sans caractères spéciaux, + et - inclus."
		);
		sizeInputEl.style.backgroundColor = "red";
		return;
	}
	sizeInputEl.style.backgroundColor = "white";
	makeGrid(userInput);
}

function makeGrid(size: number): void {
	let result = [];
	for (let i = 0; i < size * size; i++) {
		result.push(document.createElement("div"));
	}
	canvasEl.replaceChildren(...result);
	canvasEl.style.gridTemplate = `repeat(${size}, 1fr) / repeat(${size}, 1fr)`;
}
