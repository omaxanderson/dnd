var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var http = require('http');
var bodyParser = require('body-parser');
const session = require('express-session');
const MySQLStore = require('express-mysql-session')(session);
const options = require('./database/sessionDbConfig.js');
const sessionStore = new MySQLStore(options);

// Routers
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var loginRouter = require('./routes/login');
var registerRouter = require('./routes/register');
var logoutRouter = require('./routes/logout');
var notesRouter = require('./routes/notes');
var campaignsRouter = require('./routes/campaigns');

var app = express();

const jsonParser = bodyParser.json();

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
		maxAge: 1000 * 60 * 60 * 24 * 7 * 2 	// 2 weeks 
	},
	store: sessionStore
}));

const apiMiddleware = (req, res, next) => {
	// uncomment for session and cookie debugging
	/*
	console.log(req.session);
	console.log(req.cookies);
	*/

	// check cookies


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

app.use('/login', loginRegisterMiddleware, loginRouter);
app.use('/logout', logoutRouter);
app.use('/register', loginRegisterMiddleware, registerRouter);

/**
 * Get port from environment and store in Express.
 */
var port = process.env.PORT || '8080';
app.set('port', port);

/**
 * Create HTTP server.
 */
var server = http.createServer(app);

/**
 * Listen on provided port, on all network interfaces.
 */
server.listen(port);
server.on('error', onError);
server.on('listening', onListening);

function onError(error) {
  if (error.syscall !== 'listen') {
    throw error;
  }

  var bind = typeof port === 'string'
    ? 'Pipe ' + port
    : 'Port ' + port;

  // handle specific listen errors with friendly messages
  switch (error.code) {
    case 'EACCES':
      console.error(bind + ' requires elevated privileges');
      process.exit(1);
      break;
    case 'EADDRINUSE':
      console.error(bind + ' is already in use');
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
  var addr = server.address();
  var bind = typeof addr === 'string'
    ? 'pipe ' + addr
    : 'port ' + addr.port;
  console.log('Listening on ' + bind);
}
module.exports = app;
