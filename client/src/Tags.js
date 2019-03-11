import React from 'react';
import { get } from 'object-path';
import { connect } from 'react-redux';
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
				//this.setState({ tags: data.tags });
				this.props.dispatch({
					type: 'SET_TAGS', 
					payload: {
						tags: data.tags,
					},
				});
			}
		})
		.catch(err => {
			console.log(err);
		});

		M.Modal.init(document.querySelectorAll('.modal'), {
			startingTop: '10%',
		});
	}

	// fuck this method is dumb
	openTagModal = (e) => {
		const id = e.target.dataset.id;
		// get notes for tag by id
		console.log('dispatching');
		this.props.dispatch({
			type: 'SELECT_TAG',
			payload: {
				id
			},
		});

		/*
		fetch(`/api/tags/notes/${id}`).then(res => res.json()).then(data => {
			let selectedTag = this.state.selectedTag;
			selectedTag.notes = data.notes;
			this.setState({ selectedTag });
		}).catch(err => {
			console.log(err);
		});
		*/

		/*
		this.setState({ 
			selectedTag: this.state.tags.find(tag => tag.tag_id === Number(id)) 
		});
		*/
	}

	render() {
		return (
			<React.Fragment>
				<Navbar />
				<div className='container'>
					{this.props.tags.map(tag => {
						return (
							<button 
								className='chip hoverable modal-trigger'
								style={{cursor: 'pointer'}}
								onClick={this.openTagModal}
								key={tag.tag_id}
								data-target='modal1'
								data-id={tag.tag_id}>
								{tag.name} 
								<span style={{marginLeft: '.5em'}}>({tag.associated_notes.notes.length})</span>
							</button>
						);
					})}
					<div id='modal1' className='modal'>
						<div className='modal-content'>
							<h4>{this.props.selectedTag && this.props.selectedTag.name}</h4>
							<p>{this.props.selectedTag && this.props.selectedTag.description}</p>
							<h5>Associated Notes</h5>
							{this.props.selectedTag.associated_notes && this.props.selectedTag.associated_notes.length && (
								this.props.selectedTag.associated_notes.map(note => <p>{note.title}</p>)
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

export default connect(state => ({
	tags: get(state, 'tags.results', []),
	selectedTag: get(state, 'tags.tag', {}),
}))(Tags);
