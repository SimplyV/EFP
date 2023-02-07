class Hangman{
  constructor(){
    this.db = new Database();
    this.word = this.db.random();
    this.clue = this.word.clue;
    this.string = this.word.word;
    this.w = new Word(this.string);
    this.lives = 10;
  }
  render(id){
    var ct = document.createElement('div');
    ct.classList.add('container');
    ct.setAttribute('id', id);

    var ctImgContainer = document.createElement('div');
    ctImgContainer.classList.add('ct-img-container');

    var ctImg = document.createElement('img');
    ctImg.setAttribute('src', 'man.png');
    
    ctImgContainer.appendChild(ctImg);
    ct.appendChild(ctImgContainer);

    var ctLettersContainer = document.createElement('div');
    ctLettersContainer.classList.add('ct-letters-container');
    
    for(let i = 0; i < this.string.split('').length; i++){
      let letter = document.createElement('div');
      letter.setAttribute('data-position', i);
      ctLettersContainer.appendChild(letter);
    }
    ct.appendChild(ctLettersContainer);

    var ctClueContainer = document.createElement('div');
    ctClueContainer.classList.add('ct-clue-container');

    var ctClueContainerContent = document.createElement('span');
    ctClueContainerContent.innerHTML = 'Clue : ';

    var ctClueContainerString = document.createElement('b');
    ctClueContainerString.innerHTML = this.clue;

    ctClueContainerContent.appendChild(ctClueContainerString);
    ctClueContainer.appendChild(ctClueContainerContent);  
    ct.appendChild(ctClueContainer);
    
    var ctLivesContainer = document.createElement('div');
    ctLivesContainer.classList.add('ct-lives-container');

    var ctLivesString = document.createElement('span');
    ctLivesString.innerHTML = "Remaining lives : ";

    var ctLivesValue = document.createElement('b');
    ctLivesValue.innerHTML = this.lives;

    ctLivesString.appendChild(ctLivesValue);

    ctLivesContainer.appendChild(ctLivesString);
    ct.appendChild(ctLivesContainer);

    var ctInputContainer = document.createElement('div');
    ctInputContainer.classList.add('ct-input-container');

    var ctInput = document.createElement('input');
    ctInput.setAttribute('type', 'text');
    ctInput.setAttribute('placeholder', 'Enter a letter');

    console.log(this.string);

    let lettersInputed = [];

    ctInput.addEventListener('input', (e) =>{
      e.preventDefault();
      let val = e.target.value;
      let result = this.w.positionsFor(val);
      if(this.lives == 0){
        console.log('game-over');
        ctInput.value = '';
        return;
      }
      if(result == ''){
        this.lives --;
        ctLivesValue.innerHTML = this.lives;
      }
      else{
        result.map((el) => {
          document.querySelector(`.ct-letters-container div[data-position="${el}"]`).innerHTML = '<span>'+val+'</span>';
        })
      }

      if(!lettersInputed.includes(val)){
        lettersInputed.push(val)
      }

      // let wordArr = this.string.split('');
      // wordArr.map((el, index) => {
      //   if(){
      // }
      // })




      console.log(lettersInputed);
    
      setTimeout(() => {
        ctInput.value = '';
      }, 200);
    });

    ctInputContainer.appendChild(ctInput);
    ct.appendChild(ctInputContainer);
    
    return ct;
  }
  start(id){
    document.body.appendChild(this.render(id));
  }

}

class Word{
  constructor(string){
    this.string = string;   
  }

  positionsFor(letter){
    let positions = [];
    let wordArr = this.string.split('');
    wordArr.map((el, index) => {
      if(el == letter){
        positions.push(index);
      }
    })
    return positions;
  }
}

