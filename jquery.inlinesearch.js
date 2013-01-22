/*
License - you must retain this notice in ALL redistributions

Copyright 2013 Giuseppe Burtini      https://github.com/gburtini

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this library except in compliance with the License.
You may obtain a copy of the License at

http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.
   
*/

(function($) {
	$.expr[':'].isicontains = function(elem, i, match, array) {
		return (elem.textContent || elem.innerText || "").toLowerCase().indexOf((match[3] || "").toLowerCase()) >= 0;
	};

	var methods = {
		create: function(options) {
			var defaults = {
				icon: false, // $("<div>").attr( {"class":"icon-search","type":"text"} ),
				form: $("<form>").attr( {"class":"inline-filter","action":"#"} ),
				input: $("<input>").attr( {"class":"inline-search","type":"text"} ),
				header: false,	// optional location to embed the form stuff.
				list: false,	// non-optional, the list to be filtered
				searchPath: ['tr>td'], // an array of paths (from the list) to use as "potential matches"
				matchElement: 'tr'	
			}, settings = $.extend(defaults, options);
	
			if(!list)	// if not specified, takes the selector message.
				list = $(this);

			var $searchForm = $(settings.form).append(settings.input);
			if(settings.icon)
				$searchForm.append(settings.icon);

			if(settings.header)	// embed the search form
				$searchForm.prependTo(settings.header);
			else
				$searchForm.before(settings.list);

			settings.list.data("inline-search", {form: $searchForm});
			settings.input.bind( "change.inline-search", function() {
				var string = $(this).val();
				if(string) {
					var $results = [];
					for (var i in settings.searchPath) {
						// known issue here, .parent means it only supports the immediate parent as the matchElement... should use
						// parents and then filter out the closest one.

						settings.list.find( settings.searchPath[i] + ":not(:isicontains(" + string +"))").parent( settings.matchElement ).slideUp();
						$results.push(
							settings.list.find( settings.searchPath[i] + ":isicontains(" + string +")")
						);
					}

					for( var i in $results ) {
						$results[i].parent( settings.matchElement ).slideDown();	
					}
				} else {
					// nothing searched, undo all hidden elements
					settings.list.find(settings.matchElement).slideDown();
				}
			} ).bind("keyup.inline-search", function() { 
				// known issue here, this fires too often and makes it slow. cancel previous fires or only fire after n ms without a keypress.
				$(this).change(); 
			});
		},

		destroy: function() {
			$(this).data("inline-search")['form'].remove();
		}
	}
	
	$.fn.inlineSearch = function(method) {
		if ( methods[method] ) {
      			return methods[ method ].apply( this, Array.prototype.slice.call( arguments, 1 ));
	    	} else if ( typeof method === 'object' || ! method ) {
      			return methods.create.apply( this, arguments );
	    	} else {
      			$.error( 'Method ' +  method + ' does not exist on jQuery.inlineSearch' );
	    	}   
	};
})(jQuery);
