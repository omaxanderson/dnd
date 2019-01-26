import React from 'react';
import 'materialize-css/dist/css/materialize.min.css';
import M from 'materialize-css';

class TagForm extends React.Component {

	initChips = () => {
		// this reduce is required because of the dumb way the autocomplete arguments
		// are required by the materialize chips component
		const autocompleteTags = this.props.tags
			.filter(item => !item.is_applied)
			.reduce((accumulator, currentVal) => {
				accumulator[`${currentVal.name}`] = null;
				return accumulator;
			}, {});

		const tagData = this.props.tags
			.filter(item => {
				return item.is_applied;
			})
			.map(item => {
				return { tag: item.name };
			});

		const elems = document.querySelector('.chips');

		const options = {
			data: tagData,
			placeholder: 'Add a tag!',
			secondaryPlaceholder: '+ Add New Tag',
			autocompleteOptions: {
				data: autocompleteTags,
			},
			onChipAdd: (e, chip) =>{
				this.props.onTagAdd(e, chip);
			},
			onChipSelect: () =>{
				console.log('selected!');
			},
			onChipDelete: (e, chip) =>{
				this.props.onTagDelete(e, chip);
			},
		};

		M.Chips.init(elems, options);
	}

	// This isn't terrible but there's probably a quicker way about this
	shouldComponentUpdate(nextProps, nextState) {
		return JSON.stringify(nextProps) !== JSON.stringify(this.props);
	}

	render() {
		// @TODO eventually might want to implement a shouldComponentUpdate() function
		console.log('tagForm rendering');
		if (this.props.tags) {
			this.initChips();
		}
		return (
			<div className='chips chips-placeholder chips-autocomplete'></div>
		);
	}
}

export default TagForm;
