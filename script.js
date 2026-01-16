const body = document.getElementById('calendarBody');  
const label = document.getElementById('currentLabel');
const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');
const todayBtn = document.getElementById('todayBtn');
const monthSelect = document.getElementById('monthSelect');
const yearSelect = document.getElementById('yearSelect');
const weekdays = document.getElementById('weekdays');

const currentTimeEl = document.getElementById('currentTime');
const currentDateEl = document.getElementById('currentDate');

const monthNames = [
  "January","February","March","April","May","June",
  "July","August","September","October","November","December"
];

let currentDate = new Date();
let view = 'month'; // Only month view now

/* Populate dropdowns */
monthNames.forEach((m,i)=>{
  const option = document.createElement('option');
  option.value = i;
  option.textContent = m;
  monthSelect.appendChild(option);
});
for(let y=2000; y<=2030; y++){
  const option = document.createElement('option');
  option.value = y;
  option.textContent = y;
  yearSelect.appendChild(option);
}
monthSelect.value = currentDate.getMonth();
yearSelect.value = currentDate.getFullYear();
monthSelect.onchange = () => { currentDate.setMonth(parseInt(monthSelect.value)); render(); };
yearSelect.onchange = () => { currentDate.setFullYear(parseInt(yearSelect.value)); render(); };

/* Update current time/date display */
function updateCurrentTime(){
  const now = new Date();
  const hour = now.getHours();
  const min = now.getMinutes().toString().padStart(2,'0');
  const hour12 = hour%12||12;
  const ampm = hour<12?"AM":"PM";
  currentTimeEl.textContent = `${hour12}:${min} ${ampm}`;
  const dayName = now.toLocaleDateString('en-US',{weekday:'long'});
  const monthName = now.toLocaleDateString('en-US',{month:'long'});
  currentDateEl.textContent = `${dayName}, ${monthName} ${now.getFullYear()}`;
}
setInterval(updateCurrentTime,1000);
updateCurrentTime();

/* Render calendar */
function render(){
  body.innerHTML='';
  weekdays.style.display='grid';
  renderMonth();
}

/* Month view */
function renderMonth() {
  label.textContent = currentDate.toLocaleDateString('en-US', { month: 'long', year: 'numeric' });
  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();
  const firstDay = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const prevMonthDays = new Date(year, month, 0).getDate();

  body.innerHTML = '';

  // Previous month days
  for (let i = firstDay - 1; i >= 0; i--) {
    body.innerHTML += `<div class="date muted">${prevMonthDays - i}</div>`;
  }

  // Current month days
  for (let d = 1; d <= daysInMonth; d++) {
    const now = new Date();
    const isToday = d === now.getDate() && month === now.getMonth() && year === now.getFullYear();
    body.innerHTML += `<div class="date ${isToday ? 'today' : ''}">${d}</div>`;
  }

  // Next month days to fill grid (6 weeks)
  const totalCells = firstDay + daysInMonth;
  const nextMonthDays = 42 - totalCells; 
  for (let i = 1; i <= nextMonthDays; i++) {
    body.innerHTML += `<div class="date muted">${i}</div>`;
  }
}

/* Navigation */
prevBtn.onclick = () => {
  currentDate.setMonth(currentDate.getMonth()-1);
  render();
};
nextBtn.onclick = () => {
  currentDate.setMonth(currentDate.getMonth()+1);
  render();
};
todayBtn.onclick = () => { 
  currentDate = new Date(); 
  render(); 
};

render();
