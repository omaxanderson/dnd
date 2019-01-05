import React from 'react';
import ButtonBar from './ButtonBar';

class Editor extends React.Component {
	constructor(props) {
		super(props);

		this.textEditorRef = React.createRef();
	}

	componentDidMount() {
		console.log('setting focus');
		this.textEditorRef.current.focus();

		console.log('justifying...');
		const justifyLeft = document.execCommand('justifyLeft');
	}

	render() {
		return (
			<div className='editor'>
			<ButtonBar 
			execCommand={this.executeCommand}
			/>
			<div ref={this.textEditorRef} contentEditable onKeyDown={this.handleButtonDown} className='text-box'></div>
			</div>
		);
	}

	handleButtonDown = (key, ...rest) => {
		console.log(`${key.metaKey ? 'Cmd + ' : ''} ${key.key}`);
		// Handle the tab key press
		if (key.which === 9) {
			key.preventDefault();
			this.executeCommand('indent');
			console.log('stop this behavior and execute the indent command');
		}

		if (key.keyCode === 1) {

		}
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

	executeCommand = cmd => {
		this.refocus();
		document.execCommand(cmd);
		this.refocus();
	}

	refocus() {
		this.textEditorRef.current.focus();
	}

	handleBoldClick = (e) => {
		e.preventDefault();
		console.log('test');
		document.execCommand('bold');
		this.refocus();
	}

}

export default Editor;
