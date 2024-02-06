const ball = document.querySelector('.ball');

const initialVelocity = 0; // Начальная скорость мяча (в пикселях в секунду)
const g = 9.81; // Ускорение свободного падения (м/с^2)
const restitutionCoefficient = 0.8; // Коэффициент упругости

let velocity = initialVelocity; // Начальная скорость мяча
let position = 0; // Начальное положение мяча (верхний край экрана)
let bounces = 0; // Количество отскоков

function fall() {
  // Вычисляем новую позицию мяча с учетом времени
  velocity += g * 0.01; // Применяем ускорение падения
  position += velocity * 0.01; // 0.01 секунды - интервал анимации
  
  // Применяем изменения к мячу
  ball.style.bottom = position + 'px';

  // Проверяем, достиг ли мяч дна
  if (position <= 0) {
    // Учитываем коэффициент упругости при отскоке
    velocity *= -restitutionCoefficient; 

    // Увеличиваем счетчик отскоков
    bounces++;

    // Если мяч отскочил несколько раз и его скорость стала ниже порогового значения, завершаем анимацию
    if (bounces >= 3 && Math.abs(velocity) < 1) {
      clearInterval(fallInterval);
    }
  }
}

// Запускаем анимацию падения мяча
const fallInterval = setInterval(fall, 10);
