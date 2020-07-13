<?php
/**
 * Plugin Name: Vistage Gutenberg Blocks
 * Description: Custom Gutenberg editor blocks for the Vistage team
 * Author: Jon Dewitt
 * Author URI: https://vistage.com/
 * Version: 1.0.1
 * License: GPL2+
 * License URI: https://www.gnu.org/licenses/gpl-2.0.txt
 *
 * @package CGB
 */

// Exit if accessed directly.
if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

/**
 * Block Initializer.
 *
 * Check if the conditions to load blocks and assets are meet.
 */
function vistage_blocks_initialize() {
	$plugin_should_load = apply_filters( 'vistage_blocks_plugin_should_load', true );
	if ( $plugin_should_load ) {
		require_once plugin_dir_path( __FILE__ ) . 'src/init.php';
	}
}

vistage_blocks_initialize();
