var domManipulation = angular.module('domManipulation',[]);

domManipulation.directive('domManipulation', function() {

	/* Cached variables */
	$signupForm = $('#signupLightbox form');
	$userAgent = navigator.userAgent.toLowerCase();

	/* Functions */
	// change buttons <--> icons depending on screen width
	function changeSocialButtonsDisplay() {
		if ($(window).width() <= 470 ) {
			$('.btn-twitter')
				.removeClass('btn-social')
				.addClass('btn-social-icon');
			$('#twitterLabel').css('visibility', 'hidden');


			$('.btn-facebook')
				.removeClass('btn-social')
				.addClass('btn-social-icon');
			$('#facebookLabel').css('visibility', 'hidden');
		}
		else {
			$('.btn-twitter')
				.removeClass('btn-social-icon')
				.addClass('btn-social');
			$('#twitterLabel').css('visibility', 'visible');


			$('.btn-facebook')
				.removeClass('btn-social-icon')
				.addClass('btn-social');
			$('#facebookLabel').css('visibility', 'visible');
		}
	}

	// action to do if Android user. Used for scalability.
	// TODO: NEEDS TESTING ON AN ANDROID DEVIDE
	function isAndroid() {
		$('#appOnGooglePlay').show();
	}


	return {
		restrict: 'E',
		link: function() {

			/* Calls on ready() */
			changeSocialButtonsDisplay();

			if (~$userAgent.indexOf("android"))
				isAndroid();



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
		}
	}
});