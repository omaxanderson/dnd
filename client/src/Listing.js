import React from 'react';
import Navbar from './components/Navbar';
import Card from './components/Card';

class Notes extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			data: {},
		}
	}

	componentWillMount() {
		fetch(`/api/${noteId: this.props.match.params.listing`)
			.then(res => res.json())
			.then(data => {
				this.setState({ data });
			})
			.catch(err => {
				console.log(err);
			});
	}

	render() {
		console.log(this.state.data);
		// create a small card for each note
		const cards = this.state.notes.map(note => {
			const snippet = note.content.slice(0, 50);
			return (
				// @TODO add that css style on hover that i used in the movienight project
				<a href={`/notes/${note.note_id}`} key={note.note_id}>
					<Card 
						sSize={6}
						mSize={4}
						cardColor={'blue-grey'}
						textColor={'white'}
						cardTitle={note.title}
						cardBody={snippet + (note.content.length > 50 ? '...' : '')}
						hoverable='hoverable'
					/>
				</a>
			)
		});;
		return (
			<React.Fragment>
			<Navbar />
			<div className='container'>
				<div className='row' style={{marginTop: '20px'}}>
					{cards}
				</div>
				<Editor

				/>
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
