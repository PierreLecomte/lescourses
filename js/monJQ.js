jQuery(function($) {


// Instanciation du slider #slider et de son curseur #curseur_quantite
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
	$('.fcn_supprimer').on('click', function(){
		var id_clic = $(this).attr('data-id_produit');
		$.ajax({
			url : 'ajax/supprimer.php',
			//data : permet d'envoyer sous forme d'objet des données en GET à la page php
			data : {id : id_clic},
			dataType : 'text',
			success: function($nb){
				$('tr#id_' + id_clic).remove();
				$('#nb_produits').text($nb);
			}
		});
	});

	$('td').on('click', '.fcn_cocher', function(){
		var id_clic = $(this).attr('data-id_produit');
		$.ajax({
			url : 'ajax/cocher.php',
			data : {id : id_clic},
			dataType : 'text',
			success: function($nb){
				$('tr#id_' + id_clic + ' .fa-square-o').toggleClass('fa-square-o fa-check').toggleClass('fcn_cocher fcn_decocher');
				$('#nb_produits').text($nb);
			}
		});
	});


	$('td').on('click', '.fcn_decocher', function(){
		var id_clic = $(this).attr('data-id_produit');
		$.ajax({
			url : 'ajax/decocher.php',
			data : {id : id_clic},
			dataType : 'text',
			success: function($nb){
				$('tr#id_' + id_clic + ' .fa-check').toggleClass('fa-check fa-square-o').toggleClass('fcn_decocher fcn_cocher');
				$('#nb_produits').text($nb);
			}
		});
	});


	//	Ajout d'une nouvelle ligne lorsqu'on valide le formulaire
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
			dataType : 'html',
			success: function($ligne){
				$('table').append($ligne);
				$('#slider_quantite').slider( "value",0 );
				$('#form_designation').val("");
			}
		});
	});




})

