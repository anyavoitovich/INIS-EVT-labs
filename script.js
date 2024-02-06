const ball = document.querySelector('.ball');

const g = 9.81; // Ускорение свободного падения (м/с^2)
const maxHeight = window.innerHeight - 100; // Высота падения мяча

let velocity = 0; // Начальная скорость мяча
let position = 0; // Начальное положение мяча

function fall() {
  // Вычисляем новую скорость и позицию мяча с учетом времени
  velocity += g * 0.01; // 0.01 секунды - интервал анимации
  position += velocity * 0.01; // 0.01 секунды - интервал анимации
  
  // Применяем изменения к мячу
  ball.style.bottom = position + 'px';

  // Проверяем, достиг ли мяч дна
  if (position <= 0) {
    // Рассчитываем отскок
    velocity *= -0.7; // Коэффициент упругости

    // Проверяем, не слишком ли мало отскочил мяч, чтобы продолжать анимацию
    if (Math.abs(velocity) < 1) {
      clearInterval(fallInterval);
    }
  }
}

// Запускаем анимацию падения мяча
const fallInterval = setInterval(fall, 10);
