/**
 * BLOCK: bottom-cta-b
 *
 * G2.10b Bottom CTA.
 */

import './style.scss';
import './editor.scss';

const { __ } = wp.i18n;
const { ToggleControl, TextareaControl, TextControl, PanelBody } = wp.components;
const { registerBlockType } = wp.blocks;
const { InnerBlocks, InspectorControls } = wp.editor;
const { RawHTML } = wp.element;
const $ = jQuery;

function getGravityForm( formId, setAttributes ) {
	$.ajax( {
		url: window.ajaxurl,
		method: 'GET',
		data: { form_id: formId, action: 'g210b_get_gravity_form' },
	} ).error( ( error ) => {
		// eslint-disable-next-line no-console
		console.debug( error.statusText, error );
	} ).done( response => {
		setAttributes( { formContent: response } );
	} );
}

const imageTemplate = [
	[ 'core/image', { align: 'full' } ],
];

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
registerBlockType( 'vistage-blocks/bottom-cta-b', {
	title: __( 'G2.10b Bottom CTA' ),
	icon: 'format-image',
	category: 'layout',

	attributes: {
		showHeading: {
			type: 'boolean',
			default: true,
		},
		showDescription: {
			type: 'boolean',
			default: true,
		},
		headingText: {
			type: 'string',
			default: 'Get the latest insights in your inbox',
		},
		descriptionText: {
			type: 'string',
			default: 'Join 28,000+ executives who receive our bi-weekly business insights',
		},
		formId: {
			type: 'number',
			default: 1,
		},
		formIdChanged: {
			type: Boolean,
			default: true,
		},
		formContent: {
			type: 'string',
			default: '',
		},
	},
	keywords: [
		__( 'CTA - Bottom - b' ),
		__( 'Vistage' ),
		__( 'g2.10b' ),
	],

	edit( { attributes, setAttributes } ) {
		if ( attributes.formIdChanged ) {
			getGravityForm( attributes.formId, setAttributes.bind( this ) );
			setAttributes( { formIdChanged: false } );
		}

		return (
			<div className="g210b__container">
				{
					<InspectorControls className="g210b__controls">
						<PanelBody>
							<ToggleControl
								label="Show Heading" checked={ attributes.showHeading }
								onChange={ value => setAttributes( { showHeading: value } ) }
							/>
							<ToggleControl
								label="Show Description" checked={ attributes.showDescription }
								onChange={ value => setAttributes( { showDescription: value } ) }
							/>
							<TextControl
								type="number"
								value={ attributes.formId }
								label="Enter Gravity Form Id"
								min="1"
								onChange={ value => setAttributes( { formId: parseInt( value ), formIdChanged: true } ) }
							/>
						</PanelBody>
					</InspectorControls>
				}
				<div className="g210b__wrapper">
					<div className="g210b__text">
						{ attributes.showHeading ? <TextareaControl
							onChange={ value => setAttributes( { headingText: value } ) }
							value={ attributes.headingText }
							placeholder="Heading text"
							className="g210b__text__heading"
							rows="2"
						/> : null }
						{ attributes.showDescription ? <TextareaControl
							onChange={ value => setAttributes( { descriptionText: value } ) }
							value={ attributes.descriptionText }
							placeholder="Description text"
							className="g210b__text__description"
							rows="5"
						/> : null }
						<div className="g210b__text__form">
							<RawHTML>{ attributes.formContent }</RawHTML>
						</div>
					</div>
					<div className="g210b__image">
						<InnerBlocks templateLock="all" template={ imageTemplate } />
					</div>
				</div>
			</div>
		);
	},

	save( { attributes } ) {
		return (
			<div className="g210b__container">
				<div className="g210b__wrapper">
					<div className="g210b__text">
						<h2 className="g210b__text__heading">
							{ attributes.headingText }
						</h2>
						{ attributes.showDescription ?
							<p className="g210b__text__description">
								{ attributes.descriptionText }
							</p> : null }
						<div className="g210b__text__form">
							<RawHTML>{ `[gravityform id=${ attributes.formId } ajax=true description=false title=false]` }</RawHTML>
						</div>
					</div>
					<div className="g210b__image">
						<InnerBlocks.Content />
					</div>
				</div>
			</div>
		);
	},
} );
