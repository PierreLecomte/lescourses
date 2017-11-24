<?php

require_once('../connexion.php');

$id_choisi = intval(trim($_GET['id']));

$requete = "UPDATE les_courses SET selec = 1 WHERE id_produit = $id_choisi";
$envoi = $bdd->prepare($requete);
$envoi->execute();

?>