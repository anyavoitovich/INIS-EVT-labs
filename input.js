// Получаем все элементы с классом "target"
const targets = document.querySelectorAll('.target');

// Переменные для хранения состояния перетаскивания
let isDragging = false;
let offsetX, offsetY, draggedElement, originalX, originalY;

// Функция для начала перетаскивания элемента
function startDragging(event) {
  isDragging = true;
  draggedElement = event.target;
  offsetX = event.clientX - draggedElement.getBoundingClientRect().left;
  offsetY = event.clientY - draggedElement.getBoundingClientRect().top;
  originalX = draggedElement.style.left;
  originalY = draggedElement.style.top;
  draggedElement.style.backgroundColor = 'blue';
}

// Функция для перемещения элемента
function dragElement(event) {
  if (isDragging) {
    const x = event.clientX - offsetX;
    const y = event.clientY - offsetY;
    draggedElement.style.left = `${x}px`;
    draggedElement.style.top = `${y}px`;
  }
}

// Функция для завершения перетаскивания элемента
function stopDragging() {
  if (isDragging) {
    isDragging = false;
    draggedElement.style.backgroundColor = 'red';
  }
}

// Функция для обработки двойного клика
function handleDoubleClick(event) {
  event.preventDefault();
  isDragging = true;
  draggedElement = event.target;
  offsetX = event.clientX - draggedElement.getBoundingClientRect().left;
  offsetY = event.clientY - draggedElement.getBoundingClientRect().top;
  originalX = draggedElement.style.left;
  originalY = draggedElement.style.top;

  // Добавляем обработчик для открепления элемента от курсора по клику мыши
  document.addEventListener('click', function handleClick(event) {
    event.preventDefault();
    isDragging = false;
    draggedElement.style.backgroundColor = 'red';

    // Удаляем обработчик события клика после выполнения одного действия
    document.removeEventListener('click', handleClick);
  }, { once: true });
}

// Обработчики событий для каждого элемента с классом "target"
targets.forEach(target => {
  target.addEventListener('mousedown', startDragging);
  target.addEventListener('mousemove', dragElement);
  target.addEventListener('mouseup', stopDragging);
  target.addEventListener('dblclick', handleDoubleClick);
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

const minSize = 50; // Минимальный размер объекта

// Функция для изменения размера объекта
function resizeElement(event) {
  const rect = draggedElement.getBoundingClientRect();
  const width = event.clientX - rect.left;
  const height = event.clientY - rect.top;

  if (width >= minSize && height >= minSize) {
    draggedElement.style.width = `${width}px`;
    draggedElement.style.height = `${height}px`;
  }
}

// Обработчик события touchstart
function onTouchStart(event) {
  event.preventDefault();
  isDragging = true;
  draggedElement = event.target;
  offsetX = event.touches[0].clientX - draggedElement.getBoundingClientRect().left;
  offsetY = event.touches[0].clientY - draggedElement.getBoundingClientRect().top;
  originalX = draggedElement.style.left;
  originalY = draggedElement.style.top;

  // Добавляем обработчик для изменения размера объекта
  draggedElement.addEventListener('touchmove', resizeElement);

  // Добавляем обработчик для открепления элемента от курсора при опускании второго пальца
  document.addEventListener('touchend', onTouchEnd);
}

// Обработчик события touchend
function onTouchEnd(event) {
  event.preventDefault();
  isDragging = false;
  draggedElement.style.backgroundColor = 'red';

  // Убираем обработчики
  draggedElement.removeEventListener('touchmove', resizeElement);
  document.removeEventListener('touchend', onTouchEnd);

  // Возвращаем элемент на исходное место, если опущен второй палец
  if (event.touches.length === 0) {
    draggedElement.style.left = originalX;
    draggedElement.style.top = originalY;
  }
}

// Обработчик события touchstart для каждого элемента с классом "target"
targets.forEach(target => {
  target.addEventListener('mousedown', startDragging);
  target.addEventListener('mousemove', dragElement);
  target.addEventListener('mouseup', stopDragging);
  target.addEventListener('dblclick', handleDoubleClick);
  target.addEventListener('touchstart', onTouchStart);
});
