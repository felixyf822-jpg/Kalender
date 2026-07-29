const monthYearText = document.getElementById('month-year');
const calendarDays = document.getElementById('calendar-days');
const prevBtn = document.getElementById('prev-btn');
const nextBtn = document.getElementById('next-btn');

const selectedDateText = document.getElementById('selected-date-text');
const eventInput = document.getElementById('event-input');
const addEventBtn = document.getElementById('add-event-btn');
const eventList = document.getElementById('event-list');

let date = new Date();
let selectedDateKey = null;

const months = [
  "Januari", "Februari", "Maret", "April", "Mei", "Juni",
  "Juli", "Agustus", "September", "Oktober", "November", "Desember"
];

function renderCalendar() {
  date.setDate(1);
  const month = date.getMonth();
  const year = date.getFullYear();

  monthYearText.innerText = `${months[month]} ${year}`;

  const firstDayIndex = date.getDay();
  const lastDay = new Date(year, month + 1, 0).getDate();

  calendarDays.innerHTML = "";

  // Slot kosong sebelum tanggal 1
  for (let x = 0; x < firstDayIndex; x++) {
    const emptyDiv = document.createElement('div');
    calendarDays.appendChild(emptyDiv);
  }

  // Menampilkan hari
  const today = new Date();
  for (let i = 1; i <= lastDay; i++) {
    const dayDiv = document.createElement('div');
    dayDiv.innerText = i;

    const dateKey = `${year}-${month + 1}-${i}`;

    // Highlight hari ini
    if (i === today.getDate() && month === today.getMonth() && year === today.getFullYear()) {
      dayDiv.classList.add('today');
    }

    // Klik tanggal untuk melihat/menambah event
    dayDiv.addEventListener('click', () => {
      document.querySelectorAll('.days div').forEach(d => d.classList.remove('selected'));
      dayDiv.classList.add('selected');
      selectedDateKey = dateKey;
      selectedDateText.innerText = `${i} ${months[month]} ${year}`;
      loadEvents(dateKey);
    });

    calendarDays.appendChild(dayDiv);
  }
}

// Fitur Menambah Event
addEventBtn.addEventListener('click', () => {
  if (!selectedDateKey) {
    alert("Silakan pilih tanggal terlebih dahulu!");
    return;
  }
  const text = eventInput.value.trim();
  if (text === "") return;

  let events = JSON.parse(localStorage.getItem(selectedDateKey)) || [];
  events.push(text);
  localStorage.setItem(selectedDateKey, JSON.stringify(events));

  eventInput.value = "";
  loadEvents(selectedDateKey);
});

// Fitur Memuat Event
function loadEvents(dateKey) {
  eventList.innerHTML = "";
  let events = JSON.parse(localStorage.getItem(dateKey)) || [];
  events.forEach(event => {
    const li = document.createElement('li');
    li.innerText = event;
    eventList.appendChild(li);
  });
}

// Navigasi Bulan
prevBtn.addEventListener('click', () => {
  date.setMonth(date.getMonth() - 1);
  renderCalendar();
});

nextBtn.addEventListener('click', () => {
  date.setMonth(date.getMonth() + 1);
  renderCalendar();
});

renderCalendar();
