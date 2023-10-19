const targets = document.querySelectorAll(".target");
let activeTarget = null;
let isDragging = false;
let isAttached = false;

targets.forEach((target) => {
  target.addEventListener("mousedown", handleMouseDown);
  target.addEventListener("dblclick", handleDoubleClick);
  target.addEventListener("touchstart", handleTouchStart);
  target.addEventListener("touchend", handleTouchEnd);
});

document.addEventListener("mousemove", handleMouseMove);
document.addEventListener("mouseup", handleMouseUp);
document.addEventListener("keydown", handleKeyDown);

function handleMouseDown(event) {
  if (isDragging || isAttached) return;

  activeTarget = event.target;
  isDragging = true;
  event.preventDefault();

  document.addEventListener("mousemove", handleMouseMove);
  document.addEventListener("mouseup", handleMouseUp);
}

function handleMouseMove(event) {
  if (isDragging && activeTarget) {
    const rect = activeTarget.getBoundingClientRect();
    const offsetX = event.clientX - rect.width / 2;
    const offsetY = event.clientY - rect.height / 2;
    activeTarget.style.left = offsetX + "px";
    activeTarget.style.top = offsetY + "px";
  }
}

function handleMouseUp() {
  if (isDragging && !isAttached) {
    activeTarget = null;
  }
  isDragging = false;
  document.removeEventListener("mousemove", handleMouseMove);
  document.removeEventListener("mouseup", handleMouseUp);
}

function handleDoubleClick(event) {
  if (activeTarget === event.target) {
    if (isAttached) {
      isAttached = false;
      activeTarget.style.backgroundColor = "red";
    } else {
      isAttached = true;
      activeTarget.style.backgroundColor = "green";
    }
  }
}

function handleTouchStart(event) {
  if (isDragging || isAttached) return;

  activeTarget = event.target;
  isDragging = true;
  event.preventDefault();

  document.addEventListener("touchmove", handleMouseMove);
  document.addEventListener("touchend", handleTouchEnd);
}

function handleTouchEnd() {
  if (isDragging && !isAttached) {
    activeTarget = null;
  }
  isDragging = false;
  document.removeEventListener("touchmove", handleMouseMove);
  document.removeEventListener("touchend", handleTouchEnd);
}

function handleKeyDown(event) {
  if (event.key === "Escape" && (isDragging || isAttached) && activeTarget) {
    activeTarget.style.left = "";
    activeTarget.style.top = "";
    isDragging = false;
    isAttached = false;
  }
}
