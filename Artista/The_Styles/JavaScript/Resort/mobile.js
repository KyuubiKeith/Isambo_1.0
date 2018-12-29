$(document).ready(function()
{
	// NAVIGATION
	$('header ul li a').click(function(e)
	{
		// Remove active menus
		$('header ul li a').removeClass('active');

		// Add active current menu and get link
		var link = $(this).addClass('active').data('link');

		// Change logo
		$('header .logo .logoRoll').css({ opacity: 0 }).parent().find('[data-link='+link+']').css({ opacity: 1 });

		// Scroll
		$('html, body').animate({ scrollTop: $('section.'+link).position().top-28 }, 500);
	});

	var w 	= $(window);
	var ww 	= w.width();
	var wh 	= w.height();

	var positionNav;
	var collapsed = false;

	w.resize(function(){ 
		wh 	= w.height();
		ww = w.width();

		positionNav = $('.ecole .presentation').offset().top - 76;
	});

	w.scroll(function(e) {
		var scrollValue = w.scrollTop();
		if( scrollValue > positionNav && !collapsed ) {
			collapsed = true;
			$('header .logo').addClass('collapsed');
		} else if( scrollValue < positionNav && collapsed ){
			collapsed = false;
			$('header .logo').removeClass('collapsed');
		}
	});

	w.resize();
});