<?php
require_once('../connexion.php');

if (isset($_GET['id'])) {

	// intval : remplace par 0 si ce n'est pas un nombre
	$id_produit = intval(trim($_GET['id']));

	$requete = "DELETE FROM les_courses WHERE id_produit = $id_produit";
	
	/* if(!$bdd->query($requete)) {
		print_r($bdd->errorInfo());
		}*/

	echo "console.log(" . $id_produit . ");";
	echo "jQuery('#id_" . $id_produit . "').remove();";

}