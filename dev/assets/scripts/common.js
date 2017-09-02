jQuery(document).ready(function ($) {
//--------------Buttons----------------
//--------Buttons hide heading---------
$(document).on('click', '.button', function () {
	
	$('.item__heading').slideUp();
	$(this).prev('.item__heading').slideToggle();
	return false;
});
//-------------------------------------

//-------------------------------------


});
jQuery(window).on('load', function () {
	mobileNav.init('.header__menu');
});

var mobileNav = {
	className: '.js_mobile-nav',
	mobileMenuClassName: '.mobile-nav__menu',
	activeClass: 'open',
	init: function (mainMenuClassName) {
		if (!$(this.mobileMenuClassName).children().length) {
			$(mainMenuClassName).children().clone().prependTo(this.mobileMenuClassName);
		}

		$(document).on('click', '.burger', function () {
			mobileNav.toggle();
		});
	},
	open: function () {
		$(this.className).addClass(this.activeClass);
	},
	close: function () {
		$(this.className).removeClass(this.activeClass);
	},
	toggle: function () {
		$(this.className).hasClass(this.activeClass) ? this.close() : this.open();
	}
};
