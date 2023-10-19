const svg = document.querySelector('svg');

function startDrawing(event) {
    if (event.target.tagName === 'svg' && event.buttons === 1) {
        isDrawing = true;
        startX = event.clientX;
        startY = event.clientY;
        shape = document.querySelector('input[name="shape"]:checked').value;
    }
}

function drawCircle(event) {
    if (!isDrawing) return;

    const radius = Math.sqrt((event.clientX - startX) ** 2 + (event.clientY - startY) ** 2);
    svg.innerHTML = `<circle cx="${startX}" cy="${startY}" r="${radius}" stroke="black" fill="transparent"/>`;
}

function drawRectangle(event) {
    if (!isDrawing) return;

    const width = event.clientX - startX;
    const height = event.clientY - startY;
    svg.innerHTML = `<rect x="${startX}" y="${startY}" width="${width}" height="${height}" stroke="black" fill="transparent"/>`;
}

function drawHeart(event) {
    if (!isDrawing) return;

    const width = event.clientX - startX;
    const height = event.clientY - startY;

    const heartPath = `
        M ${startX} ${startY + height / 4}
        Q ${startX + width / 2} ${startY - height / 2} ${startX + width} ${startY + height / 4}
        Q ${startX + width / 2} ${startY + height} ${startX} ${startY + height / 4}
        Z
    `;

    svg.innerHTML = `<path d="${heartPath}" stroke="black" fill="transparent"/>`;
}

function drawTriangle(event) {
    if (!isDrawing) return;

    const width = event.clientX - startX;
    const height = event.clientY - startY;
    const trianglePath = `
        M ${startX} ${startY}
        L ${startX + width} ${startY}
        L ${startX + width / 2} ${startY + height}
        Z
    `;

    svg.innerHTML = `<path d="${trianglePath}" stroke="black" fill="transparent"/>`;
}



function drawStar(event) {
    if (!isDrawing) return;

    const size = Math.min(event.clientX - startX, event.clientY - startY);
    const angleOff = -Math.PI / 2;
    const angleStep = Math.PI / 5;
    let starPath = `M ${startX + Math.cos(angleOff) * size / 2} ${startY + Math.sin(angleOff) * size / 2}`;

    for (let i = 1; i <= 5; i++) {
        const angle = angleOff + i * 2 * angleStep;
        const x = startX + Math.cos(angle) * size * (i % 2 === 0 ? 1 : 0.5);
        const y = startY + Math.sin(angle) * size * (i % 2 === 0 ? 1 : 0.5);
        starPath += ` L ${x} ${y}`;
    }

    starPath += ' Z';

    svg.innerHTML = `<path d="${starPath}" stroke="black" fill="transparent"/>`;
}


function stopDrawing() {
    isDrawing = false;
}

let isDrawing = false;
let startX, startY;
let shape;

document.addEventListener('mousedown', startDrawing);
document.addEventListener('mousemove', (event) => {
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
document.addEventListener('mouseup', stopDrawing);
