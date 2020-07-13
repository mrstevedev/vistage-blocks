/**
 * BLOCK: text-button
 *
 * G2.4b General Use / 2-Column: Text Left with Bullets + Button Right
 */

import './style.scss';
import './editor.scss';

const { __ } = wp.i18n;
const { registerBlockType } = wp.blocks;
const {
	PanelBody,
	ToggleControl,
	TextControl,
	SelectControl,
} = wp.components;
const {
	InspectorControls,
	RichText,
} = wp.editor;

const defaultAttributes = {
	showMainCta: true,
	showSubHeading: true,
	showDescription: true,
	showSecondaryHeading: true,
	showRightBullets: true,
	showRightCTAButton: true,
};

const checkLabel = {
	label: 'Check List',
	value: 'checklist',
};

const numberLabel = {
	label: 'Number List',
	value: 'numberlist',
};

const noList = {
	label: 'No List',
	value: 'nolist',
};

const optionsArr = [
	checkLabel,
	numberLabel,
	noList,
];

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

registerBlockType( 'vistage-blocks/text-button', {
	title: __( 'G2.4b Text Left with Bullets + Button Right' ),
	icon: 'format-image',
	category: 'layout',

	attributes: {
		showMainCta: {
			type: Boolean,
		},
		showSubHeading: {
			type: Boolean,
		},
		showDescription: {
			type: Boolean,
		},
		showSecondaryHeading: {
			type: Boolean,
		},
		showRightBullets: {
			type: Boolean,
		},
		showRightCTAButton: {
			type: Boolean,
		},
		mainCTA: {
			type: 'text',
		},
		subHeading: {
			type: 'text',
		},
		textDescription: {
			type: 'text',
		},
		rightSubheading: {
			type: 'text',
		},
		rightBullets: {
			type: 'string',
		},
		ctaText: {
			type: 'text',
		},
		linkURL: {
			type: 'linkURL',
		},
		listItemType: {
			type: 'string',
			default: 'checklist',
		},
	},
	keywords: [
		__( '2 Column Text + List' ),
		__( 'Vistage' ),
		__( 'g2.4b' ),
	],

	edit( { attributes, setAttributes } ) {
		if ( undefined === attributes.showMainCta ) {
			setAttributes( defaultAttributes );
		}
		const setListItemClass = value => {
			const listItem = document.querySelector( '.g24b__right__cta-list' );
			setAttributes( { listItemType: value } );

			if ( value === 'checklist' ) {
				listItem.classList.add( 'checklist' );
				listItem.classList.remove( 'numberlist' );
			} else if ( value === 'checklist' ) {
				listItem.classList.add( 'numberlist' );
				listItem.classList.remove( 'checklist' );
			}
		};
		const appendHttps = () => {
			const inputval = 'https://';
			$( 'input[type=\'text\']' ).focusin( function() {
				// if textbox is empty or got the default value
				if ( $( this ).val().indexOf( 'https://' ) == -1 ) {
					// Put your Default value back
					$( this ).val( inputval + $( this ).val() );
				}
			} ).focusout( function() {
				// if textbox is empty or just contains your value
				if ( $( this ).val() == '' || $( this ).val() == 'https://' ) {
					// Clear the box
					$( this ).val( '' );
				}
			} );
		};
		return (
			<div>
				{
					<InspectorControls class="g24b_controls">
						<PanelBody title="Toggle Elements" initialOpen={ false }>
							<ToggleControl
								label={ __( 'Show Sub Heading' ) }
								checked={ attributes.showSubHeading }
								onChange={ value => setAttributes( { showSubHeading: value } ) }
							/>
							<ToggleControl
								label={ __( 'Show Description Text' ) }
								checked={ attributes.showDescription }
								onChange={ value => setAttributes( { showDescription: value } ) }
							/>
							<ToggleControl
								label={ __( 'Show Secondary CTA Header' ) }
								checked={ attributes.showSecondaryHeading }
								onChange={ value => setAttributes( { showSecondaryHeading: value } ) }
							/>
							<ToggleControl
								label={ __( 'Show List' ) }
								checked={ attributes.showRightBullets }
								onChange={ value => setAttributes( { showRightBullets: value } ) }
							/>
							<ToggleControl
								label={ __( 'Show CTA Button' ) }
								checked={ attributes.showRightCTAButton }
								onChange={ value => setAttributes( { showRightCTAButton: value } ) }
							/>
						</PanelBody>
						<PanelBody title="Select List">
							<SelectControl
								label={ __( 'Select List Type' ) }
								value={ __( attributes.listItemType ) }
								options={ optionsArr }
								onChange={ value => setListItemClass( value ) }
							/>
						</PanelBody>
						<PanelBody title="CTA Link">
							<TextControl
								type="text"
								label={ __( 'Add CTA Link Url' ) }
								value={ attributes.linkURL }
								className="external-link__url"
								placeholder={ 'https://' }
								onChange={ value => {
									setAttributes( { linkURL: value } );
									appendHttps();
								} }
							/>
						</PanelBody>
					</InspectorControls>
				}
				<div className="g24b__container">
					<div className="g24b_column-left">
						<RichText
							tagName="h2"
							className="g24b__right__cta-main-cta"
							placeholder={ __( 'Add Main CTA' ) }
							value={ attributes.mainCTA }
							onChange={ value => setAttributes( { mainCTA: value } ) }
						/>
						{ attributes.showSubHeading ? <RichText
							tagName="h3"
							className="g24b__right__cta-subheading"
							placeholder={ __( 'Add Sub Heading' ) }
							value={ attributes.subHeading }
							onChange={ value => setAttributes( { subHeading: value } ) }
						/> : null }
						{ attributes.showDescription ? <RichText
							className="g24b__right__cta-description"
							tagName="p"
							placeholder={ __( 'Add Description Text' ) }
							value={ attributes.textDescription }
							onChange={ value => setAttributes( { textDescription: value } ) }
						/> : null }
					</div>
					<div className="g24b__seperator"></div>
					<div className="g24b_column-right">
						<div className="g24b_column-right-outside">
							{ attributes.showSecondaryHeading ? <RichText
								tagName="h3"
								className="g24b__right__cta-subheading g24b__right__cta-subheading-right"
								placeholder={ __( 'Add Header CTA' ) }
								value={ attributes.rightSubheading }
								onChange={ value => {
									setAttributes( { rightSubheading: value } );
								} }
							/> : null }
						</div>
						{ attributes.showRightBullets ?
							<RichText
								tagName="ol"
								multiline="li"
								className={ `g24b__right__cta-list ${ attributes.listItemType }` }
								placeholder={ __( 'Add Items' ) }
								value={ attributes.rightBullets }
								onChange={ value => setAttributes( { rightBullets: value } ) }
							/> :
							null }
						{ attributes.showRightCTAButton ? <button className="g24b__right button__cta">
							<RichText
								className="g24b__right__cta-button-text"
								value={ attributes.ctaText }
								placeholder={ __( 'Apply Now' ) }
							/>
						</button> : null }
					</div>
				</div>
			</div>
		);
	},
	save( { attributes } ) {
		return (
			<div className="g24b__container">
				<div className="g24b_column-left">
					<h2 className="g24b__right__cta-main-cta">{ attributes.mainCTA }</h2>
					<h3 className="g24b__right__cta-subheading">{ attributes.showSubHeading ? attributes.subHeading : '' }</h3>
					<p className="g24b__right__cta-description" dangerouslySetInnerHTML={ { __html: attributes.showDescription ? attributes.textDescription : '' } } />
				</div>
				<div className="g24b__seperator"></div>
				<div className="g24b_column-right">
					<div className="g24b_column-right-outside">
						<h3 className="g24b__right__cta-subheading g24b__right__cta-subheading-right">{ attributes.showSecondaryHeading ? attributes.rightSubheading : '' }</h3>
					</div>
					<ol className={ `g24b__right__cta-list ${ attributes.listItemType }` } dangerouslySetInnerHTML={ { __html: attributes.showRightBullets ? attributes.rightBullets : '' } } />
					{ attributes.showRightCTAButton ? (
						<a className="button__cta" href={ attributes.linkURL } rel="noopener noreferrer">{ __( 'Apply Now', 'vistage' ) }</a>
					) : '' }
				</div>
			</div>
		);
	},
} );
