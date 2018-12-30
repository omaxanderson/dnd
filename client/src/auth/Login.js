import React from 'react';
import { Redirect } from 'react-router-dom'
import Card from '../components/Card';
const cookies = require('browser-cookies');

class Login extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			redirectToReferrer: false,
			error: ''
		};

		this.usernameRef = React.createRef();
		this.passwordRef = React.createRef();
		this.submitRef = React.createRef();
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
				mSize={4}
				mOffset={4}
				cardTitle={'Login'}
				cardBody={ this.getLoginForm() }
			/>
		);
	}

	login(e) {
		e.preventDefault();
		const username = this.usernameRef.current.value;
		const password = this.passwordRef.current.value;
		this.props.auth.authenticate({ username, password }, (result) => {
			result = JSON.parse(result);
			console.log(result);
			if (result.status === 200) {
				console.log('success!');
				this.setState({ redirectToReferrer: true });
			} else {
				this.setState({ error: result.message});
			}
		});
	}

	// Should this use InputFields?
	getLoginForm() {
		return (
			<div className='row' style={{marginBotton: '0px'}}>
				<form className='col s12'>
					<div className='row' style={{marginBottom: '0px'}}>
						<div className='input-field col s12'>
							<input id='username' autoFocus={true} ref={this.usernameRef} type='text' className='validate'/>
							<label htmlFor='username'>Username</label>
						</div>
						<div className='input-field col s12'>
							<input id='password' ref={this.passwordRef} type='password' className='validate'/>
							<label htmlFor='password'>Password</label>
						</div>
						<div className='col s12'>
							<button className='btn waves-effect waves-light'
								type='submit'
								name='action'
								onClick={ (e) => this.login(e) }
								style={{marginTop: '20px'}}
							>Log In
								<i className='material-icons right'>send</i>
							</button>
						</div>
						<div className='col s12' style={{marginTop: this.state.error ? '20px' : '0px'}}>
							<p className='red-text'>{this.state.error}</p>
						</div>
					</div>
				</form>
			</div>
		)
	}
}

export default Login;
