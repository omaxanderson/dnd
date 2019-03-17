import React, { Component } from 'react';
import M from 'materialize-css';

export default class Dropdown extends Component {

	componentDidMount() {
		M.FormSelect.init(document.querySelectorAll('select'), {});
	}
	
	render() {
		return (
			<div className='input-field'>
				<select multiple={this.props.multiple}>
					{
						this.props.options.map(option => {
							return <option value={option.value}>{option.label}</option>;
						})
					}
				</select>
				<label>{this.props.label}</label>
			</div>
		);
	}
}
