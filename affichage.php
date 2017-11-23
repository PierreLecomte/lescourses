<!DOCTYPE html>
<html lang="fr">
<head>
	<meta charset="utf-8" />
	<meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
	<link rel="stylesheet" type="text/css" href="css/bootstrap.min.css">
	<!-- Pour utiliser jquery-ui : <link rel="stylesheet" type="text/css" href="jquery-ui/jquery-ui.css"> -->
	<!-- Pour utiliser DateTables : <link rel="stylesheet" type="text/css" href="css/jquery.dataTables.min.css"> -->
	<link rel="stylesheet" type="text/css" href="css/style.css">
	<script src="js/jquery.min.js" type="text/javascript"></script>
	<!-- Pour utiliser jquery-ui : <script src="jquery-ui/jquery-ui.min.js" type="text/javascript"></script> -->
	<!-- Pour utiliser DateTables : <script src="js/jquery.dataTables.min.js" type="text/javascript"></script> -->
	<script src="js/monJQ.js" type="text/javascript"></script>
	
	<title>WF3_Drive</title>
	
</head>

<body>

<?php 	
require_once("connection.php");

$afficher_courses = "SELECT * FROM les_courses";
$req_courses = $bdd->prepare($afficher_courses);
$req_courses->execute();
if ($req_courses) {
	$courses = $req_courses->fetchAll();
	/*echo "<pre>";
	var_dump($courses);
	echo "</pre>";*/
?>

<div class="container">
  <h2>Ma liste de courses</h2>
  <table class="table table-striped">
    <thead>
     <tr>
        <th>ID_Produit</th>
        <th>Désignation</th>
        <th>Quantité</th>
        <th>Sélection</th>
      </tr>
    </thead>
    <tbody>
<?php foreach($courses as $tab_course){
	echo "<tr>";
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
		echo $tab_course['selec'];
		echo "</td>";
	echo "</tr>";
}

?>
    </tbody>
  </table>
</div>



<?php
}
?>


</body>


<script type="text/javascript" src="js/popper.js"></script>
<script type="text/javascript" src="js/bootstrap.min.js"></script>


</html>