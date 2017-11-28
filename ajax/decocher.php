<?php

require_once('../connexion.php');

$id_choisi = intval(trim($_GET['id']));

$requete = "UPDATE les_courses SET selec = 0 WHERE id_produit = $id_choisi";
$envoi = $bdd->prepare($requete);
$envoi->execute();

$data = array(
	"nb_selec" => nb_selec(),
	"nb_total" => nb_total()
);

echo json_encode($data);

?>