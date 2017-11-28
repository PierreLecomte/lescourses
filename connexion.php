<?php
$bdd = new PDO('mysql:host=localhost;dbname=formation;charset=utf8', 'root', '');

function nb_selec(){
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

function nb_total(){
	global $bdd;
	$nb_produits_selec = "SELECT SUM(quantite) as total FROM les_courses";
	$req_compte = $bdd->prepare($nb_produits_selec);
	$req_compte->execute();
	if ($req_compte) {
		$compte = $req_compte->fetch();
		$compte = $compte['total'];
	}
	else{
		$compte = 0;
	}
	if ($compte == ""){$compte = 0;}
	return $compte;
}

function afficher_ligne($id, $nom, $quantite, $selec){

	$ligne =  "<tr id='id_". $id ."'>";
	$ligne .= "<td>";
	$ligne .= $id;
	$ligne .= "</td>";

	$ligne .= "<td class='colonne_designation'>";
	$ligne .= "<span>" . $nom . "</span>";
	$ligne .= "<i class='fa fa-pencil float-right fcn_modifier' data-id_produit='" . $id . "' aria-hidden='true'></i></td>";

// Pour pouvoir modifier les quantités en AJAX, on encapsule la quantite affichée dans une classe colonne_quantite, et on crée sur les boutons des attributs bouton-quantite, data-quantite et data-id_produit
	$ligne .= "<td class='colonne_quantite'>";
	$ligne .= '<i class="fa fa-minus" data-quantite='. $quantite . ' data-id_produit='. $id .' data-bouton-quantite=1 aria-hidden="true" ></i>';
	$ligne .= "<span>" . $quantite . "</span>";
	$ligne .= '<i class="fa fa-plus" data-quantite='. $quantite . ' data-id_produit='. $id .' data-bouton-quantite=2 aria-hidden="true" ></i>';
	$ligne .= "</td>";


// De même, pour cocher, décocher et supprimer les lignes en AJAX, on crée sur les boutons des attributs data-id_produit

	$ligne .= "<td>";
	if ($selec == 1){
		$ligne .= '<i class="fa fa-check fcn_decocher" data-id_produit='. $id .' aria-hidden="true"></i>';
	}
	else{
		$ligne .= '<i class="fa fa-square-o fcn_cocher" data-id_produit='. $id .' aria-hidden="true"></i>';
	}
	$ligne .= "</td>";

	$ligne .= "<td>";
	$ligne .= '<i class="fa fa-trash-o fcn_supprimer" data-id_produit='. $id .' aria-hidden="true"></i>';
	$ligne .= "</td>";
	$ligne .= "</tr>";
	return $ligne;
}