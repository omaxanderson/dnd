import React from 'react';
import { Redirect } from 'react-router-dom';

class Logout extends React.Component {
	/*
	this.props.auth.logout(() = >{ 
		return (
			<Redirect to='/login' />
		);
	});
	*/
	async componentDidMount() {
	}

	render() {
		console.log('logging out...');
		this.props.auth.logout();
		console.log('test');
		return <Redirect to='/login' />;
	}
}

export default Logout;
