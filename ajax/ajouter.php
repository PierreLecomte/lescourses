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
$ajout->bindParam(':designation', $designation);
$ajout->bindParam(':quantite', $quantite);
$validation = $ajout->execute();

if(!$validation) {
	print_r($validation->errorInfo());
}


$afficher_derniere_course = "SELECT * FROM les_courses WHERE id_produit = (SELECT MAX(id_produit) FROM les_courses);";
$afficher = $bdd->prepare($afficher_derniere_course);

if ($afficher->execute()) {
	$course = $afficher->fetch();
	$id = $course['id_produit'];
	$nom = $course['designation'];
	$quantite = $course['quantite'];
	$selec = $course['selec'];

	afficher_ligne($id, $nom, $quantite, $selec);
}

}