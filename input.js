const minSize = 50; // Минимальный размер объекта

// Функция для изменения размера объекта
function resizeElement(event) {
  if (isDragging) {
    const width = Math.max(minSize, event.clientX - offsetX - draggedElement.getBoundingClientRect().left);
    const height = Math.max(minSize, event.clientY - offsetY - draggedElement.getBoundingClientRect().top);
    draggedElement.style.width = `${width}px`;
    draggedElement.style.height = `${height}px`;
  }
}

// Функция для обработки события touchstart на сенсорном экране
function handleTouchStart(event) {
  event.preventDefault();
  isDragging = true;
  draggedElement = event.target;
  offsetX = event.touches[0].clientX - draggedElement.getBoundingClientRect().left;
  offsetY = event.touches[0].clientY - draggedElement.getBoundingClientRect().top;
  originalX = draggedElement.style.left;
  originalY = draggedElement.style.top;

  // Добавляем обработчик для открепления элемента от курсора по клику мыши
  document.addEventListener('touchend', function handleTouchEnd(event) {
    event.preventDefault();
    isDragging = false;
    draggedElement.style.backgroundColor = 'red';

    // Удаляем обработчик события touchend после выполнения одного действия
    document.removeEventListener('touchend', handleTouchEnd);
  }, { once: true });
}

// Обработчики событий для каждого элемента с классом "target"
targets.forEach(target => {
  target.addEventListener('mousedown', startDragging);
  target.addEventListener('mousemove', dragElement);
  target.addEventListener('mouseup', stopDragging);
  target.addEventListener('dblclick', handleDoubleClick);

  // Добавляем обработчики событий сенсорного экрана
  target.addEventListener('touchstart', handleTouchStart);
  target.addEventListener('touchmove', resizeElement);
});

// Обработчик события нажатия клавиши "esc"
document.addEventListener('keydown', function(event) {
  if (event.key === 'Escape' && isDragging) {
    isDragging = false;
    draggedElement.style.left = originalX;
    draggedElement.style.top = originalY;
    draggedElement.style.backgroundColor = 'red';
  }
});
