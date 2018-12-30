import React from 'react';
import { Redirect } from 'react-router-dom'
import InputField from '../components/InputField';
import Card from '../components/Card';
const cookies = require('browser-cookies');

class Register extends React.Component {
	constructor(props) {
		super(props);

		this.usernameRef = React.createRef();
		this.emailRef = React.createRef();
		this.passwordRef = React.createRef();
		this.passwordConfRef = React.createRef();
	}

	componentDidMount() {
		// focus on the usernameref
		console.log(this.usernameRef.current);
		this.usernameRef.current.focus();
	}

	render() {
		if (this.usernameRef.current) {
			this.usernameRef.current.focus();
		}

		if (cookies.get('accessToken')) {
			return <Redirect to='/' />;
		}

		return (
			<Card
				sSize={10}
				sOffset={1}
				mSize={4}
				mOffset={4}
				cardTitle={'Register'}
				cardBody={this.getCardBody()}
			/>
		);
	}

	signUp(e) {
		e.preventDefault();
		console.log(this.usernameRef.current);
		const username = this.usernameRef.current.value;
		const email = this.emailRef.current.value;
		const password = this.passwordRef.current.value;
		const passwordConf = this.passwordConfRef.current.value;
		fetch('http://localhost:8080/register', {
			method: 'POST',
			body: JSON.stringify({
				username,
				email,
				password,
				passwordConf
			}),
			mode: 'cors',
			headers: {
				'Content-Type': 'application/json'
			}
		})
			.then(response => {
				console.log(response);
			})
			.catch(err => {
				console.log(err);
			});

	}

	getCardBody() {
		return (
			<div className='row'>
				<form className='col s12'>
					<div className='row'>
						<InputField
							sSize={12}
							id={'username'}
							type={'text'}
							className='validate'
							refProp={this.usernameRef}
							autoFocus={true}
						/>
						<InputField
							sSize={12}
							id={'email'}
							type={'email'}
							refProp={this.emailRef}
							className='validate'
						/>
						<InputField
							sSize={12}
							id={'password'}
							refProp={this.passwordRef}
							type={'password'}
							className='validate'
						/>
						<InputField
							sSize={12}
							id={'passwordConf'}
							label={'Confirm Password'}
							refProp={this.passwordConfRef}
							type={'password'}
							className='validate'
						/>
						<div className='col s12'>
							<button className='btn waves-effect waves-light'
								type='submit'
								name='action'
								onClick={ (e) => this.signUp(e) }
							>Submit
								<i className='material-icons right'>send</i>
							</button>
						</div>
					</div>
				</form>
			</div>
		)
	}
}

export default Register;
