( ( $ ) => {
	$( document ).on( 'click', '.g16__questions__item__question h6', ( e ) => {
		$( e.target ).parents( '.g16__questions__item' ).toggleClass( 'open' );
	} );
} )( jQuery );
