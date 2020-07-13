
/**
 * BLOCK: challenge-solution
 *
 * Challenge & Solution
 */

import './style.scss';
import './editor.scss';
import { Iconset } from '../includes/iconset/iconset.js';

const { __ } = wp.i18n;
const { ColorPicker, PanelBody, TextControl, TextareaControl, ToggleControl, RangeControl } = wp.components;
const { registerBlockType } = wp.blocks;
const { InnerBlocks, InspectorControls, RichText } = wp.editor;
const { Component } = wp.element;
const { select } = wp.data;

function getImageAttributes( clientId ) {
	try {
		const parentBlock = select( 'core/editor' ).getBlocksByClientId( clientId )[ 0 ];
		const childBlocks = parentBlock.innerBlocks;
		return childBlocks[ 0 ].attributes;
	} catch ( error ) {
		return undefined;
	}
}

class ChallengeItem extends Component {
	constructor( props ) {
		super( ...arguments );
		this.props = props;
		this.onChange = this.onChange.bind( this );
		this.state = props.itemData;
		this.state.baseClass = this.props.baseClass ? this.props.baseClass : '';
	}
	onChange( fieldName, value ) {
		const state = this.state;
		state[ fieldName ] = value;
		this.setState( state );
		this.props.onChange( state, this.props.buttonNumber );
	}
	render() {
		return <div className={ `${ this.state.baseClass }__item` }>
			<div className={ `${ this.state.baseClass }__item__challenge` }>
				{ this.props.showIcons ? <Iconset
					icon={ this.state.icon }
					label={ `Select an icon (${ this.props.buttonNumber })` }
					onChange={ value => this.onChange( 'icon', value ) }
					baseClass={ `${ this.state.baseClass }__item__` }
				/> : null }
				<RichText
					value={ this.state.challenge }
					placeholder={ __( 'Challenge', 'vistage' ) }
					onChange={ value => this.onChange( 'challenge', value ) }
				/>
			</div>
			<Iconset icon="arrowRight" baseClass={ `${ this.state.baseClass }__item__arrow__` } />
			<div className={ `${ this.state.baseClass }__item__solution` }>
				<RichText
					value={ this.state.solution }
					placeholder={ __( 'Solution', 'vistage' ) }
					onChange={ value => this.onChange( 'solution', value ) }
				/>
			</div>
		</div>;
	}
}

/**
 * Register: aa Gutenberg Block.
 *
 * Registers a new block provided a unique name and an object defining its
 * behavior. Once registered, the block is made editor as an option to any
 * editor interface where faqs are implemented.
 *
 * @link https://wordpress.org/gutenberg/handbook/block-api/
 * @param  {string}   name     Block name.
 * @param  {Object}   settings Block settings.
 * @return {?WPBlock}          The block, if it has been successfully
 *                             registered; otherwise `undefined`.
 */
