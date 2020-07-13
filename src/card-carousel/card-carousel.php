<?php

add_theme_support( 'align-wide' );

function cardcarousel_enqueue_scripts() {
	wp_enqueue_script('cardcarousel-frontend', plugin_dir_url( __FILE__ ).'cardcarousel-frontend.js', array('jquery'), null, true);
}
add_action( 'wp_enqueue_scripts', 'cardcarousel_enqueue_scripts' );

function cardcarousel_add_image_sizes() {
	global $_wp_additional_image_sizes;
	add_image_size( 'cardcarousel_size', 347, 347, true );
}
add_action( 'after_setup_theme', 'cardcarousel_add_image_sizes' );
