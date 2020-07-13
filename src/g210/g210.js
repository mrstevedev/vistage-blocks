/**
 * BLOCK: bottom-cta
 *
 * G2.10a Bottom CTA.
 */

import './style.scss';
import './editor.scss';

const { __ } = wp.i18n;
const { ToggleControl, TextareaControl, TextControl, SVG, PanelBody, Disabled } = wp.components;
const { registerBlockType } = wp.blocks;
const { InnerBlocks, InspectorControls, URLInput } = wp.editor;

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
registerBlockType( 'vistage-blocks/bottom-cta', {
	title: __( 'G2.10a Bottom CTA' ),
	icon: 'format-image',
	category: 'layout',

	attributes: {
		showDescription: {
			type: 'boolean',
			default: true,
		},
		showCTAButton: {
			type: 'boolean',
			default: true,
		},
		headingText: {
			type: 'string',
			default: 'Ready to take the next step?',
		},
		descriptionText: {
			type: 'string',
			default: 'A very important paragraph will go here detailing important programs about Vistage. However, this text is for placeholder reasons only, and to showcase how beautiful the typography in this sentence is.',
		},
		ctaText: {
			type: 'string',
			default: 'Apply now?',
		},
		linkURL: {
			type: 'string',
			default: '',
		},
	},
	keywords: [
		__( 'CTA - Bottom' ),
		__( 'Vistage' ),
		__( 'g2.10' ),
	],

	edit( { attributes, setAttributes } ) {
		const linkURLControl = <URLInput
			value={ attributes.linkURL }
			label="Your URL here"
			onChange={ text => setAttributes( { linkURL: text } ) }
		/>;

		return (
			<div className="g210__container">
				{
					<InspectorControls className="g210__controls">
						<PanelBody>
							<ToggleControl
								label="Show Description" checked={ attributes.showDescription }
								onChange={ value => setAttributes( { showDescription: value } ) }
							/>
							<ToggleControl
								label="Show CTA button" checked={ attributes.showCTAButton }
								onChange={ value => setAttributes( { showCTAButton: value } ) }
							/>
							{ attributes.showCTAButton ? linkURLControl : <Disabled> { linkURLControl } </Disabled> }
						</PanelBody>
					</InspectorControls>
				}
				<div className="g210__wrapper">
					<div className="g210__text">
						<TextareaControl
							onChange={ value => setAttributes( { headingText: value } ) }
							value={ attributes.headingText }
							placeholder="Heading text"
							className="g210__text__heading"
							rows="2"
						/>
						{ attributes.showDescription ? <TextareaControl
							onChange={ value => setAttributes( { descriptionText: value } ) }
							value={ attributes.descriptionText }
							placeholder="Description text"
							className="g210__text__description"
							rows="5"
						/> : null }
						{ attributes.showCTAButton ? <button className="button__cta">
							<TextControl
								value={ attributes.ctaText }
								placeHolder="Enter Button Label"
								onChange={ value => setAttributes( { ctaText: value } ) }
							/>
						</button> : null }
					</div>
					<div className="g210__image">
						<InnerBlocks templateLock="all" template={ imageTemplate } />
					</div>
				</div>
			</div>
		);
	},

	save( { attributes } ) {
		return (
			<div className="g210__container">
				<div className="g210__wrapper">
					<div className="g210__text">
						<h2 className="g210__text__heading">
							{ attributes.headingText }
						</h2>
						{ attributes.showDescription ?
							<p className="g210__text__description">
								{ attributes.descriptionText }
							</p> : null }
						{ attributes.showCTAButton ? <a className="button__cta" href={ attributes.linkURL }>{ attributes.ctaText }</a> : null }
					</div>
					<div className="g210__image">
						<InnerBlocks.Content />
					</div>
				</div>
			</div>
		);
	},
} );
