var hamburgerButton = document.querySelector('.hamburger-menu');
var sidebar = document.querySelector('.sidebar');

hamburgerButton.addEventListener('click', function(){
  hamburgerButton.classList.toggle('active');
  sidebar.classList.toggle('open');
});