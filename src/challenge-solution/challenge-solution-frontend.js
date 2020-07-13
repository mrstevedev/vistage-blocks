( ( $ ) => {
	$( document ).on( 'click', '.challenge-solution__questions__item__question h6', ( e ) => {
		$( e.target ).parents( '.challenge-solution__questions__item' ).toggleClass( 'open' );
	} );
} )( jQuery );
