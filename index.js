// variables
let curDate = new Date();
const dateBtns = document.getElementById("date"); //HEAD DATE BTNS
const list = document.getElementById("list"); //DAYS LIST

// default setting
addDaysName()
addDays(curDate);
addDateBtns(curDate)

// functions

function addDaysName(){
  ["ПН","ВТ","СР","ЧТ","ПТ","СБ","ВС"].forEach(daysName =>{
      const item = document.createElement("li");
      item.className = "btn weeksDay";
      item.innerHTML = daysName;
      list.append(item);}
    )
}

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

function changeMonth(next) {
  list.innerHTML = ""
  if (next) {
    curDate = new Date(curDate.getFullYear(), curDate.getMonth() + 1);
  }
  else{
    curDate = new Date(curDate.getFullYear(), curDate.getMonth() - 1);
  }
  console.log(curDate)
  addDaysName()
  addDays(curDate);
  addDateBtns(curDate)
}

function addDateBtns(date){
  dateBtns.firstElementChild.innerText = getMonthStr(date.getMonth()); //HEAD MONTH
  dateBtns.firstElementChild.nextElementSibling.innerText = date.getFullYear(); // HEAD YEAR
}

function addDays(date) {
  const year = date.getFullYear()
  const month = date.getMonth()
  const firstWeeksDay = (new Date(year, month)).getDay();
  if (firstWeeksDay > 0) {
    for (let k = 1; k < firstWeeksDay; k++) {
      const dateOld = new Date(date - (firstWeeksDay - k) * 24 * 3600 * 1000);
      const item = document.createElement("li");
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

function openMonthList(){
  const monthsList = document.getElementById("months-list")
  if(monthsList.innerHTML){
    return monthsList.innerHTML = ""
  }
  else{
    for (let i = 0;i < 12; i++){
      const li = document.createElement("li");
      li.innerText = getMonthStr(i);
      li.className = "btn";
      monthsList.append(li) 
    }
  }
  
}