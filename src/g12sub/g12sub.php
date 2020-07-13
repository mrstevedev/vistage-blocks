<?php
function g12sub_enqueue_scripts() {
	wp_enqueue_script('g12sub-frontend', plugin_dir_url( __FILE__ ).'g12sub-frontend.js', array('jquery'), null, true);
}
add_action( 'wp_enqueue_scripts', 'g12sub_enqueue_scripts' );
