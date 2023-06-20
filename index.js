const curDate = new Date();

const date = document.getElementById("date");
const btnYear = document.getElementById("btn-year");
const btnMonth = document.getElementById("btn-month");

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

date.firstElementChild.innerText = getMonthStr(curDate.getMonth()); //HEAD MONTH
date.lastElementChild.innerText = curDate.getUTCFullYear(); // HEAD YEAR
