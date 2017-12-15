<!DOCTYPE html>
<html lang="fr">
<head>
	<meta charset="utf-8" />
	<meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
	<link rel="stylesheet" type="text/css" href="css/bootstrap.min.css">
	<!-- Pour utiliser jquery-ui :  -->
	<link rel="stylesheet" type="text/css" href="jquery-ui/jquery-ui.css">
	<!-- Pour utiliser DateTables : <link rel="stylesheet" type="text/css" href="css/jquery.dataTables.min.css"> -->
	<link rel="stylesheet" type="text/css" href="css/font-awesome.min.css">
	<script src="js/jquery.min.js" type="text/javascript"></script>
	<!-- Pour utiliser jquery-ui : -->
	<script src="jquery-ui/jquery-ui.min.js" type="text/javascript"></script> 
	<!-- Pour utiliser DateTables : <script src="js/jquery.dataTables.min.js" type="text/javascript"></script> -->
	<script src="js/monJQ.js" type="text/javascript"></script>
	
	<title>WF3_Drive</title>
	
</head>


<?php 	
include_once("connexion.php");

// Modifications des données en GET

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
			<table class="table table-striped text-center" data-tri="designation" data-ordre="ASC">
				<thead>
					<tr>
						<th>ID_Produit</th>
						<th>Désignation<i class="fa fa-sort ml-2 ord-asc" data-tri="designation" aria-hidden="true"></i></th>
						<th>Quantité</i></th>
						<th>Sélection<i class="fa fa-sort ml-2 ord-asc" data-tri="selec"  aria-hidden="true"></th>
						<th>Supprimer</th>
					</tr>
				</thead>
				<tbody>

					<!-- Ancien affichage en PHP, désormais réalisé en AJAX
					<?php foreach($courses as $tab_course){
						$id = $tab_course['id_produit'];
						$nom = $tab_course['designation'];
						$quantite = $tab_course['quantite'];
						$selec = $tab_course['selec'];

						echo afficher_ligne($id, $nom, $quantite, $selec);
					}
					?> -->

				</tbody>
			</table>

			<div id="total">
				<p>Nombre de produits sélectionnés : 
					<span id="nb_produits"><?php echo nb_selec($bdd); ?></span>
				</p>
				<p>Nombre total de produits : 
					<span id="total_produits"><?php echo nb_total($bdd); ?></span>
				</p>
				<button type="button" id="bouton_ajouter" class="btn btn-primary float-right" data-toggle="modal" data-target="#ModalAjoutProduit">
				Ajouter une ligne
			</button>
			</div>


			<!-- Modal -->
			<div class="modal fade" id="ModalAjoutProduit" tabindex="-1" role="dialog" aria-labelledby="ModalTitre" aria-hidden="true">
				<div class="modal-dialog" role="document">
					<div class="modal-content">
						<div class="modal-header">
							<h5 class="modal-title" id="ModalTitre">Ajouter un produit</h5>
							<button type="button" class="close" data-dismiss="modal" aria-label="Close">
								<span aria-hidden="true">&times;</span>
							</button>
						</div>
						<div class="modal-body">
							<form id="form_ajouter" class="col-sm">
								<h3>Ajouter un produit</h3>
								<div class="form-group">
									<label class="col-form-label" for="form_designation">Désignation</label>
									<input type="text" class="form-control" id="form_designation" placeholder="Entrer un nouveau produit">
								</div>
								<div class="form-group">
									<label class="col-form-label" for="curseur_quantite">Quantité</label>
									<div id="slider_quantite">
										<div id="curseur_quantite" class="ui-slider-handle"></div>
									</div>
								</div>
								<button type="submit" class="btn btn-primary float-right">Ajouter</button>
								<button type="button" class="btn btn-secondary float-right mr-2" data-dismiss="modal">Fermer</button>
							</form>
						</div>
					</div>
				</div>
			</div>
		</div>

		<?php
	}
	?>

</body>


<script type="text/javascript" src="js/popper.js"></script>
<script type="text/javascript" src="js/bootstrap.min.js"></script>


</html>