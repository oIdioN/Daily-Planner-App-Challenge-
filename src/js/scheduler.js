
//Current Date and time with live update
function toNowTime() {
    let now = dayjs().format('dddd DD of MMMM, YYYY [@] h:mm A');
    $('#todaysDate').html(now);
  }  
  setInterval(toNowTime, 1000);
  toNowTime();


  
