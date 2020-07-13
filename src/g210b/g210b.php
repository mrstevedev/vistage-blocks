<?php

add_theme_support( 'align-wide' );

add_action( 'wp_ajax_nopriv_g210b_get_gravity_form', 'g210b_get_gravity_form' );
add_action( 'wp_ajax_g210b_get_gravity_form', 'g210b_get_gravity_form' );

function g210b_get_gravity_form() {
	$form_id = isset( $_GET['form_id'] ) ? absint( $_GET['form_id'] ) : 0;
	echo do_shortcode( "[gravityform id=$form_id ajax=true description=false title=false]" );
	die();
}
