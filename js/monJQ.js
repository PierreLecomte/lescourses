jQuery(function($){

	// Au cas où on souhaite créer une page supplémentaire, on peut charger le même en-tête en Ajax :
	// On peut insérer le header en jQuery, si on souhaite permettre à l'utilisateur de rédiger le contenu sans s'en préoccuper
	$('body').prepend('<header id="header"></header>');
	$('#header').load('ajax/header.html');

	// Idem pour le footer :

	$('body').append('<footer id="footer"></footer>');
	$('#footer').load('ajax/footer.html');


	$('.supprimer').on('click',function(){
		var mon_id = jQuery(this).attr('data-idproduit');
		$.ajax({
			url: "http://localhost/LesCourses/a_supprimer.php",
			data : {id: mon_id},
			dataType : 'script',
			success: function(){
				jQuery('tr#id_'+mon_id).remove();
			}
		});

	});
})
