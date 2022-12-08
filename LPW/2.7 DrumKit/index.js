const drumHolder = document.getElementById('drum-holder');
const sounds = [
  {value: 'bass', key: 'a'},
  {value: 'bongo', key: 'd'},
  {value: 'clap', key: 't'},
  {value: 'kick', key: 'm'},
  {value: 'piano', key: 'p'},
  {value: 'saxophone', key: 's'},
  {value: 'tambourine', key: 'q'},
  {value: 'trumpet', key: 'w'},
  {value: 'tuned', key: 'n'}
]
sounds.forEach((element) => {
  let name = element.value;
  let key = element.key;

  let soundElement = document.createElement('div');
  soundElement.classList.add('drum-sound');
  soundElement.setAttribute('data-key', key);
  drumHolder.appendChild(soundElement);

  let keyElement = document.createElement('h3');
  keyElement.innerHTML = key;
  soundElement.appendChild(keyElement);

  let title = document.createElement('span');
  title.innerHTML = name;
  soundElement.appendChild(title);

  let audio = document.createElement('audio');
  audio.setAttribute('src', 'http://127.0.0.1:5500/LPW/2.7%20DrumKit/sounds/'+name+'.wav');
  soundElement.appendChild(audio);
});

document.addEventListener('keypress', function(event){
  let keys = [];
  sounds.forEach(function(element){
    let key = element.key;
    keys.push(key);
  });
  if(!keys.includes(event.key)){return};  

  let element = document.querySelector('.drum-sound[data-key="'+event.key+'"]');
  let audio = element.querySelector('audio');
  let timeAudio = audio.duration;
  
  audio.play();
  element.classList.add('playing');
  setTimeout(function(){
    element.classList.remove('playing');
  }, (timeAudio*1000));

});