/**
 * BLOCK: g1-3-full-width-image-text
 *
 * Registering a basic block with Gutenberg.
 * Simple block, renders and saves the same content without any interactivity.
 */

//  Import CSS.
import './style.scss';
import './editor.scss';

const { __ } = wp.i18n; // Import __() from wp.i18n
const { registerBlockType } = wp.blocks; // Import registerBlockType() from wp.blocks
const {
	RadioControl,
	ToggleControl,
	Button,
	TextControl,
	ColorPicker,
} = wp.components;
const {
	InspectorControls,
	MediaUpload,
	MediaUploadCheck,
	RichText,
} = wp.editor;

const defaultAttributes = {
	showTopLabel: true,
	showHeading: true,
	showDescription: true,
	showTextBg: true,
	textPosition: 'left',
	linkCta: 'link',
};

const arrowRight = (
	<svg fill="#edc11c" xmlns="http://www.w3.org/2000/svg" width="20" height="15" viewBox="0 0 20 15">
		<path fill="#EDC11C" fillRule="nonzero" d="M13.253.63a.695.695 0 0 0-.992 0 .7.7 0 0 0 0 .981l5.03 5.03H.694A.691.691 0 0 0 0 7.336c0 .386.307.704.694.704h16.597l-5.03 5.02a.712.712 0 0 0 0 .992.695.695 0 0 0 .992 0l6.22-6.22a.683.683 0 0 0 0-.982L13.253.63z" />
	</svg>
);

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
registerBlockType( 'cgb/block-g1-3-full-width-image-text', {
	// Block name. Block names must be string that contains a namespace prefix. Example: my-plugin/my-custom-block.
	title: __( 'G1.3 Full-Width Image + Text' ), // Block title.
	icon: 'shield', // Block icon from Dashicons → https://developer.wordpress.org/resource/dashicons/.
	category: 'common', // Block category — Group blocks together based on common traits E.g. common, formatting, layout widgets, embed.
	attributes: {
		title: {
			source: 'text',
			selector: '.card__title',
		},
		body: {
			type: 'array',
			source: 'children',
			selector: '.card__body',
		},
		imageAlt: {
			type: 'string',
			attribute: 'alt',
			selector: 'img',
		},
		imageUrl: {
			type: 'text',
			attribute: 'src',
			selector: 'img',
		},
		textPosition: {
			type: 'string',
			default: 'left',
		},
		topLabel: {
			type: 'text',
		},
		mainHeading: {
			type: 'text',
		},
		showTopLabel: {
			type: 'boolean',
		},
		showHeading: {
			type: 'boolean',
		},
		showDescription: {
			type: 'boolean',
		},
		enableTextBoxTransparency: {
			type: 'boolean',
		},
		rangePerc: {
			type: 'string',
			default: '100',
		},
		savedRangePerc: {
			type: 'string',
		},
		showRadialBg: {
			type: 'boolean',
		},
		headingText: {
			type: 'text',
		},
		descriptionText: {
			type: 'text',
		},
		showTextBg: {
			type: 'boolean',
		},
		linkText: {
			type: 'text',
		},
		linkCta: {
			type: 'string',
		},
		linkURL: {
			type: 'string',
			default: '',
		},
		boxColor: {
			type: 'string',
			default: 'rgba(0, 63, 95, 1)',
		},
		arrowRight: {
			type: 'svg',
		},
	},
	keywords: [
		__( 'Image + Text Box' ),
		__( 'Vistage' ),
		__( 'g1.3' ),
	],

	edit: function( { attributes, setAttributes } ) {
		if ( undefined === attributes.showTopLabel ) {
			setAttributes( defaultAttributes );
		}
		const BgStyle = {
			backgroundImage: 'url(' + attributes.imageUrl + ')',
			backgroundSize: 'cover',
		};
		const removeTextBoxStyles = () => {
			// remove the styles applied by the transparency range slider
			const textBoxBg = document.querySelector( '.component-cta-bg' );
			textBoxBg.removeAttribute( 'style' );
		};
		const textBoxBgColor = {
			backgroundColor: attributes.boxColor,
		};
		const getImageButton = openEvent => {
			if ( attributes.imageUrl ) {
				return (
					<div
						className={ `wp-block-cgb-block-g1-3-full-width-image-text ${ attributes.imageUrl ? 'component-background-img' : null }` }
						style={ BgStyle }>
						<MediaUploadCheck>
							<MediaUpload
								onSelect={ media => {
									setAttributes( {
										imageAlt: media.alt,
										imageUrl: media.url,
									} );
								} }
								type="image"
								value={ attributes.imageID }
								render={ () => (
									<div className="choose-another-image-button-container">
										<Button onClick={ openEvent } className="button button-large">
											Select Another Image
										</Button>
									</div>
								) }
							/>
						</MediaUploadCheck>
						<div className={ `${ attributes.textPosition === 'left' ? 'component-container left' : attributes.textPosition === 'right' ? 'component-container right' : '' }` }>
							<div className={ `component-cta-bg ${ attributes.showTextBg ? '' : 'no-bg' }` } style={ textBoxBgColor }>
								{ attributes.showTopLabel ? <RichText
									className="component-top-label"
									value={ attributes.topLabel }
									placeholder="Enter Label"
									onChange={ value => setAttributes( { topLabel: value } ) }
								/> : null }
								{ attributes.showHeading ? <RichText
									className="component-title"
									value={ attributes.headingText }
									placeholder="Enter Heading"
									onChange={ value => setAttributes( { headingText: value } ) }
								/> : null }
								{ attributes.showDescription ? <RichText
									onChange={ value => setAttributes( { descriptionText: value } ) }
									value={ attributes.descriptionText }
									placeholder="Enter Details"
									className="component-description-text"
								/> : null }

								{ attributes.linkCta === 'link' ? <RichText
									onChange={ value => setAttributes( { linkText: value } ) }
									value={ attributes.linkText }
									placeholder="Enter CTA"
									className="component-description-text"
								/> : attributes.linkCta === 'button' ?
									<button className="component-cta btn">
										<RichText
											onChange={ value => setAttributes( { linkText: value } ) }
											value={ attributes.linkText }
											placeholder="Enter CTA"
											className="component-cta-text"
										/>
									</button> : null }
							</div>
						</div>
					</div>
				);
			}
			return (
				<div className="choose-image-button-container">
					<MediaUploadCheck>
						<MediaUpload
							onSelect={ media => {
								setAttributes( {
									imageAlt: media.alt,
									imageUrl: media.url,
								} );
							} }
							type="image"
							value={ attributes.imageID }
							render={ () => (
								<Button onClick={ openEvent } className="button button-large">
									Choose Image
								</Button>
							) }
						/>
					</MediaUploadCheck>
				</div>
			);
		};
		// Creates a <p class='wp-block-cgb-block-g1-3-full-width-image-text'></p>.
		return (
			<div className={ 'wp-block-cgb-block-g1-3-full-width-image-text' }>
				<InspectorControls>
					<ToggleControl
						label={ __( 'Show Label' ) }
						checked={ attributes.showTopLabel }
						onChange={ () =>
							setAttributes( { showTopLabel: ! attributes.showTopLabel } )
						}
					/>
					<ToggleControl
						label={ __( 'Show Heading' ) }
						checked={ attributes.showHeading }
						onChange={ () =>
							setAttributes( { showHeading: ! attributes.showHeading } )
						}
					/>
					<ToggleControl
						label={ __( 'Show Description' ) }
						checked={ attributes.showDescription }
						onChange={ () =>
							setAttributes( { showDescription: ! attributes.showDescription } )
						}
					/>
					<ToggleControl
						label={ __( 'Show Background' ) }
						checked={ attributes.showTextBg }
						onChange={ () => {
							removeTextBoxStyles();
							setAttributes( { showTextBg: ! attributes.showTextBg } );
						}
						}
					/>
					<ColorPicker
						color={ attributes.boxColor }
						onChangeComplete={
							value => setAttributes( { boxColor: `rgba(${ value.rgb.r }, ${ value.rgb.g }, ${ value.rgb.b }, ${ value.rgb.a })` } )
						}
					/>
					<RadioControl
						label="Text Position"
						selected={ attributes.textPosition }
						options={ [
							{ label: 'Left', value: 'left' },
							{ label: 'Right', value: 'right' },
						] }
						title="Text Position"
						onChange={ value => setAttributes( { textPosition: value } ) }
					/>
					<RadioControl
						label="Select CTA Type"
						selected={ attributes.linkCta }
						options={ [
							{ label: 'Link', value: 'link' },
							{ label: 'Button', value: 'button' },
							{ label: 'None', value: 'none' },
						] }
						title="Select CTA type"
						onChange={ value => setAttributes( { linkCta: value } ) }
					/>
					<TextControl
						type="text"
						label={ __( 'Add CTA Link Url' ) }
						value={ attributes.linkURL }
						className="business-hours__close"
						placeholder={ 'Add Url' }
						onChange={ value => setAttributes( { linkURL: value } ) }
					/>
				</InspectorControls>
				<MediaUploadCheck>
					<MediaUpload
						onSelect={ media => {
							setAttributes( {
								imageAlt: media.alt,
								imageUrl: media.url,
							} );
						} }
						type="image"
						value={ attributes.imageID }
						render={ ( { open } ) => getImageButton( open ) }
					/>
				</MediaUploadCheck>
			</div>
		);
	},

	save: function( { attributes } ) {
		const BgStyle = {
			backgroundImage: 'url(' + attributes.imageUrl + ')',
			backgroundSize: 'cover',
			backgroundPosition: 'center',

		};
		const textBoxBgColor = {
			backgroundColor: attributes.boxColor,
		};
		return (
			<div
				className={ `wp-block-cgb-block-g1-3-full-width-image-text ${
					attributes.imageUrl ? 'component-background-img' : null
				}` }
				style={ BgStyle }>
				<div className={ `${ attributes.textPosition === 'left' ? 'component-container left' : attributes.textPosition === 'right' ? 'component-container right' : '' }` }>
					<div className={ `component-cta-bg ${ attributes.showTextBg ? '' : 'no-bg' }` } style={ textBoxBgColor }>
						{ attributes.topLabel ? <div>
							<div className="component-top-label">
								{ attributes.topLabel }
								<span className="component-top-label-line"></span>
							</div>
						</div> : null }
						{ attributes.headingText ? <div>
							<h1 className="component-title">
								{ attributes.headingText }
							</h1>
						</div> : null }
						{ attributes.descriptionText ? <div>
							<p className="component-description-text">
								{ attributes.descriptionText }</p>
						</div> : null }
						{ attributes.linkCta === 'link' ? <div>
							<div className="component-cta-link">
								<p><a target="_blank" href={ `${ attributes.linkURL }` } rel="noopener noreferrer">{ attributes.linkText }{ arrowRight }</a></p>
							</div>
						</div> : attributes.linkCta === 'button' ?
							<button className="component-cta btn">
								<a target="_blank" href={ `${ attributes.linkURL }` } rel="noopener noreferrer">{ attributes.linkText }<span className="chevron right" /></a>
							</button> : null }
					</div>
				</div>
			</div>
		);
	},
} );
