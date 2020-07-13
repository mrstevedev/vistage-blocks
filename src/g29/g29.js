/**
 * BLOCK: stats
 *
 * G2.9 Stats
 */

import './style.scss';
import './editor.scss';

const { __ } = wp.i18n;
const { Disabled, PanelBody, RangeControl, ToggleControl, TextareaControl, TextControl } = wp.components;
const { registerBlockType } = wp.blocks;
const { InspectorControls, URLInput } = wp.editor;
const { Component } = wp.element;

const lineSVG = <svg xmlns="http://www.w3.org/2000/svg" width="29" height="3" viewBox="0 0 29 3">
	<path fill="none" fillRule="evenodd" stroke="#EDC11C" strokeLinecap="square" strokeWidth="2" d="M1.221 1.5H27.78" />
</svg>;

const rightArrow = <svg xmlns="http://www.w3.org/2000/svg" width="7" height="13" viewBox="0 0 7 13">
	<path fill="#FFFFFF" fillRule="nonzero" d="M7 6.5a.936.936 0 0 1-.252.644l-5.28 5.59a.827.827 0 0 1-1.216 0 .949.949 0 0 1 0-1.288L4.924 6.5.252 1.554a.949.949 0 0 1 0-1.287.826.826 0 0 1 1.216 0l5.28 5.59c.168.177.252.41.252.643z" />
</svg>;

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
		return <div className={ `g29__stats__block g29__stats__block__${ this.props.blockNumber }` }>
			<TextControl
				onChange={ inputValue => this.onChange( inputValue, 'numberText' ) }
				value={ this.state.numberText }
				placeholder="Number"
				className="g29__stats__number"
			/>
			<TextControl
				onChange={ inputValue => this.onChange( inputValue, 'labelText' ) }
				value={ this.state.labelText }
				placeholder="Label"
				className="g29__stats__label"
			/>
			{ lineSVG }
		</div>;
	}
}

