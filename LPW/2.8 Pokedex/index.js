const inputFilter = document.querySelector('.filters input');
const xhr = new XMLHttpRequest();

xhr.open("GET", 'https://pokeapi.co/api/v2/pokemon/?limit=100&offset=0')
  xhr.send();
  
  xhr.onload = function() {
    if (xhr.status === 200) {
      let data = JSON.parse(xhr.responseText);
      displayPokemonCards(data);
    } else if (xhr.status === 404) {
      console.log("No records found");
    }
  }
  xhr.addEventListener("loadend", createModal());

function displayPokemonCards(data){

  if(!data){return};
  let results = data.results;

  results.forEach((element) =>{
    createCard(element.name);
  })

}

function createCard(name){

  let parent = document.querySelector('.list');

  let card = document.createElement('div');
  card.classList.add('card');
  card.setAttribute('pokemon-name', name);
  parent.appendChild(card);

  let cardTitle = document.createElement('h3');
  cardTitle.innerHTML = name;
  card.appendChild(cardTitle);

  let cardButton = document.createElement('button');
  cardButton.setAttribute('poke-to-search', name);
  cardButton.innerHTML = "Découvrir";
  card.appendChild(cardButton);

  cardButton.addEventListener('click', () => {
    displayModal(name);
  });

}

inputFilter.addEventListener('input', (e) => {
  let cards = document.querySelectorAll('.card');
  if(e.target.value == ''){
    for (let i = 0; i < cards.length; i++) {
      cards[i].style.display = "flex";
    }
  }
  else{
    cards.forEach((element) => {
      let cardPokemon = element.getAttribute('pokemon-name');
      if(!cardPokemon.includes(e.target.value.toLowerCase())){
        element.style.display = "none";
        return;
      }
      else{
        element.style.display = "flex";
      }

    })
  }
});

function createModal(){
  let parent = document.querySelector('body');

  let modal = document.createElement('div');
  modal.classList.add('modal');
  parent.appendChild(modal);

  let modalContent = document.createElement('div');
  modalContent.classList.add('modal-content');
  modal.appendChild(modalContent);

  let modalContentTitle = document.createElement('div');
  modalContentTitle.classList.add('modal-content-title');
  modalContent.appendChild(modalContentTitle);

  let modalContentSize = document.createElement('div');
  modalContentSize.classList.add('modal-content-size');
  modalContent.appendChild(modalContentSize);

  let modalContentWeight = document.createElement('div');
  modalContentWeight.classList.add('modal-content-weight');
  modalContent.appendChild(modalContentWeight);

  let modalContentType = document.createElement('div');
  modalContentType.classList.add('modal-content-type');
  modalContent.appendChild(modalContentType);

  let modalContentTypeLabel = document.createElement('span');
  modalContentTypeLabel.innerHTML = "Type : ";
  modalContentType.appendChild(modalContentTypeLabel);

  let modalContentTypeUL = document.createElement('ul');
  modalContentType.appendChild(modalContentTypeUL);

  let modalContentArtwork = document.createElement('div');
  modalContentArtwork.classList.add('modal-content-artwork');
  modalContent.appendChild(modalContentArtwork);

  let modalIcon = document.createElement('i');
  modalIcon.classList.add('fa-regular');
  modalIcon.classList.add('fa-circle-xmark');
  modalContent.appendChild(modalIcon);

  modalIcon.addEventListener('click', function(){
    modal.classList.remove('active');
    parent.classList.remove('modal-open');
  })
}

function displayModal(name){

  let modal = document.querySelector('.modal');
  let modalTitle = document.querySelector('.modal .modal-content .modal-content-title');
  let modalSize = document.querySelector('.modal .modal-content .modal-content-size');
  let modalWeight = document.querySelector('.modal .modal-content .modal-content-weight');
  let modalType = document.querySelector('.modal .modal-content .modal-content-type ul');
  let modalArtwork = document.querySelector('.modal .modal-content .modal-content-artwork');
  let size;
  let weight;
  let type;
  let artwork;

  xhr.open("GET", 'https://pokeapi.co/api/v2/pokemon/'+name);
  xhr.send();
  
  xhr.onload = function() {
    if (xhr.status === 200) {
      let body = document.querySelector('body');
      let data = JSON.parse(xhr.responseText);
      size = data.height;
      weight = data.weight;
      type = data.types;
      artwork = data.sprites; 

      // Name
      modalTitle.innerHTML = "Name : " + name;
      // Size 
      modalSize.innerHTML = "Size : " + size;
      // Weight 
      modalWeight.innerHTML ="Weight : " + weight;

      // Type 

      if(modalType.hasChildNodes()){
        while(modalType.hasChildNodes()) {
          modalType.removeChild(modalType.firstChild);
        }
      }
      type.forEach((element) => {
        // console.log(element.type.name);
        let li = document.createElement('li');
        li.innerHTML = element.type.name;
        modalType.appendChild(li);
      })

      // Image Artwork 

      let artworkOther = artwork.other;
      let artworkURL = artworkOther['official-artwork'].front_default;

      if(modalArtwork.hasChildNodes()){
        while(modalArtwork.hasChildNodes()) {
          modalArtwork.removeChild(modalArtwork.firstChild);
        }
      }
      let img = document.createElement('img');
      img.setAttribute('src', artworkURL);
      modalArtwork.appendChild(img);

      modal.classList.add('active');
      body.classList.add('modal-open');
    } else if (xhr.status === 404) {
      console.log("No records found");
    }
  }
}