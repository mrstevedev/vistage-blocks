/**
 * BLOCK: g51-1-column-testimonial-block
 *
 * Registering a basic block with Gutenberg.
 * Simple block, renders and saves the same content without any interactivity.
 */

//  Import CSS.
import './style.scss';
import './editor.scss';

const { __ } = wp.i18n; // Import __() from wp.i18n
const { ToggleControl, SelectControl, PanelBody, Spinner } = wp.components;
const { registerBlockType } = wp.blocks; // Import registerBlockType() from wp.blocks
const { InspectorControls } = wp.editor;
const { apiFetch } = wp;
const { Component } = wp.element;

const testimonialIcon = (
	<svg
		className="vdc24__testimonial-icon"
		xmlns="http://www.w3.org/2000/svg"
		width="60"
		height="60"
		viewBox="0 0 58 58"
	>
		<circle cx="29" cy="29" r="29" fill="#FFF" />
		<path
			fill="#003F5F"
			fillRule="nonzero"
			d="M29 0C13.01 0 0 13.01 0 29s13.01 29 29 29 29-13.01 29-29S44.99 0 29 0zM14.356 43.282c-.325.214-1.139.403-1.615-.113l-.88-1.076c-.424-.7.09-1.35.424-1.619 1.584-1.28 2.737-2.27 3.456-2.971 1.41-1.444 2.452-2.89 3.14-4.331.158-.33-.244-.539-.453-.605-5.196-1.659-7.795-4.583-7.795-8.772 0-2.468.842-4.473 2.524-6.015 1.683-1.542 3.792-2.313 6.325-2.313 2.257 0 4.256 1.002 5.998 3.007 1.703 1.889 2.553 3.933 2.553 6.131 0 6.441-4.558 12.667-13.677 18.677zm20.3 0c-.325.214-1.139.403-1.615-.113l-.88-1.076c-.424-.7.09-1.35.424-1.619 1.584-1.28 2.737-2.27 3.456-2.971 1.41-1.444 2.452-2.89 3.14-4.331.158-.33-.244-.539-.453-.605-5.196-1.659-7.795-4.583-7.795-8.772 0-2.468.842-4.473 2.524-6.015 1.684-1.542 3.792-2.313 6.325-2.313 2.257 0 4.256 1.002 5.998 3.007 1.702 1.889 2.553 3.933 2.553 6.131 0 6.441-4.559 12.667-13.677 18.677z"
		/>
	</svg>
);

const storyIcon = (
	<svg
		className="vdc24__story-icon"
		xmlns="http://www.w3.org/2000/svg"
		width="60"
		height="60"
		viewBox="0 0 60 60"
	>
		<g fill="none" fillRule="evenodd">
			<path
				fill="#003F5F"
				d="M30 0C13.458 0 0 13.458 0 30s13.458 30 30 30 30-13.458 30-30S46.542 0 30 0z"
			/>
			<path d="M11 9h40v40H11z" />
			<path
				fill="#FFF"
				d="M40.167 16.5c-3.25 0-6.75.667-9.167 2.5-2.417-1.833-5.917-2.5-9.167-2.5-2.416 0-4.983.367-7.133 1.317-1.217.55-2.033 1.733-2.033 3.083v18.8c0 2.167 2.033 3.767 4.133 3.233 1.633-.416 3.367-.6 5.033-.6 2.6 0 5.367.434 7.6 1.534 1 .5 2.134.5 3.117 0 2.233-1.117 5-1.534 7.6-1.534 1.667 0 3.4.184 5.033.6 2.1.55 4.134-1.05 4.134-3.233V20.9c0-1.35-.817-2.533-2.034-3.083-2.133-.95-4.7-1.317-7.116-1.317zM46 37.717c0 1.05-.967 1.816-2 1.633a21.014 21.014 0 0 0-3.833-.333c-2.834 0-6.917 1.083-9.167 2.5V22.333c2.25-1.416 6.333-2.5 9.167-2.5 1.533 0 3.05.15 4.5.467A1.69 1.69 0 0 1 46 21.933v15.784z"
			/>
		</g>
	</svg>
);