registerBlockType( 'vistage-blocks/challenge-solution', {
	title: __( 'Challenge & Solution' ),
	icon: 'format-image',
	category: 'layout',

	attributes: {
		imageAttributes: {
			type: 'object',
		},
		backgroundColor: {
			type: 'string',
			default: 'rgba(0, 63, 95, 1)',
		},
		showHeading: {
			type: 'boolean',
			default: true,
		},
		headingText: {
			type: 'string',
			default: '',
		},
		showImage: {
			type: 'boolean',
			default: true,
		},
		updateFlag: {
			type: 'number',
			default: '0',
		},
		items: {
			type: 'array',
		},
		numberOfItems: {
			type: 'number',
			default: 2,
		},
		showIcons: {
			type: 'boolean',
			default: true,
		},
	},
	keywords: [
		__( 'Challenge & Solution' ),
		__( 'Vistage' ),
	],

	edit( { attributes, setAttributes } ) {
		if ( undefined === attributes.items ) {
			attributes.items = [];
			attributes.items.push( { challenge: '', solution: '' }, { challenge: '', solution: '' } );
			attributes.updateFlag = Math.random();
			setAttributes( { items: attributes.items, updateFlag: attributes.updateFlag } );
		}

		const _setAttributes = setAttributes;

		// eslint-disable-next-line no-eval
		const ref = eval( '_ref' );

		const imageTemplate = [ [ 'core/image', { align: 'full' } ] ];
		if ( undefined !== attributes.imageAttributes ) {
			imageTemplate[ 0 ][ 1 ] = attributes.imageAttributes;
		}
		if ( undefined !== getImageAttributes( ref.clientId ) ) {
			setAttributes( { imageAttributes: getImageAttributes( ref.clientId ) } );
		}

		const imageExists = ( ( getImageAttributes( ref.clientId ) && getImageAttributes( ref.clientId ).url ) || ( undefined === getImageAttributes( ref.clientId ) && attributes.imageAttributes && attributes.imageAttributes.url ) );

		return (
			<div>
				{
					<InspectorControls>
						<PanelBody>
							<div>Background color</div>
							<ColorPicker
								color={ attributes.backgroundColor }
								onChangeComplete={ value => setAttributes( { backgroundColor: `rgba(${ value.rgb.r }, ${ value.rgb.g }, ${ value.rgb.b }, ${ value.rgb.a })` } ) }
								className="challenge-solution__controls__color-picker"
							/>
						</PanelBody>
						<PanelBody>
							<ToggleControl
								label="Show Image" checked={ attributes.showImage }
								onChange={ value => setAttributes( { showImage: value } ) }
							/>
							<ToggleControl
								label="Show Heading" checked={ attributes.showHeading }
								onChange={ value => setAttributes( { showHeading: value } ) }
							/>
							<ToggleControl
								label="Show Icons" checked={ attributes.showIcons }
								onChange={ value => setAttributes( { showIcons: value } ) }
							/>
						</PanelBody>
						<PanelBody>
							<RangeControl
								label="Number of Challenge & Solutions (2 to 6)"
								value={ attributes.numberOfItems }
								onChange={ ( columns ) => {
									const items = attributes.items;
									while ( columns > items.length ) {
										items.push( { challenge: '', solution: '' } );
									}
									setAttributes( { numberOfItems: parseInt( columns ), updateFlag: Math.random(), items: items } );
								} }
								min={ 2 }
								max={ 6 }
							/>

						</PanelBody>
					</InspectorControls>
				}
				<div className="challenge-solution__container">
					{ attributes.showImage ? <div className={ `challenge-solution__image${ imageExists ? ' challenge-solution__image-selected' : 'challenge-solution__image-no-selected' }` }>
						<InnerBlocks templateLock="all" template={ imageTemplate } />
					</div> : null }
					<div
						className={ `challenge-solution__content${ imageExists && attributes.showImage ? ' challenge-solution__image-selected' : 'challenge-solution__image-no-selected' }` }
						style={ { backgroundColor: attributes.backgroundColor } }
					>
						{ attributes.showHeading ? <h4 className="challenge-solution__content__heading">
							<RichText
								value={ attributes.headingText }
								placeholder={ __( 'Heading', 'vistage' ) }
								onChange={ value => setAttributes( { headingText: value } ) }
							/>
						</h4> : null }
						<div className="challenge-solution__content__items">
							{ attributes.items.map( ( itemData, index ) => {
								return index >= attributes.numberOfItems ? null : <ChallengeItem key={ index } buttonNumber={ index + 1 } itemData={ itemData } onChange={
									( newFaqData, buttonNumber ) => {
										const updateFlag = Math.random();
										const items = attributes.items;
										items[ buttonNumber - 1 ].challenge = newFaqData.challenge;
										items[ buttonNumber - 1 ].solution = newFaqData.solution;
										items[ buttonNumber - 1 ].icon = newFaqData.icon;
										_setAttributes( { updateFlag: updateFlag, items: items } );
									}
								} baseClass="challenge-solution__content__items" showIcons={ attributes.showIcons } />;
							} ) }
						</div>
					</div>
				</div>
			</div>
		);
	},

	save( { attributes } ) {
		return (
			<div className="challenge-solution__container" style={ { backgroundImage: attributes.showImage && attributes.imageAttributes && attributes.imageAttributes.url ? `url('${ attributes.imageAttributes.url }')` : '' } }>
				<div
					className="challenge-solution__content challenge-solution__image-selected" style={ { backgroundColor: attributes.backgroundColor } }>
					{ attributes.showHeading ? <h4 className="challenge-solution__content__heading">
						{ attributes.headingText }
					</h4> : null }
					<div className="challenge-solution__content__items">
						{ attributes.items.map( ( itemData, index ) => {
							return index >= attributes.numberOfItems ? null : <div className="challenge-solution__content__items__item">
								{ attributes.showIcons ? <Iconset icon={ itemData.icon } baseClass="challenge-solution__content__items__item__" /> : null }
								<div className="challenge-solution__content__items__item__challenge">
									<h6>Challenge:</h6>
									<p><em>{ itemData.challenge }</em></p>
								</div>
								<Iconset icon="arrowRight" baseClass="challenge-solution__content__items__item__arrow__" />
								<div className="challenge-solution__content__items__item__solution">
									<h6>Solution:</h6>
									<p>{ itemData.solution }</p>
								</div>
							</div>;
						} ) }
					</div>
				</div>
			</div>
		);
	},
} );
