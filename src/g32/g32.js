/**
 * BLOCK: insights-teaser-grid
 *
 * G3.2 Insights Teaser Grid
 */

import './style.scss';
import './editor.scss';

const { __ } = wp.i18n;
const { Button, Disabled, PanelBody, SVG, ToggleControl, TextControl } = wp.components;
const { registerBlockType } = wp.blocks;
const { InspectorControls } = wp.editor;
const { Component } = wp.element;
const { decodeEntities } = wp.htmlEntities;

const downArrow = <SVG xmlns="http://www.w3.org/2000/svg" width="13" height="7" viewBox="0 0 13 7">
	<path fill="#003F5F" fillRule="nonzero" d="M6.5 7a.936.936 0 0 1-.644-.252l-5.59-5.28a.827.827 0 0 1 0-1.216.949.949 0 0 1 1.288 0L6.5 4.924 11.446.252a.949.949 0 0 1 1.287 0 .826.826 0 0 1 0 1.216l-5.59 5.28A.936.936 0 0 1 6.5 7z" />
</SVG>;

const rightArrow = <SVG xmlns="http://www.w3.org/2000/svg" width="7" height="13" viewBox="0 0 7 13">
	<path fill="#FFFFFF" fillRule="nonzero" d="M7 6.5a.936.936 0 0 1-.252.644l-5.28 5.59a.827.827 0 0 1-1.216 0 .949.949 0 0 1 0-1.288L4.924 6.5.252 1.554a.949.949 0 0 1 0-1.287.826.826 0 0 1 1.216 0l5.28 5.59c.168.177.252.41.252.643z" />
</SVG>;

const lineSVG = <SVG xmlns="http://www.w3.org/2000/svg" width="32" height="3" viewBox="0 0 32 3">
	<path fill="none" fillRule="evenodd" stroke="#EDC11C" strokeLinecap="square" strokeWidth="2" d="M1.246 1.5h29.508" />
</SVG>;

const defaultApiRoot = wpApiSettings ? wpApiSettings.root : `${ window.location.origin }/research-center/wp-json/`;

function getCategories( attributes, setAttributes ) {
	if ( 0 < attributes.categoryList.length || attributes.categoriesGet ) {
		return attributes.categoryList;
	}

	if ( true === attributes.doNotRetry ) {
		return [];
	}

	setAttributes( { categoriesGet: true, updateFlag: ! attributes.updateFlag } );

	jQuery.ajax( {
		url: `${ slash( attributes.postSource ) }wp/v2/categories/?per_page=99&withCredentials=false`,
		method: 'GET',
	} ).error( () => {
		setAttributes( { categoriesGet: false, doNotRetry: true, updateFlag: ! attributes.updateFlag } );
	} ).done( response => {
		const categoryNames = {};
		response.map( category => categoryNames[ category.id ] = decodeEntities( category.name ) );
		setAttributes( { categoriesGet: false, doNotRetry: false, categoryList: response, categoryNames: categoryNames, updateFlag: ! attributes.updateFlag } );
	} );

	return [];
}

function getContentTypes( attributes, setAttributes ) {
	if ( 0 < attributes.categoryList.length || attributes.contentTypesGet ) {
		return attributes.contentTypeList;
	}

	if ( true === attributes.doNotRetry ) {
		return [];
	}

	setAttributes( { contentTypesGet: true, updateFlag: ! attributes.updateFlag } );

	jQuery.ajax( {
		url: `${ slash( attributes.postSource ) }wp/v2/content_type?per_page=99&withCredentials=false`,
		method: 'GET',
	} ).error( () => {
		setAttributes( { contentTypesGet: false, doNotRetry: true, contentTypeList: [ { id: '', count: 1, name: 'Error getting contentypes' } ], updateFlag: ! attributes.updateFlag } );
	} ).done( response => {
		setAttributes( { contentTypesGet: false, doNotRetry: false, contentTypeList: response, updateFlag: ! attributes.updateFlag } );
	} );

	return [];
}

function slash( url ) {
	return '/' === url[ url.length - 1 ] ? url : `${ url }/`;
}

