<?php
function g32_enqueue_scripts() {
	wp_enqueue_script( 'wp-api' );
	wp_enqueue_script('g32-frontend', plugin_dir_url( __FILE__ ).'g32-frontend.js', array('jquery'), null, true);
}
add_action( 'wp_enqueue_scripts', 'g32_enqueue_scripts' );

function g32_add_image_sizes() {
	global $_wp_additional_image_sizes;
	add_image_size( 'g32_size', 722, 448, true );
}
add_action( 'after_setup_theme', 'g32_add_image_sizes' );
