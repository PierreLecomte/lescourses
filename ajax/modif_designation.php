<?php

require_once('../connexion.php');

$id_choisi = intval(trim($_GET['id']));
$designation = trim($_GET['designation']);

$requete = "UPDATE les_courses SET designation = :designation  WHERE id_produit = :id";

$update = $bdd->prepare($requete);

$update->bindParam(':designation', $designation, PDO::PARAM_STR);
$update->bindParam(':id', $id_choisi, PDO::PARAM_INT);
$update->execute();

?>