function getPosts( attributes, setAttributes = null ) {
	if ( null === setAttributes || 0 < attributes.posts.length || attributes.postsGet || 0 === attributes.categoryList.length ) {
		return attributes.posts;
	}

	if ( true === attributes.doNotRetry ) {
		return [];
	}

	setAttributes( { postsGet: true, updateFlag: ! attributes.updateFlag } );

	jQuery.ajax( {
		url: `${ slash( attributes.postSource ) }wp/v2/posts/?per_page=9&_embed`,
		method: 'GET',
	} ).error( () => {
		setAttributes( { postsGet: false, doNotRetry: true, updateFlag: ! attributes.updateFlag } );
	} ).done( response => {
		const posts = [];

		if ( ! response.length ) {
			posts.push( {
				id: -1,
				title: 'no posts found',
				category: '',
				url: '',
				image: '',
			} );
		}

		response.map( post => {
			const sizes = ( post.featured_media && post._embedded[ 'wp:featuredmedia' ] && post._embedded[ 'wp:featuredmedia' ].length && post._embedded[ 'wp:featuredmedia' ][ 0 ].media_details ) ? post._embedded[ 'wp:featuredmedia' ][ 0 ].media_details.sizes : {};
			const sourceUrl = ( post.featured_media && post._embedded[ 'wp:featuredmedia' ] && post._embedded[ 'wp:featuredmedia' ].length ) ? post._embedded[ 'wp:featuredmedia' ][ 0 ].source_url : '';
			const image = undefined === sizes ? '' : false || ( sizes.g32_size ? sizes.g32_size.source_url : false ) || ( sizes.full ? sizes.full.source_url : '' );
			posts.push( {
				id: post.id,
				title: post.title.rendered,
				category: post.categories.length ? attributes.categoryNames[ post.categories[ 0 ] ] || '' : '',
				url: post.link,
				image: image || sourceUrl,
			} );
		} );

		setAttributes( { postsGet: false, posts: posts, doNotRetry: false, updateFlag: ! attributes.updateFlag } );
	} );

	return [];
}

