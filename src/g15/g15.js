/**
 * BLOCK: stacked-text-video
 *
 * 1-Column Component: Stacked Text + Video.
 */

import './style.scss';
import './editor.scss';

const { __ } = wp.i18n;
const { RadioControl, TextareaControl, ToggleControl } = wp.components;
const { registerBlockType } = wp.blocks;
const { RichText, InnerBlocks, InspectorControls, BlockControls, AlignmentToolbar  } = wp.editor;

import { Iconset } from '../includes/iconset/iconset.js';

const embedTemplates = {
    youtube: [
        [ 'core-embed/youtube' ],
    ],
    vimeo: [
        [ 'core-embed/vimeo' ],
    ],
};


wp.data.subscribe(function(){})

/**
 * Register: aa Gutenberg Block.
 *
 * Registers a new block provided a unique name and an object defining its
 * behavior. Once registered, the block is made editor as an option to any
 * editor interface where blocks are implemented.
 *
 * @link https://wordpress.org/gutenberg/handbook/block-api/
 * @param  {string}   name     Block name.
 * @param  {Object}   settings Block settings.
 * @return {?WPBlock}          The block, if it has been successfully
 *                             registered; otherwise `undefined`.
 */
registerBlockType( 'vistage-blocks/stacked-text-video', {
    title: __( 'G1.5 Stacked Text + Video' ),
    icon: 'format-image',
    category: 'layout',

    attributes: {
        embedTemplate: {
            type: 'string',
        },
        showIcon: {
            type: 'boolean',
        },
        text: {
            type: 'array',
            source: 'children',
            selector: '.g15__text'
        },
        icon: {
            type: 'string',
            default: '',
        },
        alignment: {
            default: 'center',
        }
    },
    keywords: [
        __( 'Stacked Text + Video' ),
        __( 'Vistage' ),
        __( 'g1.5' ),
    ],

    edit( { attributes, setAttributes , className, isSelected} ) {

        var alignment = attributes.alignment;

        const onChangeAlignment = ( newAlignment ) => {
            let alignmentValue = ( newAlignment === undefined ) ? 'none' : newAlignment;
            setAttributes( { alignment: alignmentValue } )
        };

        const onChangeContent = ( newContent  ) => {
            setAttributes( { text: newContent  } );
        };

        return (<div>{
            <BlockControls>
                <AlignmentToolbar
                    value={ alignment }
                    onChange={ onChangeAlignment }
                />
            </BlockControls>
        }{
            <InspectorControls className="g15__controls">
                <br />
                <ToggleControl
                    label="Show Testimonial Icon" checked={ attributes.showIcon }
                    onChange={ () => setAttributes( { showIcon: ! attributes.showIcon } ) }
                />
                <RadioControl
                    label="Select Video Source Type" selected={ attributes.embedTemplate }
                    options={ [
                        { label: 'Youtube', value: 'youtube' },
                        { label: 'Vimeo', value: 'vimeo' },
                    ] }
                    title="Select Video Source Type"
                    onChange={ value => setAttributes( { embedTemplate: value } ) }
                />

            </InspectorControls>
        }

            <div className="g15__container g15__container_admin">

            <div className="g15__icon g15__icon_admin">
                {attributes.showIcon ? <Iconset icon={attributes.icon} label="Select an icon" onChange={icon => setAttributes({icon: icon})}/> : null}
            </div>

            <RichText
                tagName="p"
                className="g15__text"
                value={attributes.text}
                onChange={onChangeContent}
                placeholder={__('Enter text...', 'custom-block')}
                style = {{textAlign: alignment}}
            />
            <div className="g15__video g15__video_admin">
            {
                attributes.embedTemplate !== null ? <InnerBlocks templateLock="all" template={embedTemplates[attributes.embedTemplate]}/> : null
            }
            </div>
            </div>

        </div>);
    },

    save( { attributes } ) {

        const class_text = "g15__text g15__text-align-" + attributes.alignment;

        return (
            <div className="g15__container">
                <div className="g15__icon">
                    { attributes.showIcon ? <Iconset icon={ attributes.icon } /> : null }
                </div>
                <div className={ class_text } >
                    { attributes.text }
                </div>
                <div className="g15__video video">
                    <InnerBlocks.Content />
                </div>
            </div>

        );
    },
} );

jQuery(document).click(function(event) {

    /**
     * Removes the video embed on edit
     * @param elem
     * @returns {*}
     */
    function sanitize(elem){
        var saved_content_proposed = elem.text();

        var res = saved_content_proposed.replace( jQuery(saved_content_proposed).find(".g15__video.video").html(), "");

        elem.val(res);
        elem.text(res);

        return res;
    }

    var text = jQuery(event.target).text();
    text = text.trim();

    if(text === "Edit as HTML") {

        setTimeout(function () {
            if( jQuery(".editor-block-list__block-html-textarea").length){
                sanitize(jQuery(".editor-block-list__block-html-textarea"));
            }
        }, 1000);

    }

});


