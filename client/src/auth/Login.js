import React from 'react';
import { Redirect } from 'react-router-dom'
import Card from '../components/Card';
const cookies = require('browser-cookies');

class Login extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			redirectToReferrer: false
		};
	}

	render() {
		if (cookies.get('accessToken')) {
			return <Redirect to='/' />;
		}

		let { from } = this.props.location.state || { from: { pathname: '/' } };
		let { redirectToReferrer } = this.state;

		if (redirectToReferrer) {
			return <Redirect to={ from } />;
		}

		return (
			<Card
				sSize={12}
				sOffset={0}
				mSize={6}
				mOffset={3}
				cardTitle={'Login'}
				cardBody={ this.getLoginForm() }
			/>
		);
	}

	login(e) {
		e.preventDefault();
		this.props.auth.authenticate((result) => {
			result = JSON.parse(result);
			if (result.status === 200) {
				this.setState({ redirectToReferrer: true });
			}
		});
	}

	getLoginForm() {
		return (
			<div className='row'>
				<form className='col s12'>
					<div className='row'>
						<div className='input-field col s12'>
							<input id='username' type='text' className='validate'/>
							<label htmlFor='username'>Username</label>
						</div>
						<div className='input-field col s12'>
							<input id='password' type='password' className='validate'/>
							<label htmlFor='password'>Password</label>
						</div>
						<div className='col s12'>
							<button className='btn waves-effect waves-light'
								type='submit'
								name='action'
								onClick={ (e) => this.login(e) }
							>Log In
								<i className='material-icons right'>send</i>
							</button>
						</div>
					</div>
				</form>
			</div>
		)
	}
}

export default Login;
