const canvas = document.querySelector('canvas'); // Получаем элемент canvas из HTML-документа
const ctx = canvas.getContext('2d'); // Получаем контекст рисования на canvas

const shapes = []; // Массив для хранения фигур

// Функция для отрисовки всех фигур в массиве shapes
function drawShapes() {
    ctx.clearRect(0, 0, canvas.width, canvas.height); // Очищаем canvas
    shapes.forEach(shape => {
        ctx.strokeStyle = 'black'; // Устанавливаем цвет контура фигуры
        ctx.beginPath(); // Начинаем новый путь рисования
        shape.draw(ctx); // Вызываем метод draw фигуры, передаем контекст рисования
        ctx.stroke(); // Рисуем контур фигуры
    });
}

// Функция для рисования круга
function drawCircle(startX, startY, endX, endY) {
    const radius = Math.sqrt((endX - startX) ** 2 + (endY - startY) ** 2); // Рассчитываем радиус по координатам мыши
    ctx.arc(startX, startY, radius, 0, 2 * Math.PI); // Рисуем круг
}

// Функция для рисования прямоугольника
function drawRectangle(startX, startY, endX, endY) {
    const width = endX - startX; // Рассчитываем ширину по координатам мыши
    const height = endY - startY; // Рассчитываем высоту по координатам мыши
    ctx.rect(startX, startY, width, height); // Рисуем прямоугольник
}


// Функция для рисования треугольника
function drawTriangle(startX, startY, endX, endY) {
    const width = endX - startX; // Рассчитываем ширину по координатам мыши
    const height = endY - startY; // Рассчитываем высоту по координатам мыши
    ctx.moveTo(startX, startY); // Перемещаемся в начальную точку
    ctx.lineTo(startX + width, startY); // Рисуем первую сторону треугольника
    ctx.lineTo(startX + width / 2, startY + height); // Рисуем вторую сторону треугольника
    ctx.closePath(); // Заканчиваем путь, соединяя последнюю точку с первой
}


// Функция для начала рисования фигуры
function startDrawing(event) {
    const startX = event.clientX - canvas.offsetLeft; // Получаем начальную координату x относительно canvas
    const startY = event.clientY - canvas.offsetTop; // Получаем начальную координату y относительно canvas
    const shapeType = document.querySelector('input[name="shape"]:checked').value; // Получаем выбранный тип фигуры
    const newShape = {
        type: shapeType, // Тип фигуры (круг, прямоугольник, сердце, треугольник, звезда)
        startX, // Начальная координата x
        startY, // Начальная координата y
        endX: startX, // Конечная координата x (изначально равна начальной)
        endY: startY  // Конечная координата y (изначально равна начальной)
    };
    shapes.push(newShape); // Добавляем новую фигуру в массив
    drawShapes(); // Перерисовываем все фигуры на canvas
}

// Функция для обновления рисования фигуры при движении мыши
function updateDrawing(event) {
    if (shapes.length === 0) return; // Если массив фигур пуст, выходим из функции
    const endX = event.clientX - canvas.offsetLeft; // Получаем конечную координату x относительно canvas
    const endY = event.clientY - canvas.offsetTop; // Получаем конечную координату y относительно canvas
    shapes[shapes.length - 1].endX = endX; // Обновляем конечную координату x последней добавленной фигуры
    shapes[shapes.length - 1].endY = endY; // Обновляем конечную координату y последней добавленной фигуры
    drawShapes(); // Перерисовываем все фигуры на canvas
}

// Функция для удаления фигуры при клике на нее
function removeShape(event) {
    const clickX = event.clientX - canvas.offsetLeft; // Получаем координату x клика относительно canvas
    const clickY = event.clientY - canvas.offsetTop; // Получаем координату y клика относительно canvas
    for (let i = shapes.length - 1; i >= 0; i--) {
        const shape = shapes[i]; // Получаем текущую фигуру из массива
        const hit = checkHit(shape, clickX, clickY); // Проверяем, попал ли клик в текущую фигуру
        if (hit) { // Если клик попал в фигуру
            shapes.splice(i, 1); // Удаляем фигуру из массива
            drawShapes(); // Перерисовываем все фигуры на canvas
            break; // Выходим из цикла, так как фигура уже удалена
        }
    }
}

// Функция для проверки, попал ли клик в фигуру
function checkHit(shape, x, y) {
    ctx.beginPath(); // Начинаем новый путь рисования
    if (shape.type === 'circle') {
        drawCircle(shape.startX, shape.startY, shape.endX, shape.endY); // Рисуем круг
    } else if (shape.type === 'rectangle') {
        drawRectangle(shape.startX, shape.startY, shape.endX, shape.endY); // Рисуем прямоугольник
    } else if (shape.type === 'triangle') {
        drawTriangle(shape.startX, shape.startY, shape.endX, shape.endY); // Рисуем треугольник
    } 
    ctx.closePath(); // Заканчиваем путь
    return ctx.isPointInPath(x, y); // Проверяем, попал ли клик в путь фигуры
}

// Добавляем слушатели событий для рисования, обновления и удаления фигур
canvas.addEventListener('mousedown', startDrawing); // При нажатии кнопки мыши начинаем рисовать фигуру
canvas.addEventListener('mousemove', updateDrawing); // При движении мыши обновляем рисование текущей фигуры
canvas.addEventListener('click', removeShape); // При клике на фигуру удаляем ее
