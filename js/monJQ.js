jQuery(function($) {


	// Instanciation du slider #slider_quantite et de son curseur #curseur_quantite
	var handle = $( "#curseur_quantite" );
	$( "#slider_quantite" ).slider({
		max: 10,
		create: function() {
			handle.text( $( this ).slider( "value" ) );
		},
		slide: function( event, ui ) {
			handle.text( ui.value );
		}
	});


	// Au cas où on souhaite créer une page supplémentaire, on peut charger le même en-tête en Ajax :
	// On peut insérer le header en jQuery, si on souhaite permettre à l'utilisateur de rédiger le contenu sans s'en préoccuper
	$('body').prepend('<header id="header"></header>');
	$('#header').load('ajax/header.html');

	// Idem pour le footer :

	$('body').append('<footer id="footer"></footer>');
	$('#footer').load('ajax/footer.html');

	// Pour activer un événement sur un sélecteur imprécis dans un parent précis :
	// $('.parent').on('click','fa', function(){

function afficher_ligne(id, nom, quantite, selec){

	var ligne =  "<tr id='id_" + id +"'>";
	ligne += "<td>";
	ligne += id;
	ligne += "</td>";

	ligne += "<td class='colonne_designation'>";
	ligne += "<span>" + nom + "</span>";
	ligne += "<i class='fa fa-pencil float-right fcn_modifier' data-id_produit='" + id + "' aria-hidden='true'></i></td>";

// Pour pouvoir modifier les quantités en AJAX, on encapsule la quantite affichée dans une classe colonne_quantite, et on crée sur les boutons des attributs bouton-quantite, data-quantite et data-id_produit
	ligne += "<td class='colonne_quantite'>";
	ligne += '<i class="fa fa-minus" data-quantite=' + quantite + ' data-id_produit=' + id + ' data-bouton-quantite=1 aria-hidden="true" ></i>';
	ligne += "<span>" + quantite + "</span>";
	ligne += '<i class="fa fa-plus" data-quantite=' + quantite + ' data-id_produit=' + id + ' data-bouton-quantite=2 aria-hidden="true" ></i>';
	ligne += "</td>";


// De même, pour cocher, décocher et supprimer les lignes en AJAX, on crée sur les boutons des attributs data-id_produit

	ligne += "<td>";
	if (selec == 1){
		ligne += '<i class="fa fa-check fcn_decocher" data-id_produit=' + id + ' aria-hidden="true"></i>';
	}
	else{
		ligne += '<i class="fa fa-square-o fcn_cocher" data-id_produit=' + id + ' aria-hidden="true"></i>';
	}
	ligne += "</td>";

	ligne += "<td>";
	ligne += '<i class="fa fa-trash-o fcn_supprimer" data-id_produit=' + id + ' aria-hidden="true"></i>';
	ligne += "</td>";
	ligne += "</tr>";
	$('table tbody').append(ligne);
}

function afficher_tableau(choix_tri, choix_ordre){
	$.ajax({
				url : 'ajax/trier.php',
				data : {
					tri : choix_tri,
					ordre : choix_ordre
				},
				dataType : 'json',
				success: function(donnees_retour){
					//console.log(donnees_retour['tableau']);
					$('table tbody').html("");
					$.each(donnees_retour.tableau, function(index, valeur){
						afficher_ligne(valeur['id_produit'],valeur['designation'],valeur['quantite'],valeur['selec']);						
					});
				},
				error: function(donnees_json){
					$('table tbody').html("");
					$.each(donnees_json.tableau, function(index, valeur){
						afficher_ligne(valeur['id_produit'],valeur['designation'],valeur['quantite'],valeur['selec']);						
					});
				}
			});
}

// Pour afficher le tableau en jQuery
function initialiser_tableau(){

	choix_tri = $("table").attr('data-tri');
	choix_ordre = $("table").attr('data-ordre');
	if (localStorage.getItem('T_lesCourses')){
		var T_recup = localStorage.getItem('T_lesCourses');
// Il faut "parser" en JSON les données récupérées du local storage
		T_recup = JSON.parse(T_recup);
		var date_T_recup = T_recup.timestamp;
	}
	$.ajax({
				url : 'ajax/trier.php',
				data : {
					tri : choix_tri,
					ordre : choix_ordre
				},
				dataType : 'json',
				success: function(donnees_retour){
					console.log('connexion avec la BDD');
// Si les données ont été modifiées depuis les données récupérées en local storage :
					if(donnees_retour.timestamp != date_T_recup){
						var liste_designation = new Array();
						$.each(donnees_retour.tableau, function(index, valeur){
							afficher_ligne(valeur['id_produit'],valeur['designation'],valeur['quantite'],valeur['selec']);
							liste_designation.push(valeur['designation']);
							donnees_json = donnees_retour;
							liste_autocompletion = liste_designation;
// On stocke en local storage les données JSON stringyfiées
							localStorage.setItem('T_lesCourses',JSON.stringify(donnees_json));
						});
					}
				},
				error: function(){
					console.log('hors ligne');
					$.each(T_recup.tableau, function(index, valeur){
						liste_designation.push(valeur['designation']);
					});
						donnees_json = T_recup;
						liste_autocompletion = liste_designation;
				}
			});
}


// On charge le tableau trié selon les paramètres en attribut de la table :

var donnees_json;
var liste_autocompletion;
initialiser_tableau();

	// Lorsqu'on clique sur une case ou la corbeille, on récupère l'id de la ligne via data-id_produit et on lance une requete ajax
	$('table').on('click', '.fcn_supprimer', function(){
		var id_clic = $(this).attr('data-id_produit');
		$.ajax({
			url : 'ajax/supprimer.php',
			//data : permet d'envoyer sous forme d'objet des données en GET à la page php
			data : {id : id_clic},
			dataType : 'json',
			success: function(donnees_retour){
				$('tr#id_' + id_clic).remove();
				$('#nb_produits').text(donnees_retour.nb_selec);
				$('#total_produits').text(donnees_retour.nb_total);
			},
			error: function(donnees_json){
				console.log($.inArray(id_clic),donnees_json.tableau);

				/*$.each(donnees_json.tableau, function(index, valeur){
					

				});*/
			}
		});
	});

	$('table').on('click', '.fcn_cocher', function(){
		var id_clic = $(this).attr('data-id_produit');
		$.ajax({
			url : 'ajax/cocher.php',
			data : {id : id_clic},
			dataType : 'json',
			success: function(donnees_retour){
				$('tr#id_' + id_clic + ' .fa-square-o').toggleClass('fa-square-o fa-check').toggleClass('fcn_cocher fcn_decocher');
				$('#nb_produits').text(donnees_retour.nb_selec);
				$('#total_produits').text(donnees_retour.nb_total);
			}
		});
	});


	$('table').on('click', '.fcn_decocher', function(){
		var id_clic = $(this).attr('data-id_produit');
		$.ajax({
			url : 'ajax/decocher.php',
			data : {id : id_clic},
			dataType : 'json',
			success: function(donnees_retour){
				$('tr#id_' + id_clic + ' .fa-check').toggleClass('fa-check fa-square-o').toggleClass('fcn_decocher fcn_cocher');
				$('#nb_produits').text(donnees_retour.nb_selec);
				$('#total_produits').text(donnees_retour.nb_total);
			}
		});
	});


	// Modification de la quantité lorsqu'on clique sur les boutons - / +
	// On récupère la valeur de l'attribut "bouton quantite" pour savoir s'il faut ajouter ou retirer un produit
	// Une fois la requête AJAX exécutée, on met à jour les attributs des boutons de la ligne modifiée avec la nouvelle quantité

	$("table").on('click', 'i[data-bouton-quantite]', function(){
		var id_clic = $(this).attr('data-id_produit');
		var nouvelle_quantite = parseInt($(this).attr('data-quantite'));
		if ($(this).attr('data-bouton-quantite')==1){
			nouvelle_quantite -- ;
		}
		else if ($(this).attr('data-bouton-quantite')==2){
			nouvelle_quantite ++;
		}
		$.ajax({
			url : 'ajax/modif_quantite.php',
			data : {
				id : id_clic,
				quantite : nouvelle_quantite
			},
			dataType : 'json',
			success: function(donnees_retour){
				$('#nb_produits').text(donnees_retour.nb_selec);
				$('#total_produits').text(donnees_retour.nb_total);
				$('tr#id_' + id_clic + ' .colonne_quantite span').text(nouvelle_quantite);
				$('tr#id_' + id_clic + ' .colonne_quantite i').attr('data-quantite',nouvelle_quantite);
			}
		});
	})


	//	Ajout d'une nouvelle ligne lorsqu'on valide le formulaire
	//  On récupère la valeur du slider pour la quantité
	// 	Une fois la requête AJAX exécutée, on affiche une nouvelle ligne retournée par le script en html
	// 	Puis on réinitialise les valeurs du formulaire
	$("#form_ajouter button[type=submit]").click(function(e){
		e.preventDefault();
		form_quantite = $( "#slider_quantite" ).slider( "value" );
		form_designation = $("#form_designation").val();
		$.ajax({
			url : 'ajax/ajouter.php',
			data : {
				designation : form_designation,
				quantite : form_quantite
			},
			dataType : 'json',
			success: function(donnees_retour){
				var id = donnees_retour.ligne['id_produit'];
				var designation = donnees_retour.ligne['designation'];
				var quantite = donnees_retour.ligne['quantite'];
				var selec = donnees_retour.ligne['selec'];
				afficher_ligne(id, designation, quantite, selec);
				$('#nb_produits').text(donnees_retour.nb_selec);
				$('#total_produits').text(donnees_retour.nb_total);
				$('#form_designation').val("");
				$('#slider_quantite').slider( "value", 0);
				$('#curseur_quantite').text('0');
				liste_autocompletion.push(designation);
			}
		});
	});


	// Si on annule un ajout, on réinitialise les contenus des champs du formulaire
	$("#form_ajouter").on('click','button[data-dismiss="modal"]',function(){
		$('#form_designation').val("");
		$('#slider_quantite').slider( "value", 0);
		$('#curseur_quantite').text('0');
	});

	// Si on veut modifier le nom d'une course :
	// On transforme le contenu de la cellule <td> en 1 input + 2 boutons
	// On récupère l'ancien nom pour le placer en attribut data-designation du bouton annuler
	// On récupère l'id du produit pour le placer en attribut du div pour pouvoir mettre à jour la ligne dans la BDD
	$('table').on('click', '.fcn_modifier', function(){
		var id_clic = $(this).attr('data-id_produit');
		var designation = $('tr#id_' + id_clic + ' .colonne_designation span').text();
		var champ_remplacement = '<div class="container-fluid form-inline" data-id_produit=' + id_clic + '><input type="text" minlength="3" class="form-control col-8" value="' + designation + '">';
		champ_remplacement += '<button class="btn btn-danger col-2 fcn_annul_modif" data-designation="' + designation + '">Annuler</button>';
		champ_remplacement += '<button class="btn btn-primary col-2 fcn_valid_modif">Modifier</button>';
		$('tr#id_' + id_clic + ' .colonne_designation').html(champ_remplacement);
	});


	// Si on annule la modification, on rétablit le contenu de la cellule td
	// On y rétablit la contenu initial du champ désignation que l'on récupère en attribut du bouton
	$('table').on('click', '.fcn_annul_modif', function(){
		var id_clic = $(this).parent().attr('data-id_produit');
		var designation = $(this).attr('data-designation');
		var champ_remplacement = '<span>' + designation + '</span>';
		champ_remplacement += "<i class='fa fa-pencil float-right fcn_modifier' data-id_produit=" + id_clic + " aria-hidden='true'></i>";
		$(this).closest(".colonne_designation").html(champ_remplacement);
	});


	// Si on valide la modification, on rétablit le contenu de la cellule td en y intégrant la modification
	// On effectue la modification dans la BDD à l'aide de l'ID récupéré dans le div parent
	$('table').on('click', '.fcn_valid_modif', function(){
		var id_clic = $(this).parent().attr('data-id_produit');
		var nouvelle_designation = $(this).siblings('input').val();
		$.ajax({
			url : 'ajax/modif_designation.php',
			data : {
				id : id_clic,
				designation : nouvelle_designation
			},
			dataType : 'text',
		});
		var champ_remplacement = '<span>' + nouvelle_designation + '</span>';
		champ_remplacement += "<i class='fa fa-pencil float-right fcn_modifier' data-id_produit=" + id_clic + " aria-hidden='true'></i>";
		$(this).closest(".colonne_designation").html(champ_remplacement);
	});


	// Modification de l'ordre du tableau
	$("table").on("click","i[data-tri]", function(){
		choix_tri = $(this).attr('data-tri');
		choix_ordre = $(this).hasClass('ord-asc') ? 'ASC' : 'DESC' ;
		afficher_tableau(choix_tri,choix_ordre);
		
	// On récupère la colonne triée en attribut de la balise table
	// On intervertit la classe ord-xx du bouton afin de pouvoir inverser l'ordre lors du prochain clic
		$("table").attr('data-tri',choix_tri);
		if (choix_ordre == 'ASC'){
			$(this).toggleClass('ord-asc ord-desc');
		}
		else {
			$(this).toggleClass('ord-desc ord-asc');
		}
	});


	$("#bouton_ajouter").on('click',function(){
		$("#form_designation").autocomplete({source:liste_autocompletion});
	});

		/* Lancement manuel de la modal bootstrap (sans attribut 'data-target dans le html')
		$("#bouton_ajouter").on('click',function(){
		$('#ModalAjoutProduit').modal('toggle');
	 	console.log('ok');
	  	$("#form_designation").autocomplete({source:liste_autocompletion});
		});*/
	
})

