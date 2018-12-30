import React from 'react';

class InputField extends React.Component {

	render() {
		let {
			sSize,
			mSize,
			className,
			id,
			type,
			label,
			autoFocus
		} = this.props;
		return (
			<div className={`input-field col s${sSize} m${mSize}`}>
				<input id={id} type={type} ref={this.props.ref} className={className} autoFocus={{autoFocus}} />
				<label htmlFor={id}>{
					label ? label : `${id.charAt(0).toUpperCase() + id.slice(1)}`}
				</label>
			</div>
		)
	}
}

export default InputField;
