/**
 * BLOCK: G2.6 Testimonial Video with Text Right
 *
 * G2.6 Testimonial Video with Text Right
 */

import './editor.scss';
import './style.scss';

const { __ } = wp.i18n;
const { registerBlockType } = wp.blocks;
const {
	ToggleControl,
	TextControl,
	SelectControl,
	ColorPicker,
	Spinner,
} = wp.components;
const {
	InspectorControls,
	RichText } = wp.editor;
const { Component, Fragment } = wp.element;
const { apiFetch } = wp;

const defaultAttributes = {
	showTopLabel: true,
	showTextBackground: true,
	showCTALink: true,
	color: '236,236,236',
	hexColor: '#ececec',
};

const switchToEditing = () => {
	this.setAttributes( { editing: true } );
};

const arrowRight = (
	<svg className="arrow-icon" xmlns="http://www.w3.org/2000/svg" width="20" height="15" viewBox="0 0 20 15">
	<path fill="#EDC11C" fillRule="nonzero" d="M13.253.63a.695.695 0 0 0-.992 0 .7.7 0 0 0 0 .981l5.03 5.03H.694A.691.691 0 0 0 0 7.336c0 .386.307.704.694.704h16.597l-5.03 5.02a.712.712 0 0 0 0 .992.695.695 0 0 0 .992 0l6.22-6.22a.683.683 0 0 0 0-.982L13.253.63z" />
	</svg>
);

