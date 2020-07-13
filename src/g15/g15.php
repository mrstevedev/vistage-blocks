<?php

function jetpack_dont_load_responsive_videos( $tools ) {
	$index = array_search( 'theme-tools/responsive-videos.php', $tools );
	if ( false !== $index ) {
		unset( $tools[ $index ] );
	}
	return $tools;
}
add_filter( 'jetpack_tools_to_include', 'jetpack_dont_load_responsive_videos' );

add_theme_support( 'responsive-embeds' );
