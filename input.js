const targets = document.querySelectorAll(".target");
let activeTarget = null;
let isDragging = false;
let isDoubleClick = false;

// Добавляем обработчики событий мыши для всех div с классом "target"
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
  if (isDoubleClick) return;

  activeTarget = event.target;
  isDragging = true;
  event.preventDefault();

  // При зажатой левой кнопке мыши перемещаем div следом за курсором
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
  isDragging = false;
  document.removeEventListener("mousemove", handleMouseMove);
  document.removeEventListener("mouseup", handleMouseUp);
}

function handleDoubleClick(event) {
  if (activeTarget === event.target) {
    isDoubleClick = true;
    activeTarget.style.backgroundColor = "green";
    activeTarget.style.cursor = "move";

    document.addEventListener("mousemove", handleMouseMoveOnDoubleClick);
    document.addEventListener("mouseup", handleMouseUpOnDoubleClick);
  }
}

function handleMouseMoveOnDoubleClick(event) {
  if (isDoubleClick && activeTarget) {
    const rect = activeTarget.getBoundingClientRect();
    const offsetX = event.clientX - rect.width / 2;
    const offsetY = event.clientY - rect.height / 2;
    activeTarget.style.left = offsetX + "px";
    activeTarget.style.top = offsetY + "px";
  }
}

function handleMouseUpOnDoubleClick() {
  isDoubleClick = false;
  activeTarget.style.backgroundColor = "red";
  activeTarget.style.cursor = "auto";

  document.removeEventListener("mousemove", handleMouseMoveOnDoubleClick);
  document.removeEventListener("mouseup", handleMouseUpOnDoubleClick);
}

function handleTouchStart(event) {
  if (isDragging) return;

  activeTarget = event.target;
  isDragging = true;
  event.preventDefault();

  document.addEventListener("touchmove", handleMouseMove);
  document.addEventListener("touchend", handleTouchEnd);
}

function handleTouchEnd() {
  isDragging = false;
  activeTarget = null;
  document.removeEventListener("touchmove", handleMouseMove);
  document.removeEventListener("touchend", handleTouchEnd);
}

function handleKeyDown(event) {
  if (event.key === "Escape" && (isDragging || isDoubleClick)) {
    // В случае нажатия клавиши "Esc" возвращаем элемент на исходную позицию и отменяем приклеивание
    isDragging = false;
    isDoubleClick = false;

    if (activeTarget) {
      activeTarget.style.left = "";
      activeTarget.style.top = "";
      activeTarget.style.backgroundColor = "red";
      activeTarget.style.cursor = "auto";
    }
  }
}
