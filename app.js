// Daily Pug Mood Tracker — Pure Browser Vanilla JavaScript (Zero Build Step)

(function () {
  'use strict';

  // --- Constants & Mood Configurations ---
  const STORAGE_KEY = 'daily-pug-moods';

  // Colors: 1: Blue, 2: Green, 3: Yellow, 4: Purple, 5: Pink
  const MOODS = {
    1: {
      level: 1,
      key: 'very-happy',
      label: 'Very Happy',
      color: '#BAE6FD', // Blue
      accent: '#2563EB',
    },
    2: {
      level: 2,
      key: 'mildly-happy',
      label: 'Mildly Happy',
      color: '#BBF7D0', // Green
      accent: '#16A34A',
    },
    3: {
      level: 3,
      key: 'neutral',
      label: 'Neutral',
      color: '#FEF08A', // Yellow
      accent: '#CA8A04',
    },
    4: {
      level: 4,
      key: 'slightly-unhappy',
      label: 'Slightly Unhappy',
      color: '#E9D5FF', // Purple
      accent: '#9333EA',
    },
    5: {
      level: 5,
      key: 'very-unhappy',
      label: 'Very Unhappy',
      color: '#FBCFE8', // Pink
      accent: '#DB2777',
    },
  };

  const SHORT_MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  const DAYS_OF_WEEK = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

  // --- Handcrafted Cute SVG Illustrations (Blue -> Green -> Yellow -> Purple -> Pink) ---
  function getPugSvg(level) {
    switch (Number(level)) {
      case 1:
        // Happiest: Blue
        return `<svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="50" cy="50" r="48" fill="#BAE6FD" stroke="#93C5FD" stroke-width="2"/>
          <path d="M24 35 C16 26 12 40 21 49 C24 45 25 39 24 35Z" fill="#7A685A" stroke="#4A9A9A" stroke-width="2" stroke-linejoin="round"/>
          <path d="M76 35 C84 26 88 40 79 49 C76 45 75 39 76 35Z" fill="#7A685A" stroke="#4A9A9A" stroke-width="2" stroke-linejoin="round"/>
          <ellipse cx="50" cy="53" rx="29" ry="26" fill="#E8DDD0" stroke="#4A9A9A" stroke-width="2.5"/>
          <path d="M44 36 C48 34 52 34 56 36" stroke="#BCA892" stroke-width="2" stroke-linecap="round"/>
          <path d="M42 40 C47 38 53 38 58 40" stroke="#BCA892" stroke-width="2" stroke-linecap="round"/>
          <ellipse cx="50" cy="61" rx="18" ry="13" fill="#8C7765" stroke="#4A9A9A" stroke-width="2"/>
          <circle cx="28" cy="58" r="4" fill="#F472B6" opacity="0.5"/>
          <circle cx="72" cy="58" r="4" fill="#F472B6" opacity="0.5"/>
          <ellipse cx="37" cy="49" rx="4.5" ry="5" fill="#243434"/>
          <circle cx="35.5" cy="47" r="1.8" fill="#FFFFFF"/>
          <circle cx="38.5" cy="50.5" r="0.8" fill="#FFFFFF"/>
          <ellipse cx="63" cy="49" rx="4.5" ry="5" fill="#243434"/>
          <circle cx="61.5" cy="47" r="1.8" fill="#FFFFFF"/>
          <circle cx="64.5" cy="50.5" r="0.8" fill="#FFFFFF"/>
          <path d="M46 56 C46 54.5 48 53.5 50 53.5 C52 53.5 54 54.5 54 56 C54 58 51.5 59 50 59 C48.5 59 46 58 46 56Z" fill="#243434"/>
          <circle cx="48.5" cy="56.5" r="0.8" fill="#5D4D40"/>
          <circle cx="51.5" cy="56.5" r="0.8" fill="#5D4D40"/>
          <path d="M45 61 C45 66 55 66 55 61" stroke="#243434" stroke-width="2" stroke-linecap="round" fill="#243434"/>
          <path d="M47.5 63.5 C47.5 68.5 52.5 68.5 52.5 63.5" fill="#FB7185" stroke="#E11D48" stroke-width="1"/>
        </svg>`;

      case 2:
        // Next Happiest: Green
        return `<svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="50" cy="50" r="48" fill="#BBF7D0" stroke="#86EFAC" stroke-width="2"/>
          <path d="M24 37 C17 29 13 41 21 50 C24 46 25 41 24 37Z" fill="#7A685A" stroke="#4A9A9A" stroke-width="2" stroke-linejoin="round"/>
          <path d="M76 37 C83 29 87 41 79 50 C76 46 75 41 76 37Z" fill="#7A685A" stroke="#4A9A9A" stroke-width="2" stroke-linejoin="round"/>
          <ellipse cx="50" cy="53" rx="29" ry="26" fill="#E8DDD0" stroke="#4A9A9A" stroke-width="2.5"/>
          <path d="M44 37 C48 35 52 35 56 37" stroke="#BCA892" stroke-width="2" stroke-linecap="round"/>
          <path d="M43 41 C47 39 53 39 57 41" stroke="#BCA892" stroke-width="2" stroke-linecap="round"/>
          <ellipse cx="50" cy="61" rx="18" ry="13" fill="#8C7765" stroke="#4A9A9A" stroke-width="2"/>
          <circle cx="29" cy="58" r="3.5" fill="#F472B6" opacity="0.35"/>
          <circle cx="71" cy="58" r="3.5" fill="#F472B6" opacity="0.35"/>
          <ellipse cx="37" cy="49" rx="4" ry="4.5" fill="#243434"/>
          <circle cx="36" cy="47.5" r="1.5" fill="#FFFFFF"/>
          <ellipse cx="63" cy="49" rx="4.5" ry="4.5" fill="#243434"/>
          <circle cx="62" cy="47.5" r="1.5" fill="#FFFFFF"/>
          <path d="M46 56 C46 54.5 48 53.5 50 53.5 C52 53.5 54 54.5 54 56 C54 58 51.5 59 50 59 C48.5 59 46 58 46 56Z" fill="#243434"/>
          <circle cx="48.5" cy="56.5" r="0.8" fill="#5D4D40"/>
          <circle cx="51.5" cy="56.5" r="0.8" fill="#5D4D40"/>
          <path d="M44 62 C46.5 65.5 53.5 65.5 56 62" stroke="#243434" stroke-width="2.2" stroke-linecap="round"/>
        </svg>`;

      case 3:
        // Middle / Neutral: Yellow
        return `<svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="50" cy="50" r="48" fill="#FEF08A" stroke="#FDE047" stroke-width="2"/>
          <path d="M24 38 C17 31 13 42 21 51 C24 47 25 42 24 38Z" fill="#7A685A" stroke="#4A9A9A" stroke-width="2" stroke-linejoin="round"/>
          <path d="M76 38 C83 31 87 42 79 51 C76 47 75 42 76 38Z" fill="#7A685A" stroke="#4A9A9A" stroke-width="2" stroke-linejoin="round"/>
          <ellipse cx="50" cy="53" rx="29" ry="26" fill="#E8DDD0" stroke="#4A9A9A" stroke-width="2.5"/>
          <path d="M44 37 C48 35.5 52 35.5 56 37" stroke="#BCA892" stroke-width="2" stroke-linecap="round"/>
          <path d="M43 41 C47 39.5 53 39.5 57 41" stroke="#BCA892" stroke-width="2" stroke-linecap="round"/>
          <ellipse cx="50" cy="61" rx="18" ry="13" fill="#8C7765" stroke="#4A9A9A" stroke-width="2"/>
          <circle cx="37" cy="49" r="4.2" fill="#243434"/>
          <circle cx="36" cy="47.8" r="1.3" fill="#FFFFFF"/>
          <circle cx="63" cy="49" r="4.2" fill="#243434"/>
          <circle cx="62" cy="47.8" r="1.3" fill="#FFFFFF"/>
          <path d="M46 56 C46 54.5 48 53.5 50 53.5 C52 53.5 54 54.5 54 56 C54 58 51.5 59 50 59 C48.5 59 46 58 46 56Z" fill="#243434"/>
          <circle cx="48.5" cy="56.5" r="0.8" fill="#5D4D40"/>
          <circle cx="51.5" cy="56.5" r="0.8" fill="#5D4D40"/>
          <path d="M45 63 L55 63" stroke="#243434" stroke-width="2.2" stroke-linecap="round"/>
        </svg>`;

      case 4:
        // Next: Purple
        return `<svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="50" cy="50" r="48" fill="#E9D5FF" stroke="#D8B4FE" stroke-width="2"/>
          <path d="M23 41 C15 35 12 47 20 55 C23 50 24 45 23 41Z" fill="#7A685A" stroke="#4A9A9A" stroke-width="2" stroke-linejoin="round"/>
          <path d="M77 41 C85 35 88 47 80 55 C77 50 76 45 77 41Z" fill="#7A685A" stroke="#4A9A9A" stroke-width="2" stroke-linejoin="round"/>
          <ellipse cx="50" cy="54" rx="29" ry="26" fill="#E8DDD0" stroke="#4A9A9A" stroke-width="2.5"/>
          <path d="M42 35 C47 38 53 38 58 35" stroke="#BCA892" stroke-width="2" stroke-linecap="round"/>
          <path d="M44 39 C47 41 53 41 56 39" stroke="#BCA892" stroke-width="2" stroke-linecap="round"/>
          <ellipse cx="50" cy="62" rx="18" ry="13" fill="#8C7765" stroke="#4A9A9A" stroke-width="2"/>
          <ellipse cx="37" cy="50" rx="4" ry="3.8" fill="#243434"/>
          <circle cx="36" cy="49" r="1.2" fill="#FFFFFF"/>
          <ellipse cx="63" cy="50" rx="4" ry="3.8" fill="#243434"/>
          <circle cx="62" cy="49" r="1.2" fill="#FFFFFF"/>
          <path d="M46 56.5 C46 55 48 54 50 54 C52 54 54 55 54 56.5 C54 58.5 51.5 59.5 50 59.5 C48.5 59.5 46 58.5 46 56.5Z" fill="#243434"/>
          <circle cx="48.5" cy="57" r="0.8" fill="#5D4D40"/>
          <circle cx="51.5" cy="57" r="0.8" fill="#5D4D40"/>
          <path d="M44 65 C47 62.5 53 62.5 56 65" stroke="#243434" stroke-width="2.2" stroke-linecap="round"/>
        </svg>`;

      case 5:
        // Least Happy: Pink
        return `<svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="50" cy="50" r="48" fill="#FBCFE8" stroke="#F9A8D4" stroke-width="2"/>
          <path d="M23 44 C14 38 10 52 19 60 C22 55 24 49 23 44Z" fill="#7A685A" stroke="#4A9A9A" stroke-width="2" stroke-linejoin="round"/>
          <path d="M77 44 C86 38 90 52 81 60 C78 55 76 49 77 44Z" fill="#7A685A" stroke="#4A9A9A" stroke-width="2" stroke-linejoin="round"/>
          <ellipse cx="50" cy="54" rx="29" ry="26" fill="#E8DDD0" stroke="#4A9A9A" stroke-width="2.5"/>
          <path d="M40 35 C46 39 54 39 60 35" stroke="#BCA892" stroke-width="2" stroke-linecap="round"/>
          <path d="M42 39 C46 42 54 42 58 39" stroke="#BCA892" stroke-width="2" stroke-linecap="round"/>
          <ellipse cx="50" cy="62" rx="18" ry="13" fill="#8C7765" stroke="#4A9A9A" stroke-width="2"/>
          <ellipse cx="37" cy="51" rx="4.2" ry="4" fill="#243434"/>
          <circle cx="36" cy="50" r="1.5" fill="#FFFFFF"/>
          <circle cx="38" cy="52.5" r="0.8" fill="#93C5FD" opacity="0.8"/>
          <ellipse cx="63" cy="51" rx="4.2" ry="4" fill="#243434"/>
          <circle cx="62" cy="50" r="1.5" fill="#FFFFFF"/>
          <circle cx="64" cy="52.5" r="0.8" fill="#93C5FD" opacity="0.8"/>
          <path d="M31 59 C31 57 33 55 33 55 C33 55 35 57 35 59 C35 60.5 34 61.5 33 61.5 C32 61.5 31 60.5 31 59Z" fill="#60A5FA"/>
          <circle cx="32.5" cy="58.5" r="0.6" fill="#FFFFFF"/>
          <path d="M46 56.5 C46 55 48 54 50 54 C52 54 54 55 54 56.5 C54 58.5 51.5 59.5 50 59.5 C48.5 59.5 46 58.5 46 56.5Z" fill="#243434"/>
          <circle cx="48.5" cy="57" r="0.8" fill="#5D4D40"/>
          <circle cx="51.5" cy="57" r="0.8" fill="#5D4D40"/>
          <path d="M43 66 C46 63 48 64 50 63.5 C52 63 54 63 57 66" stroke="#243434" stroke-width="2.2" stroke-linecap="round"/>
        </svg>`;

      default:
        return getPugSvg(3);
    }
  }

  // --- LocalStorage Store ---
  function loadStore() {
    try {
      const data = localStorage.getItem(STORAGE_KEY);
      return data ? JSON.parse(data) : {};
    } catch (e) {
      console.error('Failed to load moods from localStorage:', e);
      return {};
    }
  }

  function saveStore(store) {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(store));
    } catch (e) {
      console.error('Failed to save moods to localStorage:', e);
    }
  }

  // --- Date Helpers (Local Timezone to prevent UTC Shift) ---
  function pad(n) {
    return n < 10 ? '0' + n : String(n);
  }

  function formatDateKey(year, monthIndex, day) {
    return `${year}-${pad(monthIndex + 1)}-${pad(day)}`;
  }

  function dateToKey(d) {
    return formatDateKey(d.getFullYear(), d.getMonth(), d.getDate());
  }

  function formatShortMonth(d) {
    return `${SHORT_MONTHS[d.getMonth()]} ${d.getFullYear()}`;
  }

  function formatFriendlyDate(d) {
    const dayName = DAYS_OF_WEEK[d.getDay()];
    const monthName = SHORT_MONTHS[d.getMonth()];
    return `${dayName}, ${monthName} ${d.getDate()}`;
  }

  // --- Application State ---
  let moodStore = loadStore();
  let currentMonthDate = new Date();
  currentMonthDate.setDate(1);

  let pickerYear = currentMonthDate.getFullYear();
  let activePopupDate = null;

  // --- DOM Elements ---
  const monthTitleEl = document.getElementById('monthTitle');
  const monthPickerBtn = document.getElementById('monthPickerBtn');
  const prevMonthBtn = document.getElementById('prevMonthBtn');
  const nextMonthBtn = document.getElementById('nextMonthBtn');
  const calendarCard = document.getElementById('calendarCard');
  const daysGrid = document.getElementById('daysGrid');

  // Quick Action
  const quickActionBtn = document.getElementById('quickActionBtn');
  const quickBtnIcon = document.getElementById('quickBtnIcon');
  const quickBtnSubtitle = document.getElementById('quickBtnSubtitle');
  const quickBtnTitle = document.getElementById('quickBtnTitle');

  // Mood Popup
  const moodPopupBackdrop = document.getElementById('moodPopupBackdrop');
  const moodPopupTitle = document.getElementById('moodPopupTitle');
  const closeMoodPopupBtn = document.getElementById('closeMoodPopupBtn');
  const moodOptionsContainer = document.getElementById('moodOptionsContainer');

  // Month Picker Modal
  const monthPickerBackdrop = document.getElementById('monthPickerBackdrop');
  const pickerYearTitle = document.getElementById('pickerYearTitle');
  const prevYearBtn = document.getElementById('prevYearBtn');
  const nextYearBtn = document.getElementById('nextYearBtn');
  const monthsGrid = document.getElementById('monthsGrid');
  const jumpTodayBtn = document.getElementById('jumpTodayBtn');
  const closeMonthPickerBtn = document.getElementById('closeMonthPickerBtn');

  // Settings Modal
  const settingsBtn = document.getElementById('settingsBtn');
  const settingsBackdrop = document.getElementById('settingsBackdrop');
  const closeSettingsBtn = document.getElementById('closeSettingsBtn');
  const totalDaysCount = document.getElementById('totalDaysCount');
  const exportBtn = document.getElementById('exportBtn');
  const clearAllBtn = document.getElementById('clearAllBtn');
  const confirmClearBox = document.getElementById('confirmClearBox');
  const confirmYesBtn = document.getElementById('confirmYesBtn');
  const confirmNoBtn = document.getElementById('confirmNoBtn');

  // Top brand icon
  const brandIcon = document.getElementById('brandIcon');
  if (brandIcon) {
    brandIcon.innerHTML = getPugSvg(1);
  }

  // --- Calendar Grid Renderer ---
  function renderCalendar(animationDirection = null) {
    const year = currentMonthDate.getFullYear();
    const month = currentMonthDate.getMonth();

    monthTitleEl.textContent = formatShortMonth(currentMonthDate);

    if (animationDirection === 'next') {
      calendarCard.classList.remove('sliding-left', 'sliding-right');
      void calendarCard.offsetWidth;
      calendarCard.classList.add('sliding-left');
    } else if (animationDirection === 'prev') {
      calendarCard.classList.remove('sliding-left', 'sliding-right');
      void calendarCard.offsetWidth;
      calendarCard.classList.add('sliding-right');
    }

    daysGrid.innerHTML = '';

    const today = new Date();
    const todayKey = dateToKey(today);

    const firstDayIndex = new Date(year, month, 1).getDay();
    const daysInCurrentMonth = new Date(year, month + 1, 0).getDate();
    const daysInPrevMonth = new Date(year, month, 0).getDate();

    // 1. Leading days
    for (let i = firstDayIndex - 1; i >= 0; i--) {
      const prevDayNum = daysInPrevMonth - i;
      const cell = document.createElement('div');
      cell.className = 'day-cell out-of-month';
      cell.innerHTML = `<div class="day-circle">${prevDayNum}</div>`;
      daysGrid.appendChild(cell);
    }

    // 2. Current month days
    for (let dayNum = 1; dayNum <= daysInCurrentMonth; dayNum++) {
      const thisDate = new Date(year, month, dayNum);
      const dateKey = formatDateKey(year, month, dayNum);
      const isToday = dateKey === todayKey;
      const isFuture = thisDate > today;
      const entry = moodStore[dateKey];

      const btn = document.createElement('button');
      btn.type = 'button';
      btn.className = `day-cell ${isToday ? 'is-today' : ''} ${isFuture ? 'is-future' : ''} ${entry ? 'has-mood' : ''}`;
      btn.setAttribute('aria-label', `${dateKey}, ${entry ? `Mood: ${MOODS[entry.mood]?.label}` : 'no mood recorded'}${isToday ? ', Today' : ''}`);

      if (entry) {
        btn.innerHTML = `
          <div class="pug-svg-container">
            ${getPugSvg(entry.mood)}
          </div>
          <span class="day-cell-number-badge">${dayNum}</span>
        `;
      } else {
        btn.innerHTML = `
          <div class="day-circle">${dayNum}</div>
        `;
      }

      btn.addEventListener('click', () => {
        openMoodPopup(thisDate);
      });

      daysGrid.appendChild(btn);
    }

    // 3. Trailing days
    const totalCells = firstDayIndex + daysInCurrentMonth;
    const trailingCount = totalCells % 7 === 0 ? 0 : 7 - (totalCells % 7);

    for (let dayNum = 1; dayNum <= trailingCount; dayNum++) {
      const cell = document.createElement('div');
      cell.className = 'day-cell out-of-month';
      cell.innerHTML = `<div class="day-circle">${dayNum}</div>`;
      daysGrid.appendChild(cell);
    }

    updateQuickActionButton();
  }

  // --- Bottom Quick Action Button Renderer ---
  function updateQuickActionButton() {
    const today = new Date();
    const todayKey = dateToKey(today);
    const entry = moodStore[todayKey];

    if (entry) {
      const moodConfig = MOODS[entry.mood];
      quickBtnIcon.innerHTML = getPugSvg(entry.mood);
      quickBtnSubtitle.textContent = 'Today Logged';
      quickBtnTitle.textContent = moodConfig.label;
    } else {
      quickBtnIcon.innerHTML = getPugSvg(1);
      quickBtnSubtitle.textContent = 'Log Today';
      quickBtnTitle.textContent = "How's today?";
    }
  }

  // --- Mood Picker Popup (Icons Only, No Descriptions) ---
  function openMoodPopup(date) {
    activePopupDate = date;
    const dateKey = dateToKey(date);
    const existingEntry = moodStore[dateKey];
    const isToday = dateKey === dateToKey(new Date());

    moodPopupTitle.textContent = isToday ? `Today — ${formatFriendlyDate(date)}` : formatFriendlyDate(date);

    // Build the 5 options — ICON ONLY, NO DESCRIPTION
    moodOptionsContainer.innerHTML = '';
    [1, 2, 3, 4, 5].forEach((level) => {
      const config = MOODS[level];
      const isSelected = existingEntry && Number(existingEntry.mood) === level;

      const optBtn = document.createElement('button');
      optBtn.type = 'button';
      optBtn.className = `mood-option-btn ${isSelected ? 'is-selected' : ''}`;
      optBtn.setAttribute('aria-label', config.label);
      optBtn.title = config.label;
      optBtn.innerHTML = `
        <div class="mood-option-icon">
          ${getPugSvg(level)}
        </div>
      `;

      optBtn.addEventListener('click', () => {
        saveMood(dateKey, level);
      });

      moodOptionsContainer.appendChild(optBtn);
    });

    moodPopupBackdrop.classList.add('is-open');
  }

  function closeMoodPopup() {
    moodPopupBackdrop.classList.remove('is-open');
    activePopupDate = null;
  }

  function saveMood(dateKey, moodLevel) {
    moodStore[dateKey] = {
      date: dateKey,
      mood: Number(moodLevel),
      updatedAt: new Date().toISOString(),
    };
    saveStore(moodStore);

    // Confetti celebration with the 5 theme colors
    triggerConfetti();

    closeMoodPopup();
    renderCalendar();
  }

  // --- Month Picker Modal ---
  function openMonthPicker() {
    pickerYear = currentMonthDate.getFullYear();
    renderMonthPickerGrid();
    monthPickerBackdrop.classList.add('is-open');
  }

  function closeMonthPicker() {
    monthPickerBackdrop.classList.remove('is-open');
  }

  function renderMonthPickerGrid() {
    pickerYearTitle.textContent = pickerYear;
    monthsGrid.innerHTML = '';

    const currentYear = currentMonthDate.getFullYear();
    const currentMonth = currentMonthDate.getMonth();

    SHORT_MONTHS.forEach((name, idx) => {
      const btn = document.createElement('button');
      btn.type = 'button';
      const isCurrent = pickerYear === currentYear && idx === currentMonth;
      btn.className = `month-cell-btn ${isCurrent ? 'is-current' : ''}`;
      btn.textContent = name;

      btn.addEventListener('click', () => {
        const direction = (pickerYear > currentYear || (pickerYear === currentYear && idx > currentMonth)) ? 'next' : 'prev';
        currentMonthDate = new Date(pickerYear, idx, 1);
        closeMonthPicker();
        renderCalendar(direction);
      });

      monthsGrid.appendChild(btn);
    });
  }

  // --- Settings Modal ---
  function openSettings() {
    const total = Object.keys(moodStore).length;
    totalDaysCount.textContent = total;
    confirmClearBox.style.display = 'none';
    clearAllBtn.style.display = 'flex';
    settingsBackdrop.classList.add('is-open');
  }

  function closeSettings() {
    settingsBackdrop.classList.remove('is-open');
  }

  function exportData() {
    const dataStr = 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(moodStore, null, 2));
    const dl = document.createElement('a');
    dl.setAttribute('href', dataStr);
    const now = new Date().toISOString().slice(0, 10);
    dl.setAttribute('download', `daily-pug-moods-${now}.json`);
    document.body.appendChild(dl);
    dl.click();
    dl.remove();
  }

  // --- Celebration Confetti Engine (Blue, Green, Yellow, Purple, Pink) ---
  function triggerConfetti() {
    const canvas = document.getElementById('confettiCanvas');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const colors = ['#38bdf8', '#4ade80', '#facc15', '#c084fc', '#f472b6'];
    const particles = [];
    const count = 36;

    for (let i = 0; i < count; i++) {
      particles.push({
        x: canvas.width / 2 + (Math.random() - 0.5) * 80,
        y: canvas.height * 0.65,
        vx: (Math.random() - 0.5) * 10,
        vy: -Math.random() * 12 - 4,
        size: Math.random() * 7 + 4,
        color: colors[Math.floor(Math.random() * colors.length)],
        rotation: Math.random() * 360,
        vrot: (Math.random() - 0.5) * 10,
        alpha: 1,
      });
    }

    let animationFrame;
    function renderFrame() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      let alive = false;

      particles.forEach((p) => {
        p.x += p.vx;
        p.y += p.vy;
        p.vy += 0.45;
        p.vx *= 0.98;
        p.rotation += p.vrot;
        p.alpha -= 0.016;

        if (p.alpha > 0) {
          alive = true;
          ctx.save();
          ctx.globalAlpha = Math.max(0, p.alpha);
          ctx.translate(p.x, p.y);
          ctx.rotate((p.rotation * Math.PI) / 180);
          ctx.fillStyle = p.color;
          ctx.fillRect(-p.size / 2, -p.size / 2, p.size, p.size * 0.6);
          ctx.restore();
        }
      });

      if (alive) {
        animationFrame = requestAnimationFrame(renderFrame);
      } else {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        cancelAnimationFrame(animationFrame);
      }
    }

    renderFrame();
  }

  // --- Horizontal Swipe / Drag Navigation ---
  let touchStartX = 0;
  let touchEndX = 0;

  calendarCard.addEventListener('touchstart', (e) => {
    touchStartX = e.changedTouches[0].screenX;
  }, { passive: true });

  calendarCard.addEventListener('touchend', (e) => {
    touchEndX = e.changedTouches[0].screenX;
    handleSwipe();
  }, { passive: true });

  function handleSwipe() {
    const diff = touchEndX - touchStartX;
    if (Math.abs(diff) > 45) {
      if (diff < 0) {
        currentMonthDate.setMonth(currentMonthDate.getMonth() + 1);
        renderCalendar('next');
      } else {
        currentMonthDate.setMonth(currentMonthDate.getMonth() - 1);
        renderCalendar('prev');
      }
    }
  }

  // --- Event Listeners ---
  prevMonthBtn.addEventListener('click', () => {
    currentMonthDate.setMonth(currentMonthDate.getMonth() - 1);
    renderCalendar('prev');
  });

  nextMonthBtn.addEventListener('click', () => {
    currentMonthDate.setMonth(currentMonthDate.getMonth() + 1);
    renderCalendar('next');
  });

  monthPickerBtn.addEventListener('click', openMonthPicker);
  closeMonthPickerBtn.addEventListener('click', closeMonthPicker);

  prevYearBtn.addEventListener('click', () => {
    pickerYear--;
    renderMonthPickerGrid();
  });

  nextYearBtn.addEventListener('click', () => {
    pickerYear++;
    renderMonthPickerGrid();
  });

  jumpTodayBtn.addEventListener('click', () => {
    const today = new Date();
    currentMonthDate = new Date(today.getFullYear(), today.getMonth(), 1);
    closeMonthPicker();
    renderCalendar();
  });

  // Quick Action Click -> opens today's mood
  quickActionBtn.addEventListener('click', () => {
    openMoodPopup(new Date());
  });

  closeMoodPopupBtn.addEventListener('click', closeMoodPopup);

  // Settings Events
  settingsBtn.addEventListener('click', openSettings);
  closeSettingsBtn.addEventListener('click', closeSettings);
  exportBtn.addEventListener('click', exportData);

  clearAllBtn.addEventListener('click', () => {
    clearAllBtn.style.display = 'none';
    confirmClearBox.style.display = 'flex';
  });

  confirmNoBtn.addEventListener('click', () => {
    confirmClearBox.style.display = 'none';
    clearAllBtn.style.display = 'flex';
  });

  confirmYesBtn.addEventListener('click', () => {
    moodStore = {};
    saveStore(moodStore);
    confirmClearBox.style.display = 'none';
    clearAllBtn.style.display = 'flex';
    closeSettings();
    renderCalendar();
  });

  // Modal Dismiss on Backdrop Click
  [moodPopupBackdrop, monthPickerBackdrop, settingsBackdrop].forEach((backdrop) => {
    backdrop.addEventListener('click', (e) => {
      if (e.target === backdrop) {
        backdrop.classList.remove('is-open');
        activePopupDate = null;
      }
    });
  });

  // Global Escape key listener
  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      closeMoodPopup();
      closeMonthPicker();
      closeSettings();
    }
  });

  // Initial Render
  renderCalendar();
})();
