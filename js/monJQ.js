jQuery(function($){

	// Au cas où on souhaite créer une page supplémentaire, on peut charger le même en-tête en Ajax :
	// On peut insérer le header en jQuery, si on souhaite permettre à l'utilisateur de rédiger le contenu sans s'en préoccuper
	$('body').prepend('<header id="header"></header>');
	$('#header').load('ajax/header.html');

	// Idem pour le footer :

	$('body').append('<footer id="footer"></footer>');
	$('#footer').load('ajax/footer.html');


	$('.fa-trash-o').click(function(){
		var id_clic = $(this).attr('data-id_produit');
		$.ajax({
			url : 'ajax/supprimer.php',
			//data : permet d'envoyer sous forme d'objet des données en GET à la page php
			data : {id : id_clic},
			dataType : 'script'
			/*success: function(){
				jQuery('#id_' + id_clic).remove();*/
			});

	});


	$('.fa-square-o').on('click',function(){
		var id_clic = $(this).attr('data-id_produit');
		console.log(id_clic);
		$.ajax({
			url : 'ajax/cocher.php',
			data : {id : id_clic},
			dataType : 'script',
			success: function(){
				$('#id_' + id_clic + ' .fa-square-o').removeClass('fa-square-o').addClass('fa-check');
				}
			});

	});


	$('.fa-check').on('click',function(){
		var id_clic = $(this).attr('data-id_produit');
		console.log(id_clic);
		$.ajax({
			url : 'ajax/decocher.php',
			data : {id : id_clic},
			dataType : 'script',
			success: function(){
				$('#id_' + id_clic + ' .fa-check').removeClass('fa-check').addClass('fa-square-o');
				}
			});

	});


})


