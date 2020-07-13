<?php

function hp2_jetpack_dont_load_responsive_videos( $tools ) {
	$index = array_search( 'theme-tools/responsive-videos.php', $tools );
	if ( false !== $index ) {
		unset( $tools[ $index ] );
	}
	return $tools;
}
add_filter( 'jetpack_tools_to_include', 'hp2_jetpack_dont_load_responsive_videos' );

add_theme_support( 'responsive-embeds' );
add_theme_support( 'align-wide' );

add_action( 'wp_ajax_nopriv_hp2_get_gravity_form', 'hp2_get_gravity_form' );
add_action( 'wp_ajax_hp2_get_gravity_form', 'hp2_get_gravity_form' );

function hp2_get_gravity_form() {
	$form_id = isset( $_GET['form_id'] ) ? absint( $_GET['form_id'] ) : 0;
	echo do_shortcode( "[gravityform id=$form_id ajax=true]" );
	die();
}
