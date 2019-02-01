import React from 'react';
import Navbar from './components/Navbar';
import Editor from './components/Editor';
import Card from './components/Card';
import 'materialize-css/dist/css/materialize.min.css';
import M from 'materialize-css';
import moment from 'moment';

class Notes extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			notes: [],
			sortIsAsc: false,
			sortMethods: [
				{
					method: sortByLastModified,
					displayName: 'Last Modified',
					isActive: true,
				},
				{
					method: sortByCreated,
					displayName: 'Created',
					isActive: false,
				},
				{
					method: sortAlphabetically,
					displayName: 'Name',
					isActive: false,
				},
			],
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

	componentDidMount() {
		const elements = document.querySelectorAll('.sort-dropdown');
		M.Dropdown.init(elements, {
			alignment: 'left',
			coverTrigger: false,
			constrainWidth: false,
		});
	}

	onSortClick = (e) => {
		// Unset current method
		let sortMethods = this.state.sortMethods.slice();
		sortMethods.find(method => method.isActive).isActive = false;
		sortMethods.find(method => method.displayName === e.target.dataset.target).isActive = true;
		this.setState({ sortMethods });
	}

	onSortOrderClick = e => {
		// toggle sort order
		this.setState({ sortIsAsc: !this.state.sortIsAsc });
	}

	render() {
		const activeSortMethod = this.state.sortMethods.find(method => method.isActive);
		const adjustedSortMethod = (a, b) => {
			return activeSortMethod.method(a, b) * (!this.state.sortIsAsc ? -1 : 1);
		}

		// create a small card for each note
		const cards = this.state.notes
			.sort(adjustedSortMethod)
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
					<div className='col s12'>
						<h3 style={{marginTop: '0px', marginBottom: '0px', display: 'inline-block'}}>Notes</h3>
						<div className='right'>
							<div className=' valign-wrapper'>
								<ul id='sort-dropdown' className='dropdown-content'>
									{this.state.sortMethods.map(method => {
										return (
											<li><span 
												onClick={this.onSortClick} 
												data-target={method.displayName}>
												{method.displayName}
											</span></li>
										);
									})}
								</ul>
								<a 
									className='sort-dropdown dropdown-trigger btn' 
									href='#!' 
									data-target='sort-dropdown'>
									{this.state.sortMethods.find(method => method.isActive).displayName}
								</a>
								<a 
									className='btn-floating waves-effect waves-light'  
									style={{marginLeft: '1em'}}
									onClick={this.onSortOrderClick}>
									<i className='material-icons'>
										{this.state.sortIsAsc ? 'arrow_upward' : 'arrow_downward'}
									</i>
								</a>
							</div>
						</div>
					</div>
				</div>
				<div className='row'>
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

function sortAlphabetically(a, b) {
	if (a.title.toLowerCase() < b.title.toLowerCase()) {
		return -1;
	} else if (a.title.toLowerCase() > b.title.toLowerCase()) {
		return 1;
	}
	return 0;
}

export default Notes;
