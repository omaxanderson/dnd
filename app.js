var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var http = require('http');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
// Login Router
var loginRouter = require('./routes/login');

var app = express();

// view engine setup

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// need to break up the routes into "authorized" and "unauthorized"
// so that we can create some authorization middleware for the restricted routes
app.use('/api', indexRouter);
app.use('/api/user', usersRouter);
app.use('/api/login', loginRouter);

app.get('/', (req, res) => {
	res.send('sup lauren');
});

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
