<?php
require_once('./connection.php');

if (isset($_GET['id'])) {
	$id_produit = intval(trim($_GET['id']));

	$requete = "DELETE FROM les_courses WHERE id_produit = $id_produit";
	// if(!$bdd->query($requete))
		// print_r($bdd->errorInfo());

	echo "console.log('ajax')";
}