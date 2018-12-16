const container = document.querySelector(".container"),
  body = document.querySelector("body"),
  clear = document.createElement("button"),
  one = document.createElement("div"),
  two = document.createElement("div"),
  three = document.createElement("div"),
  four = document.createElement("div");
clear.textContent = "Clear selection";
container.appendChild(clear);
container.appendChild(one);
container.appendChild(two);
container.appendChild(three);
container.appendChild(four);

one.style.cssText = "border: 1px solid black;";
two.style.cssText = "border: 1px solid black;";
three.style.cssText = "border: 1px solid black;";
four.style.cssText = "border: 1px solid black;";

container.style.cssText =
  "display: grid; grid-template-columns: repeat(2, 1fr); grid-template-rows: repeat(4, 1fr); margin: auto; ";
clear.style.cssText =
  "grid-column-start: span 2; text-align: center; border: 1px solid black; padding: 20px; font-weight: bold;";
body.style.cssText = "margin: 10%;";

one.classList.add("hover");
two.classList.add("hover");
three.classList.add("hover");
four.classList.add("hover");

one.addEventListener("mouseover", oneHoverFunction);
two.addEventListener("mouseover", twoHoverFunction);
three.addEventListener("mouseover", threeHoverFunction);
four.addEventListener("mouseover", fourHoverFunction);

function oneHoverFunction() {
  one.style.cssText = "border: 1px solid black; background: yellow;";
}
function twoHoverFunction() {
  two.style.cssText = "border: 1px solid black; background: yellow;";
}
function threeHoverFunction() {
  three.style.cssText = "border: 1px solid black; background: yellow;";
}
function fourHoverFunction() {
  four.style.cssText = "border: 1px solid black; background: yellow;";
}

/*
one.addEventListener("mouseout", hoverOutFunction);

function hoverOutFunction() {
  one.style.cssText = "width: 100px; height: 100px; background: red;";
}
*/
//container.style.display = "grid";
