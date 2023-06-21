// constants
let curDate = new Date();
const date = document.getElementById("date"); //HEAD DATE BTNS
const list = document.getElementById("list"); //DAYS LIST

// default setting
date.firstElementChild.innerText = getMonthStr(curDate.getMonth()); //HEAD MONTH
date.lastElementChild.innerText = curDate.getUTCFullYear(); // HEAD YEAR
addDays(curDate.getFullYear(), curDate.getMonth());

// functions
function getMonthStr(monthNumb) {
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
  return months[monthNumb];
}

function addDays(year, month) {
  //add old month days to list
  const date = new Date(year, month);
  if (date.getDay() > 0) {
    for (let k = 1; k < date.getDay(); k++) {
      const dateOld = new Date(date - (date.getDay() - k) * 24 * 3600 * 1000);
      const item = document.createElement("li");
      item.innerHTML = dateOld.getDate();
      item.className = "btn monthsDay";
      item.style.opacity = "30%";
      list.append(item);
    }
  }

  for (let i = 1; i < 40; i++) {
    if (list.childElementCount === 42) {
      return;
    }
    const date = new Date(year, month, i);
    const item = document.createElement("li");
    item.className = "btn monthsDay";
    if (+date.getMonth() === +month) {
      item.innerHTML = date.getDate(); // day of the month
      const nowadays = new Date();
      //date.getDate() === curDate.getDate()
      if (
        nowadays.getFullYear() === year &&
        nowadays.getMonth() === month &&
        nowadays.getDate() === i
      ) {
        item.className += " curDay";
      }
    } else {
      item.style.opacity = "30%";
      item.innerHTML = date.getDate();
    }
    list.append(item);
  }
}

function changeMonth(val) {
  if (val) {
    curDate = new Date(curDate.getFullYear(), curDate.getMonth() + 1);
  }
  addDays(curDate.getFullYear(), curDate.getMonth());
}
