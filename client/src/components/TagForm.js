import React from 'react';
import 'materialize-css/dist/css/materialize.min.css';
import M from 'materialize-css';

class TagForm extends React.Component {

	componentDidMount() {
		const elems = document.querySelector('.chips');
		const options = {
			data: [
				// Here we actually need to be using the tags already supplied on the note
				{ tag: 'chip 1' },
				{ tag: 'chip 2' },
				{ tag: 'max!' },
			],
			placeholder: 'Add a tag!',
			secondaryPlaceholder: '+ Add New Tag',
			autocompleteOptions: {
				data: {
					'Max': null,
					'Anderson': null,
					'Test': null,
				},
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
		const instances = M.Chips.init(elems, options);
	}

	render() {
		return (
			<div className='chips chips-placeholder'></div>
		);
	}
}

export default TagForm;
