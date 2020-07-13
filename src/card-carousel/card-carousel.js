/**
 * BLOCK: card-carousel
 *
 * Card Carousel
 */

import './card.js';
import './style.scss';
import './editor.scss';

const { __ } = wp.i18n;
const { PanelBody, SVG, ToggleControl, TextControl } = wp.components;
const { registerBlockType } = wp.blocks;
const { InnerBlocks, InspectorControls } = wp.editor;

const cardTemplate = 'vistage-blocks/card-carousel-card';

import { Iconset } from '../includes/iconset/iconset.js';

const arrowLeft = <SVG xmlns="http://www.w3.org/2000/svg" width="46" height="46" viewBox="0 0 46 46">
	<g fill="none" fillRule="evenodd" transform="rotate(-90 23 23)">
		<circle cx="23" cy="23" r="23" fill="#A5A5A5" opacity=".65" />
		<path fill="#ECECEC" d="M31.092 25.56a.487.487 0 0 1-.002.679l-1.594 1.616a.459.459 0 0 1-.553.075l-3.209-3.263a3.836 3.836 0 0 0-.331-.3l-2.154-2.19a.464.464 0 0 0-.341-.14.463.463 0 0 0-.341.14l-2.154 2.19c-.114.093-.226.192-.332.3l-3.209 3.263a.458.458 0 0 1-.552-.075l-1.594-1.616a.487.487 0 0 1-.002-.679l7.83-8.02a.466.466 0 0 1 .354-.14.466.466 0 0 1 .353.14l7.83 8.02z" />
	</g>
</SVG>;

const arrowRight = <SVG xmlns="http://www.w3.org/2000/svg" width="46" height="46" viewBox="0 0 46 46">
	<g fill="none" fillRule="evenodd" transform="rotate(-90 23 23)">
		<circle cx="23" cy="23" r="23" fill="#A5A5A5" opacity=".65" />
		<path fill="#ECECEC" d="M31.092 21.83a.487.487 0 0 0-.002-.679l-1.594-1.616a.459.459 0 0 0-.553-.075l-3.209 3.263a3.836 3.836 0 0 1-.331.3l-2.154 2.19a.464.464 0 0 1-.341.14.463.463 0 0 1-.341-.14l-2.154-2.19a3.865 3.865 0 0 1-.332-.3l-3.209-3.263a.458.458 0 0 0-.552.075l-1.594 1.616a.487.487 0 0 0-.002.679l7.83 8.02c.097.098.226.145.354.14a.466.466 0 0 0 .353-.14l7.83-8.02z" />
	</g>
