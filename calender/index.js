today = new Date();
currentMonth = today.getMonth();
currentYear = today.getFullYear();
selectYear = document.getElementById("year");
selectMonth = document.getElementById("month");
const presentyear = today.getFullYear();
const presentMont = today.getMonth();
const curentDate = today.getDate();
let date;
months = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

showCalendar(currentMonth, currentYear);

function showCalendar(month, year) {
  let tb = document.getElementById("calendar-body");
  let firstDay = new Date(year, month).getDay();
  tb.innerHTML = null;
  let day = 1;
  for (let i = 0; i < 6; i++) {
    let row = document.createElement("tr");

    for (let j = 0; j < 7; j++) {
      if (i == 0 && j < firstDay) {
        const td = document.createElement("td");
        td.innerHTML = "";
        row.append(td);
      } else if (day > daysInMonth(month, year)) {
        break;
      } else {
        const td = document.createElement("td");
        td.innerHTML = day;
        if (date == day) {
          td.classList.add("info");
        }
        if (
          curentDate == day &&
          currentMonth == presentMont &&
          currentYear == presentyear
        ) {
          td.classList.add("current");
        }
        // console.log(td)
        day++;
        row.append(td);
      }
    }
    tb.append(row);
  }
}

function daysInMonth(iMonth, iYear) {
  if (iMonth == 2) {
    if ((iYear % 4 == 0 && iYear !== 100) || iYear % 400 == 0) {
      return 29;
    }
    return 28;
  }

  return 32 - new Date(iYear, iMonth, 32).getDate();
}

function jumpMont() {
  console.log(selectMonth.value);
  const value = selectMonth.value;
  currentMonth = value;
  showCalendar(currentMonth, currentYear);
  console.log(currentMonth, currentYear);
}

function jumpYear() {
  const year = selectYear.value;
  // console.log(year)
  currentYear = year;
  showCalendar(currentMonth, currentYear);
}

const EnterDate = () => {
  const vlaue = Number(document.getElementById("date").value);

  if (
    !vlaue ||
    typeof vlaue != "number" ||
    vlaue <= 0 ||
    vlaue > daysInMonth(currentMonth, currentYear)
  ) {
    alert("Enter Valid Dates");
    return;
  }
  date = vlaue;
  showCalendar(currentMonth, currentYear);
};
