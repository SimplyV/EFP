var input = document.getElementById('entry');
var button = document.getElementById('submit');
var container = document.getElementById('colorized');
var inputValue;
var x = 0;
var textLetter;


var colors = ['color_1', 'color_2', 'color_3'];
var className = '';

button.addEventListener('click', function(e){
  e.preventDefault();
  let animationInterval = setInterval(animation, 500);
  clearInterval(animationInterval);
  // if(animationInterval){
  //   clearInterval(animationInterval);
  // }

  inputValue = input.value;
  var chars = [];
  isAnimated = false;

  while(container.hasChildNodes()) {
    container.removeChild(container.firstChild);
  }
  if(inputValue == ''){
    return;
  }
      

  for(let char of inputValue){
    chars.push(char);
  }
  chars.forEach(function(item){
    if(x >= 3){
      x = 0
    }

    className = colors[x];
    textLetter = document.createTextNode(item);

    var text = document.createElement('span');
    text.classList.add('text');
    text.classList.add(className);
    text.appendChild(textLetter);
    
    container.appendChild(text);


   x++;
  })


  animationInterval = setInterval(animation, 300);

  function animation(){

    let letters = document.getElementsByTagName('span');


    for(let i = 0; i < letters.length; i++){
      // console.log(letters[i].className);
      if(letters[i].className.includes('color_1')){
        letters[i].className = 'text color_2';
      }
      else if(letters[i].className.includes('color_2')){
        letters[i].className = 'text color_3';
      }
      else{
        letters[i].className = 'text color_1';
      }


    }
  }




  


});

// function colorAnimation(element){

//   element++;

// }