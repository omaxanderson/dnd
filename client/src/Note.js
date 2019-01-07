import React from 'react';
import Navbar from './components/Navbar';

class Note extends React.Component {
	constructor(props) {
		super(props);
		console.log(props);
	}

	render() {
		return (
			<div>
				<Navbar />
				<div>hey!</div>
			</div>
		)
	}

};

export default Note;
