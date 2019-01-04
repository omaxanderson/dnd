import React from 'react';
import { Redirect } from 'react-router-dom';

class Logout extends React.Component {
	// @TODO need to send a request to the back end to destroy the session
	render() {
		console.log('logging out...');
		this.props.auth.logout();
		console.log('test');
		return <Redirect to='/login' />;
	}
}

export default Logout;
