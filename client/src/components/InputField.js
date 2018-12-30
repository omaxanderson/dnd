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
			autofocus
		} = this.props;
		return (
			<div className={`input-field col s${sSize} m${mSize}`}>
				<input id={id} type={type} className={className} autoFocus={{autofocus}} />
				<label htmlFor={id}>{
					label ? label : `${id.charAt(0).toUpperCase() + id.slice(1)}`}
				</label>
			</div>
		)
	}
}

export default InputField;
