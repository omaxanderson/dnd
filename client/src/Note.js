import React from 'react';
import Navbar from './components/Navbar';
import TagForm from './components/TagForm';
import { Editor, EditorState, RichUtils, getDefaultKeyBinding, convertToRaw, convertFromRaw } from 'draft-js';
import { debounce } from 'lodash';

// @TODO need to figure out a solution to this unordered list styling issue

class RichEditorExample extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			editorState: EditorState.createEmpty()
		};

		this.focus = () => this.refs.editor.focus();
		this.onChange = (editorState) => this.setState({editorState});
		this.handleKeyCommand = this._handleKeyCommand.bind(this);
		this.mapKeyToEditorCommand = this._mapKeyToEditorCommand.bind(this);
		this.toggleBlockType = this._toggleBlockType.bind(this);
		this.toggleInlineStyle = this._toggleInlineStyle.bind(this);
	}

	componentDidMount() {
		fetch(`/api/notes/${this.props.match.params.noteId}`)
			.then(res => res.json())
			.then(data => {
				// @TODO here we need to pass the tag info down into the editorRef
				// Also @TODO need to initialize the tag form
				console.log('in componentDidMount');
				const loadedEditorState = EditorState.createWithContent(convertFromRaw(JSON.parse(data.content)));
				console.log(loadedEditorState);
				this.setState({ editorState: loadedEditorState });
				// this.editorRef.current.setTitleAndText(data.title, data.content);
			})
			.catch(err => {
				//alert(err);
			});
	}

	_handleKeyCommand(command, editorState) {
		const newState = RichUtils.handleKeyCommand(editorState, command);
		if (newState) {
			this.onChange(newState);
			return true;
		}
		return false;
	}

	saveContent = debounce(() => {
		console.log('sending ajax request');
		// I should get the title, tags, and content and store 
		// that in a single object to send off to the server
		/*
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
			*/
	}, 2500 /* Wait 2.5 seconds before auto-save */);

	_mapKeyToEditorCommand(e) {
		this.saveContent();

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

	test = () => {
		console.log(JSON.stringify(convertToRaw(this.state.editorState.getCurrentContent())));
	}

	render() {
		const {editorState} = this.state;
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
				<button onClick={this.test}>B</button>
				<TagForm />
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

export default RichEditorExample;
