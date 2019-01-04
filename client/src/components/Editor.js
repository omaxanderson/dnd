import React from 'react';

class Editor extends React.Component {

	render() {
		return (
			/* need a styling bar */
			/* <StyleBar /> */
			<div contenteditable='true' className='note-editor'></div>
		);
	}

}

export default Editor;
