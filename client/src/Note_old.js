import React from 'react';
import { Redirect } from 'react-router-dom';
import Navbar from './components/Navbar';
//import Editor from './components/Editor';
import { Editor, EditorState, RichUtils, getDefaultKeyBinding } from 'draft-js';

/* props expected: none */
class Note extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			textContent: '',
			title: '',
			note: {},
			contentHasChanged: false,
			titleHasChanged: false,
			noteId: this.props.match.params.noteId,
			lastKeyPress: new Date(),
			editorState: EditorState.createEmpty(),
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
				this.setState({ note: data });
				// this.editorRef.current.setTitleAndText(data.title, data.content);
			})
			.catch(err => {
				//alert(err);
			});
	}

	onChange = (editorState) => {
		this.setState({ editorState });
	}

	handleKeyCommand = (command, editorState) => {
		const newState = RichUtils.handleKeyCommand(editorState, command);
		if (newState) {
			this.onChange(newState);
			return 'handled';
		}
		return 'not-handled';
	}

	_mapKeyToEditorCommand = (e) => {
		if (e.keyCode === 9 /* TAB */) {
			const newEditorState = RichUtils.onTab(
				e,
				this.state.editorState,
				4, /* maxDepth */
			);
			if (newEditorState !== this.state.editorState) {
				this.onChange(newEditorState);
			}
			return;
		}
		return getDefaultKeyBinding(e);
	}

	_toggleBlockType = (e) => {
		this.onChange(
			RichUtils.toggleBlockType(
				this.state.editorState, 
				e.target.dataset.action
			)
		);
	}

	_toggleInlineStyle = (e) => {
		console.log(this.state.editorState.getCurrentContent());
		this.onChange(
			RichUtils.toggleInlineStyle(
				this.state.editorState, 
				e.target.dataset.action
			)
		);
	}

	render() {
		return (
			<div>
				<Navbar />
				<div className='container'>
					<button data-action='BOLD' className='btn' onClick={this._toggleInlineStyle}><strong>B</strong></button>
					<button data-action='ITALIC' className='btn' onClick={this._toggleInlineStyle}><i>i</i></button>
					<button data-action='UNDERLINE' className='btn' onClick={this._toggleInlineStyle}><u>U</u></button>
					<div className='draftjs-editor'>
						<Editor 
							ref={this.editorRef}
							editorState={this.state.editorState}
							handleKeyCommand={this.handleKeyCommand}
							onChange={this.onChange}
							keyBindingFn={this._mapKeyToEditorCommand}
						/>
					</div>
				</div>
			</div>
		);
		/*
		return (
			<div>
				<Navbar />
				<div className='container'>
					<Editor
						noteId={this.state.noteId}
						note={this.state.note}
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
		*/
	}

	onKeyDown = (target) => {
		console.log('title edited');
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
		console.log('saving title');
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
			console.log(changes.title);
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
