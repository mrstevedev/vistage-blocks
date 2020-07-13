jQuery( document ).ready( function( $ ) {
	$( document ).on( 'click', '.g12sub__dropdown__toggle-button', function() {
		$( '.g12sub__dropdown__items' ).toggleClass( 'active' );
	} );
	$( document ).on( 'click', function( e ) {
		if ( e.target !== $( '.g12sub__dropdown__toggle-button' ).get( 0 ) ) {
			$( '.g12sub__dropdown__items' ).removeClass( 'active' );
		}
	} );
} );
