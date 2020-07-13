/**
 * BLOCK: card-carousel-card
 *
 * Carousel Single Card
 */

import './style.scss';
import './editor.scss';

import { Iconset } from '../includes/iconset/iconset.js';

const { __ } = wp.i18n;
const { registerBlockType } = wp.blocks;
const { InnerBlocks, InspectorControls, URLInput } = wp.editor;
const { PanelBody, ToggleControl, TextControl, TextareaControl } = wp.components;
const { select } = wp.data;
const { getPath } = wp.url;
const { apiFetch } = wp;

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
registerBlockType( 'vistage-blocks/card-carousel-card', {
	title: __( 'Carousel Single Card' ),
	icon: 'format-image',
	category: 'layout',
	parent: [ 'vistage-blocks/card-carousel' ],

	attributes: {
		id: {
			type: 'number',
		},
		showImage: {
			type: Boolean,
		},
		showHeading: {
			type: Function,
		},
		headingText: {
			type: 'string',
			default: '',
		},
		showDescription: {
			type: Boolean,
		},
		descriptionText: {
			type: 'string',
			default: '',
		},
		showIcon: {
			type: 'boolean',
			default: true,
		},
		icon: {
			type: 'string',
			default: '',
		},
		linkURL: {
			type: 'string',
			default: '',
		},
		onEdit: {
			type: Function,
		},
		imageAttributes: {
			type: 'object',
		},
	},

	edit( { attributes, setAttributes } ) {
		const dispatchAttributes = ( ( obj ) => {
			if ( undefined !== attributes.onEdit ) {
				for ( const k in obj ) {
					attributes[ k ] = obj[ k ];
				}
				attributes.onEdit( attributes );
			}
		} );

		const imageTemplate = [ [ 'core/image', { align: 'full' } ] ];
		if ( undefined !== attributes.imageAttributes ) {
			imageTemplate[ 0 ][ 1 ] = attributes.imageAttributes;
		}

		// eslint-disable-next-line no-eval
		const ref = eval( '_ref' );
		const parentBlock = select( 'core/editor' ).getBlocksByClientId( ref.clientId )[ 0 ];
		const childBlocks = parentBlock.innerBlocks;
		if ( childBlocks.length && ( undefined === attributes.imageAttributes || attributes.imageAttributes.url !== childBlocks[ 0 ].attributes.url ) ) {
			const imageAttributes = childBlocks[ 0 ].attributes;
			apiFetch( { path: `/wp/v2/media/${ childBlocks[ 0 ].attributes.id }` } ).then( media => {
				if ( media && media.media_details && media.media_details.sizes && media.media_details.sizes.cardcarousel_size ) {
					imageAttributes.sizedUrl = media.media_details.sizes.cardcarousel_size.source_url;
				}
				setAttributes( { imageAttributes: imageAttributes } );
				dispatchAttributes( { imageAttributes: imageAttributes } );
			} );
		}

		return (
			<div>
				<InspectorControls className="card-carousel__cards__card__controls">
					<PanelBody title="Tips">
						<div>- Click refresh image button before publishing (if image changed)</div>
						<div>- Image aspect ratios look different in dashboard and frontend</div>
						<div>- You may need to Regenerate Thumbnails if frontend image sizes are different across the cards.</div>
					</PanelBody>
					<PanelBody title="Link">
						<URLInput
							value={ attributes.linkURL }
							label="URL"
							onChange={ text => {
								setAttributes( { linkURL: text } );
								dispatchAttributes( { linkURL: text } );
							} }
						/>
					</PanelBody>
					<PanelBody>
						<ToggleControl
							label="Show Icon"
							checked={ attributes.showIcon }
							onChange={ show => {
								setAttributes( { showIcon: show } );
								dispatchAttributes( { showIcon: show } );
							} }
						/>
					</PanelBody>
				</InspectorControls>
				<div className="card-carousel__cards__card__container">
					<div className="card-carousel__cards__card__image">
						<InnerBlocks templateLock="all" template={ imageTemplate } />
						<button onClick={ () => {} } >{
							undefined !== attributes.imageAttributes && undefined !== attributes.imageAttributes.url ? getPath( attributes.imageAttributes.url ).split( '/' ).pop() + ' (click to refresh)' : 'no image found (click to refresh)'
						}</button>
					</div>
					<h6 className="card-carousel__cards__card__heading">
						<TextControl
							onChange={ value => {
								setAttributes( { headingText: value } );
								dispatchAttributes( { headingText: value } );
							} }
							value={ attributes.headingText }
							placeholder="Heading"
						/>
					</h6>
					<p className="card-carousel__cards__card__description">
						<TextareaControl
							onChange={ value => {
								setAttributes( { descriptionText: value } );
								dispatchAttributes( { descriptionText: value } );
							} }
							value={ attributes.descriptionText }
							placeholder="Description"
							rows="5"
						/>
					</p>
					{ attributes.showIcon ? <Iconset icon={ attributes.icon } label="Select an icon" onChange={ icon => {
						setAttributes( { icon: icon } );
						dispatchAttributes( { icon: icon } );
					} } /> : null }
				</div>
			</div>
		);
	},

	save( { attributes } ) {
		return (
			<div className="card-carousel__cards__card__container">
				<div className="card-carousel__cards__card__image">
					<InnerBlocks.content />
				</div>
				<h6 className="card-carousel__cards__card__heading">
					{ attributes.headingText }
				</h6>
				<p className="card-carousel__cards__card__description">
					{ attributes.descriptionText }
				</p>
			</div>
		);
	},
} );
