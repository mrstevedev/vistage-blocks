/**
 * BLOCK: column-4-stats
 *
 * G4.1 4-Column Stats
 */

import './style.scss';
import './editor.scss';

const { __ } = wp.i18n;
const { ColorIndicator, ColorPicker, PanelBody, RadioControl, SVG, ToggleControl, TextareaControl, TextControl } = wp.components;
const { registerBlockType } = wp.blocks;
const { InspectorControls } = wp.editor;
const { Component } = wp.element;

const lineSVG = <SVG xmlns="http://www.w3.org/2000/svg" width="29" height="3" viewBox="0 0 29 3">
	<path fill="none" fillRule="evenodd" stroke="#EDC11C" strokeLinecap="square" strokeWidth="2" d="M1.221 1.5H27.78" />
</SVG>;

class StatsBlockBack extends Component {
	constructor( props ) {
		super( ...arguments );
		this.props = props;
		this.onChange = this.onChange.bind( this );
		this.state = props.blockData;
	}
	onChange( inputValue, fieldName ) {
		const state = this.state;
		state[ fieldName ] = inputValue;
		this.setState( state );
		this.props.onChange( state );
	}
	render() {
		return <div className={ `g41__stats__block g41__stats__block__${ this.props.key }` }>
			<TextControl
				onChange={ inputValue => this.onChange( inputValue, 'numberText' ) }
				value={ this.state.numberText }
				placeholder="Number"
				className="g41__stats__number"
			/>
			<TextControl
				onChange={ inputValue => this.onChange( inputValue, 'labelText' ) }
				value={ this.state.labelText }
				placeholder="Label"
				className="g41__stats__label"
			/>
			{ lineSVG }
			<TextareaControl
				onChange={ inputValue => this.onChange( inputValue, 'bodyText' ) }
				value={ this.state.bodyText }
				placeholder="Description"
				className="g41__stats__body"
				rows="3"
			/>
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
registerBlockType( 'vistage-blocks/column-4-stats', {
	title: __( 'G4.1 4-Column Stats' ),
	icon: 'format-image',
	category: 'layout',

	attributes: {
		updateFlag: {
			type: Boolean,
			default: false,
		},
		showHeading: {
			type: Boolean,
			default: true,
		},
		headingText: {
			type: 'string',
			default: '',
		},
		blocks: {
			type: 'array',
			default: [],
		},
		textColor: {
			type: 'string',
			default: '#000000',
		},
		textboxColor: {
			type: 'string',
			default: 'rgba(0, 63, 95, 0.1)',
		},
		numberOfBlocks: {
			type: 'string',
			default: '4',
		},
	},
	keywords: [
		__( '4-Column Stats' ),
		__( 'Vistage' ),
		__( 'g4.1' ),
	],

	edit( { attributes, setAttributes } ) {
		if ( 0 === attributes.blocks.length ) {
			attributes.blocks = [ {}, {}, {}, {} ];
			attributes.updateFlag = ! attributes.updateFlag;
			setAttributes( attributes );
		}

		console.debug( attributes );

		return (
			<div>
				{
					<InspectorControls className="g41__controls">
						<PanelBody>
							<RadioControl
								label="Text Color"
								selected={ attributes.textColor }
								options={ [
									{ label: <span><ColorIndicator colorValue="#000000" /> Black</span>, value: '#000000' },
									{ label: <span><ColorIndicator colorValue="#ffffff" /> White</span>, value: '#ffffff' },
								] }
								onChange={ value => setAttributes( { textColor: value } ) }
							/>
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
							<RadioControl
								label="Number of blocks"
								selected={ attributes.numberOfBlocks }
								options={ [
									{ label: '3 blocks', value: '3' },
									{ label: '4 blocks', value: '4' },
								] }
								onChange={ value => setAttributes( { numberOfBlocks: value } ) }
							/>
						</PanelBody>
					</InspectorControls>
				}
				<div className="g41__container" style={ { color: attributes.textColor } }>
					<div className="g41__background" style={ { backgroundColor: attributes.textboxColor } }></div>
					{ attributes.showHeading ? <h2 className="g41__heading" style={ { color: attributes.textColor } }>
						<TextControl
							onChange={ value => setAttributes( { headingText: value, updateFlag: ! attributes.updateFlag } ) }
							value={ attributes.headingText }
							placeholder="Heading"
						/>
					</h2> : null }
					<div className={ `g41__stats g41__stats__${ attributes.numberOfBlocks }-blocks` }>
						{ attributes.blocks.map( ( blockData, index ) => (
							<StatsBlockBack key={ index } blockData={ blockData } onChange={ newBlockData => {
								attributes.blocks[ index ] = newBlockData;
								attributes.updateFlag = ! attributes.updateFlag;
								setAttributes( { blocks: attributes.blocks, updateFlag: attributes.updateFlag } );
							} } />
						) ) }
					</div>
				</div>
			</div>
		);
	},

	save( { attributes } ) {
		return (
			<div className="g41__container" style={ { color: attributes.textColor } }>
				<div className="g41__background" style={ { backgroundColor: attributes.textboxColor, color: attributes.textColor } }></div>
				{ attributes.showHeading ? <h2 className="g41__heading" style={ { color: attributes.textColor } }>
					{ attributes.headingText }
				</h2> : null }
				<div className={ `g41__stats g41__stats__${ attributes.numberOfBlocks }-blocks` }>
					{ attributes.blocks.map( ( blockData, index ) => (
						<div key={ index } className={ `g41__stats__block g41__stats__block__${ index }` }>
							<div className="g41__stats__number"> { blockData.numberText } </div>
							<div className="g41__stats__label"> { blockData.labelText } </div>
							{ lineSVG }
							<p className="g41__stats__body"> { blockData.bodyText } </p>
						</div>
					) ) }
				</div>
			</div>
		);
	},
} );
