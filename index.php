<?php

require('./connection_sql.php');
echo "lien vers la <a href='http://php.net/manual/fr/class.pdostatement.php'>doc</a> PDO <br> <br>";
echo "Debut du script";
echo " <br> ------- <br>";


echo "<br>Requete 1 : select tout<br><br>";
$les_fruits = array();

$requete = "SELECT * FROM fruits WHERE 1";
$req_fruits = $bdd->prepare($requete);
$req_fruits->execute();
if ($req_fruits) {
	$les_fruits = $req_fruits->fetchAll();
}
//var_dump($les_fruits);


echo "<br>Requete 2 : requete prepare<br><br>";

$requete2 = "SELECT * FROM fruits WHERE id_fruit > ?";
$req_fruits2 = $bdd->prepare($requete2);
$id_fruit = 0;
$req_fruits2->execute(array($id_fruit));
if (count($req_fruits2)) {
	$les_fruits = $req_fruits2->fetchAll();
	var_dump($les_fruits);

}

echo "<br><br> Insertion en BDD <br><br>";

if (isset($_GET['fruit']) and !isset($_GET['par'])) {
	$nouveau_fruit = $_GET['fruit'];
	$nouveau_fruit = strip_tags(trim($nouveau_fruit));
	echo "<br>le novueau fruit a enregistre est : $nouveau_fruit <br>";

	$requete3 = "INSERT INTO fruits (nom) VALUE (:nom)";
	$req_fruits3 = $bdd->prepare($requete3);

	$req_fruits3->bindValue(':nom',$nouveau_fruit, PDO::PARAM_STR);
	$req_fruits3->execute();

	afficher_toutes_les_lignes();
} else {
	echo "<br> Pas de nouveau fruit <br>";
}


echo "<br><br> update en BDD <br><br>";
if (isset($_GET['fruit']) and isset($_GET['par'])) {
	$fruit_a_modifier = strip_tags(trim($_GET['fruit']));
	$nouveau_fruit = strip_tags(trim($_GET['par']));
	echo "<br> modifier le fruit : $fruit_a_modifier par $nouveau_fruit<br>";

	$requete4 = "UPDATE fruits SET nom = :nouveau_fruit WHERE nom = :fruit_a_modifier";
	$req_fruits4 = $bdd->prepare($requete4);
	$req_fruits4->bindValue(':nouveau_fruit',$nouveau_fruit, PDO::PARAM_STR);
	$req_fruits4->bindValue(':fruit_a_modifier',$fruit_a_modifier, PDO::PARAM_STR);
	$req_fruits4->execute();

	afficher_toutes_les_lignes();

} else {
	echo "<br> Rien a modifier <br>";
}





function afficher_toutes_les_lignes(){
	global $bdd;
	$les_fruits = array();

	$requete = "SELECT * FROM fruits WHERE 1";
	$req_fruits = $bdd->prepare($requete);
	$req_fruits->execute();
	if ($req_fruits) {
		$les_fruits = $req_fruits->fetchAll();
	}
	var_dump($les_fruits);

}