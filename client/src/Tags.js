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
	}

	openConfirmModal = (e) => {

	}

	deleteTag = (e) => {
		// can just use the selected tag
		fetch(`/api/tags/${this.props.selectedTag.tag_id}`, {
			method: 'DELETE',
		})
			.then(res => {
				this.props.dispatch({
					type: 'DELETE_TAG',
					payload: this.props.selectedTag,
				});
				M.Modal.getInstance(document.getElementById('modal1')).close();
			}).catch(err => {
				console.log(err);
			});

	}

	render() {
		return (
			<React.Fragment>
				<Navbar />
				<div className='container'>
					<div className='row'>
						<h4>Tags</h4>
						{ /* @TODO add a search function? */ }
					</div>
					<div className='row'>
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
					</div>
					<div id='modal1' className='modal modal-fixed-footer'>
						<div className='modal-content'>
							<div className='row'>
								<h4 contentEditable={true}
									suppressContentEditableWarning={true}
									style={{paddingLeft: '0px'}} 
									className='title-edit col s10'>{this.props.selectedTag && this.props.selectedTag.name}
								</h4>
								<button 
									className='modal-trigger right btn-floating btn waves-effect waves-light red'
									data-target='modal2'
								>
									<i className='material-icons'>delete</i>
								</button>
							</div>
							{this.props.selectedTag && <p>{this.props.selectedTag.description}</p>}
							<h5>Associated Notes</h5>
							{this.props.selectedTag.associated_notes 
								&& this.props.selectedTag.associated_notes.notes
								&& this.props.selectedTag.associated_notes.notes.length 
								&& (this.props.selectedTag.associated_notes.notes.map(note => <p key={`${note.note_id}_association`}><a href={`/notes/${note.note_id}`}>{note.title}</a></p>)) 
								|| <span className='grey-text'>No associated notes</span>
							}
						</div>
						<div className='modal-footer'>
							<a href='#!' className='modal-close waves-effect waves-green btn-flat'>Close</a>
							<a onClick={ this.saveNote } className='modal-close waves-effect waves-green btn'>Save</a>
						</div>
					</div>

					<div id='modal2' className='modal modal-fixed-footer'>
						<div className='modal-content'>
							<p>Are you sure you want to delete this tag? Doing so will also remove all references to existing notes.</p>
						</div>
						<div className='modal-footer'>
							<a href='#!' className='modal-close waves-effect waves-green btn-flat'>Cancel</a>
							<a 
								onClick={ this.deleteTag } 
								className='modal-close waves-effect waves-green btn'
							>
								Delete
							</a>
						</div>
					</div>
				</div>
			</React.Fragment>
		);
	}	
}


export default connect(state => ({
	tags: get(state, 'tags.results', []),
	selectedTag: get(state, 'tags.selectedTag', {}),
}))(Tags);
