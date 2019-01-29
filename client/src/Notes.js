import React from 'react';
import Navbar from './components/Navbar';
import Editor from './components/Editor';
import Card from './components/Card';
import moment from 'moment';

class Notes extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			notes: [],
			sortMethod: sortByLastModifiedDesc,
		}
	}

	componentWillMount() {
		fetch('/api/notes')
			.then(res => res.json())
			.then(data => {
				this.setState({ notes: data.notes });
			})
			.catch(err => {
				console.log(err);
			});
	}

	render() {
		// create a small card for each note
		const cards = this.state.notes
			.sort(this.state.sortMethod)
			.map(note => {
			// create simple JSX components for the tag display
			const { 
				title, 
				createdAt, 
				updatedAt,
			} = note;
			const dateFormat = {
				weekday: 'short',
				year: '2-digit',
				month: 'short',
				day: '2-digit',
			};
			const createdAtDate = moment(createdAt).calendar();
			const updatedAtDate = moment(updatedAt).calendar();
			const tags = note.tags && note.tags.map(tag => {
				return <div className='chip'>{tag.name}</div>;
			});
			const body = (
				<div>
					{tags}
					<div className='grey-text text-lighten-2'>Created: {createdAtDate}</div>
					{updatedAt &&
						<div className='grey-text text-lighten-2'>Updated: {updatedAtDate}</div>
					}
				</div>
			);
			return (
				// @TODO add that css style on hover that i used in the movienight project
				<a href={`/notes/${note.noteId}`} key={note.noteId}>
					<Card 
						key={note.noteId + 'card'}
						idx={note.noteId}
						sSize={12}
						mSize={12}
						cardColor={'blue-grey'}
						textColor={'white'}
						cardTitle={note.title}
						cardBody={body}
						hoverable='hoverable'
					/>
				</a>
			)
		});
		return (
			<React.Fragment>
			<Navbar />
			<div className='container'>
				<div className='row' style={{marginTop: '20px'}}>
					{cards}
				</div>
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

// Sorting functions
function sortByCreated(a, b) {
	if (a.createdAt < b.createdAt) {
		return -1;
	} else if (a.createdAt > b.createdAt) {
		return 1;
	}
	return 0;
}

function sortByCreatedDesc(a, b) {
	return sortByCreated(b, a);
}

function sortByLastModified(a, b) {
	if (a.updatedAt < b.updatedAt) {
		return -1;
	} else if (a.updatedAt > b.updatedAt) {
		return 1;
	}
	return 0;
}

function sortByLastModifiedDesc(a, b) {
	return sortByLastModified(b, a);
}

function sortAlphabeticallyAsc(a, b) {
	if (a.title.toLowerCase() < b.title.toLowerCase()) {
		return -1;
	} else if (a.title.toLowerCase() > b.title.toLowerCase()) {
		return 1;
	}
	return 0;
}

function sortAlphabeticallyDesc(a, b) {
	return -1 * sortAlphabeticallyAsc(a, b)
}

export default Notes;
