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
				$('#nb_produits').text(donnees_retour['nb_selec']);
				$('#total_produits').text(donnees_retour['nb_total']);
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
				$('#nb_produits').text(donnees_retour['nb_selec']);
				$('#total_produits').text(donnees_retour['nb_total']);
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
				$('#nb_produits').text(donnees_retour['nb_selec']);
				$('#total_produits').text(donnees_retour['nb_total']);
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
				$('#nb_produits').text(donnees_retour['nb_selec']);
				$('#total_produits').text(donnees_retour['nb_total']);
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
				$('table').append(donnees_retour['ligne']);
				$('#nb_produits').text(donnees_retour['nb_selec']);
				$('#total_produits').text(donnees_retour['nb_total']);
				$('#form_designation').val("");
				$('#slider_quantite').slider( "value", 0);
				$('#curseur_quantite').text('0');
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
			success: function(){
				$('tr#id_' + id_clic + ' .fa-square-o').toggleClass('fa-square-o fa-check').toggleClass('fcn_cocher fcn_decocher');
			}
		});
		var champ_remplacement = '<span>' + nouvelle_designation + '</span>';
		champ_remplacement += "<i class='fa fa-pencil float-right fcn_modifier' data-id_produit=" + id_clic + " aria-hidden='true'></i>";
		$(this).closest(".colonne_designation").html(champ_remplacement);
	});


	// Modification de l'ordre du tableau
	$("table").on("click","i[tri]", function(){
		choix_tri = $(this).attr('tri');
		$.ajax({
			url : 'ajax/trier.php',
			data : {
				tri : choix_tri,
			},
			dataType : 'json',
			success: function(donnees_retour){
				//console.log(donnees_retour['tableau']);
				$('table tbody').html("");
				$.each(donnees_retour['tableau'], function(index, valeur){
					console.log(valeur);
					$('table tbody').append(valeur);

				});
			}
		});
	});

})

