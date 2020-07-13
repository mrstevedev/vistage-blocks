/**
 * BLOCK: vistage-blocks
 *
 * Registering a basic block with Gutenberg.
 * Simple block, renders and saves the same content without any interactivity.
 */

//  Import CSS.
import './style.scss';
import './editor.scss';

const { __ } = wp.i18n; // Import __() from wp.i18n
const { RichText, MediaUpload, PlainText } = wp.editor;
const { registerBlockType } = wp.blocks; // Import registerBlockType() from wp.blocks
const { Button } = wp.components;

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
registerBlockType( 'vistage-blocks/card-block', {
	title: __( 'Vistage Card' ),
	icon: 'format-image',
	category: 'layout',

	attributes: {
		title: {
			source: 'text',
			selector: '.card__title',
		},
		body: {
			type: 'array',
			source: 'children',
			selector: '.card__body',
		},
		imageAlt: {
			attribute: 'alt',
			selector: 'img',
		},
		imageUrl: {
			attribute: 'src',
			selector: 'img',
		},
	},

	edit( { attributes, setAttributes } ) {
		const getImageButton = ( openEvent ) => {
			if ( attributes.imageUrl ) {
				return (
					<img src={ attributes.imageUrl } onClick={ openEvent } className="image" alt="" aria-hidden="true" />
				);
			}

			return (
				<div className="button-container">
					<Button onClick={ openEvent } className="button button-large">Choose Image</Button>
				</div>
			);
		};

		// This are the components rendering to the back end editor.
		return (
			<div className="card-edit-container">
				<div className="card-edit__card">
					<MediaUpload
						onSelect={ media => {
							setAttributes( {
								imageAlt: media.alt,
								imageUrl: media.url,
							} );
						} }
						type="image"
						value={ attributes.imageID }
						render={ ( { open } ) => getImageButton( open ) }
					/>
					<PlainText
						onChange={ content => setAttributes( { title: content } ) }
						value={ attributes.title }
						placeholder="Your card title"
						className="heading"
					/>
					<RichText
						onChange={ content => setAttributes( { body: content } ) }
						value={ attributes.body }
						multiline="p"
						placeholder="Your card text"
					/>
				</div>
			</div>
		);
	},

	save( { attributes } ) {
		const cardImage = ( src, alt ) => {
			if ( ! src ) {
				return null;
			}

			if ( alt ) {
				return (
					<img src={ src } alt={ alt } />
				);
			}

			// No alt set, hide it
			return (
				<img src={ src } alt="" aria-hidden="true" />
			);
		};

		// This is the markup that renders to the front end
		return (
			<div className="cards-container">
				<div className="card">
					<div className="card__image">
						{ cardImage( attributes.imageUrl, attributes.imageAlt ) }
					</div>
					<div className="card__content">
						<h6 className="card__title">{ attributes.title }</h6>
						<div className="card__body">{ attributes.body }</div>
					</div>
				</div>
			</div>
		);
	},
} );
