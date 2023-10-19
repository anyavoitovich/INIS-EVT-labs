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

function stopDrawing() {
    isDrawing = false;
}

let isDrawing = false;
let startX, startY;
let shape;

document.addEventListener('mousedown', startDrawing);
document.addEventListener('mousemove', draw);
document.addEventListener('mouseup', stopDrawing);
