/**
 * BLOCK: homepage-mission-rightrail
 *
 * HP2 - Hometown Mission + Right Rail.
 */

import './style.scss';
import './editor.scss';

import { isArray } from 'util';

const { __ } = wp.i18n;
const { RadioControl, ToggleControl, TextareaControl, TextControl, SVG, PanelBody } = wp.components;
const { registerBlockType } = wp.blocks;
const { InnerBlocks, InspectorControls } = wp.editor;
const { RawHTML } = wp.element;
const { isURL, getAuthority, getPath, getProtocol } = wp.url;
const dateFormat = wp.date.date;
const { decodeEntities } = wp.htmlEntities;
const $ = jQuery;

const embedTemplates = {
	youtube: [
		[ 'core-embed/youtube', { align: 'full' } ],
	],
	vimeo: [
		[ 'core-embed/vimeo', { align: 'full' } ],
	],
};

const lineSVG = <SVG xmlns="http://www.w3.org/2000/svg" width="21" height="3" viewBox="0 0 21 3">
	<path fill="none" fillRule="evenodd" stroke="#EDC11C" strokeLinecap="square" strokeWidth="2" d="M1.492 1.5h59.016" />
</SVG>;

const arrowSVG = <SVG xmlns="http://www.w3.org/2000/svg" width="20" height="15" viewBox="0 0 20 15">
	<path fill="#EDC11C" fillRule="nonzero" d="M13.253.63a.695.695 0 0 0-.992 0 .7.7 0 0 0 0 .981l5.03 5.03H.694A.691.691 0 0 0 0 7.336c0 .386.307.704.694.704h16.597l-5.03 5.02a.712.712 0 0 0 0 .992.695.695 0 0 0 .992 0l6.22-6.22a.683.683 0 0 0 0-.982L13.253.63z" />
</SVG>;

function applyRendered( obj ) {
	if ( obj.rendered ) {
		return obj.rendered;
	}
	if ( obj && typeof obj === 'object' && obj.constructor === Object ) {
		for ( const key in obj ) {
			if ( obj.hasOwnProperty( key ) ) {
				const element = obj[ key ];
				obj[ key ] = applyRendered( element );
			}
		}
	}
	return obj;
}

function getGravityForm( formId, setAttributes ) {
	$.ajax( {
		url: window.ajaxurl,
		method: 'GET',
		data: { form_id: formId, action: 'hp2_get_gravity_form' },
	} ).error( ( error ) => {
		// eslint-disable-next-line no-console
		console.debug( error.statusText, error );
	} ).done( response => {
		setAttributes( { formContent: response } );
		// console.debug( response );
	} );
}

function updateFeaturedPost( url, postKey, attributes, setAttributes ) {
	if ( isURL( url ) ) {
		if ( '/' === url.slice( -1 ) ) {
			url = url.slice( 0, -1 );
		}
		const slug = getPath( url ).split( '/' ).pop();
		const subfolder = 'research-center' === getPath( url ).split( '/' ).shift() ? '/research-center' : '';
		const protocol = getProtocol( url );
		const domain = getAuthority( url );
		const postSource = `${ protocol }//${ domain }${ subfolder }/`;
		const data = {};
		data.per_page = 9;
		data._embed = true;
		data.withCredentials = false;

		$.ajax( {
			url: `${ postSource }wp-json/wp/v2/posts?slug=${ slug }`,
			method: 'GET',
			data: data,
		} ).error( ( error ) => {
			// eslint-disable-next-line no-console
			console.debug( error.statusText, error );
		} ).done( response => {
			if ( isArray( response ) && response.length ) {
				const post = applyRendered( response[ 0 ] );
				post.date = dateFormat( 'F d', response.date );

				const posts = attributes.posts || [];
				posts[ postKey ] = JSON.stringify( post );
				setAttributes( { posts: posts, updateFlag: Math.random() } );
			}
		} );
	}
}
function getImage( post ) {
	const sizes = ( post.featured_media && post._embedded[ 'wp:featuredmedia' ] && post._embedded[ 'wp:featuredmedia' ].length && post._embedded[ 'wp:featuredmedia' ][ 0 ].media_details ) ? post._embedded[ 'wp:featuredmedia' ][ 0 ].media_details.sizes : {};
	const sourceUrl = ( post.featured_media && post._embedded[ 'wp:featuredmedia' ] && post._embedded[ 'wp:featuredmedia' ].length ) ? post._embedded[ 'wp:featuredmedia' ][ 0 ].source_url : '';
	const image = undefined === sizes ? '' : false || ( sizes.g32_size ? sizes.g32_size.source_url : false ) || ( sizes.full ? sizes.full.source_url : '' );
	return image || sourceUrl;
}