</SVG>;

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
registerBlockType( 'vistage-blocks/card-carousel', {
	title: __( 'Card Carousel' ),
	icon: 'format-image',
	category: 'layout',

	attributes: {
		updateFlag: {
			type: 'number',
		},
		showHeading: {
			type: Boolean,
			default: true,
		},
		headingText: {
			type: 'string',
			default: '',
		},
		cards: {
			type: 'array',
		},
		numberOfCards: {
			type: 'number',
			default: 3,
		},
		showImage: {
			type: Boolean,
			default: true,
		},
		showCardHeading: {
			type: Boolean,
			default: true,
		},
		showDescription: {
			type: Boolean,
			default: true,
		},
	},

	edit( { attributes, setAttributes } ) {
		const onCardEdit = cardAttributes => {
			const id = cardAttributes.id,
				cards = attributes.cards;
			cards[ id ][ 1 ] = cardAttributes;
			setAttributes( { cards: cards, updateFlag: Math.random() } );
		};

		const cardProps = {
			showImage: attributes.showImage,
			showHeading: attributes.showCardHeading,
			showDescription: attributes.showDescription,
		};

		if ( undefined === attributes.cards ) {
			attributes.cards = [ [ cardTemplate, { ...cardProps, onEdit: onCardEdit, id: 0 } ], [ cardTemplate, { ...cardProps, onEdit: onCardEdit, id: 1 } ], [ cardTemplate, { ...cardProps, onEdit: onCardEdit, id: 2 } ] ];
			setAttributes( { cards: attributes.cards, updateFlag: Math.random() } );
		} else {
			attributes.cards.forEach( card => {
				if ( undefined === card[ 1 ].onEdit ) {
					card[ 1 ].onEdit = onCardEdit;
					card[ 1 ].showImage = attributes.showImage;
					card[ 1 ].showHeading = attributes.showCardHeading;
					card[ 1 ].showDescription = attributes.showDescription;
				}
			} );
		}

		return (
			<div>
				{
					<InspectorControls className="card-carousel__controls">
						<PanelBody>
							<h3>Carousel Options</h3>
							<ToggleControl
								label="Show Heading" checked={ attributes.showHeading }
								onChange={ value => setAttributes( { showHeading: value } ) }
							/>
							<TextControl
								value={ attributes.numberOfCards }
								placeHolder="Left text"
								label={ 'Cards (3-100, page refresh required)' }
								type="number"
								min={ 3 }
								max={ 100 }
								onChange={ value => {
									const cards = attributes.cards;
									let needRefresh = false;
									while ( value > cards.length ) {
										cards.push( [ cardTemplate, { ...cardProps, onEdit: onCardEdit, id: parseInt( value ) - 1 } ] );
										needRefresh = true;
									}
									while ( value < cards.length ) {
										cards.pop();
										needRefresh = true;
									}
									setAttributes( { numberOfCards: parseInt( value ), needRefresh: needRefresh, updateFlag: Math.random(), cards: cards } );
								} }
							/>
						</PanelBody>
						<PanelBody>
							<h3>Card Options</h3>
							<ToggleControl
								label="Show Image" checked={ attributes.showImage }
								onChange={ value => setAttributes( { showImage: value } ) }
							/>
							<ToggleControl
								label="Show Heading" checked={ attributes.showCardHeading }
								onChange={ value => setAttributes( { showCardHeading: value } ) }
							/>
							<ToggleControl
								label="Show Description" checked={ attributes.showDescription }
								onChange={ value => setAttributes( { showDescription: value } ) }
							/>
						</PanelBody>
					</InspectorControls>
				}
				<div className="card-carousel__container">
					{ attributes.showHeading ? <h3 className="card-carousel__heading">
						<TextControl
							onChange={ value => setAttributes( { headingText: value } ) }
							value={ attributes.headingText }
							placeholder="Heading"
						/>
					</h3> : null }
					<div className={ `card-carousel__cards ${ attributes.showImage ? '' : 'hide-image' } ${ attributes.showCardHeading ? '' : 'hide-heading' } ${ attributes.showDescription ? '' : 'hide-description' } card-carousel__cards__${ attributes.numberOfCards }-cards` }>
						<InnerBlocks templateLock="all" template={ attributes.cards } />
					</div>
					{ attributes.needRefresh ? <div className="card-carousel__need-refresh">
						<h2>Please save draft, update or publish and refresh page to reflect changes.</h2>
					</div> : null }
				</div>
			</div>
		);
	},

	save( { attributes } ) {
		return (
			<div className="card-carousel__container">
				{ attributes.showHeading ? <h3 className="card-carousel__heading">
					{ attributes.headingText }
				</h3> : null }
				<div data-numberOfCards={ attributes.numberOfCards } className={ `card-carousel__cards card-carousel__desktop-only card-carousel__cards__${ attributes.numberOfCards }-cards` } style={ `width: calc( ${ attributes.numberOfCards * ( 100 / 3 ) }% + ${ attributes.numberOfCards * 0.925 }rem);` }>
					{ attributes.cards.map( ( card, index ) => {
						if ( index >= attributes.numberOfCards ) {
							return null;
						}
						const cardData = card[ 1 ];
						const cardContent = <span>
							{ attributes.showImage ? <figure className="card-carousel__cards__card__image">
								<img alt="" src={ cardData.imageAttributes ? ( cardData.imageAttributes.sizedUrl || cardData.imageAttributes.url ) : '' } />
							</figure> : null }
							{ attributes.showCardHeading && cardData.linkURL ? <a href={ cardData.linkURL }>
								<h6 className="card-carousel__cards__card__heading">
									{ cardData.headingText }
								</h6>
							</a> : null }
							{ attributes.showCardHeading && ! cardData.linkURL ? <h6 className="card-carousel__cards__card__heading">
								{ cardData.headingText }
							</h6> : null }
							{ attributes.showDescription && cardData.linkURL ? <a href={ cardData.linkURL }>
								<p className="card-carousel__cards__card__description">
									{ cardData.descriptionText }
								</p>
							</a> : null }
							{ attributes.showDescription && ! cardData.linkURL ? <p className="card-carousel__cards__card__description">
								{ cardData.descriptionText }
							</p> : null }
							{ cardData.showIcon ? <Iconset icon={ cardData.icon } /> : null }
						</span>;
						return <div key={ index } className="card-carousel__cards__card" style={ `width: calc( ${ 100 / attributes.numberOfCards }% - 2.8rem);` }>{ cardContent }</div>;
					} ) }
					<a href="./" className="card-carousel__cards__arrow card-carousel__cards__arrow__left">{ arrowLeft }</a>
					<a href="./" className="card-carousel__cards__arrow card-carousel__cards__arrow__right">{ arrowRight }</a>
				</div>
				<div data-numberOfCards={ attributes.numberOfCards } className={ `card-carousel__cards card-carousel__mobile-only card-carousel__cards__${ attributes.numberOfCards }-cards` } style={ `width: calc( ${ attributes.numberOfCards * 100 }% + ${ attributes.numberOfCards * 2.85 }rem);` }>
					{ attributes.cards.map( ( card, index ) => {
						if ( index >= attributes.numberOfCards ) {
							return null;
						}
						const cardData = card[ 1 ];
						const cardContent = <span>
							{ attributes.showImage ? <figure className="card-carousel__cards__card__image">
								<img alt="" src={ cardData.imageAttributes ? ( cardData.imageAttributes.sizedUrl || cardData.imageAttributes.url ) : '' } />
							</figure> : null }
							{ attributes.showCardHeading && cardData.linkURL ? <a href={ cardData.linkURL }>
								<h6 className="card-carousel__cards__card__heading">
									{ cardData.headingText }
								</h6>
							</a> : null }
							{ attributes.showCardHeading && ! cardData.linkURL ? <h6 className="card-carousel__cards__card__heading">
								{ cardData.headingText }
							</h6> : null }
							{ attributes.showDescription && cardData.linkURL ? <a href={ cardData.linkURL }>
								<p className="card-carousel__cards__card__description">
									{ cardData.descriptionText }
								</p>
							</a> : null }
							{ attributes.showDescription && ! cardData.linkURL ? <p className="card-carousel__cards__card__description">
								{ cardData.descriptionText }
							</p> : null }
							{ cardData.showIcon ? <Iconset icon={ cardData.icon } /> : null }
						</span>;
						return <div key={ index } className="card-carousel__cards__card" style={ `width: calc( ${ 100 / attributes.numberOfCards }% - 2.8rem);` }>{ cardContent }</div>;
					} ) }
					<a href="./" className="card-carousel__cards__arrow card-carousel__cards__arrow__left">{ arrowLeft }</a>
					<a href="./" className="card-carousel__cards__arrow card-carousel__cards__arrow__right">{ arrowRight }</a>
				</div>
			</div>
		);
	},
} );
