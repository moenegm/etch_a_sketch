// Grid System
const body = document.querySelector("body");
const container = document.querySelector(".container");
const grid = document.createElement("div");

//Button Declartion.
const clear = document.createElement("button");
clear.textContent = "Clear selection";

clear.className = "button";

//Appending
container.appendChild(clear);
container.appendChild(grid);

//Generting Boxes in the Grid
function generateBoxes(length) {
  for (let i = 1; i <= length * length; i++) {
    let box = document.createElement("div");
    box.classList.add("box");
    grid.appendChild(box);
    box.style.cssText = "border: 1px solid #cccccc; height: 10px;";
  }
}
generateBoxes(70);

//Styling
container.style.cssText =
  "height: 100%; margin: auto; background-color: #ffffff; border: 1px solid black;";
clear.style.cssText =
  "text-align: center; border-bottom: 1px solid black; padding: 20px; font-weight: bold; width: 100%; background-color: #ff6600";
body.style.cssText = "margin: 10%; height: 100%; background-color: #cccccc";
grid.style.cssText = "display: grid; grid-template-columns: repeat(100, 1fr);";

// Button Effects
clear.addEventListener("click", clearFunction);
clear.addEventListener("mouseover", buttonOnFunction);
clear.addEventListener("mouseout", buttonOutFunction);
function buttonOnFunction(event) {
  clear.style.opacity = "0.5";
}
function buttonOutFunction(event) {
  clear.style.opacity = "1";
}
function clearFunction(event) {
  grid.innerHTML = "";
  generateBoxes(70);
}

// Coloring, actual game.

document.body.addEventListener("mouseover", e => {
  if (e.target.classList.contains("box")) {
    e.target.style.backgroundColor = "black";
  }
});

// Cheating.
