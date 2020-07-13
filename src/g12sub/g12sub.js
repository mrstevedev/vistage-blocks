/**
 * BLOCK: sub-navigation
 *
 * G1.2 Sub-Navigation
 */

import './style.scss';
import './editor.scss';

const { __ } = wp.i18n;
const { PanelBody, SVG, ToggleControl, TextControl } = wp.components;
const { registerBlockType } = wp.blocks;
const { InspectorControls } = wp.editor;
const { Component } = wp.element;

const downArrow = <SVG xmlns="http://www.w3.org/2000/svg" width="13" height="7" viewBox="0 0 13 7">
	<path fill="#003F5F" fillRule="nonzero" d="M6.5 7a.936.936 0 0 1-.644-.252l-5.59-5.28a.827.827 0 0 1 0-1.216.949.949 0 0 1 1.288 0L6.5 4.924 11.446.252a.949.949 0 0 1 1.287 0 .826.826 0 0 1 0 1.216l-5.59 5.28A.936.936 0 0 1 6.5 7z" />
</SVG>;

class SubButton extends Component {
	constructor( props ) {
		super( ...arguments );
		this.props = props;
		this.onChange = this.onChange.bind( this );
		this.state = props.blockData;
	}
	onChange( fieldName, value ) {
		const state = this.state;
		state[ fieldName ] = value;
		this.setState( state );
		this.props.onChange( state );
	}
	render() {
		return <span>
			{
				<InspectorControls className="g12sub__controls">
					<PanelBody>
						<TextControl
							value={ this.state.linkURL }
							onChange={ linkURL => this.onChange( 'linkURL', linkURL ) }
							label={ `${ ( this.state.label && this.state.label.length ) ? this.state.label : '#' + this.props.buttonNumber } link` }
						/>
					</PanelBody>
				</InspectorControls>
			}
			<button className={ `g12sub__buttons__button g12sub__buttons__button__${ this.props.buttonNumber }` }>
				<TextControl
					value={ this.state.label }
					placeHolder="Button Label"
					onChange={ value => this.onChange( 'label', value ) }
				/>
			</button>
		</span>;
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
registerBlockType( 'vistage-blocks/sub-navigation', {
	title: __( 'G1.2 Sub-Navigation' ),
	icon: 'format-image',
	category: 'layout',

	attributes: {
		updateFlag: {
			type: Boolean,
			default: false,
		},
		showLeftText: {
			type: Boolean,
			default: true,
		},
		leftText: {
			type: 'string',
			default: '',
		},
		blocks: {
			type: 'array',
			default: [],
		},
		numberOfBlocks: {
			type: 'number',
			default: 1,
		},
		dropdownOpen: {
			type: 'boolean',
			default: false,
		},
	},
	keywords: [
		__( 'Sub Navigation' ),
		__( 'Vistage' ),
		__( 'g1.2 Sub Navigation' ),
	],

	edit( { attributes, setAttributes } ) {
		if ( 0 === attributes.blocks.length ) {
			attributes.blocks = [ {} ];
			attributes.updateFlag = ! attributes.updateFlag;
			setAttributes( attributes );
		}
		const _setAttributes = setAttributes;

		return (
			<div>
				{
					<InspectorControls className="g12sub__controls">
						<PanelBody>
							<ToggleControl
								label="Show Left Text" checked={ attributes.showLeftText }
								onChange={ value => setAttributes( { showLeftText: value } ) }
							/>
						</PanelBody>
						<PanelBody>
							<TextControl
								value={ attributes.numberOfBlocks }
								placeHolder="Left text"
								label="Number of blocks (max 20)"
								type="number"
								min={ 1 }
								max={ 20 }
								onChange={ value => {
									const blocks = attributes.blocks;
									while ( value > blocks.length ) {
										blocks.push( {} );
									}
									setAttributes( { numberOfBlocks: parseInt( value ), updateFlag: ! attributes.updateFlag, blocks: blocks } );
								} }
							/>
						</PanelBody>
					</InspectorControls>
				}
				<div className="g12sub__container">
					{ attributes.showLeftText ? <h9 className="g12sub__left-text">
						<TextControl
							value={ attributes.leftText }
							placeHolder="Left text"
							onChange={ value => setAttributes( { leftText: value } ) }
						/>
					</h9> : null }
					<div className={ `g12sub__buttons g12sub__buttons__${ attributes.numberOfBlocks }-blocks` }>
						{ attributes.blocks.map( ( blockData, index ) => {
							return index >= attributes.numberOfBlocks ? null : <SubButton key={ index } buttonNumber={ index + 1 } blockData={ blockData } onChange={ ( newBlockData => {
								const updateFlag = ! attributes.updateFlag;
								const blocks = attributes.blocks;
								blocks[ index ] = newBlockData;
								_setAttributes( { updateFlag: updateFlag, blocks: blocks } );
							} ) } />;
						} ) }
					</div>
				</div>
			</div>
		);
	},

	save( { attributes } ) {
		return (
			<div className="g12sub__container container">
				{ attributes.showLeftText ? <h9 className="g12sub__left-text g12sub__desktop_only">
					{ attributes.leftText }
				</h9> : null }
				<div className={ `g12sub__buttons g12sub__desktop_only g12sub__buttons__${ attributes.numberOfBlocks }-blocks` }>
					{ attributes.blocks.map( ( blockData, index ) => {
						return index >= attributes.numberOfBlocks ? null : <a href={ blockData.linkURL }>
							<button className={ `g12sub__buttons__button g12sub__buttons__button${ index }` }>
								{ blockData.label }
							</button>
						</a>;
					} ) }
				</div>
				<div className={ `g12sub__dropdown g12sub__mobile_only g12sub__dropdown__${ attributes.numberOfBlocks }-blocks` }>
					<button className="g12sub__dropdown__toggle-button" >
						{ attributes.leftText }
						&nbsp;&nbsp;
						{ downArrow }
					</button>
					<div className={ `g12sub__dropdown__items ${ attributes.dropdownOpen ? 'active' : '' }` }>
						{ attributes.blocks.map( ( blockData, index ) => {
							return index >= attributes.numberOfBlocks ? null : <a href={ blockData.linkURL }>
								<button className={ `g12sub__dropdown__items__button g12sub__dropdown__items__button${ index }` }>
									{ blockData.label }
								</button>
							</a>;
						} ) }
					</div>
				</div>
			</div>
		);
	},
} );