const videoIcon = (
	<svg
		className="vdc24__video-icon"
		xmlns="http://www.w3.org/2000/svg"
		width="60"
		height="60"
		viewBox="0 0 60 60"
	>
		<g fill="none" fillRule="evenodd">
			<path d="M18 14h27v30H18z" />
			<circle cx="30" cy="30" r="30" fill="#FFF" />
			<path
				fill="#003F5F"
				d="M30 0C13.44 0 0 13.44 0 30c0 16.56 13.44 30 30 30 16.56 0 30-13.44 30-30C60 13.44 46.56 0 30 0zm-6 39.495v-20.99c0-1.23 1.409-1.95 2.398-1.2l13.995 10.496c.81.6.81 1.799 0 2.398L26.398 40.695c-.99.75-2.398.03-2.398-1.2z"
			/>
		</g>
	</svg>
);

const defaultAttributes = {
	showIcon: true,
};

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
registerBlockType( 'vistage-blocks/g51-1-column-testimonial-block', {
	// Block name. Block names must be string that contains a namespace prefix. Example: my-plugin/my-custom-block.
	title: __( 'G5.1 1-Column Testimonial Block' ), // Block title.
	icon: 'format-image', // Block icon from Dashicons → https://developer.wordpress.org/resource/dashicons/.
	category: 'layout', // Block category — Group blocks together based on common traits E.g. common, formatting, layout widgets, embed.
	attributes: {
		embedTemplate: {
			type: 'string',
		},
		showIcon: {
			type: Boolean,
		},
		showStoryIcon: {
			type: Boolean,
		},
		showVideoIcon: {
			type: Boolean,
		},
		showAPIData: {
			type: Boolean,
		},
		text: {
			type: 'string',
		},
		selectedOptions: {
			type: 'string',
		},
		showOptionValue: {
			type: Boolean,
		},
		selectValue: {
			type: 'object',
		},
		optionsValues: {
			type: 'array',
		},
		testimonial: {
			type: 'object',
		},
		testimonialData: {
			type: 'string',
			source: 'html',
		},
		content: {
			type: 'string',
			source: 'html',
		},
		newTestimonial: {
			type: 'string',
			source: 'html',
			selector: '.block-container',
		},
		testimonialImg: {
			type: 'string'
		},
		testimonialName: {
			type: 'string'
		},
		testimonialTitle: {
			type: 'string'
		},
		testimonialText: {
			type: 'string'
		}
	},
	keywords: [
		__( '1 Column Testimonial' ),
		__( 'Vistage' ),
		__( 'ms1' ),
	],

	/**
	 * The edit function describes the structure of your block in the context of the editor.
	 * This represents what the editor will render when the block is used.
	 *
	 * The "edit" property must be a valid function.
	 *
	 * @link https://wordpress.org/gutenberg/handbook/block-api/block-edit-save/
	 */

	edit: class extends Component {
		constructor() {
			super( ...arguments );
		}

		componentDidMount() {
			if ( undefined === this.props.attributes.showLabel ) {
				this.props.setAttributes( defaultAttributes );
			}

			const { newTestimonial } = this.props.attributes;
			const optionsArr = [];
			const labelsArr = [];

			apiFetch( { path: '/wp/v2/member-stories' } ).then( response => {
				response.map( ( data, index ) => {
					const blockContainer = document.querySelector( '.block-container' );

					optionsArr.push( {
						value: data.id,
						label: data.title.rendered,
						content: data.content.rendered,
					} );

					this.props.setAttributes( { testimonialData: data.content.rendered } );

					const randomArr =
						optionsArr[ Math.floor( Math.random() * optionsArr.length ) ];
					localStorage.setItem( 'content', JSON.stringify( optionsArr ) );
					localStorage.setItem( 'singleTestimonial', JSON.stringify( randomArr ) );

					this.props.setAttributes( { optionsValues: optionsArr } );
					const retrieved = JSON.parse( localStorage.getItem( 'content' ) );
					const retrieveSingle = JSON.parse(
						localStorage.getItem( 'singleTestimonial' )
					);
					this.props.setAttributes( { currentOptionValue: retrieveSingle.value } );
					this.props.setAttributes( { newTestimonial: retrieveSingle.content } );

					const html = retrieveSingle.content;
					const testimonialImg = $(html).find('figure').html();
					const testimonialName = $(html).find('.wp-block-column:nth-child(2) h2').html();
					const testimonialTitle = $(html).find('.wp-block-column:nth-child(2) p:nth-child(2)').html();
					const testimonialText = $(html).find('.wp-block-column:nth-child(2) p:nth-child(3)').text();
		
					this.props.setAttributes({ testimonialImg: testimonialImg });
					this.props.setAttributes({ testimonialName: testimonialName });
					this.props.setAttributes({ testimonialTitle: testimonialTitle });
					this.props.setAttributes({ testimonialText: testimonialText });
										
				} );
			} );
		}

		componentWillUnmount() {
			localStorage.removeItem( 'content' );
			localStorage.removeItem( 'singleTestimonial' );
		}

		onChangeContent( value ) {
			const blockContainer = document.querySelector( '.block-container' );
			const testimonialData = this.props.attributes.optionsValues;

			const result = testimonialData.filter( obj => {
				return obj.value == value;
			} );

			localStorage.setItem( 'singleTestimonial', JSON.stringify( result ) );

			this.props.setAttributes( { newTestimonial: result[ 0 ].content } );
			this.props.setAttributes( { currentOptionValue: result.value } );

			const html = result[0].content;
			const testimonialImg = $(html).find('figure').html();
			const testimonialName = $(html).find('.wp-block-column:nth-child(2) h2').html();
			const testimonialTitle = $(html).find('.wp-block-column:nth-child(2) p:nth-child(2)').html();
			const testimonialText = $(html).find('.wp-block-column:nth-child(2) p:nth-child(3)').text();
				
			this.props.setAttributes({ testimonialImg: testimonialImg });
			this.props.setAttributes({ testimonialName: testimonialName });
			this.props.setAttributes({ testimonialTitle: testimonialTitle });
			this.props.setAttributes({ testimonialText: testimonialText });

		}

		render() {
			return (
				<div className="wp-block-cgb-block-g51-1-column-testimonial-block container">
					{
						<InspectorControls>
							<PanelBody title="Icons">
								<ToggleControl
									label={ __( 'Show Testimonial Icon' ) }
									checked={ this.props.attributes.showIcon }
									onChange={ () =>
										this.props.setAttributes( { showIcon: ! this.props.attributes.showIcon } )
									}
								/>
								<ToggleControl
									label={ __( 'Show Story Icon' ) }
									checked={ this.props.attributes.showStoryIcon }
									onChange={ () =>
										this.props.setAttributes( { showStoryIcon: ! this.props.attributes.showStoryIcon } )
									}
								/>
								<ToggleControl
									label={ __( 'Show Video Icon' ) }
									checked={ this.props.attributes.showVideoIcon }
									onChange={ () =>
										this.props.setAttributes( { showVideoIcon: ! this.props.attributes.showVideoIcon } )
									}
								/>
							</PanelBody>

							<PanelBody title="Testimonials">
								<SelectControl
									label={ __( 'Select A Testimonial:' ) }
									value={ this.props.attributes.currentOptionValue }
									options={ this.props.attributes.optionsValues }
									onChange={ value => {
										this.props.setAttributes( { showOptionValue: value } );
										this.onChangeContent( value );
									} }
								/>
							</PanelBody>
						</InspectorControls>
					}
					<div className="block-container">

						<figure dangerouslySetInnerHTML={{ __html: this.props.attributes.testimonialImg }} />						
						<h2 dangerouslySetInnerHTML={{ __html: this.props.attributes.testimonialName }} />
						<p dangerouslySetInnerHTML={{ __html: this.props.attributes.testimonialTitle }} />
						<p dangerouslySetInnerHTML={{ __html: this.props.attributes.testimonialText }} />
						
					</div>
				{ this.props.attributes.showIcon ? testimonialIcon : null }
				{ this.props.attributes.showStoryIcon ? storyIcon : null }
				{ this.props.attributes.showVideoIcon ? videoIcon : null }
			</div>
			);
		}
	},

	/**
	 * The save function defines the way in which the different attributes should be combined
	 * into the final markup, which is then serialized by Gutenberg into post_content.
	 *
	 * The "save" property must be specified and must be a valid function.
	 *
	 * @link https://wordpress.org/gutenberg/handbook/block-api/block-edit-save/
	 */
	save: ( { attributes } ) => {
		const { newTestimonial } = attributes;
		return (
			<div className="wp-block-cgb-block-g51-1-column-testimonial-block container">
				<div className="block-container">

					<div dangerouslySetInnerHTML={{ __html: attributes.testimonialImg }} />
					<h2 dangerouslySetInnerHTML={{ __html: attributes.testimonialName }} />
					<p dangerouslySetInnerHTML={{ __html: attributes.testimonialTitle }} />
					<p dangerouslySetInnerHTML={{ __html: attributes.testimonialText }} />

				</div>
				{ attributes.showIcon ? testimonialIcon : null }
				{ attributes.showStoryIcon ? storyIcon : null }
				{ attributes.showVideoIcon ? videoIcon : null }
			</div>
		);
	},
} );
