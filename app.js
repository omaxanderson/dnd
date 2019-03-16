// const express = require('express');
import express from 'express';
import path from 'path';
// const path = require('path');
const cookieParser = require('cookie-parser');
const http = require('http');
const session = require('express-session');
const MySQLStore = require('express-mysql-session')(session);
const options = require('./database/sessionDbConfig.js');

const sessionStore = new MySQLStore(options);

// Routers
const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');
const loginRouter = require('./routes/login');
const registerRouter = require('./routes/register');
const logoutRouter = require('./routes/logout');
const notesRouter = require('./routes/notes');
const campaignsRouter = require('./routes/campaigns');
const tagsRouter = require('./routes/tags');

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// use the session middleware
app.use(session({
	secret: 'max is cool',
	resave: true,
	saveUninitialized: true,
	cookie: {
		secure: false,
		maxAge: 1000 * 60 * 60 * 24 * 7 * 2,	// 2 weeks
	},
	store: sessionStore,
}));

const apiMiddleware = (req, res, next) => {
	// uncomment for session and cookie debugging
	/*
	console.log(req.session);
	console.log(req.cookies);
	*/

	// check cookies
	if (!req.session.userId) {
		res.clearCookie('accessToken');
		res.send(JSON.stringify({
			status: 401,
			message: 'Unauthorized',
		}));
		return;
	}

	res.append('Access-Control-Allow-Origin', 'http://localhost:3000');
	res.append('Access-Control-Allow-Headers', 'Content-Type');
	if (req.method === 'OPTIONS') {
		console.log('options request');
		res.send();
	} else {
		console.log('post request');
		next();
	}

	/*
	if (!req.session.views) {
		req.session.views = 1;
	} else {
		req.session.views++;
	}
	if (!req.cookies.accessToken) {
		res.send('unauthorized');
	} else {
		// check that the session cookie is valid
		next();
	}
	*/
};

const loginRegisterMiddleware = (req, res, next) => {
	res.append('Access-Control-Allow-Origin', 'http://localhost:3000');
	res.append('Access-Control-Allow-Headers', 'Content-Type');
	if (req.method === 'OPTIONS') {
		res.send();
	} else {
		next();
	}
};

// need to break up the routes into "authorized" and "unauthorized"
// so that we can create some authorization middleware for the restricted routes
app.use('/api', apiMiddleware, indexRouter);
app.use('/api/user', apiMiddleware, usersRouter);
app.use('/api/notes', apiMiddleware, notesRouter);
app.use('/api/campaigns', apiMiddleware, campaignsRouter);
app.use('/api/tags', apiMiddleware, tagsRouter);

app.use('/login', loginRegisterMiddleware, loginRouter);
app.use('/logout', logoutRouter);
app.use('/register', loginRegisterMiddleware, registerRouter);

/**
 * Get port from environment and store in Express.
 */
const port = process.env.PORT || '8080';
app.set('port', port);

/**
 * Create HTTP server.
 */
const server = http.createServer(app);

function onError(error) {
  if (error.syscall !== 'listen') {
    throw error;
  }

  const bind = typeof port === 'string'
    ? `Pipe ${port}`
    : `Port ${port}`;

  // handle specific listen errors with friendly messages
  switch (error.code) {
    case 'EACCES':
      console.error(`${bind} requires elevated privileges`);
      process.exit(1);
      break;
    case 'EADDRINUSE':
      console.error(`${bind} is already in use`);
      process.exit(1);
      break;
    default:
      throw error;
  }
}

/**
 * Event listener for HTTP server "listening" event.
 */
function onListening() {
  const addr = server.address();
  const bind = typeof addr === 'string'
    ? `pipe ${addr}`
    : `port ${addr.port}`;
  console.log(`Listening on ${bind}`);
}

/**
 * Listen on provided port, on all network interfaces.
 */
server.listen(port);
server.on('error', onError);
server.on('listening', onListening);

module.exports = app;
