/* 
 * Function for Mega Main Menu.
 */
(function( $ ){ 
	jQuery(document).ready(function(){

		/* 
		 * Unbinded all previous JS actions with menu.
		 */
		jQuery( '#mega_main_menu, #mega_main_menu *' ).unbind();

		/* 
		 * INIT
		 */
		mmm_reversal_z_index();
		mmm_mobile_toggle_menu();
		mmm_mobile_double_tap_to_go();
		mmm_smooth_scroll_to_anchor();
		mmm_sticky_menu();
		mmm_fullwidth_menu();
		mmm_height_of_tabs_dropdown();
		mmm_keep_open();
		mmm_pushing_content();

		/* 
		 * EVENTS
		 */
		jQuery(window).on( 'resize orientationchange', function(){
			mmm_mobile_toggle_menu();
			mmm_smooth_scroll_to_anchor();
			mmm_sticky_menu();
			mmm_fullwidth_menu();
			mmm_height_of_tabs_dropdown();
			mmm_keep_open();
			mmm_pushing_content();
		});


		/* 
		 * Reversal z-index.
		 */
		function mmm_reversal_z_index () {
			var z_index = 5000;
			jQuery( '.mega_main_menu' ).each(function(index,element){
				z_index = z_index - 10;
				jQuery( element ).css({
					'z-index' : z_index
				});
			});
		}

		/* 
		 * Mobile toggle menu
		 */
		function mmm_mobile_toggle_menu () {
			jQuery( '.mobile_menu_active' ).removeClass( 'mobile_menu_active' );
			jQuery( '.mobile_toggle' ).on( 'click', function() {
				jQuery( this ).parent().toggleClass( 'mobile_menu_active' );
				jQuery( '#mega_main_menu .keep_open' ).removeClass('keep_open');
			});
		}

		/* 
		 * Mobile Double tap to go
		 */
		function mmm_mobile_double_tap_to_go () {
			if( /iphone|ipad|ipod|android|webos|blackberry|iemobile|opera mini/i.test( navigator.userAgent.toLowerCase() ) ) 
			{
				var clicked_item = false;
				jQuery('#mega_main_menu li:has(.mega_dropdown) > .item_link').on( 'click', function( index )
				{
					if ( clicked_item != this) {
						index.preventDefault();
						if ( jQuery( this ).parent().parent().parent().hasClass('keep_open') ) {

						} else {
							jQuery( '#mega_main_menu .keep_open' ).removeClass('keep_open');
						}
						jQuery( this ).parent().addClass('keep_open');
						clicked_item = this;
					}
				});
			}
		}

		/* 
		 * Sticky menu
		 */
		function mmm_sticky_menu () {
			;jQuery( '#mega_main_menu > .menu_holder' ).each(function(index,element){

				var stickyoffset = [];
				var menu_inner_width = [];
				var menu_inner = [];
				var style_attr = [];
				menu_inner[ index ] = jQuery( element ).find( '.menu_inner' );
				stickyoffset[ index ] = jQuery( element ).data( 'stickyoffset' ) * 1;

				if ( jQuery( element ).attr( 'data-sticky' ) == '1' && stickyoffset[ index ] == 0 ) {
					menu_inner_width[ index ] = menu_inner[ index ].parents( '.mega_main_menu' ).width();
					menu_inner[ index ].attr( 'style' , 'width:' + menu_inner_width[ index ] + 'px;' );
					jQuery( element ).addClass( 'sticky_container' );
				} else {
					;jQuery(window).on('scroll', function(){
						if ( jQuery( element ).attr( 'data-sticky' ) == '1' ) {
							scrollpath = jQuery(window).scrollTop();
							if ( scrollpath > stickyoffset[ index ] ) {
								menu_inner_width[ index ] = menu_inner[ index ].parents( '.mega_main_menu' ).width();
								jQuery( element ).find( '.menu_inner' ).attr( 'style' , 'width:' + menu_inner_width[ index ] + 'px;' );
								if ( !jQuery( element ).hasClass( 'sticky_container' ) ) {
									jQuery( element ).addClass( 'sticky_container' );
								}
							} else {
								mmm_fullwidth_menu();
								jQuery( element ).removeClass( 'sticky_container' );
								style_attr[ index ] = jQuery( menu_inner[ index ] ).attr( 'style' );
								if ( typeof style_attr[ index ] !== 'undefined' && style_attr[ index ] !== false ) {
									menu_inner[ index ].removeAttr( 'style' );
								}
							}
						} else {
							jQuery( element ).removeClass( 'sticky_container' );
						}
					});
				}
			});
		}

		/* 
		 * Fullwidth menu container
		 */
		function mmm_fullwidth_menu () {
			body_width = jQuery( 'body' ).width();
			jQuery( '.mega_main_menu.direction-horizontal.fullwidth-enable' ).each( function( index, element ) {
				offset_left = jQuery( element ).offset().left;
				if ( jQuery( element ).hasClass( 'coercive_styles-enable' ) ) {
					rules_priority = ' !important';
				} else {
					rules_priority = '';
				}
				jQuery( element ).find( '.mmm_fullwidth_container' ).attr( 'style' , 'width:' + body_width + 'px' + rules_priority + ';left: -' + offset_left + 'px;right:auto' + rules_priority + ';' );
			});
		}

		/*
		 * Height of .tabs_dropdown
		 */
		function mmm_height_of_tabs_dropdown () {
			// For Hover
			jQuery('#mega_main_menu.dropdowns_trigger-hover .tabs_dropdown > .mega_dropdown > li').on( 'hover', function(){
				jQuery( this ).parent().css({
					"min-height": jQuery( this ).find(' > .mega_dropdown').outerHeight( true )
				});
			});
			jQuery('#mega_main_menu.dropdowns_trigger-hover .tabs_dropdown > .mega_dropdown > li').on( 'mouseleave', function(){
				jQuery( this ).parent().css({
					"min-height": '0px'
				});
			});
			// For Click
			jQuery('#mega_main_menu.dropdowns_trigger-click .tabs_dropdown > .mega_dropdown > li').on( 'click', function(){
				jQuery( this ).parent().parent().find( '.mega_dropdown' ).css({
					"min-height": '0px'
				});
				jQuery( this ).parent().css({
					"min-height": jQuery( this ).find(' > .mega_dropdown').outerHeight( true )
				});
			});
		}

		/* 
		 * Pushing the content when dropdowns visible
		 */
		function mmm_pushing_content () {
			jQuery( '.mega_main_menu.direction-horizontal.pushing_content-enable' ).each( function( index, element ) {
				// rules_priority
				if ( jQuery( element ).hasClass( 'coercive_styles-enable' ) ) {
					rules_priority = ' !important';
				} else {
					rules_priority = '';
				}
				menu_holder_height = jQuery( element ).find( '.menu_holder' ).outerHeight( true );
				click_item = false;
				if ( jQuery( element ).hasClass( 'dropdowns_trigger-click' ) ) {
					// dropdowns_trigger
					dropdowns_trigger = 'click';
					// calculations
					jQuery( 'body' ).on( dropdowns_trigger, function ( body_el ) {
						if ( jQuery( '.mega_main_menu .nav_logo.mobile_menu_active' ).length ) {
							return;
						}
						menu_item_class = jQuery( body_el.target ).closest( '.menu-item' ).attr( 'class' );
						if ( typeof jQuery( body_el.target ).parents( '.menu-item' ).attr( 'class' ) != 'undefined' ) {
							jQuery( element ).css({ height: menu_holder_height + jQuery( this ).find( '.mega_main_menu_ul > li.keep_open > .mega_dropdown' ).outerHeight( true ) + rules_priority });
							if ( click_item == menu_item_class ) {
								jQuery( element ).css({ height: menu_holder_height });
								click_item = false;
							} else {
								click_item = jQuery( body_el.target ).closest( '.menu-item' ).attr( 'class' );
							}
						} else {
							jQuery( element ).css({ height: menu_holder_height });
							click_item = false;
						}
					});
				} else {
					// dropdowns_trigger
					dropdowns_trigger = 'hover mouseleave';
					// calculations
					jQuery( element ).find( 'li' ).on( dropdowns_trigger, function ( body_el ) {
						if ( jQuery( '.mega_main_menu .nav_logo.mobile_menu_active' ).length ) {
							return;
						}
						jQuery( element ).css({ height: menu_holder_height + jQuery( element ).find( '.mega_main_menu_ul > li:hover > .mega_dropdown' ).outerHeight( true ) + rules_priority });
					});
				}
			});
		}

		/* 
		 * Smooth scroll to anchor link
		 */
		function mmm_smooth_scroll_to_anchor () {
			jQuery('#mega_main_menu a[href*=#]:not([href=#])').click(function() {
				if (location.pathname.replace(/^\//,'') == this.pathname.replace(/^\//,'') && location.hostname == this.hostname) {
					var target = jQuery(this.hash);
					target = target.length ? target : jQuery('[name=' + this.hash.slice(1) +'], [id=' + this.hash.slice(1) +']');
					if (target.length) {
						jQuery( '#mega_main_menu .current-menu-item' ).removeClass( 'current-menu-item' );
						jQuery( this ).parent().addClass( 'current-menu-item' );
						jQuery('html,body').animate({
							scrollTop: target.offset().top - 90
						}, 600);
						return false;
					}
				}
			});
		};

		/* 
		 * Keep dropdown open if some inner element has a :focus.
		 */
		function mmm_keep_open () {
			jQuery('#mega_main_menu .menu-item *').on( 'focus', function( index ){
				jQuery( this ).parents( '.menu-item, .post_item' ).addClass( 'keep_open' );
			})
/*
			jQuery('#mega_main_menu .menu-item *').on( 'hover', function( index ){
				jQuery( this ).parents( '.menu-item, .post_item' ).removeClass( 'keep_open' );
			})
*/
			jQuery('#mega_main_menu .menu-item *').on( 'blur', function( index ){
				jQuery( this ).parents( '.menu-item, .post_item' ).removeClass( 'keep_open' );
			})

			click_item_2 = false;
			jQuery( 'body' ).on( 'click', function ( body_el ) {
				menu_item_class = jQuery( body_el.target ).closest( '.menu-item' ).attr( 'class' );
				if ( ( click_item_2 != menu_item_class ) && ( typeof jQuery( body_el.target ).parents( '#mega_main_menu.dropdowns_trigger-click .menu-item:has(.mega_dropdown) > .item_link' ).attr( 'class' ) != 'undefined' ) ) {
					body_el.preventDefault();
					jQuery( body_el.target ).parents( '.menu-item' ).addClass( 'keep_open' );
					click_item_2 = jQuery( body_el.target ).closest( '.menu-item' ).attr( 'class' );
				} else if ( ( click_item_2 == menu_item_class ) ) {
					jQuery( body_el.target ).closest( '.menu-item' ).removeClass( 'keep_open' );
					click_item_2 = false;
				} else {
					jQuery( '.menu-item' ).removeClass( 'keep_open' );
					click_item_2 = false;
				}
			});
		}


	});
})(jQuery);