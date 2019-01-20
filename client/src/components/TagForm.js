import React from 'react';
import 'materialize-css/dist/css/materialize.min.css';
import M from 'materialize-css';

class TagForm extends React.Component {

	initChips = () => {
		// this reduce is required because of the dumb way the autocomplete arguments
		// are required by the materialize chips component
		const autocompleteTags = this.props.note.tags
			.filter(item => !item.is_applied)
			.reduce((accumulator, currentVal) => {
				accumulator[`${currentVal.name}`] = null;
				return accumulator;
			}, {});

		const elems = document.querySelector('.chips');

		const options = {
			data: this.props.note.tags
				.filter(item => {
					return item.is_applied;
				})
				.map(item => {
					return { tag: item.name };
				}),
			placeholder: 'Add a tag!',
			secondaryPlaceholder: '+ Add New Tag',
			autocompleteOptions: {
				data: autocompleteTags,
			},
			onChipAdd: (chip) =>{
				console.log('added!');
				console.log(chip);
			},
			onChipSelect: () =>{
				console.log('selected!');
			},
			onChipDelete: () =>{
				console.log('deleted!');
			},
		};

		M.Chips.init(elems, options);
	}

	render() {
		if (this.props.note && this.props.note.tags) {
			this.initChips();
		}
		return (
			<div className='chips chips-placeholder chips-autocomplete'></div>
		);
	}
}

export default TagForm;
