/**
 * BLOCK: vistage-blocks
 *
 * Registering a basic block with Gutenberg.
 * Simple block, renders and saves the same content without any interactivity.
 */

//  Import CSS.
import './style.scss';
import './editor.scss';

const { __ } = wp.i18n; // Import __() from wp.i18n
const { registerBlockType } = wp.blocks; // Import registerBlockType() from wp.blocks
const { InspectorControls } = wp.editor;
const { PanelBody, SelectControl, TextControl, RadioControl } = wp.components;

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
registerBlockType( 'vistage-blocks/button-block', {
	title: __( 'Vistage Button' ),
	icon: 'format-image',
	category: 'layout',

	attributes: {
		text: {
			type: 'string',
			default: 'Learn more',
		},
		style: {
			type: 'string',
			default: 'button__global',
		},
		link: {
			type: 'url',
			default: '#',
		},
		linkTarget: {
			type: 'boolean',
			default: false,
		},
		alignment: {
			type: 'string',
			default: 'left',
		},
	},
	keywords: [
		__( 'Button' ),
		__( 'Vistage' ),
	],

	edit( { attributes, setAttributes } ) {
		return (
			<div>
				{
					<InspectorControls>
						<PanelBody>
							<SelectControl
								label="Select a Button Style"
								value={ attributes.style }
								options={ [
									{ label: 'Global', value: 'button__global' },
									{ label: 'Global Secondary', value: 'button__global --secondary' },
									{ label: 'CTA', value: 'button__cta' },
									{ label: 'CTA Secondary', value: 'button__cta --secondary' },
								] }
								onChange={ value => setAttributes( { style: value } ) }
							/>
							<SelectControl
								label="Button Alignment"
								value={ attributes.alignment }
								options={ [
									{ label: 'Left', value: 'align-left' },
									{ label: 'Right', value: 'align-right' },
									{ label: 'Center', value: 'align-center' },
								] }
								onChange={ value => setAttributes( { alignment: value } ) }
							/>
							<TextControl
								label="Button URL"
								value={ attributes.link }
								onChange={ value => setAttributes( { link: value } ) }
							/>
							<RadioControl
								label="Open in New Tab" selected={ attributes.linkTarget }
								options={ [
									{ label: 'Yes', value: '_blank' },
									{ label: 'No', value: '' },
								] }
								onChange={ value => setAttributes( { linkTarget: value } ) }
							/>
						</PanelBody>
					</InspectorControls>
				}
				<TextControl
					value={ attributes.text }
					className={ attributes.style }
					onChange={ content => setAttributes( { text: content } ) }
				/>
			</div>
		);
	},

	save( { attributes } ) {
		// This is the markup that renders to the front end
		return (
			<div className="container">
				<div className={ attributes.alignment }>
					<button className={ attributes.style }>
						<a href={ attributes.link } target={ attributes.linkTarget }>{ attributes.text }</a>
					</button>
				</div>
			</div>
		);
	},
} );
