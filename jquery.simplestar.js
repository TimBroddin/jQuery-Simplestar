/*
	jQuery.simplestar.js
	1.0
		First Release

	
	Copyright 2010 Tim Broddin - tim@brodd.in - http://tim.brodd.in

*/
(function($){	
	var methods = {
		init: function(options) {
			var settings = {
				width: 90,
				stars: 10,
				submit: function(id, rating, obj) { 
					alert('You voted ' + rating + ' on ' + id);
				}
			};
			if (options) { 
				$.extend(true, settings, options);
			}
			// store this for a tiny tiny bit quicker access
			var ctx = $(this);
			
			if(!ctx.attr('data-starred')) {
				ctx.attr('data-starred', 1);
				// the width of a star
				var starWidth = settings.width / settings.stars;  		
				// only bind mouseout and click when we hover and only once
				var mouseOutBound = false;
				var clickBound = false;
				// add label (8/10) after ourself, todo: make self containing
				var starLabel = $('<div class="star_label"></div>');
				ctx.after(starLabel);
				
				// store rating and set label
				if(ctx.attr('data-rating')) {
					var currentRating = ctx.attr('data-rating');
					starLabel.text(currentRating + '/' + settings.stars);
				} else {
					var currentRating = 0;
				}
				
				// set initial background position
				ctx.css({backgroundPosition: (settings.width*-1)+currentRating*starWidth + 'px 0px'});
				// add class
				ctx.addClass('simplestar');
				ctx.bind('mousemove', function(e) { 
					var elementOffset = ctx.offset().left;
					var position = e.pageX - elementOffset;
					var rating = Math.round(position/starWidth);
					starLabel.text(rating + '/' + settings.stars);
					ctx.attr('data-rating', rating);
					ctx.css({backgroundPosition: (settings.width*-1)+rating*starWidth + 'px 0px' });
					
					// bind secondary events in case we need them
					if(!mouseOutBound) {
						ctx.bind('mouseout', function(e) { 
							ctx.css({backgroundPosition: (settings.width*-1)+currentRating*starWidth + 'px 0px' });
							starLabel.text(currentRating + '/' + settings.stars);
						});
						mouseOutBound = true;				
					}
					if(!clickBound) {
						ctx.bind('click', function(e) {
							currentRating = ctx.attr('data-rating');
							starLabel.text(currentRating + '/' + settings.stars);
							var id = ctx.attr('data-id');
							settings.submit(id, currentRating, ctx);
						});
						clickBound = true;		
					}
				});
			}

		}

	};

	$.fn.simpleStar = function(method) {
		argv = arguments;
		return this.each(function() {
			if (methods[method] ) {
      			return methods[ method ].apply( this, Array.prototype.slice.call(argv, 1));
    		} else if ( typeof method === 'object' || ! method ) {
      			options = [method];
      			
      			return methods.init.apply(this, options);
    		}	
		}); 
	};

})( jQuery );