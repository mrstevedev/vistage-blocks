/**
 * BLOCK: hero-inner
 *
 * 1-Column Component: Hero - Inner.
 */

import './style.scss';
import './editor.scss';

const { __ } = wp.i18n;
const { ToggleControl, Disabled, TextControl, SVG } = wp.components;
const { registerBlockType } = wp.blocks;
const { InnerBlocks, InspectorControls, URLInput, RichText } = wp.editor;
const { select } = wp.data;

const imageTemplate = [
	[ 'core/cover', { align: 'full' } ],
];

const rightArrow = <SVG xmlns="http://www.w3.org/2000/svg" width="7" height="13" viewBox="0 0 7 13">
	<path fill="#000000" fillRule="nonzero" d="M7 6.5a.936.936 0 0 1-.252.644l-5.28 5.59a.827.827 0 0 1-1.216 0 .949.949 0 0 1 0-1.288L4.924 6.5.252 1.554a.949.949 0 0 1 0-1.287.826.826 0 0 1 1.216 0l5.28 5.59c.168.177.252.41.252.643z" />
</SVG>;

const defaultAttributes = {
	showLabel: true,
	showSubheading: true,
	showCTAButton: true,
};

function getImageURL( clientId ) {
	try {
		const parentBlock = select( 'core/editor' ).getBlocksByClientId( clientId )[ 0 ];
		const childBlocks = parentBlock.innerBlocks;
		return childBlocks[ 0 ].attributes.url;
	} catch ( error ) {
		return undefined;
	}
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
registerBlockType( 'vistage-blocks/hero-inner', {
	title: __( 'G1.2 Hero - Inner' ),
	icon: 'format-image',
	category: 'layout',

	attributes: {
		showLabel: {
			type: 'boolean',
		},
		showSubheading: {
			type: 'boolean',
		},
		showCTAButton: {
			type: 'boolean',
		},
		labelText: {
			type: 'string',
		},
		headingText: {
			type: 'string',
		},
		subheadingText: {
			type: 'string',
		},
		ctaText: {
			type: 'string',
		},
		linkURL: {
			type: 'string',
		},
		imageValue: {
			type: 'object',
		},
	},
	keywords: [
		__( 'Hero Image' ),
		__( 'Vistage' ),
		__( 'g1.2' ),
	],

	edit( { attributes, setAttributes } ) {
		if ( undefined === attributes.showLabel ) {
			setAttributes( defaultAttributes );
		}

		const linkURLControl = <URLInput
			className="g12__text-container__linkURL"
			value={ attributes.linkURL }
			label="Your URL here"
			onChange={ text => setAttributes( { linkURL: text } ) }
		/>;

		// eslint-disable-next-line no-eval
		const ref = eval( '_ref' );

		return (
			<div>
				{
					<InspectorControls className="g12__controls">
						<br />
						<ToggleControl
							label="Show Label" checked={ attributes.showLabel }
							onChange={ value => setAttributes( { showLabel: value } ) }
						/>
						<ToggleControl
							label="Show Subheading" checked={ attributes.showSubheading }
							onChange={ value => setAttributes( { showSubheading: value } ) }
						/>
						<ToggleControl
							label="Show CTA button" checked={ attributes.showCTAButton }
							onChange={ value => setAttributes( { showCTAButton: value } ) }
						/>
						{ attributes.showCTAButton ? linkURLControl : <Disabled> { linkURLControl } </Disabled> }
					</InspectorControls>
				}
				<div className="g12__container">
					<div className="g12__image">
						<InnerBlocks templateLock="all" template={ imageTemplate } />
					</div>
					<div className={ 'g12__text-container' + ( undefined !== getImageURL( ref.clientId ) ? ' g12__over-image' : '' ) }>
						{ attributes.showLabel ? <TextControl
							className="g12__text-container__label"
							value={ attributes.labelText }
							placeHolder="H1 Text"
							onChange={ value => setAttributes( { labelText: value } ) }
						/> : null }
						<RichText
							tagName="h2"
							onChange={ value => setAttributes( { headingText: value } ) }
							value={ attributes.headingText }
							placeholder="H2 Text"
							keepPlaceholderOnFocus={ true }
							className="g12__text-container__heading"
						/>
						{ attributes.showSubheading ?
							<RichText
								tagName="p"
								onChange={ value => setAttributes( { subheadingText: value } ) }
								value={ attributes.subheadingText }
								placeholder={ __( 'Descriptive Text', 'vistage' ) }
								keepPlaceholderOnFocus={ true }
								className="g12__text-container__subheading"
							/> : null }
						{ attributes.showCTAButton ? <button className="g12__text-container__cta-button">
							<TextControl
								value={ attributes.ctaText }
								placeHolder="Button Label"
								onChange={ value => setAttributes( { ctaText: value } ) }
							/>
							{ rightArrow }
						</button> : null }
					</div>
				</div>
			</div>
		);
	},

	save( { attributes } ) {
		return (
			<div className="g12__container">
				<div className="g12__image">
					<InnerBlocks.Content />
				</div>
				<div className="g12__text-container g12__over-image">
					{ attributes.showLabel ? <div className="g12__text-container__label"><h1>{ attributes.labelText }</h1></div> : null }
					<div className="g12__text-container__heading"><RichText.Content tagName="h2" value={ attributes.headingText } /></div>
					{ attributes.showSubheading ? <div className="g12__text-container__subheading"><RichText.Content tagname="p" value={ attributes.subheadingText } /></div> : null }
					{ attributes.showCTAButton ? <a href={ attributes.linkURL }>
						<button className="g12__text-container__cta-button">
							{ attributes.ctaText }
							{ rightArrow }
						</button>
					</a> : null }
				</div>
			</div>
		);
	},
} );
