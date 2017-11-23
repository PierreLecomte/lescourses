jQuery(function(){


// Au cas où on souhaite créer une page supplémentaire, on peut charger le même en-tête en Ajax :
// On peut insérer le header en jQuery, si on souhaite permettre à l'utilisateur de rédiger le contenu sans s'en préoccuper
$('body').prepend('<header id="header"></header>');
$('#header').load('ajax/header.html');

// Idem pour le footer :
$('body').append('<footer id="footer"></footer>');
$('#footer').load('ajax/footer.html');


// Vérification du nombre de caractères dans le formulaire au moment de l'envoi

function check_textarea(){
	if ($('textarea').val().length>=15){
		return true;
	}
	else{
// Si le nombre de caractères est insuffisant, les bordures deviennent rouge
$('textarea').css({"border":'solid 2px red'});
return false;
}
}

$('form').submit(function(){
	return check_textarea();
});


// Lorsque l'on tape quelque chose dans la zone de texte, la bordure rouge disparait

$("textarea").keyup(function(){
	$('textarea').css({"border":'none'});
	if (check_textarea()){
		if ($('#msgOK').length==0){
			$('form').append("<div id='msgOK'>Vous pouvez envoyer le formulaire</div>")
		}
	}
	else {
		$('#msgOK').remove();
	}
});







});