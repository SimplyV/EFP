<?php

  $root_folder = './';
  $slider_duration = 1;

  // Fonction permettant de débugger de manière esthétique et lisible.
  function pre($a){
    echo '<pre>';
    echo $a;
    echo '</pre>';
  }
 
  // On vient récupérer tout les éléments contenus dans notre dossier, que ce soit des fichiers ou des répertoires
  if(!empty($_GET['dir'])){
    $list = scandir($_GET['dir']);
  }
  else{
    $list = scandir($root_folder);
  }

  $count_image = 0;

  // Fonction pour vérifier si c'est bien une image et non un tout autre fichier.
  function isImage($item){
    return preg_match("#\.(jpg|jpeg|png|gif)$#",strtolower($item));
  }
  
 
?>
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Document</title>
  <style>

    html,
    body{
      width: 100%;
      height: 100%;
      margin: 0;
    }

    .directory-row, 
    .image-row{
      display: flex;
      align-items: center;
      gap: 10px;
      padding: 2px 20px;
    }
    .directory-row a{
      color: dodgerblue;
    }
    .image-gallery{
      display: grid;
      grid-template-columns: repeat(1, 1fr);
      gap: 20px;
      margin: 40px 20px;
    }
    .image-gallery img{
      width: 100%;
      height: 100%;
      cursor: pointer;
      transition: transform .3s ease-in-out;
      object-fit: cover;
    }
    .image-gallery img:hover{
      width: 100%;
      height: 100%;
      transform: scale(1.03);
    }
    @media(min-width: 768px){
      .image-gallery{
        grid-template-columns: repeat(2, 1fr);
      }
    }
    .modal-container{
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background: rgba(0, 0, 0, 0.7);
      display: none;
      width: 100%;
      justify-content: center;
      align-items: center;
      height: 100vh;
    }
    .modal-container .slider-container{
      max-width: 600px;
      margin: 0 auto;
      overflow: hidden;
      height: 400px;
    }
    .modal-container .slider-container .slides{
      display: flex;
    }
  
    body.slide-open .modal-container{
      display: flex;
    }
    .modal-container .slider-container img{
      width: 600px;
      display: block;
      object-fit: cover;
    }
  </style>
  <?php 

    // Pour l'animation du slider, on calcule en fonction du nombres d'images présente
    foreach($list as $key=>$image){
    if(!isImage($image)){continue;}
      $count_image++;
    }

    $transform = '-'.($count_image*100);
    echo '<style type="text/css">';
    // .modal-container .slider-container .slides
    echo '@keyframes carousel{100%{transform: translateX('.$transform.'%);';
    $style = 'animation: carousel '.$count_image.'s linear infinite; animation-timing-function: steps('.$count_image.');';
    echo '</style>';
?> 
</head>
  <body>
    <?php
      foreach($list as $item){

        // Si notre élément n'est ni un répertoire ou un fichier image, on continue la boucle
        if($item == '..' || (!is_dir($item) && !isImage($item))){
          continue;
        }

        // On vérifie si ce sont des répértoires et si oui on les affiches
        if(is_dir($item)){
          echo '<div class="directory-row">';
            echo '<svg width="25" height="25" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><!--! Font Awesome Pro 6.2.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2022 Fonticons, Inc. --><path d="M447.1 96h-172.1L226.7 50.75C214.7 38.74 198.5 32 181.5 32H63.1c-35.35 0-64 28.66-64 64v320c0 35.34 28.65 64 64 64h384c35.35 0 64-28.66 64-64V160C511.1 124.7 483.3 96 447.1 96zM463.1 416c0 8.824-7.178 16-16 16h-384c-8.822 0-16-7.176-16-16V96c0-8.824 7.178-16 16-16h117.5c4.273 0 8.293 1.664 11.31 4.688L255.1 144h192c8.822 0 16 7.176 16 16V416z"/></svg>';
            echo '<a href="./?dir='.$item.'"><span>'.$item.'</span></a>';
          echo '</div>';
        }

        // On vérifie si c'est une image avec un format que l'on peut affichier et on l'affiche
        if(isImage($item)){
          echo '<div class="image-row">';
            echo '<svg width="25" height="25" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><!--! Font Awesome Pro 6.2.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2022 Fonticons, Inc. --><path d="M152 120c-26.51 0-48 21.49-48 48s21.49 48 48 48s48-21.49 48-48S178.5 120 152 120zM447.1 32h-384C28.65 32-.0091 60.65-.0091 96v320c0 35.35 28.65 64 63.1 64h384c35.35 0 64-28.65 64-64V96C511.1 60.65 483.3 32 447.1 32zM463.1 409.3l-136.8-185.9C323.8 218.8 318.1 216 312 216c-6.113 0-11.82 2.768-15.21 7.379l-106.6 144.1l-37.09-46.1c-3.441-4.279-8.934-6.809-14.77-6.809c-5.842 0-11.33 2.529-14.78 6.809l-75.52 93.81c0-.0293 0 .0293 0 0L47.99 96c0-8.822 7.178-16 16-16h384c8.822 0 16 7.178 16 16V409.3z"/></svg>';
            echo '<span>'.$item.'</span>';
          echo '</div>';
        }
      }

      echo '<div class="image-gallery" data-duration="'.$slider_duration.'">';
      foreach($list as $key=>$image){
        if(!isImage($image)){continue;}
        echo '<div class="image" data-position="'.$key.'">';
          echo '<img src="'.$root_folder.$_GET['dir'].'/'.$image.'">';
        echo '</div>';
      }
      echo '</div>';

      echo '<div class="modal-container">';
        echo '<div class="slider-container">';
          echo '<div class="slides" style="'.$style.'">';
          foreach($list as $key=>$image){
            if(!isImage($image)){continue;}
              echo '<img src="'.$root_folder.$_GET['dir'].'/'.$image.'">';
          }
          echo '</div>';
          echo '</div>';
      echo '</div>';

  
    ?>

    <script>

      var gallery = document.querySelector('.image-gallery');
      var image = document.querySelectorAll('.image-gallery img');
      var sliderDuration = gallery.getAttribute('data-duration');
      var body = document.querySelector('body');

      image.forEach(item => {
        item.addEventListener('click', event => {
          body.classList.add('slide-open');
        });
      });

    </script>
  </body>
</html>