function nFormatter( rawNum, digits = 1 ) {
	const regex = /[\d\.,]+/m;
	const match = regex.exec( rawNum );
	if ( ! match || 0 === match.length ) {
		return rawNum;
	}
	const num = parseFloat( match[ 0 ].replace( /,/g, '' ) );
	const si = [
		{ value: 1, symbol: '' },
		{ value: 1E3, symbol: 'k' },
		{ value: 1E6, symbol: 'M' },
		{ value: 1E9, symbol: 'G' },
		{ value: 1E12, symbol: 'T' },
		{ value: 1E15, symbol: 'P' },
		{ value: 1E18, symbol: 'E' },
	];
	const rx = /\.0+$|(\.[0-9]*[1-9])0+$/;
	let i;
	for ( i = si.length - 1; i > 0; i-- ) {
		if ( num >= si[ i ].value ) {
			break;
		}
	}
	const r = ( num / si[ i ].value ).toFixed( digits ).replace( rx, '$1' ) + si[ i ].symbol;
	return 'NaN' === r ? rawNum : rawNum.replace( regex, r );
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
registerBlockType( 'vistage-blocks/stats', {
	title: __( 'G2.9 Stats' ),
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
		showDescription: {
			type: Boolean,
			default: true,
		},
		descriptionText: {
			type: 'string',
			default: '',
		},
		showCTAButton: {
			type: Boolean,
			default: true,
		},
		ctaText: {
			type: 'string',
			default: '',
		},
		blocks: {
			type: 'array',
			default: [],
		},
		numberOfBlocks: {
			type: 'string',
			default: '3',
		},
	},
	keywords: [
		__( 'Stats Block' ),
		__( 'Vistage' ),
		__( 'g2.9' ),
	],

	edit( { attributes, setAttributes } ) {
		if ( 0 === attributes.blocks.length ) {
			attributes.blocks = [ {}, {}, {} ];
			attributes.updateFlag = Math.random();
			setAttributes( attributes );
		}
		const linkURLControl = <URLInput
			value={ attributes.linkURL }
			label="CTA button URL"
			onChange={ text => setAttributes( { linkURL: text } ) }
		/>;

		const _setAttributes = setAttributes.bind( this );

		return (
			<div>
				{
					<InspectorControls className="g29__controls">
						<PanelBody>
							<ToggleControl
								label="Show Heading" checked={ attributes.showHeading }
								onChange={ value => setAttributes( { showHeading: value } ) }
							/>
							<ToggleControl
								label="Show Description" checked={ attributes.showDescription }
								onChange={ value => setAttributes( { showDescription: value } ) }
							/>
						</PanelBody>
						<PanelBody>
							<ToggleControl
								label="Show CTA button" checked={ attributes.showCTAButton }
								onChange={ value => setAttributes( { showCTAButton: value } ) }
							/>
							{ attributes.showCTAButton ? linkURLControl : <Disabled> { linkURLControl } </Disabled> }
						</PanelBody>
						<PanelBody>
							<RangeControl
								label="Number of blocks"
								value={ parseInt( attributes.numberOfBlocks ) }
								onChange={ value => setAttributes( { numberOfBlocks: value } ) }
								min={ 1 }
								max={ 3 }
							/>
						</PanelBody>
					</InspectorControls>
				}
				<div className="g29__container">
					<div className="g29__text">
						{ attributes.showHeading ? <h4 className="g29__text__heading">
							<TextareaControl
								onChange={ value => setAttributes( { headingText: value } ) }
								value={ attributes.headingText }
								placeholder="Heading"
								rows="2"
							/>
						</h4> : null }
						{ attributes.showDescription ? <TextareaControl
							onChange={ value => setAttributes( { descriptionText: value } ) }
							value={ attributes.descriptionText }
							placeholder="Description"
							className="g29__text__description"s
							rows="5"
						/> : null }
						{ attributes.showCTAButton ? <button className="g29__text__cta-button">
							<TextControl
								value={ attributes.ctaText }
								placeHolder="Button Label"
								onChange={ value => setAttributes( { ctaText: value } ) }
							/>
							{ rightArrow }
						</button> : null }
					</div>
					<div className={ `g29__stats g29__stats__${ attributes.numberOfBlocks }-blocks` }>
						{ attributes.blocks.map( ( blockData, index ) => (
							<StatsBlockBack key={ index } blockNumber={ index } blockData={ blockData } onChange={ newBlockData => {
								attributes.blocks[ index ] = newBlockData;
								attributes.updateFlag = Math.random();
								_setAttributes( attributes );
							} } />
						) ) }
					</div>
				</div>
			</div>
		);
	},

	save( { attributes } ) {
		return (
			<div className="g29__container">
				<div className="g29__text">
					{ attributes.showHeading ? <h4 className="g29__text__heading">
						{ attributes.headingText }
					</h4> : null }
					{ attributes.showDescription ? <p>{ attributes.descriptionText }</p> : null }
					<div className={ `g29__stats g29__stats__${ attributes.numberOfBlocks }-blocks g29__mobile_only` }>
						{ attributes.blocks.map( ( blockData, index ) => (
							<div key={ index } className={ `g29__stats__block g29__stats__block__${ index }` }>
								<div className="g29__stats__number g29__desktop-only"> { blockData.numberText } </div>
								<div className="g29__stats__number g29__mobile-only"> { nFormatter( blockData.numberText ) } </div>
								<div className="g29__stats__label"> { blockData.labelText } </div>
								{ lineSVG }
							</div>
						) ) }
					</div>
					{ attributes.showCTAButton ? <a href={ attributes.linkURL }>
						<button className="g29__text__cta-button">
							{ attributes.ctaText }
							&nbsp;&nbsp;
							{ rightArrow }
						</button>
					</a> : null }
				</div>
				<div className={ `g29__stats g29__stats__${ attributes.numberOfBlocks }-blocks g29__desktop_only` }>
					{ attributes.blocks.map( ( blockData, index ) => (
						<div key={ index } className={ `g29__stats__block g29__stats__block__${ index }` }>
							<div className="g29__stats__number g29__desktop-only"> { blockData.numberText } </div>
							<div className="g29__stats__number g29__mobile-only"> { nFormatter( blockData.numberText ) } </div>
							<div className="g29__stats__label"> { blockData.labelText } </div>
							{ lineSVG }
						</div>
					) ) }
				</div>
			</div>
		);
	},
} );
