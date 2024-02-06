const ball = document.querySelector('.ball');

const initialVelocity = 1000; // Начальная скорость мяча (в пикселях в секунду)
const restitutionCoefficient = 0.8; // Коэффициент упругости
const weight = 2; // Вес мяча

let velocity = initialVelocity; // Начальная скорость мяча
let position = window.innerHeight; // Начальное положение мяча (верхний край экрана)
let bounces = 0; // Количество отскоков

function fall() {
  // Вычисляем новую позицию мяча с учетом времени
  position -= velocity * 0.01; // 0.01 секунды - интервал анимации
  
  // Применяем изменения к мячу
  ball.style.bottom = position + 'px';

  // Проверяем, достиг ли мяч дна
  if (position <= 0) {
    // Учитываем вес мяча при отскоке
    velocity *= -restitutionCoefficient / weight; 

    // Увеличиваем счетчик отскоков
    bounces++;

    // Если мяч отскочил несколько раз, и скорость стала ниже порогового значения, завершаем анимацию
    if (bounces >= 3 && Math.abs(velocity) < 1) {
      clearInterval(fallInterval);
    }
  }
}

// Запускаем анимацию падения мяча
const fallInterval = setInterval(fall, 10);
