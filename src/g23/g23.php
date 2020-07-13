<?php

add_action( 'wp_ajax_nopriv_g23_get_gravity_form', 'g23_get_gravity_form' );
add_action( 'wp_ajax_g23_get_gravity_form', 'g23_get_gravity_form' );

function g23_get_gravity_form() {
	$form_id = isset( $_GET['form_id'] ) ? absint( $_GET['form_id'] ) : 0;
	echo do_shortcode( "[gravityform id=$form_id ajax=true description=false title=false]" );
	die();
}
