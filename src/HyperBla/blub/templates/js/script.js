$(document).ready(function(){
	$('#container form').submit(function(event){
		var form = $(this);
		event.preventDefault();
		if(form.attr() == 'login') {
			// do stuff
		}
		
		$.post(form.attr('action'), form.serialize(),
				function(data){
			$('form').blur();
					if(form.attr('id') == 'login') {
						console.log(data.login == 'true');
						if(data.login == 'true') {
							console.log('entered if');
							form.find('input').each( function(){
								$(this).attr('disabled', true);
							});
							$('#mess').find('input').each(function() {
								$(this).removeAttr('disabled');
							});
							var width = $('#main').css('width');
							console.log(width);
							$('#main').animate({marginLeft : '-='+ width});
							$('#main2').animate({marginLeft : '-='+ width});
							
						}
					}
					else if(form.attr('id') == 'mess') {
						
					}
					form[0].reset();
				}, 'json');
	});
});

function displayStuffForLogin() {
	
}

function MessagesForLogin(data) {
	
}