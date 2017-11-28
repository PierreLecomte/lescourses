<?php
$bdd = new PDO('mysql:host=localhost;dbname=formation;charset=utf8', 'root', '');

function nb_total(){
	global $bdd;
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

function afficher_ligne($id, $nom, $quantite, $selec){

	echo "<tr id='id_". $id ."'>";
	echo "<td>";
	echo $id;
	echo "</td>";

	echo "<td>";
	echo $nom;
	echo "</td>";

// Pour pouvoir modifier les quantités en AJAX, on encapsule la quantite affichée dans une classe colonne_quantite, et on crée sur les boutons des attributs bouton-quantite, data-quantite et data-id_produit
	echo "<td class='colonne_quantite'>";
	echo '<i class="fa fa-minus" data-quantite='. $quantite . ' data-id_produit='. $id .' bouton-quantite=1 aria-hidden="true" ></i>';
	echo "<span>" . $quantite . "</span>";
	echo '<i class="fa fa-plus" data-quantite='. $quantite . ' data-id_produit='. $id .' bouton-quantite=2 aria-hidden="true" ></i>';
	echo "</td>";

// De même, pour cocher, décocher et supprimer les lignes en AJAX, on crée sur les boutons des attributs data-id_produit

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