Tech Stack

Backend
NodeJS Express server
	- Prod: pm2 to serve the express server
		- babel to transpile es6 code 
		- webpack (using a source map) to just create one static file to serve with pm2
	- Dev: nodemon to constantly watch for changes
		- might also be able to use pm2 for dev
		- babel to transpile es6 code

Front End
React
	- Prod: probably just use `npm run build` and serve that directory statically
	- Dev: `npm start` to simply create the react dev server that watches for changes
