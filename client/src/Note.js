import React from 'react';
import Navbar from './components/Navbar';
import TagForm from './components/TagForm';
import { 
	Editor, 
	EditorState, 
	RichUtils, 
	getDefaultKeyBinding, 
	convertToRaw, 
	convertFromRaw 
} from 'draft-js';
import { debounce } from 'lodash';

// @TODO need to figure out a solution to this unordered list styling issue

class Note extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			editorState: EditorState.createEmpty(),
			tags: null,
			noteId: 0,
			title: this.props.isNewNote ? 'Untitled' : '',
			/* @TODO once we implement modals we'll need to actually set this */
			inModalEditor: false,
			isNewNote: this.props.isNewNote || false,
		};

		// function bindings
		this.focus = () => this.refs.editor.focus();
		this.onChange = (editorState) => this.setState({editorState});
		this.handleKeyCommand = this._handleKeyCommand.bind(this);
		this.mapKeyToEditorCommand = this._mapKeyToEditorCommand.bind(this);
		this.toggleBlockType = this._toggleBlockType.bind(this);
		this.toggleInlineStyle = this._toggleInlineStyle.bind(this);

		// creating refs
		this.titleRef = React.createRef();
		this.saveIndicatorRef = React.createRef();
	}

	componentDidMount() {
		// get our note data if this is an existing note
		if (!this.state.isNewNote) {
			fetch(`/api/notes/${this.props.match.params.noteId}`)
				.then(res => res.json())
				.then(data => {
					const loadedEditorState = EditorState.createWithContent(
						convertFromRaw(JSON.parse(data.content))
					);
					this.setState({ 
						noteId: this.props.match.params.noteId,
						tags: data.tags,
						editorState: loadedEditorState,
						title: data.title,
					});
					// this.editorRef.current.setTitleAndText(data.title, data.content);
				})
				.catch(err => {
					//alert(err);
				});
		} else {
			// just get tags
			fetch('/api/tags').then(res => res.json())
				.then(data => {
					const tags = data.tags.map(item => {
						item.is_applied = 0;
						return item;
					});
					this.setState({ tags });
				})
				.catch(err =>{
					console.error(err);
				});
		}
	}

	_handleKeyCommand(command, editorState) {
		const newState = RichUtils.handleKeyCommand(editorState, command);
		if (newState) {
			this.onChange(newState);
			return true;
		}
		return false;
	}

	flashSaved = (type) => {
		this.saveIndicatorRef.current.classList.remove('saved-text-fade-out');
		this.saveIndicatorRef.current.removeAttribute('hidden');
		setTimeout(() => {
			this.saveIndicatorRef.current.classList.add('saved-text-fade-out');
		}, 2500);
	}

	debounceSaveContent = debounce(() => {
		const noteData = {
			content: JSON.stringify(convertToRaw(this.state.editorState.getCurrentContent())),
			title: this.titleRef.current.textContent,
		};

		const url = `/api/notes${
			!this.state.isNewNote ? `/${this.state.noteId}` : ''
		}`;
		const method = this.state.isNewNote ? 'POST' : 'PUT';

		fetch(url, {
			method,
			mode: 'cors',
			body: JSON.stringify(noteData),
			headers: {
				'Content-Type': 'application/json'
			},
		}).then(res => res.json())
			.then(data => {
				if (data.affectedRows) {
					this.flashSaved('Note');
				}
				if (this.state.isNewNote) {
					this.setState({ isNewNote: false, noteId: data.noteId });
					this.props.history.push(`/notes/${data.noteId}`);
				}
			}).catch(err => {
				console.log(err);
			});
	}, 2000); /* Wait 2 seconds before auto-save */

	_onTab = (e) => {
		const maxDepth = 4;
		this.onChange(RichUtils.onTab(e, this.state.editorState, maxDepth));
	}

	_mapKeyToEditorCommand(e) {
		if (!this.state.inModalEditor) {
			this.debounceSaveContent();
		}

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

	_toggleBlockType(blockType) {
		this.onChange(
			RichUtils.toggleBlockType(
				this.state.editorState,
				blockType
			)
		);
	}

	_toggleInlineStyle(inlineStyle) {
		this.onChange(
			RichUtils.toggleInlineStyle(
				this.state.editorState,
				inlineStyle
			)
		);
		//console.log(JSON.stringify(convertToRaw(this.state.editorState.getCurrentContent())));
	}

	// @TODO this noteAdd and noteDelete functions could probably be consolidated...
	// on note add 
	tagAdd = (e, tag) => {
		let tags = this.state.tags;
		let addedTag = tags.find((item) => item.name === tag.textContent.slice(0, -5));

		// if that tag already exists (ie selected an autofill)
		if (addedTag) {
			addedTag.is_applied = 1;
			this.setState({ tags });
			// @TODO here we also need to send the api request to save the new tag
			fetch(`/api/notes/${this.state.noteId}/tags/${addedTag.tag_id}`, {
				method: 'POST',
				mode: 'cors',
			})
				.then(res => res.json())
				.then(data => {
					console.log(data);
					this.flashSaved('Note');
				})
				.catch(err => {
					console.error('uh oh!');
					console.log(err);
				});
		} else {
			// create new tag
			const tagText = tag.textContent.slice(0, -5);
			fetch('/api/tags', {
				method: 'POST',
				mode: 'cors',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({
					name: tagText,
				}),
			}) 
				.then(res => res.json())
				.then(data => {
					let tags = this.state.tags;
					tags.push({ 
						tag_id: data.tag.tag_id,
						name: data.tag.name,
						is_applied: 1
					});
					this.setState({ tags });
					this.flashSaved('Note');
				})
				.catch(err => {
					console.error(err);
				});
		}
	}

	// on note delete
	tagDelete = (e, tag) => {
		let tags = this.state.tags;
		let deletedTag = tags.find((item) => item.name === tag.textContent.slice(0, -5));
		deletedTag.is_applied = 0;
		this.setState({ tags });
		// @TODO here we need to send the api request to remove that tag
		
		if (deletedTag) {
			fetch(`/api/notes/${this.state.noteId}/tags/${deletedTag.tag_id}`, {
				method: 'DELETE',
				mode: 'cors',
			}).then(res => {
				this.flashSaved('Tag');
			}).catch(err => {
				console.error('uh oh!');
				console.log(err);
			});
		}
	}

	render() {
		const { editorState } = this.state;
		// If the user changes block type before entering any text, we can
		// either style the placeholder or hide it. Let's just hide it now.
		let className = 'RichEditor-editor';
		var contentState = editorState.getCurrentContent();
		if (!contentState.hasText()) {
			if (contentState.getBlockMap().first().getType() !== 'unstyled') {
				className += ' RichEditor-hidePlaceholder';
			}
		}

		return (
			<React.Fragment>
				<Navbar />
				<div className='container'>
					<h5 className='title-edit' 
						ref={this.titleRef}
						contentEditable={true} 
						suppressContentEditableWarning={true}
						onKeyDown={this.debounceSaveContent}
					>
						{this.state.title}
					</h5>
					<div className='row'>
						<div className='col s12 m8'>
							<TagForm 
								tags={this.state.tags}
								onTagAdd={this.tagAdd}
								onTagDelete={this.tagDelete}
							/>
						</div>
						<div className='col s12 m4'
								style={{ marginTop: '15px' }} >
							<p 
								ref={this.saveIndicatorRef} 
								className='green-text' 
								hidden
							>Note saved!</p>
						</div>
					</div>
					<div className="RichEditor-root">
						<BlockStyleControls
							editorState={editorState}
							onToggle={this.toggleBlockType}
						/>
						<InlineStyleControls
							editorState={editorState}
							onToggle={this.toggleInlineStyle}
						/>
						<div className={className} onClick={this.focus}>
						<Editor
							blockStyleFn={getBlockStyle}
							customStyleMap={styleMap}
							editorState={editorState}
							handleKeyCommand={this.handleKeyCommand}
							keyBindingFn={this.mapKeyToEditorCommand}
							onTab={this._onTab}
							onChange={this.onChange}
							ref="editor"
							spellCheck={true}
						/>
						</div>
					</div>
				</div>
			</React.Fragment>
		);
	}
}


