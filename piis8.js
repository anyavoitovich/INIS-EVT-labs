const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d');
let shapes = []; // Массив для хранения фигур
let currentShape = null;

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

function drawTriangle(startX, startY, endX, endY) {
    ctx.beginPath();
    ctx.moveTo(startX, startY);
    ctx.lineTo(endX, startY);
    ctx.lineTo(startX + (endX - startX) / 2, endY);
    ctx.closePath();
    ctx.strokeStyle = 'black';
    ctx.stroke();
}

function startDrawing(event) {
    const startX = event.clientX;
    const startY = event.clientY;
    shape = document.querySelector('input[name="shape"]:checked').value;
    currentShape = { startX, startY, endX: startX, endY: startY, shape };
}

function drawCurrentShape() {
    const { startX, startY, endX, endY, shape: type } = currentShape;
    if (type === 'circle') {
        drawCircle(startX, startY, endX, endY);
    } else if (type === 'rectangle') {
        drawRectangle(startX, startY, endX, endY);
    } else if (type === 'triangle') {
        drawTriangle(startX, startY, endX, endY);
    }
}

function continueDrawing(event) {
    if (!currentShape) return;
    const { startX, startY } = currentShape;
    currentShape.endX = event.clientX;
    currentShape.endY = event.clientY;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawShapes();
    drawCurrentShape();
}

function stopDrawing() {
    shapes.push(currentShape);
    currentShape = null;
}

function drawShapes() {
    shapes.forEach(shape => {
        const { startX, startY, endX, endY, shape: type } = shape;
        if (type === 'circle') {
            drawCircle(startX, startY, endX, endY);
        } else if (type === 'rectangle') {
            drawRectangle(startX, startY, endX, endY);
        } else if (type === 'triangle') {
            drawTriangle(startX, startY, endX, endY);
        }
    });
}

canvas.addEventListener('mousedown', startDrawing);
canvas.addEventListener('mousemove', continueDrawing);
canvas.addEventListener('mouseup', stopDrawing);
