import React from 'react';
import Navbar from './components/Navbar';

class Notes extends React.Component {

	render() {
		return (
			<React.Fragment>
			<Navbar />
			<div className='container'>
				<h4>
					Ideas
				</h4>
				<p>There will be different kinds of notes.</p>
				<ul className='collection'>
					<li className='collection-item'>Session Prep</li>
					<li className='collection-item'>Session Recap</li>
					<li className='collection-item'>World Building</li>
					<li className='collection-item'>Custom Labels</li>
				</ul>
				<p>You will be able to organize and sort by labels. The home page of the notes 
					could have a few different options, such as cards with maybe the 5 most recent 
					of that topic.</p>
				<p>An idea I like better might be a tab system where each tab will list the 
					notes that have that tag.</p>
				<p>Notes can potentially have multiple tags on them and perhaps a "main" tag</p>
			</div>
			</React.Fragment>
		);
	}

}

export default Notes;
