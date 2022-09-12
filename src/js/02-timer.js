import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import { Report } from 'notiflix/build/notiflix-report-aio';

const refs = {
  input: document.querySelector('input[id="datetime-picker"]'),
  startBtn: document.querySelector('button[data-start]'),
  days: document.querySelector('span[data-days]'),
  hours: document.querySelector('span[data-hours]'),
  minutes: document.querySelector('span[data-minutes]'),
  seconds: document.querySelector('span[data-seconds]'),
};

function startBtnIsDisebled() {
  refs.startBtn.setAttribute('disabled', 'disabled');
}

function startBtnIsActiv() {
  refs.startBtn.removeAttribute('disabled');
}

startBtnIsDisebled();

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    const carentTiem = Date.now();

    // Логіка вибору валідної дати ..............
    if (carentTiem > selectedDates[0]) {
      Report.info('WARNING', 'Please choose a date in the future', 'OK');
      startBtnIsDisebled();
      return;
    }
    startBtnIsActiv();

    // Прослуховувач кнопки старт .....................
    refs.startBtn.addEventListener('click', onStartBtn);

    // Логіка запуску таймера ..............
    function onStartBtn() {
      const idInterval = setInterval(getTiem, 1000);
      startBtnIsDisebled();

      function getTiem() {
        const tiemOnClickBtn = new Date();
        // Логіка зупинки таймеру
        if (selectedDates[0].toString() === tiemOnClickBtn.toString()) {
          clearInterval(idInterval);
          return;
        }

        // Виклик функції відрахування часу .........
        const time = convertMs(selectedDates[0] - tiemOnClickBtn);
        // Інтерфейс таймера .............
        refs.days.textContent = time.days;
        refs.hours.textContent = time.hours;
        refs.minutes.textContent = time.minutes;
        refs.seconds.textContent = time.seconds;

        console.log(tiemOnClickBtn);
        console.log(selectedDates[0]);
      }
    }
  },
};

flatpickr(refs.input, options);

function pad(value) {
  return String(value).padStart(2, '0');
}

// Функція отсчета часу ..................
function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = pad(Math.floor(ms / day));
  // Remaining hours
  const hours = pad(Math.floor((ms % day) / hour));
  // Remaining minutes
  const minutes = pad(Math.floor(((ms % day) % hour) / minute));
  // Remaining seconds
  const seconds = pad(Math.floor((((ms % day) % hour) % minute) / second));

  return { days, hours, minutes, seconds };
}
