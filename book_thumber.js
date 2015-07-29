Drupal.behaviors.book_thumber = {
  attach: function (context, settings) {
		jQuery('.book-thumber-books, .book-thumber-pages', context).find('button').click(Drupal.behaviors.book_thumber.toggle);
  },
	toggle: function(){
		var li =jQuery(this).closest('li');
		var kids=li.children('.children');

		if (li.hasClass('expanded')) {
			// hide previously show node
			li.removeClass('expanded');
			kids.slideUp('fast');
			jQuery(this).text(Drupal.settings.book_thumber.charHasChildrenClosed); // plus
		}
		else {
			li.addClass('expanded');
			jQuery(this).text(Drupal.settings.book_thumber.charHasChildrenOpen);
			// show children
			if (kids.length) {
				kids.slideDown('fast');
				return;
			}

			// extract nid

			jQuery(this).text(Drupal.settings.book_thumber.charNoChildren).addClass('disabled')[0].disabled = true;

			var btn =jQuery(this);
			// look up children
			kids = jQuery('<div></div>').hide().addClass('children').appendTo(li)
        .load('/book_thumber_ajax/' + li[0].className.replace(/^.*\bnid-(\d+)\b.*$/,'$1'),
            false,
            function(t){
              if (t) {
                btn.text(Drupal.settings.book_thumber.charHasChildrenOpen).removeClass('disabled')[0].disabled = false;
              }
              jQuery(this).slideDown('fast');
              Drupal.attachBehaviors(this);
              //.find('button').click(Drupal.behaviors.book_thumber.toggle);
            }
        );
		}
	},

};

