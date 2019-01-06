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
		console.log('rendering ButtonBar');
		const toggleableButtons = [
			'bold',
			'italic',
			'underline',
			'strikeThrough',
		]
			.map(methodName => {
				let displayName = methodName.slice(0, 1).toUpperCase() + methodName.slice(1);
				return (
					<button 
					className={`editor-button editor-button-${methodName} ${document.queryCommandState(methodName) ? 'on' : 'off'}`} 
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
			{methodName: 'indent', displayName: 'Indent', icon: 'format_indent_increase'},
			{methodName: 'outdent', displayName: 'Outdent', icon: 'format_indent_decrease'},
			{methodName: 'createLink', displayName: 'Create Link', icon: 'insert_link'},
			{methodName: 'insertHorizontalRule', displayName: 'Line Break', icon: ''},
		]
			.map(obj => {
				return (
					<button 
						className={'editor-button off'} 
						data-value={obj.methodName}
						key={obj.methodName}
						onClick={this.handleClick}>
								{obj.displayName}
								<i className='material-icons right'>{obj.icon}</i>
					</button>
				)
			});

		return (
			<div className='button-bar row'>
				<div className='col s12'>
					{toggleableButtons}
					{otherButtons}
					<div className='input-field col s2 editor-select-container'>
						<select defaultValue='3' onChange={this.handleSelect} className='browser-default editor-select'>
							<option value='1'>Tiny</option>
							<option value='2'>Small</option>
							<option value='3'>Normal</option>
							<option value='4'>A Bit Bigger</option>
							<option value='5'>Large</option>
							<option value='6'>Really Big</option>
							<option value='7'>Gigantic</option>
						</select>
					</div>
				</div>
			</div>
		);
	}

	handleSelect = (e) => {
		e.preventDefault();
		this.props.execCommand('fontSize', false, e.target.value);
	}

	handleClick = (e) => {
		let params = [];
		if (e.target.dataset.value === 'createLink') {
			params.push(...[false, document.getSelection().toString()]);
			this.props.execCommand('contentReadOnly', false, true);
		}
		this.props.execCommand(e.target.dataset.value, ...params);
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
