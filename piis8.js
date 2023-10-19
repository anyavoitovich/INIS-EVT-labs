const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d');

function drawCircle(event) {
    if (!isDrawing) return;

    const radius = Math.sqrt((event.clientX - startX) ** 2 + (event.clientY - startY) ** 2);
    ctx.beginPath();
    ctx.arc(startX, startY, radius, 0, 2 * Math.PI);
    ctx.strokeStyle = 'black';
    ctx.stroke();
}

function drawRectangle(event) {
    if (!isDrawing) return;

    const width = event.clientX - startX;
    const height = event.clientY - startY;
    ctx.beginPath();
    ctx.rect(startX, startY, width, height);
    ctx.strokeStyle = 'black';
    ctx.stroke();
}

function drawHeart(event) {
    if (!isDrawing) return;

    const width = event.clientX - startX;
    const height = event.clientY - startY;
    const heartPath = new Path2D();
    heartPath.moveTo(startX, startY + height / 4);
    heartPath.quadraticCurveTo(startX + width / 2, startY - height / 2, startX + width, startY + height / 4);
    heartPath.quadraticCurveTo(startX + width / 2, startY + height, startX, startY + height / 4);
    ctx.strokeStyle = 'black';
    ctx.stroke(heartPath);
}

function drawTriangle(event) {
    if (!isDrawing) return;

    const width = event.clientX - startX;
    const height = event.clientY - startY;
    ctx.beginPath();
    ctx.moveTo(startX, startY);
    ctx.lineTo(startX + width, startY);
    ctx.lineTo(startX + width / 2, startY + height);
    ctx.closePath();
    ctx.strokeStyle = 'black';
    ctx.stroke();
}

function drawStar(event) {
    if (!isDrawing) return;

    const size = Math.min(event.clientX - startX, event.clientY - startY);
    const angleOff = -Math.PI / 2;
    const angleStep = Math.PI / 5;

    ctx.beginPath();
    ctx.moveTo(startX + Math.cos(angleOff) * size / 2, startY + Math.sin(angleOff) * size / 2);

    for (let i = 1; i <= 5; i++) {
        const angle = angleOff + i * 2 * angleStep;
        const x = startX + Math.cos(angle) * size * (i % 2 === 0 ? 1 : 0.5);
        const y = startY + Math.sin(angle) * size * (i % 2 === 0 ? 1 : 0.5);
        ctx.lineTo(x, y);
    }

    ctx.closePath();
    ctx.strokeStyle = 'black';
    ctx.stroke();
}

function startDrawing(event) {
    isDrawing = true;
    startX = event.clientX;
    startY = event.clientY;
    shape = document.querySelector('input[name="shape"]:checked').value;
}

function stopDrawing() {
    isDrawing = false;
}

let isDrawing = false;
let startX, startY;
let shape;

canvas.addEventListener('mousedown', startDrawing);
canvas.addEventListener('mousemove', (event) => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    if (shape === 'circle') {
        drawCircle(event);
    } else if (shape === 'rectangle') {
        drawRectangle(event);
    } else if (shape === 'heart') {
        drawHeart(event);
    } else if (shape === 'triangle') {
        drawTriangle(event);
    } else if (shape === 'star') {
        drawStar(event);
    }
});
canvas.addEventListener('mouseup', stopDrawing);
