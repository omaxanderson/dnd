import React from 'react';
import Navbar from './components/Navbar';
import Editor from './components/Editor';

class Note extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			textContent: '',
			title: '',
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
				this.setState({textContent: data.content, title: data.title});
				this.editorRef.current.setTitleAndText(data.title, data.content);
			})
			.catch(err => {
				alert(err);
			});;
		// set an interval to constantly save/update the content after
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
		console.log(curDate.getTime() - this.state.lastKeyPress.getTime());

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
			changes.title = document.querySelector('#title-editor').innerHTML;
		}
		console.log(changes);
		if (!changes.content && !changes.title) {
			return false;
		}

		fetch('/api/notes/1', {
			method: 'PUT',
			mode: 'cors',
			body: JSON.stringify(changes),
			headers: {
				'Content-Type': 'application/json'
			},
		})
			.then(res => res.json())
			.then(data => {
				console.log(data);
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
