let width = 10;
let height = 10;
let cellsArr = [];
let matrixArr = [];
let neighborArr = [];


const makeBoard = (width, height) => {

  let container = document.createElement('div');
  container.classList.add('container');

  let count = 0;
  for(let i = 0; i < height; i++){
    cellsArr[i]=[];
    for(let j = 0; j < width; j++){
      cellsArr[i].push(makeCell(count, container));
      count++;
    }
  }
  if(document.querySelector('.container')){
    document.querySelector('.container').remove();
  }
  document.body.appendChild(container);
}

const makeArr = () => {
  var count = 0;
  cellsArr.forEach((el) => {
    matrixArr[count] = [];
    el.forEach((subel) => {
      matrixArr[count].push(isDeadOrAlive(subel));
    });
    count++;
  });
}

const outOfBound = (i, j) => {
  return i < 0 || j < 0
}


const countNeighbor = (i, j) => {
  var numNeighbor = 0;

  for(let row = i-1; row < i+1; row++){

  }

  if((matrixArr[i][j - 1]) === 1){
    numNeighbor++;
  }
   if(matrixArr[i][j+1] === 1){
    numNeighbor++;
  }
   if(matrixArr[i-1][j] === 1){
    numNeighbor++;
  }
   if(matrixArr[i+1][j] === 1){
    numNeighbor++;
  }
   if(matrixArr[i-1][j-1] === 1){
    numNeighbor++;
  }
   if(matrixArr[i-1][j+1] === 1){
    numNeighbor++;
  }
   if(matrixArr[i+1][j-1] === 1){
    numNeighbor++;
  }
   if(matrixArr[i+1][j+1] === 1){
    numNeighbor++;
  }
  return numNeighbor;
}

const NextGen = () => {
  matrixArr.map((rows) => {
    rows.map((cols) => {
      console.log(countNeighbor(rows, cols));
    });
  });
}

const isDeadOrAlive = (element) => {
  if(!element.classList.contains('alive')){
    return 0
  }
  return 1;
}

const makeCell = (count, container) => {
  let cell = document.createElement('div');
  cell.classList.add('cell');
  cell.setAttribute('data-position', count);
  cell.addEventListener('click', handleCellClick);
  container.appendChild(cell);
  return cell;
}

const handleCellClick = (e) => {
  let element = e.target;
  if(!element.classList.contains('alive')){
    element.classList.add('alive');
  }
  else{
    element.classList.remove('alive');
  } 
}

const makeStyle = (color = '#000') => {
  let style = document.createElement('style');
  style.setAttribute('id', 'style-cell');
  style.type = "text/css";
  let content = `
  .container{
    grid-template-columns: repeat(${width}, 1fr);
    grid-template-rows: repeat(${height}, 1fr);
  }`;

  let styleCellColor =  document.createElement('style');
  styleCellColor.setAttribute('id', 'style-cell-color');
  styleCellColor.type = "text/css";
  let contentCellColor = `
  .container div.alive{
    background-color: ${color};
  }`;
  style.appendChild(document.createTextNode(content));
  styleCellColor.appendChild(document.createTextNode(contentCellColor));
  
  document.head.appendChild(style);
  document.head.appendChild(styleCellColor);
}


const updateCSS = (content, styleToSet) => {
  let style;
  if(styleToSet == 'color'){
    style = document.getElementById('style-cell-color');
  }
  else{
    style = document.getElementById('style-cell');
  }
  while(style.firstChild) {
    style.removeChild(style.firstChild);
  }
  style.appendChild(document.createTextNode(content))
}

const updateGridCSS = () => {
  let content = `
  .container{
    grid-template-columns: repeat(${width}, 1fr);
    grid-template-rows: repeat(${height}, 1fr);
  }`;
  updateCSS(content, '');
}

const updateColorCSS = (color) => {
  let content = `
  .container div.alive{
    background-color: ${color};
  }`;
  updateCSS(content, 'color');
}

const updateWidth = (e) => {
  let value = e.target.value;
  width = value;
  makeBoard(value, height);
  updateGridCSS();
}
const updateHeight = (e) => {
  let value = e.target.value;
  height = value;
  makeBoard(width, value);
  updateGridCSS();
}


const updateColors = (e) => {
  let value = e.target.value;
  updateColorCSS(value);
}

const makeInputs = () => {

  let containerInputs = document.createElement('div');
  containerInputs.classList.add('controls-container');

  let labelWidthInput = document.createElement('label');
  labelWidthInput.innerText = "Width";
  let widthInput = document.createElement('input');
  widthInput.classList.add('width-input');
  widthInput.type = 'number';
  widthInput.value = width;
  widthInput.addEventListener('input', updateWidth);
  containerInputs.appendChild(labelWidthInput);
  containerInputs.appendChild(widthInput);

  let labelHeightInput = document.createElement('label');
  labelHeightInput.innerText = "Height";
  let heightInput = document.createElement('input');
  heightInput.classList.add('height-input');
  heightInput.addEventListener('input', updateHeight);
  heightInput.type = 'number';
  heightInput.value = height;
  containerInputs.appendChild(labelHeightInput);
  containerInputs.appendChild(heightInput);

  let labelColorInput = document.createElement('label');
  labelColorInput.innerText = "Alive cell color";
  let colorInput = document.createElement('input');
  colorInput.classList.add('color-input');
  colorInput.type = 'color';
  colorInput.addEventListener('input', updateColors);
  containerInputs.appendChild(labelColorInput);
  containerInputs.appendChild(colorInput);

  let startButton = document.createElement('button');
  startButton.innerText = 'Start the game !';
  startButton.classList.add('start-btn');
  startButton.addEventListener('click', startGame);
  containerInputs.appendChild(startButton)
  document.body.appendChild(containerInputs);
}




const logArr = (arr) => {
  console.table(arr);
  console.log(arr);
}

const startGame = () => {
  makeArr();
  console.log(countNeighbor(1, 4));
  NextGen();
}
 
const makeGameBoard = () => {
  makeStyle();
  makeInputs();
  makeBoard(width, height);

}
makeGameBoard();