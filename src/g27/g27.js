/**
 * BLOCK: image-textbox
 *
 * G2.7 Image + Textbox component.
 */

import './style.scss';
import './editor.scss';

const { __ } = wp.i18n;
const { registerBlockType } = wp.blocks;
const { InnerBlocks, InspectorControls, RichText, URLInput } = wp.editor;
const { RadioControl, ToggleControl, ColorPicker, ColorIndicator, TextControl, TextareaControl, SVG } = wp.components;

const imageTemplate = [
	[ 'core/image', { align: 'full' } ],
];

const defaultAttributes = {
	imagePosition: 'left',
	textboxColor: '#ececec',
	showLabel: true,
	showHeading: true,
	showDescription: true,
	showLink: true,
	linkURL: '',
	linkNewTab: false,
};

const lineSVG = <SVG xmlns="http://www.w3.org/2000/svg" width="62" height="3" viewBox="0 0 62 3">
	<path fill="none" fillRule="evenodd" stroke="#EDC11C" strokeLinecap="square" strokeWidth="2" d="M1.492 1.5h59.016" />
</SVG>;

const arrowSVG = <SVG xmlns="http://www.w3.org/2000/svg" width="20" height="15" viewBox="0 0 20 15">
	<path fill="#EDC11C" fillRule="nonzero" d="M13.253.63a.695.695 0 0 0-.992 0 .7.7 0 0 0 0 .981l5.03 5.03H.694A.691.691 0 0 0 0 7.336c0 .386.307.704.694.704h16.597l-5.03 5.02a.712.712 0 0 0 0 .992.695.695 0 0 0 .992 0l6.22-6.22a.683.683 0 0 0 0-.982L13.253.63z" />
</SVG>;

/**
 * Register: aa Gutenberg Block.
 *
 * Registers a new block provided a unique name and an object defining its
 * behavior. Once registered, the block is made editor as an option to any
 * editor interface where blocks are implemented.
 *
 * @link https://wordpress.org/gutenberg/handbook/block-api/
 * @param  {string}   name	 Block name.
 * @param  {Object}   settings Block settings.
 * @return {?WPBlock}		  The block, if it has been successfully
 *							 registered; otherwise `undefined`.
 */
