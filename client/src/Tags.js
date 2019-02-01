import React from 'react';
import Navbar from './components/Navbar';
import 'materialize-css/dist/css/materialize.min.css';
import M from 'materialize-css';

class Tags extends React.Component {

	constructor(props) {
		super(props);

		this.state = {
			tags: [],
			selectedTag: {},
		}
	}

	componentDidMount() {
		fetch('/api/tags').then(res => res.json()).then(data => {
			if (data.metadata.numResults) {
				this.setState({ tags: data.tags });
			}
		})
		.catch(err => {
			console.log(err);
		});

		M.Modal.init(document.querySelectorAll('.modal'), {
			startingTop: '10%',
		});
	}

	openTagModal = (e) => {
		const id = e.target.dataset.id;
		// get notes for tag by id
		fetch(`/api/tags/notes/${id}`).then(res => res.json()).then(data => {
			let selectedTag = this.state.selectedTag;
			selectedTag.notes = data.notes;
			this.setState({ selectedTag });
		}).catch(err => {
			console.log(err);
		});
		this.setState({ 
			selectedTag: this.state.tags.find(tag => tag.tag_id === Number(id)) 
		});
	}

	render() {
		return (
			<React.Fragment>
				<Navbar />
				<div className='container'>
					{this.state.tags.map(tag => {
						return (
							<button 
								className='chip hoverable modal-trigger'
								style={{cursor: 'pointer'}}
								onClick={this.openTagModal}
								data-target='modal1'
								data-id={tag.tag_id}>
								{tag.name} 
								<span style={{marginLeft: '.5em'}}>({tag.numNotes})</span>
							</button>
						);
					})}
					<div id='modal1' className='modal'>
						<div className='modal-content'>
							<h4>{this.state.selectedTag.name}</h4>
							<p>{this.state.selectedTag.description}</p>
							<h5>Associated Notes</h5>
							{this.state.selectedTag.notes && this.state.selectedTag.notes.length && (
								this.state.selectedTag.notes.map(note => <p>{note.title}</p>)
							) || <span className='grey-text'>No associated notes</span>}
						</div>
						<div className='modal-footer'>
							<a href='#!' className='modal-close waves-effect waves-green btn-flat'>Close</a>
							<a href='#!' className='modal-close waves-effect waves-green btn-flat'>Save</a>
						</div>
					</div>
				</div>
			</React.Fragment>
		);
	}	
}

export default Tags;
