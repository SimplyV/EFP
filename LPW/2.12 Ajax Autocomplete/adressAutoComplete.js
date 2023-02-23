var input_list = document.querySelectorAll('.autocomplete');
var toComplete = document.querySelectorAll('.toComplete');
var results = [];

input_list.forEach((el) => {

  // el.addEventListener('focusout', function(e){
  //   let id = e.target.getAttribute('id');
  //   removeList(id);
  //   closeList();
  // });

  el.addEventListener('input', function(e){
    var id = e.target.getAttribute('id');
    var text = e.target.value;
    var list = document.querySelector('.'+id+'List');
  
    if(text != ''){
      fetch('./getAdresses.php?search='+text)
      .then((res) => res.json())
      .then((data) => {
        removeList(id);
        list.classList.remove('active');
        list.classList.add('active');
        data.forEach((el) => {
          results.push(el);
          createAdressElement(el.zip, el.city, id);
        })
      })
      .catch(err => console.log(err))
    }
    else{
      removeList(id);
      notFound(id);
    }
  });
})

function createAdressElement(zip, city, id) {
  var container = document.querySelector('.'+id+'List'); 
  var element = document.createElement('div');
  element.setAttribute('data-zip', zip);
  element.addEventListener('click', function(e){
    let element = e.target;
    handleClick(element);
  });
  
  var textZip = document.createElement('span');
  textZip.innerHTML = zip;
  element.appendChild(textZip);

  var textCity = document.createElement('p');
  textCity.innerHTML = city;
  element.appendChild(textCity);
  container.appendChild(element);
  
}
function removeList(id){
  var container = document.querySelector('.'+id+'List');
  if(container.hasChildNodes){
    while(container.firstChild) {
      container.removeChild(container.lastChild);
    }
  }
  
}
function handleClick(e){
  let zip = e.closest('div').getAttribute('data-zip');
  results.map((el) => {
    if(el.zip == zip){
      toComplete.forEach((element) => {
        let id = element.getAttribute('id');
        if(id == 'zip'){
          element.value = zip ?? '';
        }
        if(id == 'city'){
          element.value = el.city ?? '';
        }
        if(id == 'commune'){
          element.value = el.commune ?? '';
        }
        if(id == 'province'){
          element.value = el.province ?? '';
        }
       
      })
    }
  }) 
  closeList(); 
}

function closeList(){
  let cont = document.querySelector('.list.active');
  if(cont.classList.contains('active')){
    cont.classList.remove('active');
  }
}

function notFound(id){
  var container = document.querySelector('.'+id+'List');
  let div = document.createElement('div');

  let span = document.createElement('span');
  span.innerHTML = 'L\'élément n\'à pas été trouvé !';
  div.appendChild(span);
  container.appendChild(div);
}