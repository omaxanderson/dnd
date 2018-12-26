import React from 'react';
import {
	BrowserRouter as Router,
	Route,
	Redirect,
	withRouter
} from 'react-router-dom';
import Login from './auth/Login';
import Home from './Home';


// set up our authentication state
const Auth = {
	isAuthenticated: false,
	sessionCookie: '',
	authenticate(next) {
		this.isAuthenticated = true;
		setTimeout(() => {
			next(JSON.stringify({
				status: 200,
				message: 'Authenticated'
			}));
		}, 1000);
	},
	logout(next) {
		this.isAuthenticated = false;
		console.log('fake logout!');
		next();
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
			</div>
		</Router>
	);
}

function PrivateRoute({ component: Component, ...rest }) {
	return (
		<Route
			{...rest}
			render={ props => 
				Auth.isAuthenticated ? (
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
