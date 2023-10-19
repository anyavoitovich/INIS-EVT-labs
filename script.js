const svg = document.querySelector('svg');

function startDrawing(event) {
    if (event.target.tagName === 'svg' && event.buttons === 1) {
        isDrawing = true;
        startX = event.clientX;
        startY = event.clientY;
        shape = document.querySelector('input[name="shape"]:checked').value;
    }
}

function draw(event) {
    if (!isDrawing) return;

    const width = event.clientX - startX;
    const height = event.clientY - startY;

    if (shape === 'circle') {
        const radius = Math.sqrt(width ** 2 + height ** 2);
        svg.innerHTML = `<circle cx="${startX}" cy="${startY}" r="${radius}" stroke="black" fill="transparent"/>`;
    } else if (shape === 'rectangle') {
        svg.innerHTML = `<rect x="${startX}" y="${startY}" width="${width}" height="${height}" stroke="black" fill="transparent"/>`;
    }
}
function drawHeart(event) {
    if (!isDrawing) return;

    const width = event.clientX - startX;
    const height = event.clientY - startY;
    const heartPath = `
        M ${startX} ${startY + height / 2}
        Q ${startX} ${startY} ${startX + width / 2} ${startY}
        Q ${startX + width} ${startY} ${startX + width} ${startY + height / 2}
        L ${startX + width / 2} ${startY + height}
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
    const starPath = `
        M ${startX} ${startY - size / 2}
        L ${startX + size / 5} ${startY + size / 5}
        L ${startX} ${startY + size / 2}
        L ${startX - size / 5} ${startY + size / 5}
        Z
    `;

    svg.innerHTML = `<path d="${starPath}" stroke="black" fill="transparent"/>`;
}

function stopDrawing() {
    isDrawing = false;
}

let isDrawing = false;
let startX, startY;
let shape;

document.addEventListener('mousedown', startDrawing);
document.addEventListener('mousemove', draw);
document.addEventListener('mouseup', stopDrawing);
