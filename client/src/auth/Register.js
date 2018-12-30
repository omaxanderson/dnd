import React from 'react';
import InputField from '../components/InputField';
import Card from '../components/Card';

class Register extends React.Component {
	constructor(props) {
		super(props);

		this.usernameRef = React.createRef();
		this.emailRef = React.createRef();
		this.passwordRef = React.createRef();
		this.passwordConfRef = React.createRef();
	}
	render() {
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
		console.log('heyooo');
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
							autoFocus={true}
						/>
						<InputField
							sSize={12}
							id={'email'}
							type={'email'}
							className='validate'
						/>
						<InputField
							sSize={12}
							id={'password'}
							type={'password'}
							className='validate'
						/>
						<InputField
							sSize={12}
							id={'passwordConf'}
							label={'Confirm Password'}
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
