const targets = document.querySelectorAll(".target");
let selectedElement = null;
let initialX, initialY;

function handleMouseDown(event) {
  selectedElement = event.target;
  selectedElement.style.zIndex = "999";
  initialX = event.clientX - selectedElement.getBoundingClientRect().left;
  initialY = event.clientY - selectedElement.getBoundingClientRect().top;

  function handleMouseMove(event) {
    selectedElement.style.left = event.clientX - initialX + "px";
    selectedElement.style.top = event.clientY - initialY + "px";
  }

  function handleMouseUp() {
    document.removeEventListener("mousemove", handleMouseMove);
    document.removeEventListener("mouseup", handleMouseUp);
  }

  document.addEventListener("mousemove", handleMouseMove);
  document.addEventListener("mouseup", handleMouseUp);
}

function handleDoubleClick(event) {
  selectedElement = event.target;
  selectedElement.style.zIndex = "999";
  selectedElement.style.backgroundColor = "pink";

  function handleMouseMove(event) {
    selectedElement.style.left = event.clientX - initialX + "px";
    selectedElement.style.top = event.clientY - initialY + "px";
  }

  function handleMouseUp() {
    document.removeEventListener("mousemove", handleMouseMove);
    document.removeEventListener("mouseup", handleMouseUp);
  }

  document.addEventListener("mousemove", handleMouseMove);
  document.addEventListener("mouseup", handleMouseUp);
}

function handleKeyDown(event) {
  if (event.key === "Escape" && selectedElement) {
    selectedElement.style.zIndex = "auto";
    selectedElement.style.backgroundColor = "red";
    selectedElement.style.left = initialX + "px";
    selectedElement.style.top = initialY + "px";
    selectedElement = null;
  }
}

targets.forEach((target) => {
  target.addEventListener("mousedown", handleMouseDown);
  target.addEventListener("dblclick", handleDoubleClick);
});

document.addEventListener("keydown", handleKeyDown);