// Custom overrides for "code" style.
const styleMap = {
	CODE: {
		backgroundColor: 'rgba(0, 0, 0, 0.05)',
		fontFamily: '"Inconsolata", "Menlo", "Consolas", monospace',
		fontSize: 16,
		padding: 2,
	},
};

function getBlockStyle(block) {
	switch (block.getType()) {
		case 'blockquote': return 'RichEditor-blockquote';
		default: return null;
	}
}

class StyleButton extends React.Component {
	constructor() {
		super();
		this.onToggle = (e) => {
			e.preventDefault();
			this.props.onToggle(this.props.style);
		};
	}
	render() {
		let className = 'RichEditor-styleButton';
		if (this.props.active) {
			className += ' RichEditor-activeButton';
		}
		return (
			<span className={className} onMouseDown={this.onToggle}>
				{this.props.label}
			</span>
		);
	}
}

const BLOCK_TYPES = [
	{label: 'H1', style: 'header-one'},
	{label: 'H2', style: 'header-two'},
	{label: 'H3', style: 'header-three'},
	{label: 'H4', style: 'header-four'},
	{label: 'H5', style: 'header-five'},
	{label: 'H6', style: 'header-six'},
	{label: 'Blockquote', style: 'blockquote'},
	{label: 'UL', style: 'unordered-list-item'},
	{label: 'OL', style: 'ordered-list-item'},
	{label: 'Code Block', style: 'code-block'},
];

const BlockStyleControls = (props) => {
	const {editorState} = props;
	const selection = editorState.getSelection();
	const blockType = editorState
		.getCurrentContent()
		.getBlockForKey(selection.getStartKey())
		.getType();
	return (
		<div className="RichEditor-controls">
			{BLOCK_TYPES.map((type) =>
				<StyleButton
					key={type.label}
					active={type.style === blockType}
					label={type.label}
					onToggle={props.onToggle}
					style={type.style}
				/>
			)}
		</div>
	);
};

var INLINE_STYLES = [
	{label: 'Bold', style: 'BOLD'},
	{label: 'Italic', style: 'ITALIC'},
	{label: 'Underline', style: 'UNDERLINE'},
	{label: 'Monospace', style: 'CODE'},
];

const InlineStyleControls = (props) => {
	const currentStyle = props.editorState.getCurrentInlineStyle();

	return (
		<div className="RichEditor-controls">
			{INLINE_STYLES.map((type) =>
				<StyleButton
					key={type.label}
					active={currentStyle.has(type.style)}
					label={type.label}
					onToggle={props.onToggle}
					style={type.style}
				/>
			)}
		</div>
	);
};

export default Note;
