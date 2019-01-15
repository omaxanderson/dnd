import React from 'react';
import { Redirect } from 'react-router-dom';
import Navbar from './components/Navbar';
import Editor from './components/Editor';

/* props expected: none */
class Note extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			textContent: '',
			title: '',
			tags: [],
			contentHasChanged: false,
			titleHasChanged: false,
			noteId: this.props.match.params.noteId,
			lastKeyPress: new Date()
		};

		this.editorRef = React.createRef();
		this.contentEditorRef = React.createRef();
		this.titleEditorRef = React.createRef();
	}

	componentDidMount() {
		fetch(`/api/notes/${this.state.noteId}`)
			.then(res => res.json())
			.then(data => {
				// @TODO here we need to pass the tag info down into the editorRef
				this.setState({textContent: data.content, title: data.title, tags: data.tags });
				this.editorRef.current.setTitleAndText(data.title, data.content);
			})
			.catch(err => {
				//alert(err);
			});

		// @TODO here we need to fetch the tag options
		fetch(`/api/tags`)
			.then(res => res.json())
			.then(data => {
				console.log(data);
			})
			.catch(err => {
				console.log(err);
			});
	}

	render() {
		return (
			<div>
				<Navbar />
				<div className='container'>
					<Editor
						noteId={this.state.noteId}
						textContent={this.state.textContent}
						title={this.state.title}
						onKeyDown={this.onKeyDown}
						ref={this.editorRef}
						contentRef={this.contentEditorRef}
						titleRef={this.titleEditorRef}
					/>
				</div>
			</div>
		)
	}

	onKeyDown = (target) => {
		const stateUpdate = {
			lastKeyPress: new Date(),
		};
		if (target.id === 'text-box') {
			stateUpdate.contentHasChanged = true;
		} else {
			stateUpdate.titleHasChanged = true;
		}
		this.setState({ ...stateUpdate });
		setTimeout(this.saveContent, 2000);
	}

	saveContent = () => {
		const curDate = new Date();

		// I don't really like this, it's basically assuming that the time
		// taken between setting the timeout above and this being executed will
		// happen in a fixed amount of time when that's never the case
		if (curDate.getTime() - this.state.lastKeyPress.getTime() < 1950) {
			return false;
		} 

		let changes = {};
		if (this.state.contentHasChanged) {
			changes.content = document.querySelector('#text-box').innerHTML;
		}
		if (this.state.titleHasChanged) {
			changes.title = document.querySelector('#title-edit').innerHTML;
		}
		if (!changes.content && !changes.title) {
			return false;
		}

		fetch(`/api/notes/${this.state.noteId}`, {
			method: 'PUT',
			mode: 'cors',
			body: JSON.stringify(changes),
			headers: {
				'Content-Type': 'application/json'
			},
		})
			.then(res => res.json())
			.then(data => {
				if (data.affectedRows) {
					this.editorRef.current.flashSaved();
				}
			})
			.catch(err => {
				console.log(err);
			});
	}
};

export default Note;
