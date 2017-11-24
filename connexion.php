<?php
$bdd = new PDO('mysql:host=localhost;dbname=formation;charset=utf8', 'root', '');

function nb_total(PDO $bdd){
	$nb_produits_selec = "SELECT SUM(quantite) as selection FROM les_courses WHERE selec=1";
	$req_compte = $bdd->prepare($nb_produits_selec);
	$req_compte->execute();
	if ($req_compte) {
		$compte = $req_compte->fetch();
		$compte = $compte['selection'];
	}
	else{
		$compte = 0;
	}
	if ($compte == ""){$compte = 0;}
	return $compte;
}