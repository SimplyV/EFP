let params = window.location.search;
const urlParams = new URLSearchParams(params);
let width = urlParams.get('width');
let nbrCase = width*width;
let body = document.querySelector('body');
let damier = document.createElement('div');
damier.className = 'board';
body.appendChild(damier);

damier.style.gridTemplateColumns = 'repeat('+width+', 1fr)';
let col1 = '#fff';
let col2 = '#000';

let x = 0;
for(i=0;i < width ;i++){
  color = "white";
  for(j=0; j < width; j++){
    let s = document.createElement('div');
    if(x == 1){
      color = "black";
      s.style.backgroundColor = color;
      x= -1;
    }
    x++;
    s.className = 'board-case';

    damier.appendChild(s);
  }

}