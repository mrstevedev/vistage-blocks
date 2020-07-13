jQuery( document ).ready( function( $ ) {
	$( document ).on( 'click', '.card-carousel__cards__arrow__left', function( e ) {
		e.preventDefault();
		moveLeft();
	} );
	$( document ).on( 'click', '.card-carousel__cards__arrow__right', function( e ) {
		e.preventDefault();
		moveRight();
	} );

	const viewerCount = 3;
	const max = $( '.card-carousel__desktop-only .card-carousel__cards__card' ).length - viewerCount;
	const maxMobile = $( '.card-carousel__mobile-only .card-carousel__cards__card' ).length - 1;
	let current = 0;
	let currentMobile = 0;

	function moveLeft() {
		current -= 1;
		currentMobile -= 1;
		update();
		updateMobile();
	}
	function moveRight() {
		current += 1;
		currentMobile += 1;
		update();
		updateMobile();
	}
	function update() {
		if ( current < 0 ) {
			current = 0;
		}
		if ( max < current ) {
			current = max;
		}
		$( '.card-carousel__desktop-only .card-carousel__cards__card' ).each( function( i, e ) {
			if ( i < current ) {
				$( e ).addClass( 'card-carousel__hidden' );
			} else {
				$( e ).removeClass( 'card-carousel__hidden' );
			}
		} );
	}
	function updateMobile() {
		if ( currentMobile < 0 ) {
			currentMobile = 0;
		}
		if ( maxMobile < currentMobile ) {
			currentMobile = maxMobile;
		}
		$( '.card-carousel__mobile-only .card-carousel__cards__card' ).each( function( i, e ) {
			if ( i < currentMobile ) {
				$( e ).addClass( 'card-carousel__hidden-mobile' );
			} else {
				$( e ).removeClass( 'card-carousel__hidden-mobile' );
			}
		} );
	}
} );
