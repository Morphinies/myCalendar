// variables
let curDate = new Date();
let choosedDate = new Date(
  curDate.getFullYear(),
  curDate.getMonth(),
  curDate.getDate()
);
const dateTitle = document.getElementById("date-title");
const dateBtns = document.getElementById("date"); //HEAD DATE BTNS
const list = document.getElementById("list"); //DAYS LIST
const notesForm = document.getElementById("notes-form");

notesForm.addEventListener("submit", (e) => createNote(e));
dateTitle.addEventListener("click", () => updateInfo(choosedDate));

let notesList = JSON.parse(localStorage.getItem("notesList")) ?? {};
if (notesList[choosedDate]) console.log(notesList);

// default setting
updateInfo(curDate);

// functions
function updateInfo(date) {
  list.innerHTML = "";
  updateNotes();
  addDaysName();
  addDays(date);
  addDateBtns(date);
  dateTitle.innerHTML =
    choosedDate.getDate() +
    " " +
    getMonthStr(choosedDate.getMonth(), true) +
    " " +
    choosedDate.getFullYear();
}

function addDaysName() {
  ["ПН", "ВТ", "СР", "ЧТ", "ПТ", "СБ", "ВС"].forEach((daysName) => {
    const item = document.createElement("li");
    item.className = "btn weeksDay";
    item.innerHTML = daysName;
    list.append(item);
  });
}

function getMonthStr(monthNumb, genitive) {
  const months = [
    "январь",
    "февраль",
    "март",
    "апрель",
    "май",
    "июнь",
    "июль",
    "август",
    "сентябрь",
    "октябрь",
    "ноябрь",
    "декабрь",
  ];
  const monthsGenetive = [
    "января",
    "февраля",
    "марта",
    "апреля",
    "мая",
    "июня",
    "июля",
    "августа",
    "сентября",
    "октября",
    "ноября",
    "декабря",
  ];
  return genitive ? monthsGenetive[monthNumb] : months[monthNumb];
}

function prevNextMonth(next) {
  // list.innerHTML = "";
  if (next) {
    curDate = new Date(curDate.getFullYear(), curDate.getMonth() + 1);
  } else {
    curDate = new Date(curDate.getFullYear(), curDate.getMonth() - 1);
  }
  updateInfo(curDate);
}

function addDateBtns(date) {
  dateBtns.firstElementChild.innerText = getMonthStr(date.getMonth()); //HEAD MONTH
  dateBtns.firstElementChild.nextElementSibling.innerText = date.getFullYear(); // HEAD YEAR
}

function addDays(date) {
  const year = date.getFullYear();
  const month = date.getMonth();
  const startDate = new Date(year, month);
  if (startDate.getDay() > 0) {
    for (let k = 1; k < startDate.getDay(); k++) {
      const dateOld = new Date(
        startDate - (startDate.getDay() - k) * 24 * 3600 * 1000
      );
      const item = document.createElement("li");
      item.addEventListener("click", () => setDate(k - startDate.getDay() + 1));
      item.innerHTML = dateOld.getDate();
      item.className = "btn monthsDay";
      item.style.opacity = "30%";
      list.append(item);
    }
  }
  for (let i = 1; i < 60; i++) {
    if (list.childElementCount === 49) {
      return;
    }
    const date = new Date(year, month, i);
    const item = document.createElement("li");
    item.className = "btn monthsDay";
    if (+date.getMonth() === +month) {
      if (notesList[date]) {
        item.style.textDecoration = "underline";
      }
      item.innerHTML = date.getDate();
      if (
        choosedDate.getDate() === i &&
        choosedDate.getMonth() === month &&
        choosedDate.getFullYear() === year
      ) {
        item.className += " curDay";
      }
    } else {
      item.style.opacity = "30%";
      item.innerHTML = date.getDate();
    }
    item.addEventListener("click", () => setDate(i));
    list.append(item);
  }
}

function setDate(date) {
  choosedDate = new Date(curDate.getFullYear(), curDate.getMonth(), date);
  curDate = choosedDate;
  updateInfo(choosedDate);
  updateNotesLS();
}

function setMonth(month) {
  // list.innerHTML = "";
  curDate = new Date(curDate.getFullYear(), month);
  updateInfo(curDate);
  openMonthList();
}

function setYear(year) {
  // list.innerHTML = "";
  curDate = new Date(year, curDate.getMonth());
  updateInfo(curDate);
  openYearList();
}

function openMonthList() {
  const dateList = document.getElementById("date-list");
  dateList.style.display = "flex";
  //pressing again
  if (dateList.innerHTML) {
    dateList.innerHTML = "";
    if (dateList.className === "date-list month") {
      dateList.className = "date-list";
      dateList.style.display = "none";
      return;
    }
  }
  //adding months
  dateList.className = "date-list month";
  for (let i = 0; i < 12; i++) {
    const li = document.createElement("li");
    li.innerText = getMonthStr(i);
    li.className = "btn";
    if (i === curDate.getMonth()) {
      li.className = "btn curMonth";
    }
    li.addEventListener("click", () => setMonth(i));
    dateList.append(li);
  }
}

function openYearList() {
  const dateList = document.getElementById("date-list");
  dateList.style.display = "flex";
  //pressing again
  if (dateList.innerHTML) {
    dateList.innerHTML = "";
    if (dateList.className === "date-list year") {
      dateList.className = "date-list";
      dateList.style.display = "none";
      return;
    }
  }
  //adding months
  dateList.className = "date-list year";
  for (let i = -25; i < 26; i++) {
    const li = document.createElement("li");
    const year = curDate.getFullYear() + i;
    li.innerText = year;
    li.className = "btn";
    if (year === curDate.getFullYear()) {
      li.className = "btn curYear";
    }
    li.addEventListener("click", () => setYear(year));
    dateList.append(li);
  }
}

function addNote(note) {
  const list = document.getElementById("notes-list");
  const button = document.createElement("button");
  const imgDel = document.createElement("img");
  const span = document.createElement("span");
  const li = document.createElement("li");
  li.className = "notes-item";
  span.innerHTML = note;
  imgDel.alt = "удалить";
  imgDel.src = "imgs/del.svg";
  button.addEventListener("click", () => {
    const noteIndex = notesList[choosedDate].indexOf(note);
    notesList[choosedDate].splice(noteIndex, 1);
    if (!notesList[choosedDate].length) {
      delete notesList[choosedDate];
      updateInfo(choosedDate);
    }
    li.remove();
    updateNotesLS();
  });
  button.append(imgDel);
  li.append(span);
  li.append(button);
  list.append(li);
}

function createNote(e) {
  e.preventDefault();
  const input = document.getElementById("notes-input");
  if (input.value) {
    if (!notesList[choosedDate]) {
      notesList[choosedDate] = [];
    }
    notesList[choosedDate] = [...notesList[choosedDate], input.value];
    addNote(input.value);
    input.value = "";
    updateInfo(choosedDate);
    updateNotesLS();
  }
}

function updateNotesLS() {
  localStorage.setItem("notesList", JSON.stringify(notesList));
}

function updateNotes() {
  const list = document.getElementById("notes-list");
  list.innerHTML = "";
  if (notesList[choosedDate]) {
    for (let item of notesList[choosedDate]) {
      console.log(item);
      addNote(item);
    }
  }
}
