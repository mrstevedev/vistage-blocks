/**
 * BLOCK: cards-with-icon
 *
 * G3.1 Cards with Icon
 */

import './style.scss';
import './editor.scss';

const { __ } = wp.i18n;
const { Disabled, PanelBody, SelectControl, SVG, ToggleControl, TextareaControl, TextControl } = wp.components;
const { registerBlockType } = wp.blocks;
const { InspectorControls, URLInput } = wp.editor;
const { Component } = wp.element;

const rightArrow = <SVG xmlns="http://www.w3.org/2000/svg" width="20" height="15" viewBox="0 0 20 15">
	<path fill="#EDC11C" fillRule="nonzero" d="M13.253.63a.695.695 0 0 0-.992 0 .7.7 0 0 0 0 .981l5.03 5.03H.694A.691.691 0 0 0 0 7.336c0 .386.307.704.694.704h16.597l-5.03 5.02a.712.712 0 0 0 0 .992.695.695 0 0 0 .992 0l6.22-6.22a.683.683 0 0 0 0-.982L13.253.63z" />
</SVG>;

import { icons } from '../includes/iconset/icons.js';

const iconOptions = [];
let defaultIcon;
for ( const value in icons ) {
	if ( undefined === defaultIcon ) {
		defaultIcon = value;
	}
	iconOptions.push( { label: icons[ value ].label, value: value } );
}

const defaultCardData = {
	showIcon: true,
	showHeading: true,
	showDescription: true,
	showCTAButton: true,
	headingText: '',
	descriptionText: '',
	ctaText: '',
	ctaLink: '',
	icon: defaultIcon,
};