class DropdownFilter extends Component {
	constructor( props ) {
		super( ...arguments );
		this.props = props;
		this.state = { active: false };
	}
	render() {
		return <div className={ `${ this.props.baseClass } g32__dropdown-filter` } data-type={ this.props.type }>
			<button onClick={ () => this.setState( { active: ! this.state.active } ) } className={ `${ this.props.baseClass }__toggle-button g32__dropdown-filter__toggle-button` }>
				{ this.props.buttonText }
				&nbsp;&nbsp;
				{ downArrow }
			</button>
			<div className={ `${ this.props.baseClass }__items g32__dropdown-filter__items ${ this.state.active ? 'active' : '' }` }>
				<a href="./">
					<button className={ `${ this.props.baseClass }__items__button active` }>
						All
					</button>
				</a>
				{ this.props.itemList.map( ( itemData, index ) => 0 < itemData.count ? <a key={ index } href={ itemData.link }>
					<button data-id={ itemData.id } data-count={ itemData.count } className={ `${ this.props.baseClass }__items__button ${ this.props.baseClass }__items__button${ index }` }>
						{ itemData.name }
					</button>
				</a> : null ) }
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
registerBlockType( 'vistage-blocks/insights-teaser-grid', {
	title: __( 'G3.2 Insights Teaser Grid' ),
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
			default: 'Explore Vistage Research & Insights',
		},
		ctaText: {
			type: 'string',
			default: 'Explore all Research & Insights',
		},
		ctaLink: {
			type: 'string',
			default: '',
		},
		categoryList: {
			type: 'array',
			default: [],
		},
		categoryNames: {
			type: 'object',
			default: {},
		},
		contentTypeList: {
			type: 'array',
			default: [],
		},
		posts: {
			type: 'array',
			default: [],
		},
		postSource: {
			type: 'string',
			default: defaultApiRoot,
		},
	},
	keywords: [
		__( 'Research + Insights' ),
		__( 'Vistage' ),
		__( 'g3.2' ),
	],

	edit( { attributes, setAttributes } ) {
		const refreshButton = <Button isDefault isLarge onClick={ () => setAttributes( { doNotRetry: false, posts: [], categoryList: [], contentTypeList: [], updateFlag: ! attributes.updateFlag } ) }>
			Refresh posts and filters
		</Button>;
		return (
			<div>
				{
					<InspectorControls className="g32__controls">
						<PanelBody>
							<ToggleControl
								label="Show Heading" checked={ attributes.showHeading }
								onChange={ value => setAttributes( { showHeading: value } ) }
							/>
						</PanelBody>
						<PanelBody>
							<TextControl
								value={ attributes.postSource }
								onChange={ value => setAttributes( { postSource: value } ) }
								label="Get posts from"
							/>
							{ attributes.categoriesGet || attributes.contentTypesGet || attributes.postsGet ? <Disabled> { refreshButton } </Disabled> : refreshButton }
						</PanelBody>
						<PanelBody>
							<TextControl
								value={ attributes.ctaLink }
								onChange={ value => setAttributes( { ctaLink: value } ) }
								label="CTA button link"
							/>
						</PanelBody>
					</InspectorControls>
				}
				<div className="g32__container">
					{ attributes.showHeading ? <h2 className="g32__heading">
						<TextControl
							onChange={ value => setAttributes( { headingText: value } ) }
							value={ attributes.headingText }
							placeholder="Heading"
						/>
					</h2> : null }
					<div className="g32__filters">
						<DropdownFilter buttonText="Explore by category" type="categories" baseClass="g32__filters__category" itemList={ getCategories( attributes, setAttributes ) } />
						<DropdownFilter buttonText="Explore by content type" type="content_type" baseClass="g32__filters__content-type" itemList={ getContentTypes( attributes, setAttributes ) } />
					</div>
					<div className="g32__posts">
						{ getPosts( attributes, setAttributes ).map( post => (
							<div className="g32__posts__post" key={ post.id }>
								<div>
									<figure className="wp-block-image alignfull">
										<img alt="" src={ post.image } className={ 'wp-image-' + post.id } />
									</figure>
								</div>
								<div className="g32__posts__post__label">{ post.category }{ lineSVG }</div>
								<a href={ post.url } className="g32__posts__post__title">{ decodeEntities( post.title ) }</a>
							</div>
						) ) }
					</div>
					<div className="g32__footer">
						<button className="g32__footer__cta-button">
							<TextControl
								value={ attributes.ctaText }
								placeHolder="Button Label"
								onChange={ value => setAttributes( { ctaText: value } ) }
							/>
							{ rightArrow }
						</button>
					</div>
				</div>
			</div>
		);
	},

	save( { attributes } ) {
		return (
			<div className="g32__container">
				{ attributes.showHeading ? <h2 className="g32__heading">
					{ attributes.headingText }
				</h2> : null }
				<div className="g32__filters">
					<DropdownFilter type="categories" buttonText="Explore by category" baseClass="g32__filters__category" itemList={ getCategories( attributes, ()=>{} ) } />
					<DropdownFilter type="content_type" buttonText="Explore by content type" baseClass="g32__filters__content-type" itemList={ getContentTypes( attributes, ()=>{} ) } />
					<div className="g32__filters__data" data-categories={ JSON.stringify( attributes.categoryNames ) }></div>
				</div>
				<div className="g32__posts">
					{ getPosts( attributes ).map( ( post, index )=> (
						<div className={ `g32__posts__post ${ 3 <= index ? 'g32__desktop_only' : '' }` } key={ post.id }>
							<div>
								<figure className="wp-block-image alignfull">
									<img alt="" src="" className={ 'wp-image-' + post.id } />
								</figure>
							</div>
							<div className="g32__posts__post__label"><span className="g32__posts__post__label__text"></span>{ lineSVG }</div>
							{
								// eslint-disable-next-line jsx-a11y/anchor-has-content
								<a href="./" className="g32__posts__post__title"></a>
							}
						</div>
					) ) }
					<div className="g32__posts__data" data-post_source={ attributes.postSource }></div>
				</div>
				<div className="g32__footer">
					<a href={ attributes.ctaLink }>
						<button className="g32__footer__cta-button">
							{ attributes.ctaText }
							&nbsp;&nbsp;
							{ rightArrow }
						</button>
					</a>
				</div>
			</div>
		);
	},
} );
