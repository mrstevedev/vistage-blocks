<?php

add_theme_support( 'align-wide' );

function vdc_68_gutenberg_default_colors() {
    add_theme_support(
        'editor-color-palette', 
        array(
            array(
                'name' => 'Transparent',
                'slug' => 'transparent',
                'color' => 'transparent'
            ),
            array(
                'name' => 'Black',
                'slug' => 'black',
                'color' => '#000000'
            ),
            array(
                'name' => 'Vistage blue',
                'slug' => 'vistage-blue',
                'color' => '#003f5f'
            )               
        )
    );
}

add_action( 'init', 'vdc_68_gutenberg_default_colors' );