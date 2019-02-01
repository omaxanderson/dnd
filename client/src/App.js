import React from 'react';
import {
	BrowserRouter as Router,
	Route,
	Redirect,
	Switch
} from 'react-router-dom';
import Login from './auth/Login';
import Logout from './auth/Logout';
import Register from './auth/Register';
import Home from './Home';
import Notes from './Notes';
import Tags from './Tags';
import Note from './Note';
import CampaignList from './CampaignList';
import Campaign from './Campaign';
const cookies = require('browser-cookies');


// set up our authentication state
const Auth = {
	accessToken: cookies.get('accessToken'),
	authenticate(credentials, next) {
		fetch('/login', {
			method: 'POST',
			body: JSON.stringify(credentials),
			headers: {
				'Content-Type': 'application/json'
			},
			mode: 'cors'
		})
			.then(response => {
				const resStatus = response.status;
				response.json()
					.then(data => {
						if (resStatus === 200) {
							this.isAuthenticated = true;
							cookies.set('accessToken', data.token);
							this.accessToken = cookies.get('accessToken');
						}
						next(JSON.stringify(data));
					});
			})
			.catch(err => {
				//console.log(err);
				next(JSON.stringify(err));
			});
		/*
		*/
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
			<Switch>
				<PrivateRoute exact path='/' component={ Home } />
				<PrivateRoute path='/notes/create' component={ Note } isNewNote={ true } />
				<PrivateRoute path='/notes/:noteId' component={ Note } />
				<PrivateRoute path='/notes' component={ Notes } />
				<PrivateRoute path='/tags' component={ Tags } />
				<PrivateRoute path='/campaigns/:campaignId' component={ Campaign } />
				<PrivateRoute path='/campaigns' component={ CampaignList } />
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
				<Route path='/register' 
					render={props => {
						return(
							<Register
								{...props}
								auth={ Auth }
							/>
						)
					}}
					auth={ Auth }
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
			</Switch>
		</Router>
	);
}

function PrivateRoute({ component: Component, ...rest }) {
	//console.log(Auth);
	//console.log(Auth.accessToken);
	console.log(rest);
	return (
		<Route
			{...rest}
			render={ props => 
				Auth.accessToken ? (
					<Component {...props} {...rest} />
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