class IconCard extends Component {
	constructor( props ) {
		super( ...arguments );
		this.props = props;
		this.onChange = this.onChange.bind( this );
		this.state = props.cardData;
	}
	onChange( inputValue, fieldName ) {
		const state = this.state;
		state[ fieldName ] = inputValue;
		this.setState( state );
		this.props.onChange( state );
	}
	render() {
		const linkURLControl = <URLInput
			value={ this.state.ctaLink }
			label="CTA button URL"
			onChange={ ctaLink => this.onChange( ctaLink, 'ctaLink' ) }
		/>;
		return <div>
			<InspectorControls className="g31__controls">
				<PanelBody>
					<div>{ `${ this.state.headingText ? this.state.headingText : 'Card' } (${ this.props.cardNumber + 1 }/${ this.props.numberOfCards })` }</div><br />
					<SelectControl
						label="Select an icon"
						value={ this.state.icon }
						options={ iconOptions }
						onChange={ value => this.onChange( value, 'icon' ) }
					/>
					<ToggleControl
						label="Show Heading" checked={ this.state.showHeading }
						onChange={ value => this.onChange( value, 'showHeading' ) }
					/>
					<ToggleControl
						label="Show Description" checked={ this.state.showDescription }
						onChange={ value => this.onChange( value, 'showDescription' ) }
					/>
					<ToggleControl
						label="Show CTA button" checked={ this.state.showCTAButton }
						onChange={ value => this.onChange( value, 'showCTAButton' ) }
					/>
					{ this.state.showCTAButton ? linkURLControl : <Disabled> { linkURLControl } </Disabled> }
				</PanelBody>
			</InspectorControls>
			<div className={ `g31__cards__card g31__cards__card${ this.props.cardNumber }` }>
				{ this.state.showIcon ? <figure className="g31__cards__card__icon">
					{ icons[ this.state.icon ].svg }
				</figure> : null }
				{ this.state.showHeading ? <h5 className="g31__cards__card__heading">
					{ 'true' === this.props.frontend ? this.state.headingText : <TextControl
						onChange={ inputValue => this.onChange( inputValue, 'headingText' ) }
						value={ this.state.headingText }
						placeholder="Heading"
					/> }
				</h5> : null }
				{ this.state.showDescription ? <p className="g31__cards__card__description">
					{ 'true' === this.props.frontend ? this.state.descriptionText : <TextareaControl
						onChange={ inputValue => this.onChange( inputValue, 'descriptionText' ) }
						value={ this.state.descriptionText }
						placeholder="Description"
						className="g31__cards__card__description"
						rows="5"
					/> }
				</p> : null }
				{ this.state.showCTAButton && 'true' === this.props.frontend ? <a href={ this.state.ctaLink } className="g31__cards__card__cta-button">
					<span className="g31__cards__card__cta-button__text">{ this.state.ctaText }</span>
					{ rightArrow }
				</a> : null }
				{ this.state.showCTAButton && 'true' !== this.props.frontend ? <div className="g31__cards__card__cta-button">
					<TextControl
						onChange={ inputValue => this.onChange( inputValue, 'ctaText' ) }
						value={ this.state.ctaText }
						placeholder="Button text"
					/>
					{ rightArrow }
				</div> : null }
			</div>
		</div>;
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
registerBlockType( 'vistage-blocks/cards-with-icon', {
	title: __( 'G3.1 Cards with Icon' ),
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
			default: [],
		},
		numberOfCards: {
			type: 'number',
			default: 3,
		},
	},
	keywords: [
		__( 'Card with Icon' ),
		__( 'Vistage' ),
		__( 'g3.1' ),
	],

	edit( { attributes, setAttributes } ) {
		if ( 0 === attributes.cards.length ) {
			attributes.cards = [ { ...defaultCardData }, { ...defaultCardData }, { ...defaultCardData } ];
			attributes.updateFlag = Math.random();
			setAttributes( attributes );
		}

		const _setAttributes = setAttributes.bind( this );

		return (
			<div>
				{
					<InspectorControls className="g31__controls">
						<PanelBody>
							<ToggleControl
								label="Show Heading" checked={ attributes.showHeading }
								onChange={ value => setAttributes( { showHeading: value } ) }
							/>
						</PanelBody>
						<PanelBody>
							<TextControl
								value={ attributes.numberOfCards }
								placeHolder="Left text"
								label="Number of cards (1 to 6)"
								type="number"
								min={ 1 }
								max={ 6 }
								onChange={ value => {
									const cards = attributes.cards;
									while ( value > cards.length ) {
										cards.push( { ...defaultCardData } );
									}
									setAttributes( { numberOfCards: parseInt( value ), updateFlag: Math.random, cards: cards } );
								} }
							/>
						</PanelBody>
					</InspectorControls>
				}
				<div className="g31__container">
					{ attributes.showHeading ? <h3 className="g31__heading">
						<TextControl
							onChange={ value => setAttributes( { headingText: value } ) }
							value={ attributes.headingText }
							placeholder="Heading"
						/>
					</h3> : null }
					<div className={ `g31__cards g31__cards__${ attributes.numberOfCards }-cards` }>
						{ attributes.cards.map( ( cardData, index ) => (
							attributes.numberOfCards > index ? <IconCard key={ index } numberOfCards={ attributes.numberOfCards } cardNumber={ index } cardData={ cardData } onChange={ newBlockData => {
								attributes.cards[ index ] = newBlockData;
								_setAttributes( { cards: attributes.cards, updateFlag: Math.random() } );
							} } /> : null
						) ) }
					</div>
				</div>
			</div>
		);
	},

	save( { attributes } ) {
		return (
			<div className="g31__container">
				{ attributes.showHeading ? <h3 className="g31__heading">
					{ attributes.headingText }
				</h3> : null }
				<div className={ `g31__cards g31__cards__${ attributes.numberOfCards }-cards` }>
					{ attributes.cards.map( ( cardData, index ) => (
						attributes.numberOfCards > index ? <IconCard key={ index } cardNumber={ index } cardData={ cardData } frontend="true" /> : null
					) ) }
				</div>
			</div>

		);
	},
} );
