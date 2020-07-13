import './style.scss';
import './editor.scss';

const { __ } = wp.i18n;
const { registerBlockType } = wp.blocks;
const {
	PanelBody,
	ToggleControl,
	SelectControl,
	Button,
	ColorPicker,
	RangeControl } = wp.components;
const {
	InspectorControls,
	RichText,
	MediaUploadCheck, MediaUpload } = wp.editor;
const { Component } = wp.element;

const defaultAttributes = {
	showMainCTA: true,
	showBackgroundImage: true,
	showTextBoxBg: true,
	hexColor: '#003f5f',
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

registerBlockType( 'vistage-blocks/g211-numbered-list', {
	title: __( 'G2.11 Numbered List' ),
	icon: 'format-image',
	category: 'layout',

	attributes: {
		showMainCTA: {
			type: Boolean,
		},
		showBackgroundImage: {
			type: Boolean,
		},
		showImageOverlay: {
			type: Boolean,
		},
		showTextBoxBg: {
			type: Boolean,
		},
		mainCtaText: {
			type: 'text',
		},
		bulletItems: {
			type: 'string',
		},
		imageUrl: {
			type: 'string',
		},
		color: {
			type: 'string',
			default: '0, 63, 95, 0.95',
		},
		opacity: {
			type: 'string',
			default: '0.95',
		},
		hexColor: {
			type: 'string',
			default: '#003f5f',
		},
		listItemType: {
			type: 'string',
		},
		checkList: {
			type: 'string',
		},
		numberList: {
			type: 'string',
		},
	},

	edit: class extends Component {
		componentDidMount() {
			if ( undefined === this.props.attributes.showMainCTA ) {
				this.props.setAttributes(defaultAttributes);
			}
		}

        updateOverlayRgbValues = value => {
        	this.props.setAttributes( { opacity: value } );
        };

        updateTextBoxRgbValues = value => {
        	const textBox = document.querySelector( '.wp-block-vistage-blocks-g211-numbered-list-inside-list' );
        	const newRgbValues = Object.values( value.rgb );
        	const newRgbValuesToString = newRgbValues.toString();
        	textBox.style.backgroundColor = `rgba(${ newRgbValuesToString })`;
        	this.props.setAttributes( { color: newRgbValuesToString } );
        	this.props.setAttributes( { hexColor: value.hex } );
        }

        setListItemClass = value => {
        	console.log( value );
        	const listItem = document.querySelector( '.wp-block-vistage-blocks-g211-numbered-list-orderd-list' );
        	this.props.setAttributes( { listItemType: value } );

        	if ( value === 'checklist' ) {
        		listItem.classList.add( 'checklist' );
        		listItem.classList.remove( 'numberlist' );
        	} else if ( value === 'numberlist' ) {
        		listItem.classList.add( 'numberlist' );
        		listItem.classList.remove( 'checklist' );
        	}
        }
        render() {
        	const noBgStyle = {
        		backgroundImage: 'none',
        		backgroundColor: '#fff',
        	};
        	const overlayStyle = {
        		backgroundImage: `
                    radial-gradient(circle at 70% 56%, rgba(255, 255, 255, 
                    ${ this.props.attributes.opacity } ), rgba(0, 63, 95, 
                    ${ this.props.attributes.opacity } )), url(` + this.props.attributes.imageUrl + ')',
        		backgroundBlendMode: `${ this.props.attributes.showImageOverlay ? 'multiply' : 'normal' }`,
        		backgroundSize: 'cover',
        		backgroundPosition: 'center',
        	};
        	const bgStyle = {
        		backgroundImage: 'url(' + this.props.attributes.imageUrl + ')',
        		backgroundSize: 'cover',
        		backgroundPosition: 'center',
        	};
        	const insideListBgStyle = {
        		width: '95%',
        		background: `rgba(${ this.props.attributes.color })`,
        		margin: '0 auto',
        		padding: '2em 4em',
        		color: '#fff',
        	};
        	const noInsideListBgStyle = {
        		width: '95%',
        		background: 'transparent',
        		margin: '0 auto',
        		padding: '2em 4em',
        		color: '#fff',
        	};
			return (
				<div>
					{
        				<InspectorControls>
        					<PanelBody title="Main Header" initialOpen={ false }>
        						<ToggleControl
        							label={ __( 'Show Main CTA' ) }
        							checked={ this.props.attributes.showMainCTA }
        							onChange={ () =>
        								this.props.setAttributes( {
        									showMainCTA: ! this.props.attributes.showMainCTA,
        								} )
        							}
        						/>
        					</PanelBody>
        					<PanelBody title="Select List Type">
	<SelectControl
	label={ __( 'Select List Type' ) }
	value={ __( this.props.attributes.listItemType ) }
	options={ optionsArr }
	onChange={ value => {
        								this.setListItemClass( value );
        							} }
        						/>
        					</PanelBody>
							<PanelBody title="Background Image" initialOpen={ false }>
	<ToggleControl
	label={ __( 'Show Background Image' ) }
	checked={ this.props.attributes.showBackgroundImage }
        							onChange={ () =>
        								this.props.setAttributes( {
        									showBackgroundImage:
                                                ! this.props.attributes.showBackgroundImage,
        								} ) }
        						/>
        					</PanelBody>
							<PanelBody title="Background TextBox" initialOpen={ false }>
        						<ToggleControl
	label={ __( 'Show TextBox Background' ) }
        							checked={ this.props.attributes.showTextBoxBg }
        							onChange={ ( value ) => {
        								this.props.setAttributes( {
        									showTextBoxBg: ! this.props.attributes.showTextBoxBg,
        								} );
} }
        						/>
        					</PanelBody>
        					<PanelBody title="Background Overlay Image" initialOpen={ false }>
	<ToggleControl
        							label={ __( 'Show Overlay Image' ) }
        							checked={ this.props.attributes.showImageOverlay }
	onChange={ () =>
        								this.props.setAttributes( {
        									showImageOverlay: ! this.props.attributes.showImageOverlay,
        								} ) }
        						/>

        						<RangeControl
        							label={ __( 'Opacity' ) }
	min={ 0.0 }
        							max={ 1.0 }
        							step={ 0.1 }
	initialPosition={ 0.95 }
        							value={ this.props.attributes.opacity }
	onChange={ value => {
        								this.updateOverlayRgbValues( value );
        							} }
        						/>
        					</PanelBody>
        					<PanelBody title="List Background" initialOpen={ false }>
        						<ColorPicker
	color={ this.props.attributes.hexColor }
	onChangeComplete={ value => {
        								this.updateTextBoxRgbValues( value );
        							} }
        						/>
							</PanelBody>
                            <PanelBody title="Background Image" initialOpen={false}>
                                <ToggleControl 
                                    label={__('Show Background Image')}
                                    checked={this.props.attributes.showBackgroundImage}
                                    onChange={() => 
                                        this.props.setAttributes({
                                            showBackgroundImage: !this.props.attributes.showBackgroundImage
                                    })}
                                />
                            </PanelBody>
                            <PanelBody title="Background TextBox" initialOpen={false}>
                                <ToggleControl 
                                        label={__('Show TextBox Background')}
                                        checked={this.props.attributes.showTextBoxBg}
                                        onChange={() => { 
                                            this.props.setAttributes({
                                                showTextBoxBg: !this.props.attributes.showTextBoxBg
                                        })}}
                            />
                            </PanelBody>
                            <PanelBody title="Background Overlay Image" initialOpen={false}>
                                <ToggleControl 
                                    label={__('Show Overlay Image')}
                                    checked={this.props.attributes.showImageOverlay}
                                    onChange={() => 
                                        this.props.setAttributes({
                                            showImageOverlay: !this.props.attributes.showImageOverlay
                                    })}
                                />
                               
                                <RangeControl
                                    label={__('Opacity')}
                                    min={ 0.0 }
                                    max={ 1.0 }
                                    step={ 0.1 }
                                    initialPosition={ 0.95 }
                                    value={ this.props.attributes.opacity }
                                    onChange={ value => {
                                        this.updateOverlayRgbValues( value );
                                    }}
                                />
                            </PanelBody>
							<PanelBody title="List Background" initialOpen={ false }>
                                <ColorPicker
                                    color={ this.props.attributes.hexColor }
                                    onChangeComplete={ value => {
                                        this.updateTextBoxRgbValues( value );
                                    }}
                                />
                            </PanelBody>
						</InspectorControls>
					}
                    <div className={`wp-block-vistage-blocks-g211-numbered-list 
                        ${ this.props.attributes.showBackgroundImage ? 
                            null : 'no-bg'}`} 
                            style={ this.props.attributes.showImageOverlay ? overlayStyle : this.props.attributes.showBackgroundImage ? bgStyle : noBgStyle }>                        
                        <div 
                            className={this.props.className + "-inside-list"} 
                            style={ this.props.attributes.showTextBoxBg ? insideListBgStyle : noInsideListBgStyle }>
                            <MediaUploadCheck>
                                <MediaUpload
                                    onSelect={ media => {
                                        this.props.setAttributes({
                                            imageAlt: media.alt,
                                            imageUrl: media.url
                                        })
                                    }}
                                    type="image"
                                    value={ 'some value' }
                                    render={({ open }) => (                                    
                                        <Button
                                        className={'btn button button-large'}
                                            onClick={ open }
                                        >Select Background Image</Button>                                        
                                    )}
                                />
                            </MediaUploadCheck>
                            { this.props.attributes.showMainCTA ? 
                                <RichText 
                                    tagName="h2"
                                    className={this.props.className + '-main-cta'}
                                    value={this.props.attributes.mainCtaText}
                                    onChange={value => this.props.setAttributes( { mainCtaText: value } )}
                                    placeholder={__("Add Title CTA")} 
                                /> 
                            : null}
                             <div className={this.props.className + "-list-container"}>
                                 <RichText 
                                    tagName="ol"
                                    multiline="li"
                                    className={this.props.className + '-orderd-list'}
                                    placeholder={__('Add Items')}
                                    value={ this.props.attributes.bulletItems }
                                    onChange={ value => {
                                        this.props.setAttributes( { bulletItems: value } )
                                    } }
                                 />                                
                            </div>
						</div>                       
					</div>
			    </div>
			);
		}
	},
	save({ attributes }) {
        const { color, opacity, imageUrl } = attributes;
        const noBgStyle = {
            backgroundImage: 'none',
            backgroundColor: '#fff'
        }
        const bgStyle = {
            backgroundImage: 'url('+ imageUrl +')',
            backgroundSize: 'cover',
            backgroundPosition: 'center'
        }
        const overlayStyle = {
            backgroundImage: `radial-gradient(circle at 70% 56%, rgba(255, 255, 255, ${ opacity } ), rgba(0, 63, 95, ${ opacity })), url(` + imageUrl + `)`,
            backgroundBlendMode: `${ attributes.showImageOverlay ? 'multiply' : 'normal' }`,
            backgroundSize: 'cover',
            backgroundPosition: 'center'
        }
        
        const insideListBgStyle = {
            background: `rgba(${ color })`
        }
        const noInsideListBgStyle = {
            background: 'transparent'
        }
	},
	save( { attributes } ) {
		const { color } = attributes;
		const noBgStyle = {
			backgroundImage: 'none',
			backgroundColor: '#fff',
		};
		const bgStyle = {
			backgroundImage: 'url(' + attributes.imageUrl + ')',
			backgroundSize: 'cover',
			backgroundPosition: 'center',
		};
		const overlayStyle = {
			backgroundImage: `radial-gradient(circle at 70% 56%, rgba(255, 255, 255, ${ attributes.opacity } ), rgba(0, 63, 95, ${ attributes.opacity })), url(` + attributes.imageUrl + ')',
			backgroundBlendMode: `${ attributes.showImageOverlay ? 'multiply' : 'normal' }`,
			backgroundSize: 'cover',
			backgroundPosition: 'center',
		};

		const insideListBgStyle = {
			background: `rgba(${ attributes.color })`,
		};
		const noInsideListBgStyle = {
			background: 'transparent',
		};
		return (
            <div className={`wp-block-vistage-blocks-g211-numbered-list ${ attributes.showBackgroundImage ? null : 'no-bg'}`} style={ attributes.showImageOverlay ? overlayStyle : attributes.showBackgroundImage ? bgStyle : noBgStyle }> 
				<div className={'wp-block-vistage-blocks-g211-numbered-list-inside-list'} style={ attributes.showTextBoxBg ? insideListBgStyle : noInsideListBgStyle }>
                    <h2 className={'wp-block-vistage-blocks-g211-numbered-list-main-cta'}>{ attributes.showMainCTA ? attributes.mainCtaText : null }</h2>
                    <div className={'wp-block-vistage-blocks-g211-numbered-list-list-container'}>
                        <ol className={ 'wp-block-vistage-blocks-g211-numbered-list-orderd-list' } dangerouslySetInnerHTML= { { __html: attributes.bulletItems } } />
                    </div>
				</div>
			</div>
		);
	},
} );