function getImageTag( post ) {
	return <img alt="" src={ getImage( post ) } className={ 'wp-image-' + post.id } />;
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
registerBlockType( 'vistage-blocks/homepage-mission-rightrail', {
	title: __( 'HP2 - Hometown Mission + Right Rail' ),
	icon: 'format-image',
	category: 'layout',

	attributes: {
		headingText: {
			type: 'string',
			default: '',
		},
		descriptionText: {
			type: 'string',
			default: '',
		},
		embedTemplate: {
			type: 'string',
			default: 'youtube',
		},
		showDescription: {
			type: 'boolean',
			default: true,
		},
		labelText: {
			type: 'string',
			default: 'Our Latest Insights',
		},
		posts: {
			type: 'array',
		},
		post1: {
			type: 'object',
		},
		url1: {
			type: 'string',
			default: '',
		},
		url1changed: {
			type: Boolean,
			default: false,
		},
		post2: {
			type: 'object',
		},
		url2: {
			type: 'string',
			default: '',
		},
		url2changed: {
			type: Boolean,
			default: false,
		},
		showSignupButton: {
			type: Boolean,
			default: true,
		},
		formId: {
			type: 'number',
			default: 1,
		},
		formIdChanged: {
			type: Boolean,
			default: true,
		},
		formContent: {
			type: 'string',
			default: '',
		},
		updateFlag: {
			type: 'number',
		},
	},
	keywords: [
		__( 'Home Page Mission + Sidebar' ),
		__( 'Vistage' ),
		__( 'hp2' ),
	],

	edit( { attributes, setAttributes } ) {
		if ( attributes.url1changed ) {
			updateFeaturedPost( attributes.url1, 0, attributes, setAttributes.bind( this ) );
			setAttributes( { url1changed: false } );
		}
		if ( attributes.url2changed ) {
			updateFeaturedPost( attributes.url2, 1, attributes, setAttributes.bind( this ) );
			setAttributes( { url2changed: false } );
		}
		if ( attributes.formIdChanged ) {
			getGravityForm( attributes.formId, setAttributes.bind( this ) );
			setAttributes( { formIdChanged: false } );
		}

		return (
			<div>
				{
					<InspectorControls className="hp2__controls">
						<PanelBody title="Left Column">
							<ToggleControl
								label="Show Description" checked={ attributes.showDescription }
								onChange={ value => setAttributes( { showDescription: value } ) }
							/>
							<RadioControl
								label="Select Video Source Type" selected={ attributes.embedTemplate }
								options={ [
									{ label: 'Youtube', value: 'youtube' },
									{ label: 'Vimeo', value: 'vimeo' },
								] }
								title="Select Video Source Type"
								onChange={ value => setAttributes( { embedTemplate: value } ) }
							/>
						</PanelBody>
						<PanelBody title="Featured Posts">
							<TextControl
								value={ attributes.url1 }
								placeholder="Enter post URL here"
								onChange={ value => setAttributes( { url1: value, url1changed: true } ) }
							/>
							<TextControl
								value={ attributes.url2 }
								placeholder="Enter post URL here"
								onChange={ value => setAttributes( { url2: value, url2changed: true } ) }
							/>
						</PanelBody>
						<PanelBody title="Newsletter sign up">
							<ToggleControl
								label="Show sign up button" checked={ attributes.showSignupButton }
								onChange={ value => setAttributes( { showSignupButton: value } ) }
							/>
							{ attributes.showSignupButton ? <TextControl
								type="number"
								value={ attributes.formId }
								label="Enter Gravity Form Id"
								min="1"
								onChange={ value => setAttributes( { formId: parseInt( value ), formIdChanged: true } ) }
							/> : null }
						</PanelBody>
					</InspectorControls>
				}
				<div className="hp2__container">
					<div className="hp2__left hp2__column">
						<TextareaControl
							onChange={ value => setAttributes( { headingText: value } ) }
							value={ attributes.headingText }
							placeholder="Mission heading here"
							className="hp2__left__heading"
							rows="4"
						/>
						{ attributes.showDescription ? <TextareaControl
							onChange={ value => setAttributes( { descriptionText: value } ) }
							value={ attributes.descriptionText }
							placeholder="Mission description here"
							className="hp2__left__description"
							rows="5"
						/> : null }
						<div className="hp2__left__video">
							{
								attributes.embedTemplate !== null ? <InnerBlocks templateLock="all" template={ embedTemplates[ attributes.embedTemplate ] } /> : null
							}
						</div>
					</div>
					<div className="hp2__right hp2__column">
						<TextControl
							className="hp2__right__label"
							value={ attributes.labelText }
							placeholder="Your label text here"
							onChange={ text => setAttributes( { labelText: text } ) }
						/> { lineSVG }
						<div>
							{ attributes.posts ? attributes.posts.map( rawPost => {
								const post = JSON.parse( rawPost );
								return <div className="hp2__right__post" key={ post.id }>
									<div>
										<figure className="wp-block-image alignfull">
											{ getImageTag( post ) }
										</figure>
									</div>
									<h8 className="hp2__right__date">{ post.date }</h8>
									<h6 className="hp2__right__title">{ decodeEntities( post.title ) }</h6>
									<RawHTML>{ decodeEntities( post.excerpt ) }</RawHTML>
									<div className="hp2__right__more">
										<a href={ post.link }>Read more</a>
										&nbsp;
										{ arrowSVG }
									</div>
								</div>;
							} ) : null }
							<div className="hp2__right__gf-container">
								{ attributes.showSignupButton ? <RawHTML>{ attributes.formContent }</RawHTML> : null }
							</div>
						</div>
					</div>
				</div>
			</div>
		);
	},

	save( { attributes } ) {
		return (
			<div className="hp2__container">
				<div className="hp2__left hp2__column">
					<div className="hp2__left__heading">
						{ attributes.headingText }
					</div>
					{ attributes.showDescription ? <div className="hp2__left__description">
						{ attributes.descriptionText }
					</div> : null }
					<InnerBlocks.Content />
				</div>
				<div className="hp2__right hp2__column">
					<h4 className="hp2__right__label flourish"><span className="hp2__right__label__text">{ attributes.labelText }</span></h4>
					<div>
						{ attributes.posts ? attributes.posts.map( rawPost => {
							const post = JSON.parse( rawPost );
							return <div className="hp2__right__post" key={ post.id }>
								<div>
									<figure className="wp-block-image alignfull">
										{ getImageTag( post ) }
									</figure>
								</div>
								<h8 className="hp2__right__date">{ post.date }</h8>
								<h6 className="hp2__right__title">{ decodeEntities( post.title ) }</h6>
								<RawHTML className="hp2__right__excerpt">{ decodeEntities( post.excerpt ) }</RawHTML>
								<div className="hp2__right__more">
									<a href={ post.link }>Read more</a>
									&nbsp;
									{ arrowSVG }
								</div>
							</div>;
						} ) : null }
					</div>
					<div className="hp2__right__gf-container">
						{ attributes.showSignupButton ? <RawHTML>{ `[gravityform id=${ attributes.formId } ajax=true]` }</RawHTML> : null }
					</div>
				</div>
			</div>
		);
	},
} );