class Database{
  constructor(){
    this.words = [
      {"word": "giraffe", "clue": "animals"},
      {"word": "lion", "clue": "animals"},
      {"word": "tiger", "clue": "animals"},
      {"word": "elephant", "clue": "animals"},
      {"word": "monkey", "clue": "animals"},
      {"word": "leopard", "clue": "animals"},
      {"word": "penguin", "clue": "animals"},
      {"word": "gazelle", "clue": "animals"},
      {"word": "hippopotamus", "clue": "animals"},
      {"word": "rhinoceros", "clue": "animals"},
      {"word": "crocodile", "clue": "animals"},
      {"word": "kangaroo", "clue": "animals"},
      {"word": "platypus", "clue": "animals"},
      {"word": "cheetah", "clue": "animals"},
      {"word": "puma", "clue": "animals"},
      {"word": "lizard", "clue": "animals"},
      {"word": "snake", "clue": "animals"},
      {"word": "tortoise", "clue": "animals"},
      {"word": "ford", "clue": "cars"},
      {"word": "ferrari", "clue": "cars"},
      {"word": "porsche", "clue": "cars"},
      {"word": "lamborghini", "clue": "cars"},
      {"word": "bmw", "clue": "cars"},
      {"word": "audi", "clue": "cars"},
      {"word": "mercedes", "clue": "cars"},
      {"word": "jaguar", "clue": "cars"},
      {"word": "tesla", "clue": "cars"},
      {"word": "skyscraper", "clue": "buildings"},
      {"word": "bridge", "clue": "buildings"},
      {"word": "tower", "clue": "buildings"},
      {"word": "cathedral", "clue": "buildings"},
      {"word": "temple", "clue": "buildings"},
      {"word": "museum", "clue": "buildings"},
      {"word": "palace", "clue": "buildings"},
      {"word": "library", "clue": "buildings"},
      {"word": "stadium", "clue": "buildings"},
      {"word": "computer", "clue": "technology"},
      {"word": "smartphone", "clue": "technology"},
      {"word": "tablet", "clue": "technology"},
      {"word": "laptop", "clue": "technology"},
      {"word": "television", "clue": "technology"},
      {"word": "printer", "clue": "technology"},
      {"word": "camera", "clue": "technology"},
      {"word": "headphones", "clue": "technology"},
      {"word": "bluetooth", "clue": "technology"},
      {"word": "router", "clue": "technology"},
      {"word": "grapes", 'category': 'food'},
      {"word": "banana", "clue": "food"},
      {"word": "orange", "clue": "food"},
      {"word": "strawberry", "clue": "food"},
      {"word": "kiwi", "clue": "food"},
      {"word": "pineapple", "clue": "food"},
      {"word": "mango", "clue": "food"},
      {"word": "apple", "clue": "food"},
      {"word": "pear", "clue": "food"},
      {"word": "peach", "clue": "food"},
      {"word": "plum", "clue": "food"},
      {"word": "lemon", "clue": "food"},
      {"word": "lime", "clue": "food"},
      {"word": "avocado", "clue": "food"},
      {"word": "watermelon", "clue": "food"},
      {"word": "cantaloupe", "clue": "food"},
      {"word": "honeydew", "clue": "food"},
      {"word": "mushroom", "clue": "food"},
      {"word": "onion", "clue": "food"},
      {"word": "garlic", "clue": "food"},
      {"word": "potato", "clue": "food"},
      {"word": "carrot", "clue": "food"},
      {"word": "cucumber", "clue": "food"},
      {"word": "tomato", "clue": "food"},
      {"word": "bell pepper", "clue": "food"},
      {"word": "spinach", "clue": "food"},
      {"word": "lettuce", "clue": "food"},
      {"word": "broccoli", "clue": "food"},
      {"word": "cauliflower", "clue": "food"},
      {"word": "asparagus", "clue": "food"},
      {"word": "eggplant", "clue": "food"},
      {"word": "zucchini", "clue": "food"},
      {"word": "squash", "clue": "food"},
      {"word": "pumpkin", "clue": "food"},
      {"word": "kale", "clue": "food"}
      ]
  }

  random(){
    let randomIndex = Math.floor(Math.random() * this.words.length);
    let randomLine = this.words[randomIndex];
    return randomLine;
  }
}


export default Hangman;