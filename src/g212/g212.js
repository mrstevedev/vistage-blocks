/**
 * BLOCK: download-button
 *
 * G2.12 Download
 */

import './style.scss';
import './editor.scss';
import { iconArticle } from './icon.js';
import { Iconset } from '../includes/iconset/iconset.js';
const { __ } = wp.i18n;
const { Button, ColorPicker, Disabled, PanelBody, RadioControl, SVG, ToggleControl, TextareaControl, TextControl } = wp.components;
const { registerBlockType } = wp.blocks;
const { InnerBlocks, InspectorControls } = wp.editor;
const { select } = wp.data;
const { getPath } = wp.url;

const $ = jQuery;

const rightArrow = <SVG xmlns="http://www.w3.org/2000/svg" width="7" height="13" viewBox="0 0 7 13">
	<path fill="#FFFFFF" fillRule="nonzero" d="M7 6.5a.936.936 0 0 1-.252.644l-5.28 5.59a.827.827 0 0 1-1.216 0 .949.949 0 0 1 0-1.288L4.924 6.5.252 1.554a.949.949 0 0 1 0-1.287.826.826 0 0 1 1.216 0l5.28 5.59c.168.177.252.41.252.643z" />
</SVG>;

const templates = [
	[ 'core/image', { align: 'full' } ],
	[ 'core/file' ],
];

