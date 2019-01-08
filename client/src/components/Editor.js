import React from 'react';
import ButtonBar from './ButtonBar';

class Editor extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			boldStatus: false,
			italicStatus: false,
			underlineStatus: false,
			lastSaveTimestamp: new Date(),
			contentSet: false,
			titleSet: false,
		}

		this.textEditorRef = React.createRef();
		this.titleRef = React.createRef();
		this.savedTextRef = React.createRef();
	}

	componentDidMount() {
		this.textEditorRef.current.focus();
		document.execCommand('justifyLeft');
	}

	render() {
		return (
			<div className='editor'>
				<h3 ref={this.titleRef} onKeyDown={this.handleButtonDown} className='title-edit' contentEditable='true'></h3>
				<div ref={this.savedTextRef} className='right green-text' style={{marginTop: '50px'}} hidden>Your changes have been saved</div>
				<ButtonBar 
					execCommand={this.executeCommand}
				/>
				<div id='text-box' ref={this.textEditorRef} contentEditable onKeyDown={this.handleButtonDown} className='text-box'></div>
			</div>
		);
	}

	setTitleAndText(title, text) {
		this.setState({textContent: text, title: title});
		this.textEditorRef.current.innerHTML = text;
		this.titleRef.current.innerHTML = title;
	}

	flashSaved = () => {
		this.savedTextRef.current.hidden = false;
		setTimeout(() => {
			this.savedTextRef.current.hidden = true;
		}, 4000);
	}

	handleButtonDown = (key, ...rest) => {
		this.props.onKeyDown(key.target);
		// console.log(key.which);
		//console.log(`${key.metaKey ? 'Cmd + ' : ''} ${key.key}`);

		// Tab
		if (key.which === 9) {
			key.preventDefault();
			if (key.shiftKey) {
				this.executeCommand('outdent');
			} else {
				this.insertTextAtCursor('&nbsp;&nbsp;&nbsp;&nbsp;');
			}
		}

		// Cmd + u
		if (key.which === 85 && key.metaKey) {
			key.preventDefault();
			this.executeCommand('undo');
		}

		// Cmd + u
		if (key.which === 89 && key.metaKey) {
			key.preventDefault();
			this.executeCommand('redo');
		}

		// Later we can start adding something like on '&' then we fetch a list of NPC's or similar
	}

	// taken from https://jsfiddle.net/Xeoncross/4tUDk/
	insertTextAtCursor = (html) => {
		var sel, range;
		if (window.getSelection) {
			// IE9 and non-IE
			sel = window.getSelection();
			if (sel.getRangeAt && sel.rangeCount) {
				range = sel.getRangeAt(0);
				range.deleteContents();

				// Range.createContextualFragment() would be useful here but is
				// non-standard and not supported in all browsers (IE9, for one)
				var el = document.createElement("div");
				el.innerHTML = html;
				var frag = document.createDocumentFragment(), node, lastNode;
				while ( (node = el.firstChild) ) {
					lastNode = frag.appendChild(node);
				}
				range.insertNode(frag);

				// Preserve the selection
				if (lastNode) {
					range = range.cloneRange();
					range.setStartAfter(lastNode);
					range.collapse(true);
					sel.removeAllRanges();
					sel.addRange(range);
				}
			}
		} else if (document.selection && document.selection.type != "Control") {
			// IE < 9
			document.selection.createRange().pasteHTML(html);
		}
	}

	executeCommand = (...params) => {
		console.log(...params);
		this.refocus();
		document.execCommand(...params);
		this.refocus();
		this.forceUpdate();
	}

	refocus() {
		this.textEditorRef.current.focus();
	}

}

export default Editor;
