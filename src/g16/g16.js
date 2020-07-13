/**
 * BLOCK: faq
 *
 * 1-Column Component: FAQ
 */

import './style.scss';
import './editor.scss';

const { __ } = wp.i18n;
const { PanelBody, SVG, TextControl, TextareaControl } = wp.components;
const { registerBlockType } = wp.blocks;
const { InspectorControls } = wp.editor;
const { Component } = wp.element;

const crossIcon = <svg className="cross-icon" xmlns="http://www.w3.org/2000/svg" width="24" height="24">
	<path fill="#003F5F" d="M13.3 13.3V20c0 .5-.5 1-1 1h-.6a1 1 0 0 1-1-1v-6.7H4a1 1 0 0 1-1-1v-.6c0-.5.4-1 1-1h6.7V4c0-.5.5-1 1-1h.6c.5 0 1 .4 1 1v6.7H20c.5 0 1 .5 1 1v.6c0 .5-.4 1-1 1h-6.7z" />
</svg>;

const crossIconOpen = <svg className="cross-icon-open" xmlns="http://www.w3.org/2000/svg" width="24" height="24">
	<path fill="#0079B6" d="M4 13a1 1 0 0 1-1-1c0-.6.4-1 1-1h16c.6 0 1 .4 1 1s-.4 1-1 1H4z" />
</svg>;

class FaqItem extends Component {
	constructor( props ) {
		super( ...arguments );
		this.props = props;
		this.onChange = this.onChange.bind( this );
		this.state = props.faqData;
	}
	onChange( fieldName, value ) {
		const state = this.state;
		state[ fieldName ] = value;
		this.setState( state );
		this.props.onChange( state, this.props.buttonNumber );
	}
	render() {
		return <div className="g16__questions__item">
			<div className="g16__questions__item__question">
				<h6>
					{ crossIcon }
					<TextControl
						value={ this.state.question }
						placeHolder="Question"
						onChange={ value => this.onChange( 'question', value ) }
					/>
				</h6>
			</div>
			<p className="g16__questions__item__answer">
				<TextareaControl
					value={ this.state.answer }
					placeHolder="Answer"
					onChange={ value => this.onChange( 'answer', value ) }
					rows="5"
				/>
			</p>
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
registerBlockType( 'vistage-blocks/faq', {
	title: __( 'G1.6 F.A.Q. Block' ),
	icon: 'format-image',
	category: 'layout',

	attributes: {
		updateFlag: {
			type: 'number',
			default: '0',
		},
		faqs: {
			type: 'array',
		},
		numberOfFaqs: {
			type: 'number',
			default: 1,
		},
	},
	keywords: [
		__( 'Frequently Asked Questions' ),
		__( 'Vistage' ),
		__( 'g1.6' ),
	],

	edit( { attributes, setAttributes } ) {
		if ( undefined === attributes.faqs ) {
			attributes.faqs = [];
			attributes.faqs.push( { question: '', answer: '' } );
			attributes.updateFlag = Math.random();
			setAttributes( { faqs: attributes.faqs, updateFlag: attributes.updateFlag } );
		}

		const _setAttributes = setAttributes;

		return (
			<div>
				{
					<InspectorControls className="g15__controls">
						<PanelBody>
							<TextControl
								value={ attributes.numberOfFaqs }
								label="Number of FAQs (max 100)"
								type="number"
								min={ 1 }
								max={ 100 }
								onChange={ value => {
									const faqs = attributes.faqs;
									while ( value > faqs.length ) {
										faqs.push( { question: '', answer: '' } );
									}
									setAttributes( { numberOfFaqs: parseInt( value ), updateFlag: Math.random(), faqs: faqs } );
								} }
							/>
						</PanelBody>
					</InspectorControls>
				}
				<div className="g16__container">
					<h2 className="g16__heading">Frequently asked questions</h2>
					<div className="g16__questions">
						{ attributes.faqs.map( ( faqData, index ) => {
							return index >= attributes.numberOfFaqs ? null : <FaqItem key={ index } buttonNumber={ index + 1 } faqData={ faqData } onChange={
								( newFaqData, buttonNumber ) => {
									const updateFlag = Math.random();
									const faqs = attributes.faqs;
									faqs[ buttonNumber - 1 ].question = newFaqData.question;
									faqs[ buttonNumber - 1 ].answer = newFaqData.answer;
									_setAttributes( { updateFlag: updateFlag, faqs: faqs } );
								}
							} />;
						} ) }
					</div>
				</div>
			</div>
		);
	},

	save( { attributes } ) {
		return (
			<div className="g16__container">
				<h2 className="g16__heading">Frequently asked questions</h2>
				<div className="g16__questions">
					{ attributes.faqs ? attributes.faqs.map( ( faqData, index ) => {
						return index >= attributes.numberOfFaqs ? null : <div className="g16__questions__item">
							<div className="g16__questions__item__question">
								<h6>{ crossIcon }{ crossIconOpen }{ faqData.question }</h6>
							</div>
							<p className="g16__questions__item__answer">{ faqData.answer }</p>
						</div>;
					} ) : null }
				</div>
			</div>
		);
	},
} );
