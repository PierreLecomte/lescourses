<?php

require_once('../connexion.php');

$id_choisi = intval(trim($_GET['id']));
$quantite_modifiee = intval(trim($_GET['quantite']));

$requete = "UPDATE les_courses SET quantite = $quantite_modifiee WHERE id_produit = $id_choisi";
$envoi = $bdd->prepare($requete);
$envoi->execute();

echo nb_total();

?>