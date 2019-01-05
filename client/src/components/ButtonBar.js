import React from 'react';

class ButtonBar extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			boldStatus: false,
			italicStatus: false,
			underlineStatus: false,
		}

		this.boldRef = React.createRef();
		this.italicsRef = React.createRef();
		this.underlineRef = React.createRef();
	}

	render() {
		const toggleableButtons = [
			'bold',
			'italic',
			'underline',
		]
		.map(methodName => {
			let displayName = methodName.slice(0, 1).toUpperCase() + methodName.slice(1);
			return (
				<button 
					className={`editor-button editor-button-${methodName} ${this.state[`${methodName}Status`] ? 'on' : 'off'}`} 
					data-value={methodName}
					key={methodName}
					onClick={this.handleToggleClick}>{displayName}
				</button>
			)
		});

		const otherButtons = [
			{methodName: 'insertOrderedList', displayName: 'OL', icon: 'format_list_numbered'},
			{methodName: 'insertUnorderedList', displayName: 'UL', icon: 'format_list_bulleted'},
			{methodName: 'justifyLeft', displayName: 'Justify Left', icon: 'format_align_left'},
			{methodName: 'justifyRight', displayName: 'Justify Right', icon: 'format_align_right'},
			{methodName: 'justifyCenter', displayName: 'Justify Center', icon: 'format_align_center'},
		]
		.map(obj => {
			return (
				<button 
					className={'editor-button off'} 
					data-value={obj.methodName}
					key={obj.methodName}
					onClick={this.handleClick}>{obj.displayName}
				</button>
			)
		});
		return (
			<div className='button-bar'>
				{toggleableButtons}
				{otherButtons}
			</div>
		);
	}

	handleClick = (e) => {
		this.props.execCommand(e.target.dataset.value);
	}

	handleToggleClick = (e) => {
		//const currentStatus = this.state.slice();
		const currentStatus = this.state[`${e.target.dataset.value}Status`];
		const newStatus = !currentStatus;
		this.setState({ [`${e.target.dataset.value}Status`]: newStatus });
		this.props.execCommand(e.target.dataset.value);
	}
};

export default ButtonBar;
