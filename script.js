const ball = document.querySelector('.ball');

const initialVelocity = 1000; // Начальная скорость мяча (в пикселях в секунду)
const restitutionCoefficient = 0.7; // Коэффициент упругости

let velocity = initialVelocity; // Начальная скорость мяча
let position = window.innerHeight; // Начальное положение мяча (верхний край экрана)

function fall() {
  // Вычисляем новую позицию мяча с учетом времени
  position -= velocity * 0.01; // 0.01 секунды - интервал анимации
  
  // Применяем изменения к мячу
  ball.style.bottom = position + 'px';

  // Проверяем, достиг ли мяч дна
  if (position <= 0) {
    // Рассчитываем отскок
    velocity *= -restitutionCoefficient; // Учитываем коэффициент упругости

    // Проверяем, не слишком ли мало отскочил мяч, чтобы продолжать анимацию
    if (Math.abs(velocity) < 1) {
      clearInterval(fallInterval);
    }
  }
}

// Запускаем анимацию падения мяча
const fallInterval = setInterval(fall, 10);
