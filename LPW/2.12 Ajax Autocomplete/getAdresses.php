<?php 

	ini_set('display_errors', 1);
	ini_set('display_startup_errors', 1);
	error_reporting(E_ALL);


	function pre($a){
		echo '<pre>';
		var_dump($a);
		echo '</pre>';
	}

	try{
		$bdd = new PDO('mysql:host=localhost;dbname=locus;charset=utf8', 'root', 'root');
	}
	catch(Exception $e){
		die('Erreur : '.$e->getMessage());
	}

	$get = $_GET['search'];
	$results = [];
	$search = $bdd->prepare('SELECT * FROM locus WHERE zip LIKE :search_term OR city LIKE :search_term_adress OR commune LIKE :search_term_adress OR province LIKE :search_term_adress');
	$search->execute(array(':search_term' => $get.'%', ':search_term_adress' => '%'.$get.'%'));
	while($result = $search->fetch()){
		array_push($results, array(
			'zip' => $result['zip'],
			'commune' => $result['commune'],
			'city' => $result['city'],
			'province' => $result['province']
		));
	}

	if(!empty($results)){
		echo json_encode($results);
		die();
	}



?>