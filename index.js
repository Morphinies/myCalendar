// variables
let curDate = new Date();
let choosedDate = new Date();
const dateTitle = document.getElementById("date-title");
const dateBtns = document.getElementById("date"); //HEAD DATE BTNS
const list = document.getElementById("list"); //DAYS LIST

dateTitle.addEventListener("click", () => updateInfo(choosedDate));

// default setting
updateInfo(curDate);

// functions
function updateInfo(date) {
  list.innerHTML = "";
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
  // list.innerHTML = "";
  choosedDate = new Date(curDate.getFullYear(), curDate.getMonth(), date);
  curDate = choosedDate;
  updateInfo(choosedDate);
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
  //pressing again
  if (dateList.innerHTML) {
    dateList.innerHTML = "";
    if (dateList.className === "date-list month") {
      dateList.className = "date-list";
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
  //pressing again
  if (dateList.innerHTML) {
    dateList.innerHTML = "";
    if (dateList.className === "date-list year") {
      dateList.className = "date-list";
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
