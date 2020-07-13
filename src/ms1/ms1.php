<?php
/**
 * Register custom post type for Testimonials (Member Stories)
*/
function vdc24_register_member_stories() {
	$args = array(
		'public'        => true,
		'label'         => 'Member Stories',
		'query_var'     => 'member-stories',
		'show_in_rest'  => true,
		'template_lock' => 'all',
		'template'      => array(
			array(
				'core/columns',
				array(),
				array(
					array(
						'core/column',
						array(),
						array(
							array( 'core/template', array() ),
						),
					),
					array(
						'core/column',
						array(),
						array(
							array( 'core/heading', array( 'placeholder' => 'Member Name' ) ),
							array( 'core/paragraph', array( 'placeholder' => 'Member Title & Company' ) ),
							array( 'core/paragraph', array( 'placeholder' => 'Member Story' ) ),
						),
					),
				),
			),
		),
	);
	register_post_type( 'member-stories', $args );
}
add_action( 'init', 'vdc24_register_member_stories' );

function filter_add_rest_orderby_params( $params ) {
	$params['orderby']['enum'][] = 'rand';
	return $params;
}
add_filter( 'rest_member-stories_collection_params', 'filter_add_rest_orderby_params', 10, 1 );