/**
 * Register: A Gutenberg Block.
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

registerBlockType( 'vistage-blocks/g26a-testimonial-video-text-right', {
	title: __( 'G2.6a Testimonial Video + Text Right' ),
	icon: 'format-image',
	category: 'layout',
	attributes: {
		showTopLabel: {
			type: Boolean,
		},
		showTextBackground: {
			type: Boolean,
		},
		showTopLabel: {
			type: Boolean,
		},
		showCTALink: {
			type: Boolean,
		},
		editing: {
			type: Boolean,
		},
		optionsValues: {
			type: 'array',
		},
		currentOptionValue: {
			type: 'number',
		},
		color: {
			type: 'string',
			default: '236,236,236',
		},
		linkURL: {
			type: 'string',
		},
		linkText: {
			type: 'string',
		},
		newTestimonial: {
			type: 'string',
		},
		videoID: {
			type: 'number',
		},
		videoAlt: {
			type: 'string',
		},
		videoUrl: {
			type: 'string',
		},
		videoTitle: {
			type: 'string',
		},
		newVideoUrl: {
			type: 'string',
		},
		hexColor: {
			type: 'string',
			default: '#ececec',
		},
		descriptionText: {
			type: 'string',
		},
		nameText: {
			type: 'string',
		},
		positionTitleText: {
			type: 'string',
		},
		testimonialQuote: {
			type: 'string',
		},
		testimonialName: {
			type: 'string',
		},
		testimonialTitle: {
			type: 'string',
		},
	},

	edit: class extends Component {
		constructor() {
			super( ...arguments );
		}
		componentDidMount() {
			if ( undefined === this.props.attributes.showCTALink ) {
				this.props.setAttributes( defaultAttributes );
			}

			const optionsArr = [];
			const testimonialObj = [];

			this.props.setAttributes( { color: this.props.attributes.color } );

			Promise.all( [
				apiFetch( { path: '/wp/v2/member-stories?orderby=rand&per_page=1' } ),
				apiFetch( { path: '/wp/v2/member-stories' } ),
			] ).then( ( [ response1, response2 ] ) => {
				response1.map( data => {
					testimonialObj.push( {
						id: data.id,
						title: data.title,
						content: data.content.rendered,
					} );

					this.props.setAttributes( { newTestimonial: data.content.rendered } );
					this.props.setAttributes( { currentOptionValue: data.id } );

					localStorage.setItem( 'randomSingleTestimonial', JSON.stringify( testimonialObj ) );
					localStorage.setItem( 'testimonial_ID', JSON.stringify( data.id ) );

					const randomSingle = JSON.parse( localStorage.getItem( 'randomSingleTestimonial' ) );

					const html = randomSingle[ 0 ].content;
					const testimonialName = $(html).find('.wp-block-column:nth-child(2) h2').html();
					const testimonialTitle = $(html).find('.wp-block-column:nth-child(2) p:nth-child(2)').html();
					const testimonialQuote = $(html).find('.wp-block-column:nth-child(2) p:nth-child(3)').html();

					this.props.setAttributes( { testimonialQuote: testimonialQuote } );
					this.props.setAttributes( { testimonialName: testimonialName } );
					this.props.setAttributes( { testimonialTitle: testimonialTitle } );

				} );
				response2.map( data => {
					optionsArr.push( {
						value: data.id,
						label: data.title.rendered,
						content: data.content.rendered,
					} );
					this.props.setAttributes( { optionsValues: optionsArr } );
				} );
			} );
		}

		componentWillUnmount() {
			localStorage.removeItem( 'randomSingleTestimonial' );
		}

		updateTextBoxRgbValues = value => {
			const textBox = document.querySelector('.g26a__column-right-testimonial');
			const newRgbValues = Object.values( value.rgb );
			const newRgbValuesToString = newRgbValues.toString();
			textBox.style.backgroundColor = `rgba(${ newRgbValuesToString })`;
			this.props.setAttributes( { color: newRgbValuesToString } );
			this.props.setAttributes( { hexColor: value.hex } );
		};

		selectNewTestimonial = value => {
			const newSelectedTestimonial = this.props.attributes.optionsValues;
			const result = newSelectedTestimonial.filter( obj => {
				return obj.value == value;
			} );

			const html = result[ 0 ].content;
			console.log( result[ 0 ].content );
			const testimonialName = $(html).find('.wp-block-column:nth-child(2) h2').html();
			const testimonialTitle = $(html).find('.wp-block-column:nth-child(2) p:nth-child(2)').html();
			const testimonialQuote = $(html).find('.wp-block-column:nth-child(2) p:nth-child(3)').html();

			this.props.setAttributes( { testimonialQuote: testimonialQuote } );
			this.props.setAttributes( { testimonialName: testimonialName } );
			this.props.setAttributes( { testimonialTitle: testimonialTitle } );

			this.props.setAttributes( { newTestimonial: result[ 0 ].content } );
			this.props.setAttributes( { updatedTestimonial: result[ 0 ].content } );
			this.props.setAttributes( { currentOptionValue: value } );
			fetch(`/wp-json/wp/v2/member-stories/${ this.props.attributes.currentOptionValue }`)
				.then( response => response.json() ).then( data => {
					const renderedContent = data.content.rendered;
			 } );
		};

		render() {
			const {
				newTestimonial,
				color,
				hexColor,
				linkURL } = this.props.attributes;
			const textBoxBgColor = {
				backgroundColor: `rgba(${ color })`,
			};
			return (
				<div className="g26a__container">
					{
						<InspectorControls>
							<ToggleControl
								label={ __( 'Show Text Background' ) }
								checked={ this.props.attributes.showTextBackground }
								onChange={ value => {
									this.props.setAttributes( { showTextBackground: value } );
									this.props.setAttributes( {
										showTextBackground: ! this.props.attributes
											.showTextBackground,
									} );
								}
								}
							/>
							<ToggleControl
								label={ __( 'Show CTA Link' ) }
								checked={ this.props.attributes.showCTALink }
								onChange={ () =>
									this.props.setAttributes( {
										showCTALink: ! this.props.attributes
											.showCTALink,
									} )
								}
							/>
							<ColorPicker
								color={ hexColor }
								onChangeComplete={ value => {
									this.updateTextBoxRgbValues( value );
								} }
							/>
							<SelectControl
								label={ __( 'Select A Testimonial' ) }
								value={ this.props.attributes.currentOptionValue }
								options={ this.props.attributes.optionsValues }
								onChange={ value => {
									this.selectNewTestimonial( value );
								} }
							/>

							<TextControl
								label={ __( 'Add CTA Link' ) }
								placeholder={ __( 'CTA Link' ) }
								value={ linkURL }
								onChange={ value => this.props.setAttributes( { linkURL: value } ) }
							/>
						</InspectorControls>
					}
					<div className="g26a__column-left">
						{ newTestimonial ? (
								<div
								className={ 'g26a__testimonial-video' }>
							<div dangerouslySetInnerHTML={ { __html: newTestimonial } } />
							</div>
						) : (
							<Spinner />
						) }
					</div>
					<div className="g26a__column-right">
						{ newTestimonial ? (
							<Fragment>
								<div className={ `g26a__column-right-testimonial ${
									this.props.attributes.showTextBackground ? '' : 'no-bg'
								}` } style={ textBoxBgColor }>
									<p dangerouslySetInnerHTML={ { __html: `\"${ this.props.attributes.testimonialQuote }\"` } } />
									<h2 dangerouslySetInnerHTML={ { __html: this.props.attributes.testimonialName } } />
									<p dangerouslySetInnerHTML={ { __html: this.props.attributes.testimonialTitle } } />

									<div className="g26a__column-right-rich-text-container">
										{ this.props.attributes.showCTALink ? (
										<RichText
											className="g26__column-right-testimonial-link"
											tagName="div"
											value={ this.props.attributes.linkText }
											placeholder={ __( 'Add CTA Text' ) }
											onChange={ value => this.props.setAttributes( { linkText: value } ) }
										 />
									   ) : null }
									</div>
								</div>
							</Fragment>
						) : (
							<Spinner />
						) }
					</div>
				</div>
			);
		}
	},

	save: ( { attributes } ) => {
		const { newTestimonial } = attributes;
		const { color, linkText, linkURL } = attributes;
		const textBoxBgColor = {
			backgroundColor: `rgba(${ color })`,
		};
		return (
			<div className="g26a__container">
				<div className="g26a__column-left">
					<div className="g26a__column-left-testimonial-video video">
						<div dangerouslySetInnerHTML={ { __html: newTestimonial } } />
					</div>
				</div>
				<div className="g26a__column-right">
					<div className={ `g26a__column-right-testimonial ${ attributes.showTextBackground == false ? 'no-bg' : '' }` } style={ textBoxBgColor }>
						<p dangerouslySetInnerHTML={ { __html: `\"${ attributes.testimonialQuote }\"` } } />
						<h2 dangerouslySetInnerHTML={ { __html: attributes.testimonialName } } />
						<p dangerouslySetInnerHTML={ { __html: attributes.testimonialTitle } } />
						{ attributes.showCTALink ? <a className="link--arrowed" href={ linkURL }>{ linkText }{ arrowRight }</a> : null }
					</div>
				</div>
			</div>
		);
	},
} );