function getImageURL( clientId ) {
	try {
		return getChildBlockData( clientId, 0, 'url' );
	} catch ( error ) {
		return undefined;
	}
}
function getFileURL( clientId ) {
	try {
		return getChildBlockData( clientId, 1, 'href' );
	} catch ( error ) {
		return undefined;
	}
}
function getChildBlockData( clientId, blockIndex, fieldName ) {
	try {
		const parentBlock = select( 'core/editor' ).getBlocksByClientId( clientId )[ 0 ];
		if ( ! parentBlock || ! parentBlock.innerBlocks ) {
			return undefined;
		}
		const childBlocks = parentBlock.innerBlocks;

		return childBlocks[ blockIndex ].attributes[ fieldName ];
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
registerBlockType( 'vistage-blocks/download-button', {
	title: __( 'G2.12 Download' ),
	icon: 'format-image',
	category: 'layout',

	attributes: {
		textboxColor: {
			type: 'string',
			default: 'rgba(0, 63, 95, 0.1)',
		},
		showHeading: {
			type: 'boolean',
			default: true,
		},
		headingText: {
			type: 'string',
			default: '',
		},
		showDescription: {
			type: 'boolean',
			default: true,
		},
		descriptionText: {
			type: 'string',
			default: '',
		},
		showCTAButton: {
			type: 'boolean',
			default: true,
		},
		showIcon: {
			type: 'boolean',
			default: true,
		},
		icon: {
			type: 'string',
			default: '',
		},
		libraryLink: {
			type: 'boolean',
			default: true,
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
		__( 'Download Button' ),
		__( 'Vistage' ),
		__( 'g2.12' ),
	],

	edit( { attributes, setAttributes } ) {
		const dispatchAttributes = ( ( obj ) => {
			if ( undefined !== attributes.onEdit ) {
				for ( const k in obj ) {
					attributes[ k ] = obj[ k ];
				}
				attributes.onEdit( attributes );
			}
		} );
		const linkURLControl = <TextControl
			value={ attributes.libraryLink && getPath( attributes.linkURL ) ? getPath( attributes.linkURL ).split( '/' ).pop() : attributes.linkURL }
			placeHolder="Your URL here"
			onChange={ value => setAttributes( { linkURL: value } ) }
		/>;

		const libraryLinkEditControl = <Button isDefault isLarge onClick={ () => {
			$( `#${ ref.clientId } [data-type="core/file"]` ).eq( 0 ).focus();
			setTimeout( () => $( `#${ ref.clientId } [data-type="core/file"] [aria-label="Edit file"]` ).eq( 0 ).trigger( 'click' ), 1 );
		} }>
			Edit Library Link
		</Button>;

		// eslint-disable-next-line no-eval
		const ref = eval( '_ref' );
		if ( attributes.libraryLink && getFileURL( ref.clientId ) !== attributes.linkURL ) {
			setAttributes( { linkURL: getFileURL( ref.clientId ) } );
		}

		const libraryLinkControlOpacity = getFileURL( ref.clientId ) ? { opacity: 0 } : null;
		const libraryLinkControl = <div className="g212__left__file" style={ libraryLinkControlOpacity }>
			<InnerBlocks templateLock="all" template={ templates } />
		</div>;

		if ( attributes.libraryLink ) {
			$( `#${ ref.clientId } [data-type="core/file"]` ).eq( 0 ).off( 'focusin' ).off( 'focusout' ).focusin(
				() => $( '.components-panel__body.edit-post-settings-sidebar__panel-block' ).hide()
			).focusout(
				() => $( '.components-panel__body.edit-post-settings-sidebar__panel-block' ).show()
			);
		}

		return (
			<div>
				{
					<InspectorControls className="g212__controls">
						<PanelBody>
							<div>Background color</div>
							<ColorPicker
								color={ attributes.textboxColor }
								onChangeComplete={ value => setAttributes( { textboxColor: `rgba(${ value.rgb.r }, ${ value.rgb.g }, ${ value.rgb.b }, ${ value.rgb.a })` } ) }
								className="g41__controls__color-picker"
							/>
						</PanelBody>
						<PanelBody>
							<ToggleControl
								label="Show Heading" checked={ attributes.showHeading }
								onChange={ value => setAttributes( { showHeading: value } ) }
							/>
						</PanelBody>
						<PanelBody>
							<ToggleControl
								label="Show Description" checked={ attributes.showDescription }
								onChange={ value => setAttributes( { showDescription: value } ) }
							/>
						</PanelBody>
						<PanelBody>
							<ToggleControl
								label="Show CTA Button" checked={ attributes.showCTAButton }
								onChange={ value => setAttributes( { showCTAButton: value } ) }
							/>
							<RadioControl
								label="CTA Button link options"
								selected={ attributes.libraryLink }
								options={ [
									{ label: 'Select from library', value: true },
									{ label: 'Insert from URL', value: false },
								] }
								onChange={ value => setAttributes( { libraryLink: ( 'true' === value ) } ) }
							/>
							{ attributes.showCTAButton && ! attributes.libraryLink ? linkURLControl : <Disabled>{ linkURLControl }</Disabled> }
							{ attributes.showCTAButton && attributes.libraryLink && getFileURL( ref.clientId ) ? libraryLinkEditControl : null }
						</PanelBody>
						<PanelBody>
							<ToggleControl
								label="Show Icon" checked={ attributes.showIcon }
								onChange={ value => setAttributes( { showIcon: value } ) }
							/>
						</PanelBody>
					</InspectorControls>
				}
				<div className="g212__container" id={ ref.clientId }>
					<div className="g212__background" style={ { backgroundColor: attributes.textboxColor } }></div>
					<div className="g212__left g212__column">
						{ attributes.showHeading ? <h4 className="g212__left__heading">
							<TextareaControl
								onChange={ value => setAttributes( { headingText: value } ) }
								value={ attributes.headingText }
								placeholder="Heading text"
								rows="2"
							/>
						</h4> : null }
						{ attributes.showDescription ? <TextareaControl
							onChange={ value => setAttributes( { descriptionText: value } ) }
							value={ attributes.descriptionText }
							placeholder="Description text"
							className="g212__right__description"
							rows="5"
						/> : null }
						{ attributes.showCTAButton ? <button className="g212__left__cta-button">
							<TextControl
								value={ attributes.ctaText }
								placeHolder="Enter Button Label"
								onChange={ value => setAttributes( { ctaText: value } ) }
							/>
							{ rightArrow }
						</button> : null }
						{ attributes.showCTAButton && attributes.libraryLink ? libraryLinkControl : null }
					</div>
					<div className="g212__right g212__column">

						<div className={ `g212__right__image ${ getImageURL( ref.clientId ) ? 'has_image' : '' }` } >
							<InnerBlocks className="g212__right__image" templateLock="all" template={ templates } />
							{/*{ attributes.showIcon ? <div className="g212__right__image__icon" >{ iconArticle }</div> : null }*/}

							{ attributes.showIcon ? <Iconset className="g212__right__image__icon" icon={ attributes.icon } label="Select an icon" onChange={ icon => {
								setAttributes( { icon: icon } );
								dispatchAttributes( { icon: icon } );
							} } /> : null }

						</div>
					</div>
				</div>
			</div>
		);
	},
	save( { attributes } ) {
		return (
			<div className="g212__container">
				<div className="g212__background" style={ { backgroundColor: attributes.textboxColor } }></div>
				<div className="g212__left g212__column">
					{ attributes.showHeading ? <div className="g212__left__heading">
						<h4>{ attributes.headingText }</h4>
					</div> : null }
					{ attributes.showDescription ? <p className="g212__left__paragraph">
						{ attributes.descriptionText }
					</p> : null }
					{ attributes.showCTAButton ? <a href={ attributes.linkURL }>
						<button className="g212__left__cta-button">
							{ attributes.ctaText }
							&nbsp;&nbsp;
							{ rightArrow }
						</button>
					</a> : null }
				</div>
				<div className="g212__right g212__column">
					<div className="g212__right__image">
						<InnerBlocks.Content />
						{ attributes.showIcon ? <Iconset className="g212__right__image__icon" icon={ attributes.icon } /> : null }
					</div>
				</div>
			</div>
		);
	},
} );
