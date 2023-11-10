document.addEventListener('DOMContentLoaded', function() {
    let selectedElement = null;
    let initialX, initialY;
    let offsetX, offsetY;
    let isDragging = false;
    let isFollowingFinger = false;
    let touchStartTimestamp = 0;
    let touchStartX = 0;
    let touchStartY = 0;

    document.addEventListener('touchstart', function(event) {
        const touch = event.touches[0];
        if (event.touches.length > 1) {
            cancelDragging();
            return;
        }
        if (touch.target.classList.contains('target')) {
            selectElement(touch.target, touch.clientX, touch.clientY);
            touchStartTimestamp = Date.now();
            touchStartX = touch.clientX;
            touchStartY = touch.clientY;
        }
        event.preventDefault(); 
    });

    document.addEventListener('touchmove', function(event) {
        if (isDragging) {
            const touch = event.touches[0];
            handleDrag(touch.clientX, touch.clientY);
        }
        event.preventDefault(); 
    });

    document.addEventListener('touchend', function(event) {
        if (isDragging && isFollowingFinger) {
            const touchEndTimestamp = Date.now();
            const touchEndX = event.changedTouches[0].clientX;
            const touchEndY = event.changedTouches[0].clientY;
            const touchDuration = touchEndTimestamp - touchStartTimestamp;
            const touchMoved = Math.sqrt(Math.pow(touchEndX - touchStartX, 2) + Math.pow(touchEndY - touchStartY, 2));
            
            if (touchDuration < 300 && touchMoved < 10) {
                releaseElement();
            }
        }
    });

    document.addEventListener('dblclick', function(event) {
        if (event.target.classList.contains('target')) {
            selectElement(event.target, event.clientX, event.clientY);
            isFollowingFinger = true;
        }
        event.preventDefault();
    });

    

    function selectElement(element, clientX, clientY) {
        selectedElement = element;
        initialX = selectedElement.getBoundingClientRect().left;
        initialY = selectedElement.getBoundingClientRect().top;
        offsetX = clientX - initialX;
        offsetY = clientY - initialY;
        isDragging = true;
        isFollowingFinger = true;
    }

    function handleDrag(clientX, clientY) {
        if (isDragging) {
            const x = clientX - offsetX;
            const y = clientY - offsetY;
            selectedElement.style.left = x + 'px';
            selectedElement.style.top = y + 'px';
        }
    }

    function releaseElement() {
        isDragging = false;
        if (isFollowingFinger) {
            selectedElement.style.backgroundColor = 'red';
        }
    }

    function cancelDragging() {
        if (isDragging) {
            isDragging = false;
            selectedElement.style.left = initialX + 'px';
            selectedElement.style.top = initialY + 'px';
            isFollowingFinger = false;
            selectedElement.style.backgroundColor = 'red';
        }
    }
});
