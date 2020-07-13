/**
 * Component: Iconset
 *
 * Usage:

import { Iconset } from '../includes/iconset/iconset.js';
{
	( ... ),
	attributes: {
		icon: {
			type: 'string',
			default: '',
		},
	},
	edit( { attributes, setAttributes } ) {
		return ( <div>
			<Iconset icon={ attributes.icon } label="Select an icon" onChange={ icon => setAttributes( { icon: icon } ) } />
		</div> )
	},
	save( { attributes } ) {
		return ( <div>
			<Iconset icon={ attributes.icon } />
		</div> )
	},
	( ... ),
}

 *
 */

import { icons } from './icons.js';

const { PanelBody, SelectControl } = wp.components;
const { InspectorControls } = wp.editor;
const { Component } = wp.element;

const options = [];

for ( const key in icons ) {
	if ( icons.hasOwnProperty( key ) ) {
		const icon = icons[ key ];
		options.push( { label: icon.label, value: key } );
	}
}

class Iconset extends Component {
	constructor( props ) {
		super( ...arguments );
		this.props = props;
		this.onChange = this.onChange.bind( this );
		this.state = props;
		this.state.baseClass = undefined !== props.baseClass ? props.baseClass : '';
		this.state.frontend = undefined === this.state.onChange ? true : false;
		this.state.icon = ( undefined === this.state.icon || '' === this.state.icon ) && options.length ? options[ 0 ].value : this.state.icon;
		this.state.label = undefined === this.state.label ? 'Select an icon' : this.state.label;
	}
	onChange( icon ) {
		this.setState( { icon: icon } );
		if ( undefined !== this.props.onChange ) {
			this.props.onChange( icon );
		}
	}
	render() {
		const figure = <figure className={ `${ this.state.baseClass }iconset__icon` }>
			{ icons[ this.state.icon ].svg }
		</figure>;
		return this.state.frontend ? figure : <div>
			<InspectorControls>
				<PanelBody>
					<SelectControl
						label={ this.state.label }
						value={ this.state.icon }
						options={ options }
						onChange={ value => this.onChange( value ) }
					/>
				</PanelBody>
			</InspectorControls>
			{ figure }
		</div>;
	}
}

export { Iconset };
