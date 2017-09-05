document.addEventListener("DOMContentLoaded", function (event) {
	mobileNav();
	btnShowClass();
});
window.onload = function() {
	
};
//----------Mobile menu function----------
function mobileNav() {
		var menu 			= document.querySelector('.header__menu'),
			mobilemenu 		= document.querySelector('.mobile-nav__menu'),
			JSinit 			= document.querySelector('.js_mobile-nav'),
			burger 			= document.querySelectorAll('.burger'),
			activeClass 	= 'open';
		function toggle() {
			JSinit.classList.toggle(activeClass);
		}
		if (mobilemenu.innerHTML == 0)
			mobilemenu.innerHTML = menu.innerHTML;
	
		/* for (var i = 0; i < burger.length; i++) {
				burger[i].addEventListener('click', toggle);
			} */
		for (var i = 0; i < burger.length; i++) {
			burger[i].onclick = toggle;
			};
}
//----------------------------------------

//----------------Buttons-----------------
//--------Buttons show Class---------
function btnShowClass() {
	var btn 		= document.querySelectorAll('.button'),
		btnHead		= document.createElement('p');
	for (var i = 0; i < btn.length; i++) {
		btn[i].onclick = function() {
			
			//Show ClassList
			btnHead.classList.add('item__heading');
			btnHead.innerHTML = (this.classList.value);
			this.parentNode.insertBefore(btnHead, this);
			
			//Select button classes  
			window.getSelection().removeAllRanges();  
			var range = document.createRange();  
			range.selectNode(btnHead);  
			window.getSelection().addRange(range);  			  
			
			//link cancelattion
			return false;
			
		}
	};

}
//-----------------------------------
//----------------------------------------