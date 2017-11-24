<!DOCTYPE html>
<html lang="fr">
<head>
	<meta charset="utf-8" />
	<meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
	<link rel="stylesheet" type="text/css" href="css/bootstrap.min.css">
	<!-- Pour utiliser jquery-ui : <link rel="stylesheet" type="text/css" href="jquery-ui/jquery-ui.css"> -->
	<!-- Pour utiliser DateTables : <link rel="stylesheet" type="text/css" href="css/jquery.dataTables.min.css"> -->
	<link rel="stylesheet" type="text/css" href="css/font-awesome.min.css">
	<link rel="stylesheet" type="text/css" href="css/style.css">
	<script src="js/jquery.min.js" type="text/javascript"></script>
	<!-- Pour utiliser jquery-ui : <script src="jquery-ui/jquery-ui.min.js" type="text/javascript"></script> -->
	<!-- Pour utiliser DateTables : <script src="js/jquery.dataTables.min.js" type="text/javascript"></script> -->
	<script src="js/monJQ.js" type="text/javascript"></script>
	
	<title>WF3_Drive</title>
	
</head>


<?php 	
require_once("connexion.php");

if (isset($_GET['efface'])){
	$effacer_course = "DELETE FROM les_courses WHERE id_produit =" . $_GET['efface'];
	$req_efface = $bdd->prepare($effacer_course);
	$req_efface->execute();
}

if (isset($_GET['check'])){
	$check_course = "UPDATE les_courses SET selec = 1 WHERE id_produit =" . $_GET['check'];
	$req_check = $bdd->prepare($check_course);
	$req_check->execute();
}

if (isset($_GET['uncheck'])){
	$uncheck_course = "UPDATE les_courses SET selec = 0 WHERE id_produit =" . $_GET['uncheck'];
	$req_uncheck = $bdd->prepare($uncheck_course);
	$req_uncheck->execute();
}


$nb_produits_selec = "SELECT SUM(quantite) as selection FROM les_courses WHERE selec=1";
$req_compte = $bdd->prepare($nb_produits_selec);
$req_compte->execute();
if ($req_compte) {
	$compte = $req_compte->fetch();
	$compte = $compte[0];
	}
else{
	$compte = 0;
} 

$afficher_courses = "SELECT * FROM les_courses";
$req_courses = $bdd->prepare($afficher_courses);
$req_courses->execute();
if ($req_courses) {
	$courses = $req_courses->fetchAll();
	/*echo "<pre>";
	var_dump($courses);
	echo "</pre>";*/
?>


<body>

<div class="container">
  <h2 class="text-center p-5">Ma liste de courses</h2>
  <table class="table table-striped text-center">
    <thead>
     <tr>
        <th>ID_Produit</th>
        <th>Désignation</th>
        <th>Quantité</th>
        <th>Sélection</th>
        <th>Supprimer</th>
      </tr>
    </thead>
    <tbody>
<?php foreach($courses as $tab_course){
	echo "<tr id='id_".$tab_course['id_produit'] ."''>";
		echo "<td>";
		echo $tab_course['id_produit'];
		echo "</td>";

		echo "<td>";
		echo $tab_course['designation'];
		echo "</td>";

		echo "<td>";
		echo $tab_course['quantite'];
		echo "</td>";

		echo "<td>";
		if ($tab_course['selec'] == 1){
			echo '<i class="fa fa-check" aria-hidden="true"></i>';
		}
		else{
			echo '<i class="fa fa-square-o" aria-hidden="true"></i>';
		}
		echo "</td>";

		echo "<td>";
		echo '<i class="fa fa-trash-o supprimer" data-id_produit='. $tab_course['id_produit'] .' aria-hidden="true"></i>';
		echo "</td>";
	echo "</tr>";
}
?>
    </tbody>
  </table>

<div id="total">
	<p>Nombre de produits sélectionnés : </p>
	<p><?php echo isset($compte)? $compte : 0 ; ?></p>
</div>

</div>



<?php
}
?>


</body>


<script type="text/javascript" src="js/popper.js"></script>
<script type="text/javascript" src="js/bootstrap.min.js"></script>


</html>