registerBlockType( 'vistage-blocks/image-textbox', {
	title: __( 'G2.7 Image + Textbox' ),
	icon: 'format-image',
	category: 'layout',

	attributes: {
		imagePosition: {
			type: 'string',
		},
		textboxColor: {
			type: 'string',
		},
		showLabel: {
			type: 'boolean',
		},
		showHeading: {
			type: 'boolean',
		},
		showDescription: {
			type: 'boolean',
		},
		showLink: {
			type: 'boolean',
		},
		linkNewTab: {
			type: 'boolean',
		},
		labelText: {
			type: 'string',
		},
		headingText: {
			type: 'string',
		},
		descriptionText: {
			type: 'string',
		},
		linkText: {
			type: 'string',
		},
		linkURL: {
			type: 'string',
		},
	},
	keywords: [
		__( 'Image + Text Box' ),
		__( 'Vistage' ),
		__( 'g2.7' ),
	],

	edit( { attributes, setAttributes } ) {
		if ( ! attributes.imagePosition ) {
			setAttributes( defaultAttributes );
		}

		const imageDiv = <div className="g27__image">
			<InnerBlocks templateLock="all" template={ imageTemplate } />
		</div>;

		const textDiv = <div className="g27__text --wrapper" style={ { backgroundColor: attributes.textboxColor } }>
			{ attributes.showLabel ? <div className="g27__text --label-container">
				<RichText
					className="g27__text --label flourish"
					value={ attributes.labelText }
					placeholder="Label"
					onChange={ text => setAttributes( { labelText: text } ) }
				/> { lineSVG }
			</div> : null }
			{ attributes.showHeading ? <RichText
				className="g27__text --heading"
				value={ attributes.headingText }
				placeholder="Heading"
				onChange={ text => setAttributes( { headingText: text } ) }
			/> : null }
			{ attributes.showDescription ? <RichText
				onChange={ value => setAttributes( { descriptionText: value } ) }
				value={ attributes.descriptionText }
				placeholder="Details"
				className="g27__text --description"
			/> : null }
			{ attributes.showLink ? <div className="g27__text --link-wrapper">
				<RichText
					className="g27__text --linktext"
					value={ attributes.linkText }
					placeholder="Link Text"
					onChange={ text => setAttributes( { linkText: text } ) }
				/>
				<URLInput
					className="g27__text--linkURL"
					value={ attributes.linkURL }
					label="URL"
					onChange={ text => setAttributes( { linkURL: text } ) }
				/>
			</div> : null }
		</div>;

		return (
			<div>
				{
					<InspectorControls className="g27__controls">
						<br />
						<RadioControl
							label="Image Position"
							selected={ attributes.imagePosition }
							options={ [
								{ label: 'Left', value: 'left' },
								{ label: 'Right', value: 'right' },
							] }
							onChange={ value => setAttributes( { imagePosition: value } ) }
						/>
						<br />
						<RadioControl
							label="Textbox Background Color"
							selected={ attributes.textboxColor }
							options={ [
								{ label: <span><ColorIndicator colorValue="#ececec" /> Light Gray</span>, value: '#ececec' },
								{ label: <span><ColorIndicator colorValue="#eaeff2" /> Blue Steel 10%</span>, value: '#eaeff2' },
								{ label: <span><ColorIndicator colorValue="#ffffff" /> White</span>, value: '#ffffff' },
							] }
							onChange={ value => setAttributes( { textboxColor: value } ) }
							className="g27__textbox --color"
						/>
						<ColorPicker
							color={ attributes.textboxColor }
							onChangeComplete={ value => setAttributes( { textboxColor: `rgba(${value.rgb.r}, ${value.rgb.g}, ${value.rgb.b}, ${value.rgb.a})` } )}
							className="g27__controls__color-picker"
						/>
						<br />
						<ToggleControl
							label="Show Label"
							checked={ attributes.showLabel }
							onChange={ show => setAttributes( { showLabel: show } ) }
						/>
						<ToggleControl
							label="Show Heading"
							checked={ attributes.showHeading }
							onChange={ show => setAttributes( { showHeading: show } ) }
						/>
						<ToggleControl
							label="Show Description"
							checked={ attributes.showDescription }
							onChange={ show => setAttributes( { showDescription: show } ) }
						/>
						<ToggleControl
							label="Show Link"
							checked={ attributes.showLink }
							onChange={ show => setAttributes( { showLink: show } ) }
						/>
						<ToggleControl
							label="Link in New Tab"
							checked={ attributes.linkNewTab }
							onChange={ show => setAttributes( { linkNewTab: show } ) }
						/>
					</InspectorControls>
				}
				<div className="g27__container">
					{ 'left' === attributes.imagePosition ? [ imageDiv, textDiv ] : [ textDiv, imageDiv ] }
				</div>
			</div>
		);
	},

	save( { attributes } ) {
		const imageDiv = <div className="g27__image">
			<InnerBlocks.Content />
		</div>;

		const textDiv = <div className="g27__text --wrapper" style={ { backgroundColor: attributes.textboxColor } }>
			{ attributes.showLabel ? <div className="g27__text --label">
				{ [ attributes.labelText, '&nbsp;', lineSVG ] }
			</div> : null }
			{ attributes.showHeading ? <div className="g27__text --heading">
				{ attributes.headingText }
			</div> : null }
			{ attributes.showDescription ? <div className="g27__text --description">
				{ attributes.descriptionText }
			</div> : null }
			{ attributes.showLink ? <div className="g27__text --link-wrapper">
				<a href={ attributes.linkURL } target={ attributes.linkNewTab ? '_blank' : '' } rel="noopener noreferrer">{ attributes.linkText }</a>
				&nbsp;
				{ arrowSVG }
			</div> : null }
		</div>;

		return (
			<div className={ 'g27__container --layout-' + attributes.imagePosition }>
				{ 'left' === attributes.imagePosition ? [ imageDiv, textDiv ] : [ textDiv, imageDiv ] }
			</div>
		);
	},
} );
