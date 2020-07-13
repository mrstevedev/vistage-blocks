/**
 * BLOCK: email-signup
 *
 * G2.3 Email Sign-Up
 */

import './style.scss';
import './editor.scss';

const { __ } = wp.i18n;
const { PanelBody, ToggleControl, TextareaControl, TextControl } = wp.components;
const { registerBlockType } = wp.blocks;
const { InspectorControls } = wp.editor;
const { RawHTML } = wp.element;
const $ = jQuery;

function getGravityForm( formId, setAttributes ) {
	$.ajax( {
		url: window.ajaxurl,
		method: 'GET',
		data: { form_id: formId, action: 'g23_get_gravity_form' },
	} ).error( ( error ) => {
		// eslint-disable-next-line no-console
		console.debug( error.statusText, error );
	} ).done( response => {
		setAttributes( { formContent: response } );
		console.debug( response );
	} );
}

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
registerBlockType( 'vistage-blocks/email-signup', {
	title: __( 'G2.3 Email Sign-Up' ),
	icon: 'format-image',
	category: 'layout',

	attributes: {
		fullLayout: {
			type: 'boolean',
			default: true,
		},
		showHeadline: {
			type: 'boolean',
			default: true,
		},
		showDescription: {
			type: 'boolean',
			default: true,
		},
		headline: {
			type: 'string',
			default: 'Get the latest insights in your inbox',
		},
		description: {
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
		updateFlag: {
			type: 'number',
		},
	},
	keywords: [
		__( 'G2.3 Email Sign-Up' ),
		__( 'Vistage' ),
		__( 'g2.3' ),
		__( 'g2.3a' ),
		__( 'g2.3b' ),
	],

	edit( { attributes, setAttributes } ) {
		if ( attributes.formIdChanged ) {
			getGravityForm( attributes.formId, setAttributes.bind( this ) );
			setAttributes( { formIdChanged: false } );
		}

		return (
			<div>
				{
					<InspectorControls className="g23__controls">
						<PanelBody>
							<ToggleControl
								label="Full layout" checked={ attributes.fullLayout }
								onChange={ value => setAttributes( { fullLayout: value } ) }
							/>
							<ToggleControl
								label="Show Headline" checked={ attributes.showHeadline }
								onChange={ value => setAttributes( { showHeadline: value } ) }
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
				<div className={ `g23__container${ attributes.fullLayout ? ' full-layout' : '' }` }>
					<div className="g23__left g23__column">
						{ attributes.showHeadline ? <h6 className="g23__left__headline">
							<div className="g23__left__headline__icon"></div>
							<TextControl
								value={ attributes.headline }
								placeHolder="Headline"
								onChange={ value => setAttributes( { headline: value } ) }
							/>
						</h6> : null }
						<p className="g23__left__description">
							{ attributes.showDescription ? <TextareaControl
								onChange={ value => setAttributes( { description: value } ) }
								value={ attributes.description }
								placeholder="Description"
								rows="2"
							/> : null }
						</p>
					</div>
					<div className="g23__right g23__column">
						<div className="g23__right__form">
							<RawHTML>{ attributes.formContent }</RawHTML>
						</div>
					</div>
				</div>
			</div>
		);
	},

	save( { attributes } ) {
		return (
			<div className={ `g23__container${ attributes.fullLayout ? ' full-layout' : '' }` }>
				<div className="g23__left g23__column">
					{ attributes.showHeadline ? <h6 className="g23__left__headline">
						<div className="g23__left__headline__icon"></div>
						{ attributes.headline }
					</h6> : null }
					{ attributes.showDescription ? <p className="g23__left__description">
						{ attributes.description }
					</p> : null }
				</div>
				<div className="g23__right g23__column">
					<div className="g23__right__form">
						<RawHTML>{ `[gravityform id=${ attributes.formId } ajax=true description=false title=false]` }</RawHTML>
					</div>
				</div>
			</div>
		);
	},
} );
