document.addEventListener("DOMContentLoaded", function() {
    const ball = document.querySelector('.ball');
    const windowHeight = window.innerHeight;
    const gravity = 9.8; // Ускорение свободного падения (м/с^2)
    const restitution = 0.7; // Коэффициент упругости

    let initialVelocity = Math.sqrt(2 * gravity * windowHeight); // Начальная скорость для достижения высоты windowHeight

    function fall() {
        let timeToFall = Math.sqrt((2 * windowHeight) / gravity); // Время падения с высоты windowHeight
        let maxVelocity = gravity * timeToFall; // Максимальная скорость при достижении поверхности

        // Вычисляем новую высоту мячика в зависимости от времени
        let newHeight = (0.5 * gravity * timeToFall * timeToFall) - (0.5 * gravity * Math.pow((timeToFall - performance.now() / 1000), 2));
        
        // Обновляем положение мячика
        ball.style.bottom = `${newHeight}px`;

        // Если мячик достиг поверхности, происходит отскок
        if (newHeight <= 0) {
            initialVelocity *= restitution; // Уменьшаем скорость после отскока
            timeToFall = Math.sqrt((2 * newHeight) / gravity); // Время до следующего отскока
            maxVelocity = gravity * timeToFall; // Максимальная скорость при следующем отскоке
            newHeight = (0.5 * gravity * timeToFall * timeToFall) - (0.5 * gravity * Math.pow((timeToFall - performance.now() / 1000), 2));
            ball.style.bottom = `${newHeight}px`;
        }

        // Повторяем анимацию, пока мячик не остановится
        if (initialVelocity >= 0.01) {
            requestAnimationFrame(fall);
        }
    }

    // Запускаем анимацию падения
    fall();
});
