jQuery( document ).ready( function( $ ) {
	if ( g32Exists() ) {
		getPosts();
	} else {
		setTimeout( () => g32Exists() ? getPosts() : null, 1000 );
	}
	function g32Exists() {
		return $( '.g32__container' ).length && wp && wp.api && wp.api.collections && wp.api.collections.Posts;
	}
	function getPosts( data = {} ) {
		const posts = [],
			categoryNames = $( '.g32__filters__data' ).data( 'categories' ),
			postSource = $( '.g32__posts__data' ).data( 'post_source' );

		data.per_page = 9;
		data._embed = true;
		data.withCredentials = false;

		$( '.g32__container' ).css( 'cursor', 'progress' );

		$.ajax( {
			url: `${ postSource }wp/v2/posts/`,
			method: 'GET',
			data: data,
		} ).error( () => {
		} ).done( response => {
			if ( ! response.length ) {
				posts.push( {
					id: -1,
					title: 'no posts found',
					category: '',
					url: '',
					image: '',
				} );
			}
			response.map( post => {
				const sizes = ( post.featured_media && post._embedded[ 'wp:featuredmedia' ] && post._embedded[ 'wp:featuredmedia' ].length && post._embedded[ 'wp:featuredmedia' ][ 0 ].media_details ) ? post._embedded[ 'wp:featuredmedia' ][ 0 ].media_details.sizes : {};
				const sourceUrl = ( post.featured_media && post._embedded[ 'wp:featuredmedia' ] && post._embedded[ 'wp:featuredmedia' ].length ) ? post._embedded[ 'wp:featuredmedia' ][ 0 ].source_url : '';
				const image = undefined === sizes ? '' : false || ( sizes.g32_size ? sizes.g32_size.source_url : false ) || ( sizes.full ? sizes.full.source_url : '' );
				posts.push( {
					id: post.id,
					title: post.title.rendered,
					category: post.categories.length ? categoryNames[ post.categories[ 0 ] ] || '' : '',
					url: post.link,
					image: image || sourceUrl,
				} );
			} );

			$( '.g32__posts__post' ).map( ( index, postDiv ) => {
				const $postDiv = $( postDiv ),
					postData = posts[ index ];
				if ( undefined !== postData ) {
					$postDiv.find( 'figure img' ).attr( 'src', postData.image );
					$postDiv.find( '.g32__posts__post__label__text' ).html( postData.category );
					$postDiv.find( '.g32__posts__post__title' ).html( postData.title );
					$postDiv.find( '.g32__posts__post__title' ).attr( 'href', postData.url );
				} else {
					$postDiv.hide();
				}
			} );
			$( '.g32__container' ).css( 'cursor', '' );
		} );
	}

	$( '.g32__dropdown-filter a' ).on( 'click', e => {
		const id = $( e.target ).data( 'id' ),
			type = $( e.target ).parents( '.g32__dropdown-filter' ).data( 'type' ),
			data = {};
		e.preventDefault();
		data[ type ] = id;
		getPosts( data );

		$( '.g32__dropdown-filter__items button' ).removeClass( 'active' );
		$( '.g32__dropdown-filter__items a:first-child button' ).addClass( 'active' );
		$( e.target ).parents( '.g32__dropdown-filter__items' ).find( 'button' ).removeClass( 'active' );
		$( e.target ).addClass( 'active' );
	} );

	$( document ).off( 'click.g32toggle' ).on( 'click.g32toggle', '.g32__dropdown-filter__toggle-button', function() {
		$( this ).next().toggleClass( 'active' );
	} );
	$( document ).off( 'click.g32close' ).on( 'click.g32close', function( e ) {
		if ( ! $( e.target ).hasClass( 'g32__dropdown-filter__toggle-button' ) ) {
			$( '.g32__dropdown-filter__items' )
				.fadeOut( 'fast', () => $( '.g32__dropdown-filter__items' )
					.removeClass( 'active' ).css( 'display', 'block' ) );
		}
	} );
} );
