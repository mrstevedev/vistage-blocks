<?php
function g16_enqueue_scripts() {
	wp_enqueue_script('g16-frontend', plugin_dir_url( __FILE__ ).'g16-frontend.js', array('jquery'), null, true);
}
add_action( 'wp_enqueue_scripts', 'g16_enqueue_scripts' );
