const grid = document.getElementById("grid");
const sizeInput = document.getElementById("size");
const sizeLabel = document.getElementById("size-label");
const shakeButton = document.getElementById("shake");
const toy = document.getElementById("toy");
const modeButtons = document.querySelectorAll(".mode");

const INK = [43, 43, 43];
let mode = "classic";
let drawing = false; // only used for touch and pen, where there is no hover

// Build a grid that keeps the 4:3 screen shape: `size` columns across.
function buildGrid(size) {
  const rows = Math.round((size * 3) / 4);
  grid.style.gridTemplateColumns = `repeat(${size}, 1fr)`;
  grid.style.gridTemplateRows = `repeat(${rows}, 1fr)`;
  grid.classList.toggle("show-lines", size <= 48);
  const cells = document.createDocumentFragment();
  for (let i = 0; i < size * rows; i++) {
    const cell = document.createElement("div");
    cell.className = "cell";
    cells.appendChild(cell);
  }
  grid.replaceChildren(cells);
  sizeLabel.textContent = `${size} × ${rows}`;
}

function paint(cell) {
  if (!cell || !cell.classList.contains("cell")) return;
  if (mode === "classic") {
    cell.style.backgroundColor = `rgb(${INK})`;
    cell.dataset.shade = "10";
  } else if (mode === "shade") {
    // Each pass adds 10% more ink, so it takes ten passes to go fully dark.
    const shade = Math.min(Number(cell.dataset.shade || 0) + 1, 10);
    cell.dataset.shade = shade;
    cell.style.backgroundColor = `rgba(${INK}, ${shade / 10})`;
  } else if (mode === "rainbow") {
    const hue = Math.floor(Math.random() * 360);
    cell.style.backgroundColor = `hsl(${hue}, 80%, 55%)`;
    cell.dataset.shade = "";
  } else if (mode === "eraser") {
    cell.style.backgroundColor = "";
    cell.dataset.shade = "";
  }
}

// Mouse: draw on hover, like the original. Touch and pen: draw while pressed.
grid.addEventListener("pointerover", (event) => {
  if (event.pointerType === "mouse" || drawing) paint(event.target);
});

grid.addEventListener("pointerdown", (event) => {
  drawing = true;
  grid.releasePointerCapture?.(event.pointerId);
  paint(event.target);
});

grid.addEventListener("pointermove", (event) => {
  if (!drawing || event.pointerType === "mouse") return;
  paint(document.elementFromPoint(event.clientX, event.clientY));
});

window.addEventListener("pointerup", () => (drawing = false));
window.addEventListener("pointercancel", () => (drawing = false));

modeButtons.forEach((button) => {
  button.addEventListener("click", () => {
    mode = button.dataset.mode;
    modeButtons.forEach((b) => {
      const active = b === button;
      b.classList.toggle("is-active", active);
      b.setAttribute("aria-checked", active);
    });
  });
});

sizeInput.addEventListener("input", () => buildGrid(Number(sizeInput.value)));

shakeButton.addEventListener("click", () => {
  toy.classList.remove("is-shaking");
  void toy.offsetWidth; // restart the animation if it is clicked again quickly
  toy.classList.add("is-shaking");
  setTimeout(() => buildGrid(Number(sizeInput.value)), 250);
});

toy.addEventListener("animationend", () => toy.classList.remove("is-shaking"));

buildGrid(Number(sizeInput.value));
