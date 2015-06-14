$(function() {
	/* Cached variables */
	$signupForm = $('#signupLightbox form');
	$userAgent = navigator.userAgent.toLowerCase();


	/* Functions */

	// change buttons <--> icons depending on screen width
	function changeSocialButtonsDisplay() {
		if ($(window).width() <= 470 ) {
			$('.ui.button.twitter')
				.addClass('icon');
			$('#twitterLabel').hide();
			// $('#twitterLabel').css('visibility', 'hidden');


			$('.ui.button.facebook')
				.addClass('icon');
			$('#facebookLabel').hide();
			// $('#facebookLabel').css('visibility', 'hidden');
		}
		else {
			$('.ui.button.twitter')
				.removeClass('icon')
			$('#twitterLabel').show();
			// $('#twitterLabel').css('visibility', 'visible');


			$('.ui.button.facebook')
				.removeClass('icon')
			$('#facebookLabel').show();
			// $('#facebookLabel').css('visibility', 'visible');
		}
	}

	// action to do if Android user. Used for scalability.
	// TODO: NEEDS TESTING ON AN ANDROID DEVIDE
	function isAndroid() {
		$('#appOnGooglePlay').show();
	}



	/* Calls on ready() */
	changeSocialButtonsDisplay();

	if (~$userAgent.indexOf("android"))
		isAndroid();

	if ($heightDifference > 0)
		$('#bottom_fill').height($heightDifference);

	/* Events */

	/* Buttons to icons, vice versa */
	$(window).resize(function() {
		changeSocialButtonsDisplay();
	});


	/* Lightbox Signup */
	$('#signup_button').click(function() {
		$('#black_cover, #signupLightbox').fadeIn(400);
	});

	$('#black_cover, #remove_lightbox').click(function() {
	    $('#black_cover, #signupLightbox').fadeOut(500);
	});

	// no numbers in first name and last name inputs
	$('#signupLightbox input[name=fname], #signupLightbox input[name=lname]').keypress(function(key) {
		if (key.charCode >= 48 && key.charCode <= 57)
			return false;
	});

});