<?php
require_once('../connexion.php');

if (isset($_GET['tri'])) {

	// intval : remplace par 0 si ce n'est pas un nombre

	$req_tri = "SELECT * FROM les_courses ORDER BY :tri";
			
	$tri = trim($_GET['tri']);

	$requete = $bdd->prepare($req_tri);
	$requete->bindParam(':tri', $tri, PDO::PARAM_STR);
	$resultat = $requete->execute();

	if(!$resultat) {
		//print_r($ajout->errorInfo()[2]);
	}

	$T_resultat = $requete->fetchAll();

	$T_affichage = array();

	foreach($T_resultat as $ligne){
		$T_affichage[] = afficher_ligne($ligne['id_produit'],$ligne['designation'],$ligne['quantite'],$ligne['selec']);
	}

	$data = array(
	"tableau" => $T_affichage,
	"nb_selec" => nb_selec(),
	"nb_total" => nb_total()
	);

	echo json_encode($data);
	
}