import React from 'react';
import {
	BrowserRouter as Router,
	Route,
	Redirect
} from 'react-router-dom';
import Login from './auth/Login';
import Logout from './auth/Logout';
import Home from './Home';
const cookies = require('browser-cookies');


// set up our authentication state
const Auth = {
	isAuthenticated: false,
	accessToken: cookies.get('accessToken'),
	authenticate(next) {
		this.isAuthenticated = true;
		cookies.set('accessToken', 'abcdefg');
		this.accessToken = cookies.get('accessToken');
		next(JSON.stringify({
			status: 200,
			message: 'Authenticated'
		}));
	},
	logout() {
		return new Promise((resolve, reject) => {
			this.isAuthenticated = false;
			cookies.erase('accessToken');
			console.log('fake logout!');
			resolve('success!');
		});
	}
};

function App() {
	return(
		<Router>
			<div>
				<PrivateRoute exact path='/' component={ Home } />
				<Route path='/login' 
					render={props => {
						return(
							<Login
								{...props}
								auth={ Auth }
							/>
						)
					}}
				/>
				<Route path='/logout' 
					render={props => {
						return(
							<Logout
								{...props}
								auth={ Auth }
							/>
						)
					}}
				/>
			</div>
		</Router>
	);
}

function PrivateRoute({ component: Component, ...rest }) {
	console.log(Auth);
	return (
		<Route
			{...rest}
			render={ props => 
				Auth.accessToken ? (
					<Component {...props} />
				) : (
					<Redirect
						to={{
							pathname: '/login',
							state: { from: props.location }
						}}
					/>
				)
			}
		/>
	);
}

export default App;
