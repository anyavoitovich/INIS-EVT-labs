const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d');
const shapes = []; // Массив для хранения фигур

function drawCircle(startX, startY, endX, endY) {
    const radius = Math.sqrt((endX - startX) ** 2 + (endY - startY) ** 2);
    ctx.beginPath();
    ctx.arc(startX, startY, radius, 0, 2 * Math.PI);
    ctx.strokeStyle = 'black';
    ctx.stroke();
}

function drawRectangle(startX, startY, endX, endY) {
    const width = endX - startX;
    const height = endY - startY;
    ctx.beginPath();
    ctx.rect(startX, startY, width, height);
    ctx.strokeStyle = 'black';
    ctx.stroke();
}

function startDrawing(event) {
    const startX = event.clientX;
    const startY = event.clientY;

    if (!isDrawing) {
        isDrawing = true;
        shape = document.querySelector('input[name="shape"]:checked').value;
        shapes.push({ startX, startY, shape, endX: startX, endY: startY }); // Начинаем новую фигуру
    }
}

function drawShapes() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    shapes.forEach(shape => {
        const { startX, startY, endX, endY, shape: type } = shape;
        if (type === 'circle') {
            drawCircle(startX, startY, endX, endY);
        } else if (type === 'rectangle') {
            drawRectangle(startX, startY, endX, endY);
        }
    });
}

function stopDrawing(event) {
    if (isDrawing) {
        shapes[shapes.length - 1].endX = event.clientX;
        shapes[shapes.length - 1].endY = event.clientY;
        isDrawing = false;
        drawShapes();
    }
}

let isDrawing = false;
let shape;

canvas.addEventListener('mousedown', startDrawing);
canvas.addEventListener('mousemove', drawShapes);
canvas.addEventListener('mouseup', stopDrawing);
