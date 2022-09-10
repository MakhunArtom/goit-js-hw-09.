const refs = {
  btnStart: document.querySelector('button[data-start]'),
  btnStop: document.querySelector('button[data-stop]'),
  body: document.querySelector('body'),
};

let timerId = null;

// 1 Зробити динамічний фон боді +
// 2 Зупиняти іньервал при натисканнні на кнопку старт +
// 3 Дати умову яка не дозволить натискати на кнопку старт якщо вона активна +

// Старт
refs.btnStart.addEventListener('click', onBtnStart);

function onBtnStart() {
  timerId = setInterval(getRandomBodyBgColor, 500);

  refs.btnStart.setAttribute('disabled', 'disabled');

  function getRandomHexColor() {
    return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
  }

  function getRandomBodyBgColor() {
    refs.body.style.backgroundColor = getRandomHexColor();
  }
}

// Стоп
refs.btnStop.addEventListener('click', onBtnStop);

function onBtnStop() {
  clearInterval(timerId);
  refs.btnStart.removeAttribute('disabled');
}
