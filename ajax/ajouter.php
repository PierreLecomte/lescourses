<?php
require_once('../connexion.php');

if (isset($_GET['designation']) && isset($_GET['quantite'])) {

	// intval : remplace par 0 si ce n'est pas un nombre

		$req_ajout = "INSERT INTO les_courses(
			designation,
			quantite
			) 
			VALUES (
			:designation,
			:quantite
		);";

	$designation = trim($_GET['designation']);
	$quantite = intval(trim($_GET['quantite']));

	$ajout = $bdd->prepare($req_ajout);
	$ajout->bindParam(':designation', $designation, PDO::PARAM_STR);
	$ajout->bindParam(':quantite', $quantite, PDO::PARAM_INT);
	$validation = $ajout->execute();

	if(!$validation) {
		//print_r($ajout->errorInfo()[2]);
	}

	$id = $bdd->lastInsertId();

	$data = array(
	"ligne" => afficher_ligne($id, $designation, $quantite, 0),
	"nb_selec" => nb_selec(),
	"nb_total" => nb_total()
	);

	echo json_encode($data);

	

	
}