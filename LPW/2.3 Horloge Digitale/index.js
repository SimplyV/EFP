const leadingZeros = (element) =>{
  if(element < 10) {
    return ('0'+element);
  }
  return element;
}


const startClock = () =>{
  var element = document.querySelector('.container');
  var date = new Date();
  var dateArray = [];
  dateArray[0] = date.getHours(); 
  dateArray[1] = date.getMinutes();
  dateArray[2] = date.getSeconds();
  var str;
  
  dateArray.map((data, index)=> {
   dateArray[index] = leadingZeros(data);
  });
  str = dateArray.join(':');
  if(element){
    element.innerHTML = str;
  }

  
}

const clock = () => {

  var date = new Date();
  var aiguilleSec = document.querySelector('.seconde');
  var aiguilleMin = document.querySelector('.minute');
  var aiguilleHou = document.querySelector('.heure');

  var h = ( date.getHours() < 12) ? date.getHours() * 30 : (date.getHours() - 12) * 30;
  var m = date.getMinutes() * 6;
  var s = date.getSeconds() * 6;

  aiguilleSec.style.transform = 'rotate('+s+'deg)';
  aiguilleMin.style.transform = 'rotate('+m+'deg)';
  aiguilleHou.style.transform = 'rotate('+h+'deg)';
}

setInterval(startClock, 1000);
setInterval(clock, 1000);


