<?php
require_once('../connexion.php');

if (isset($_GET['tri']) && isset($_GET['ordre'])) {

	$tri = trim($_GET['tri']);
	$ordre = trim($_GET['ordre']);
	$req_tri = "SELECT * FROM les_courses ORDER BY $tri $ordre";
	
	
	$requete = $bdd->prepare($req_tri);
	$resultat = $requete->execute();

	if(!$resultat) {
		//print_r($ajout->errorInfo()[2]);
	}

	$T_resultat = $requete->fetchAll();

	$T_affichage = array();


/* Si on veut envoyer le tableau formaté en JSON
	foreach($T_resultat as $ligne){
		$T_affichage[] = afficher_ligne($ligne['id_produit'],$ligne['designation'],$ligne['quantite'],$ligne['selec']);
	}

*/

// Si on veut envoyer seulement les données en JSON
	foreach($T_resultat as $ligne){
		$T_affichage[] = array(
			'id_produit' => $ligne['id_produit'],
			'designation' => $ligne['designation'],
			'quantite' => $ligne['quantite'],
			'selec' => $ligne['selec']);
	}

	/*echo"<br><br>";
	var_dump($T_affichage);
	echo"<br><br>";*/

	$data = array(
	"tableau" => $T_affichage,
	"nb_selec" => nb_selec(),
	"nb_total" => nb_total()
	);

	echo json_encode($data);
	
}