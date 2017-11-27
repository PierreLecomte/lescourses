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

$ajout = $bdd->prepare($req_ajout);
$ajout->bindParam(':designation', $_GET['designation']);
$ajout->bindParam(':quantite', $_GET['quantite']);
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

	echo "<tr id='id_". $id ."'>";
	echo "<td>";
	echo $id;
	echo "</td>";

	echo "<td>";
	echo $nom;
	echo "</td>";

	echo "<td>";
	echo $quantite;
	echo "</td>";

	echo "<td>";
	if ($selec == 1){
		echo '<i class="fa fa-check fcn_decocher" data-id_produit='. $id .' aria-hidden="true"></i>';
	}
	else{
		echo '<i class="fa fa-square-o fcn_cocher" data-id_produit='. $id .' aria-hidden="true"></i>';
	}
	echo "</td>";

	echo "<td>";
	echo '<i class="fa fa-trash-o fcn_supprimer" data-id_produit='. $id .' aria-hidden="true"></i>';
	echo "</td>";
	echo "</tr>";
}

}