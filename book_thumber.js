

var bookThumber = {
	init: function(){
		jQuery('.book-thumber-books button').click(bookThumber.toggle);
	},
	toggle: function(){
		var li =jQuery(this).closest('li');
		var kids=li.children('.children');

		if (li.hasClass('expanded')) {
			// hide previously show node
			li.removeClass('expanded');
			kids.slideUp('fast');
			jQuery(this).text('+');
		}
		else {
			li.addClass('expanded');
			jQuery(this).text('-');
			// show children
			if (kids.length) {
				kids.slideDown('fast');
				return;
			}

			// extract nid

			jQuery(this).addClass('disabled')[0].disabled = true;

			var btn =jQuery(this);
			// look up children
			kids = jQuery('<div></div>').hide().addClass('children').appendTo(li)
				.load('/book_thumber_ajax/' + li[0].className.replace(/^.*\bnid-(\d+)\b.*$/,'$1'),
					false,
					function(t){ 
						if (t) btn.removeClass('disabled')[0].disabled = false;
						jQuery(this).slideDown('fast').find('button').click(bookThumber.toggle);			
						}
					);
		}
	},

};

jQuery(bookThumber.init);
