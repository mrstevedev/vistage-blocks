/**
 * BLOCK: statement-button
 *
 * G2.4 Statement + Button
 */

import './style.scss';
import './editor.scss';

const { __ } = wp.i18n;
const { ColorIndicator, Disabled, PanelBody, RadioControl, SVG, ToggleControl, TextareaControl, TextControl } = wp.components;
const { registerBlockType } = wp.blocks;
const { InspectorControls, URLInput } = wp.editor;

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
registerBlockType( 'vistage-blocks/statement-button', {
	title: __( 'G2.4 Statement + Button' ),
	icon: 'format-image',
	category: 'layout',

	attributes: {
		textboxColor: {
			type: 'string',
			default: 'rgba(0, 63, 95, 0.1)',
		},
		showCTAButton: {
			type: 'boolean',
			default: true,
		},
		showDescription: {
			type: 'boolean',
			default: true,
		},
		headingText: {
			type: 'string',
			default: '',
		},
		descriptionText: {
			type: 'string',
			default: '',
		},
		ctaText: {
			type: 'string',
			default: '',
		},
		linkURL: {
			type: 'string',
			default: '',
		},
	},
	keywords: [
		__( 'Statement + Button' ),
		__( 'Vistage' ),
		__( 'g2.4a' ),
	],

	edit( { attributes, setAttributes } ) {
		const linkURLControl = <URLInput
			value={ attributes.linkURL }
			label="Your URL here"
			onChange={ text => setAttributes( { linkURL: text } ) }
		/>;

		return (
			<div>
				{
					<InspectorControls className="g24a__controls">
						<PanelBody>
							<RadioControl
								label="Textbox Background Color"
								selected={ attributes.textboxColor }
								options={ [
									{ label: <span><ColorIndicator colorValue="#ececec" /> Light Gray</span>, value: '#ececec' },
									{ label: <span><ColorIndicator colorValue="rgba(0, 63, 95, 0.1)" /> Blue Steel 10%</span>, value: 'rgba(0, 63, 95, 0.1)' },
									{ label: <span><ColorIndicator colorValue="rgba(0, 121, 182, 0.15)" /> Bright Blue</span>, value: 'rgba(0, 121, 182, 0.15)' },
									{ label: <span><ColorIndicator colorValue="#ffffff" /> White</span>, value: '#ffffff' },
								] }
								onChange={ value => setAttributes( { textboxColor: value } ) }
							/>
							<ToggleControl
								label="Show Description" checked={ attributes.showDescription }
								onChange={ value => setAttributes( { showDescription: value } ) }
							/>
							<ToggleControl
								label="Show CTA Button" checked={ attributes.showCTAButton }
								onChange={ value => setAttributes( { showCTAButton: value } ) }
							/>
							{ attributes.showCTAButton ? linkURLControl : <Disabled> { linkURLControl } </Disabled> }
						</PanelBody>
					</InspectorControls>
				}
				<div className="g24a__container" style={ { backgroundColor: attributes.textboxColor } }>
					<div className="g24a__left g24a__column">
						<TextareaControl
							onChange={ value => setAttributes( { headingText: value } ) }
							value={ attributes.headingText }
							placeholder="Heading text"
							className="g24a__left__heading"
							rows="2"
						/>
					</div>
					<div className="g24a__right g24a__column">
						{ attributes.showDescription ? <TextareaControl
							onChange={ value => setAttributes( { descriptionText: value } ) }
							value={ attributes.descriptionText }
							placeholder="Description text"
							className="g24a__right__description"
							rows="5"
						/> : null }
						{ attributes.showCTAButton ? <button className="g24a__right__cta-button">
							<TextControl
								value={ attributes.ctaText }
								placeHolder="Enter Button Label"
								onChange={ value => setAttributes( { ctaText: value } ) }
							/>
						</button> : null }
					</div>
				</div>
			</div>
		);
	},

	save( { attributes } ) {
		return (
			<div className="g24a__container" style={ { backgroundColor: attributes.textboxColor } }>
				<div className="g24a__left g24a__column">
					<div className="g24a__left__heading">
						<h2>{ attributes.headingText }</h2>
					</div>
				</div>
				<div className="g24a__right g24a__column">
					{ attributes.showDescription ? <div className="g24a__right__description">
						<p>{ attributes.descriptionText }</p>
					</div> : null }
					{ attributes.showCTAButton ? <button className="button__cta">
						<a href={ attributes.linkURL }>
							{ attributes.ctaText }
						</a>	
					</button> : null }
				</div>
			</div>
		);
	},
} );
