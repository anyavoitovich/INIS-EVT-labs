const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d');
const shapes = []; // массив для хранения нарисованных фигур

function drawCircle(startX, startY, radius) {
    ctx.beginPath();
    ctx.arc(startX, startY, radius, 0, 2 * Math.PI);
    ctx.strokeStyle = 'black';
    ctx.stroke();
}

function drawRectangle(startX, startY, width, height) {
    ctx.beginPath();
    ctx.rect(startX, startY, width, height);
    ctx.strokeStyle = 'black';
    ctx.stroke();
}

function drawTriangle(startX, startY, width, height) {
    ctx.beginPath();
    ctx.moveTo(startX, startY);
    ctx.lineTo(startX + width, startY);
    ctx.lineTo(startX + width / 2, startY + height);
    ctx.closePath();
    ctx.strokeStyle = 'black';
    ctx.stroke();
}

function startDrawing(event) {
    const shapeType = document.querySelector('input[name="shape"]:checked').value;
    const startX = event.clientX;
    const startY = event.clientY;

    if (shapeType === 'circle') {
        const radius = 0;
        shapes.push({ type: 'circle', startX, startY, radius });
        drawCircle(startX, startY, radius);
    } else if (shapeType === 'rectangle') {
        const width = 0;
        const height = 0;
        shapes.push({ type: 'rectangle', startX, startY, width, height });
        drawRectangle(startX, startY, width, height);
    } else if (shapeType === 'triangle') {
        const width = 0;
        const height = 0;
        shapes.push({ type: 'triangle', startX, startY, width, height });
        drawTriangle(startX, startY, width, height);
    }
}

function updateShape(event) {
    if (shapes.length > 0) {
        const shape = shapes[shapes.length - 1];
        const deltaX = event.clientX - shape.startX;
        const deltaY = event.clientY - shape.startY;

        if (shape.type === 'circle') {
            shape.radius = Math.sqrt(deltaX ** 2 + deltaY ** 2);
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            shapes.forEach(shape => {
                if (shape.type === 'circle') {
                    drawCircle(shape.startX, shape.startY, shape.radius);
                } else if (shape.type === 'rectangle') {
                    drawRectangle(shape.startX, shape.startY, deltaX, deltaY);
                } else if (shape.type === 'triangle') {
                    drawTriangle(shape.startX, shape.startY, deltaX, deltaY);
                }
            });
        } else if (shape.type === 'rectangle') {
            shape.width = deltaX;
            shape.height = deltaY;
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            shapes.forEach(shape => {
                if (shape.type === 'circle') {
                    drawCircle(shape.startX, shape.startY, shape.radius);
                } else if (shape.type === 'rectangle') {
                    drawRectangle(shape.startX, shape.startY, shape.width, shape.height);
                } else if (shape.type === 'triangle') {
                    drawTriangle(shape.startX, shape.startY, shape.width, shape.height);
                }
            });
        } else if (shape.type === 'triangle') {
            shape.width = deltaX;
            shape.height = deltaY;
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            shapes.forEach(shape => {
                if (shape.type === 'circle') {
                    drawCircle(shape.startX, shape.startY, shape.radius);
                } else if (shape.type === 'rectangle') {
                    drawRectangle(shape.startX, shape.startY, shape.width, shape.height);
                } else if (shape.type === 'triangle') {
                    drawTriangle(shape.startX, shape.startY, shape.width, shape.height);
                }
            });
        }
    }
}

function removeLastShape() {
    if (shapes.length > 0) {
        shapes.pop();
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        shapes.forEach(shape => {
            if (shape.type === 'circle') {
                drawCircle(shape.startX, shape.startY, shape.radius);
            } else if (shape.type === 'rectangle') {
                drawRectangle(shape.startX, shape.startY, shape.width, shape.height);
            } else if (shape.type === 'triangle') {
                drawTriangle(shape.startX, shape.startY, shape.width, shape.height);
            }
        });
    }
}

canvas.addEventListener('mousedown', startDrawing);
canvas.addEventListener('mousemove', updateShape);
canvas.addEventListener('mouseup', removeLastShape);
