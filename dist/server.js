/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "/";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./app.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./app.js":
/*!****************!*\
  !*** ./app.js ***!
  \****************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nvar _express = _interopRequireDefault(__webpack_require__(/*! express */ \"express\"));\n\nvar _path = _interopRequireDefault(__webpack_require__(/*! path */ \"path\"));\n\nfunction _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }\n\n// const express = require('express');\n// const path = require('path');\nconst cookieParser = __webpack_require__(/*! cookie-parser */ \"cookie-parser\");\n\nconst http = __webpack_require__(/*! http */ \"http\");\n\nconst session = __webpack_require__(/*! express-session */ \"express-session\");\n\nconst MySQLStore = __webpack_require__(/*! express-mysql-session */ \"express-mysql-session\")(session);\n\nconst options = __webpack_require__(/*! ./database/sessionDbConfig.js */ \"./database/sessionDbConfig.js\");\n\nconst sessionStore = new MySQLStore(options); // Routers\n\nconst indexRouter = __webpack_require__(/*! ./routes/index */ \"./routes/index.js\");\n\nconst usersRouter = __webpack_require__(/*! ./routes/users */ \"./routes/users.js\");\n\nconst loginRouter = __webpack_require__(/*! ./routes/login */ \"./routes/login.js\");\n\nconst registerRouter = __webpack_require__(/*! ./routes/register */ \"./routes/register.js\");\n\nconst logoutRouter = __webpack_require__(/*! ./routes/logout */ \"./routes/logout.js\");\n\nconst notesRouter = __webpack_require__(/*! ./routes/notes */ \"./routes/notes.js\");\n\nconst campaignsRouter = __webpack_require__(/*! ./routes/campaigns */ \"./routes/campaigns.js\");\n\nconst tagsRouter = __webpack_require__(/*! ./routes/tags */ \"./routes/tags.js\");\n\nconst app = (0, _express.default)();\napp.use(_express.default.json());\napp.use(_express.default.urlencoded({\n  extended: false\n}));\napp.use(cookieParser());\napp.use(_express.default.static(_path.default.join(__dirname, 'public'))); // use the session middleware\n\napp.use(session({\n  secret: 'max is cool',\n  resave: true,\n  saveUninitialized: true,\n  cookie: {\n    secure: false,\n    maxAge: 1000 * 60 * 60 * 24 * 7 * 2 // 2 weeks\n\n  },\n  store: sessionStore\n}));\n\nconst apiMiddleware = (req, res, next) => {\n  // uncomment for session and cookie debugging\n\n  /*\n  console.log(req.session);\n  console.log(req.cookies);\n  */\n  // check cookies\n  if (!req.session.userId) {\n    res.clearCookie('accessToken');\n    res.send(JSON.stringify({\n      status: 401,\n      message: 'Unauthorized'\n    }));\n    return;\n  }\n\n  res.append('Access-Control-Allow-Origin', 'http://localhost:3000');\n  res.append('Access-Control-Allow-Headers', 'Content-Type');\n\n  if (req.method === 'OPTIONS') {\n    console.log('options request');\n    res.send();\n  } else {\n    console.log('post request');\n    next();\n  }\n  /*\n  if (!req.session.views) {\n  \treq.session.views = 1;\n  } else {\n  \treq.session.views++;\n  }\n  if (!req.cookies.accessToken) {\n  \tres.send('unauthorized');\n  } else {\n  \t// check that the session cookie is valid\n  \tnext();\n  }\n  */\n\n};\n\nconst loginRegisterMiddleware = (req, res, next) => {\n  res.append('Access-Control-Allow-Origin', 'http://localhost:3000');\n  res.append('Access-Control-Allow-Headers', 'Content-Type');\n\n  if (req.method === 'OPTIONS') {\n    res.send();\n  } else {\n    next();\n  }\n}; // need to break up the routes into \"authorized\" and \"unauthorized\"\n// so that we can create some authorization middleware for the restricted routes\n\n\napp.use('/api', apiMiddleware, indexRouter);\napp.use('/api/user', apiMiddleware, usersRouter);\napp.use('/api/notes', apiMiddleware, notesRouter);\napp.use('/api/campaigns', apiMiddleware, campaignsRouter);\napp.use('/api/tags', apiMiddleware, tagsRouter);\napp.use('/login', loginRegisterMiddleware, loginRouter);\napp.use('/logout', logoutRouter);\napp.use('/register', loginRegisterMiddleware, registerRouter);\n/**\n * Get port from environment and store in Express.\n */\n\nconst port = process.env.PORT || '8080';\napp.set('port', port);\n/**\n * Create HTTP server.\n */\n\nconst server = http.createServer(app);\n\nfunction onError(error) {\n  if (error.syscall !== 'listen') {\n    throw error;\n  }\n\n  const bind = typeof port === 'string' ? `Pipe ${port}` : `Port ${port}`; // handle specific listen errors with friendly messages\n\n  switch (error.code) {\n    case 'EACCES':\n      console.error(`${bind} requires elevated privileges`);\n      process.exit(1);\n      break;\n\n    case 'EADDRINUSE':\n      console.error(`${bind} is already in use`);\n      process.exit(1);\n      break;\n\n    default:\n      throw error;\n  }\n}\n/**\n * Event listener for HTTP server \"listening\" event.\n */\n\n\nfunction onListening() {\n  const addr = server.address();\n  const bind = typeof addr === 'string' ? `pipe ${addr}` : `port ${addr.port}`;\n  console.log(`Listening on ${bind}`);\n}\n/**\n * Listen on provided port, on all network interfaces.\n */\n\n\nserver.listen(port);\nserver.on('error', onError);\nserver.on('listening', onListening);\nmodule.exports = app;\n\n//# sourceURL=webpack:///./app.js?");

/***/ }),

/***/ "./classes/Query.js":
/*!**************************!*\
  !*** ./classes/Query.js ***!
  \**************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nObject.defineProperty(exports, \"__esModule\", {\n  value: true\n});\nexports.default = void 0;\n\nvar _db = _interopRequireDefault(__webpack_require__(/*! ../database/db */ \"./database/db.js\"));\n\nfunction _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }\n\nfunction _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }\n\nclass Query {\n  constructor() {\n    _defineProperty(this, \"id\", void 0);\n\n    _defineProperty(this, \"table\", void 0);\n\n    _defineProperty(this, \"joins\", []);\n\n    _defineProperty(this, \"where\", []);\n\n    _defineProperty(this, \"select\", []);\n\n    _defineProperty(this, \"group\", []);\n\n    _defineProperty(this, \"order\", []);\n  }\n\n  set id(id) {\n    this.id = id;\n  }\n\n  get id() {\n    return this.id;\n  }\n\n}\n\nexports.default = Query;\n\n//# sourceURL=webpack:///./classes/Query.js?");

/***/ }),

/***/ "./controllers/campaign.js":
/*!*********************************!*\
  !*** ./controllers/campaign.js ***!
  \*********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nvar _db = _interopRequireDefault(__webpack_require__(/*! ../database/db */ \"./database/db.js\"));\n\nvar _Query = _interopRequireDefault(__webpack_require__(/*! ../classes/Query */ \"./classes/Query.js\"));\n\nfunction _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }\n\n// const db = require('../database/db');\n// const UserCampaigns = require('../classes/UserCampaigns');\n// const Query = require('../classes/Query');\nasync function index(userId) {\n  const query = new _Query.default();\n  const fields = [{\n    field: 'campaign_id',\n    displayName: 'Campaign ID'\n  }, {\n    field: 'title',\n    displayName: 'Title'\n  }, {\n    field: 'created_at',\n    displayName: 'Created'\n  }];\n\n  const sql = _db.default.format(`SELECT\n\t\t${fields.map(item => item.field).join(',')}\n\t\tFROM campaign\n\t\tWHERE user_id = ?`, [userId]);\n\n  console.log(sql);\n  const campaigns = await _db.default.query(sql);\n  return JSON.stringify({\n    metadata: {\n      numResults: campaigns.length,\n      fieldNames: fields\n    },\n    campaigns\n  });\n}\n\nasync function getOne(userId, campaignId) {\n  const results = JSON.parse((await index(userId)));\n  return JSON.stringify(results.campaigns.find(campaign => campaign.campaign_id = campaignId));\n}\n\nmodule.exports = {\n  index,\n  getOne\n};\n\n//# sourceURL=webpack:///./controllers/campaign.js?");

/***/ }),

/***/ "./controllers/login.js":
/*!******************************!*\
  !*** ./controllers/login.js ***!
  \******************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nconst mysql = __webpack_require__(/*! mysql */ \"mysql\");\n\nconst db = __webpack_require__(/*! ../database/db */ \"./database/db.js\");\n\nconst bcrypt = __webpack_require__(/*! bcrypt */ \"bcrypt\");\n\nconst uuid = __webpack_require__(/*! uuid/v1 */ \"uuid/v1\");\n\nconst SALT_ROUNDS = 8;\n\nasync function generateAccessToken(userId) {\n  const token = uuid();\n  const insertSql = db.format(`REPLACE INTO access_token (token, user_id) \n\t\tVALUES (?, ?)`, [token, userId]);\n  const insertResult = await db.query(insertSql);\n\n  if (!insertResult.affectedRows) {\n    throw new Error('Something bad happened on insert');\n  } else {\n    return new Promise((resolve, reject) => {\n      resolve(token);\n    });\n  }\n}\n\nasync function authorize(credentials) {\n  console.log(credentials);\n  const {\n    username,\n    password\n  } = credentials;\n\n  if (!username || !password) {\n    return new Promise((resolve, reject) => {\n      reject('Error: no username or password supplied!');\n    });\n  }\n\n  const hashedPassword = bcrypt.hashSync(password, SALT_ROUNDS);\n  console.log('Hashed password: ' + hashedPassword);\n  const sql = db.format(`SELECT user_id, password\n\t\tFROM user\n\t\tWHERE username = ?`, [username]);\n\n  try {\n    const result = await db.query(sql); // if nobody by that username, reject the promise\n\n    if (!result.length) {\n      return new Promise((resolve, reject) => {\n        reject(`Username '${username}' not found.`);\n      });\n    }\n\n    const match = await bcrypt.compare(password, result[0].password); // if there was a match, we need to generate an access token and store it\n\n    let token = '';\n\n    if (match) {\n      token = await generateAccessToken(result[0].user_id);\n    }\n\n    console.log(match ? 'Match!' : 'No match :(');\n    return new Promise((resolve, reject) => {\n      if (!username || !password) {\n        reject('No username or password supplied!');\n      }\n\n      match ? resolve(JSON.stringify({\n        userId: result[0].user_id,\n        token: token,\n        message: 'Success'\n      })) : reject('Incorrect password and username combination.');\n    });\n  } catch (e) {\n    console.log(e);\n    return e;\n  }\n}\n\nmodule.exports = {\n  authorize\n};\n\n//# sourceURL=webpack:///./controllers/login.js?");

/***/ }),

/***/ "./controllers/note.js":
/*!*****************************!*\
  !*** ./controllers/note.js ***!
  \*****************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nconst db = __webpack_require__(/*! ../database/db */ \"./database/db.js\");\n\nconst tagsController = __webpack_require__(/*! ./tags */ \"./controllers/tags.js\");\n\nasync function getNoteOwner(noteId) {\n  const noteOwner = await db.fetchOne(db.format(`SELECT user_id\n\t\tFROM note\n\t\tWHERE note_id = ?`, [noteId]));\n  return noteOwner.user_id;\n} // @TODO we want to be able to choose which fields we want\n// for example, the note listing doesn't need content which takes up the most\n// space, so it would be nice to be able to omit that\n\n\nasync function index(userId) {\n  const sql = `SELECT \n\t\t\tnote.note_id AS noteId, \n\t\t\tnote.created_at AS createdAt,\n\t\t\tnote.updated_at AS updatedAt,\n\t\t\tnote.title AS title,\n\t\t\tnote.content AS content,\n\t\t\tGROUP_CONCAT(CONCAT(tag.tag_id, ':', tag.name) SEPARATOR ',') AS tags\n\t\tFROM note\n\t\t\tLEFT JOIN note_tag USING (note_id)\n\t\t\tLEFT JOIN tag USING (tag_id)\n\t\tWHERE note.user_id = ${userId}\n\t\tAND active = 1\n\t\tGROUP BY note.note_id`;\n  let result = await db.query(sql);\n  result.forEach(item => {\n    result.test = 'heyyy';\n  }); // parse the tags\n\n  const notes = result.map(item => {\n    if (!item.tags) {\n      return { ...item\n      };\n    }\n\n    const tags = item.tags.split(',').map(tag => {\n      const pieces = tag.split(':');\n      return {\n        noteId: pieces[0],\n        name: pieces[1]\n      };\n    });\n    return { ...item,\n      tags\n    };\n  });\n  return JSON.stringify({\n    metadata: {\n      numResults: notes.length\n    },\n    notes\n  });\n}\n\nasync function addTagById(noteId, tagId) {\n  const sql = `INSERT INTO note_tag\n\t\tVALUES (${tagId}, ${noteId})`;\n  const result = await db.query(sql);\n  return new Promise((resolve, reject) => {\n    if (result.affectedRows) {\n      resolve(JSON.stringify({\n        status: 'success'\n      }));\n    } else {\n      reject(JSON.stringify({\n        status: 'error',\n        message: `Tag id ${tagId} is not associated with note ${noteId}`\n      }));\n    }\n  });\n}\n\nasync function removeTagById(noteId, tagId) {\n  const sql = `DELETE FROM note_tag\n\t\tWHERE note_id = ${noteId}\n\t\tAND tag_id = ${tagId}`;\n  const result = await db.query(sql);\n  return new Promise((resolve, reject) => {\n    if (result.affectedRows) {\n      resolve(JSON.stringify({\n        status: 'success'\n      }));\n    } else {\n      reject(JSON.stringify({\n        status: 'error',\n        message: `Tag id ${tagId} is not associated with note ${noteId}`\n      }));\n    }\n  });\n}\n\nasync function getOne(userId, noteId) {\n  const notes = JSON.parse((await index(userId)));\n  const note = notes.notes.find(item => Number(item.noteId) === Number(noteId));\n\n  if (!note) {\n    return JSON.stringify({\n      status: 'error',\n      message: 'Note not found'\n    });\n  } // start building out the note object\n\n\n  const tags = await tagsController.getTagsForNote(noteId);\n  note.tags = tags;\n  return JSON.stringify(note);\n}\n\nasync function create(userId, reqBody) {\n  const sql = db.format(`INSERT INTO note (user_id, content, title)\n\t\tVALUES (${userId}, ?, ?)`, [reqBody.content, reqBody.title]);\n  console.log(sql);\n  const result = await db.query(sql);\n  console.log(result);\n\n  if (result.affectedRows) {\n    return JSON.stringify({\n      affectedRows: result.affectedRows,\n      noteId: result.insertId\n    });\n  } // @TODO need to fix this\n\n\n  return 'bad resp';\n}\n\nasync function update(userId, noteId, changes) {\n  console.log(userId);\n\n  if (!changes.content && !changes.title) {\n    return JSON.stringify({\n      error: 'No changes were submitted!'\n    });\n  }\n\n  const noteOwnerId = await getNoteOwner(noteId);\n\n  if (noteOwnerId !== userId) {\n    return JSON.stringify({\n      error: 'This note doesn\\'t belong to you!'\n    });\n  }\n\n  const sql = db.format(`UPDATE note\n\t\tSET updated_at = CURRENT_TIMESTAMP,\n\t\t\tcontent = ?,\n\t\t\ttitle = ?\n\t\tWHERE note_id = ?\n\t\tAND user_id = ?`, [changes.content, changes.title, noteId, userId]);\n  const result = await db.query(sql);\n  console.log(result);\n  return JSON.stringify({\n    affectedRows: result.affectedRows\n  });\n}\n\nasync function remove(userId, noteId) {\n  if ((await getNoteOwner(noteId)) !== userId) {\n    return JSON.stringify({\n      error: 'This note doesn\\'t belong to you!'\n    });\n  }\n\n  const sql = db.format(`UPDATE note\n\t\tSET active = 0\n\t\tWHERE note_id = ?\n\t\tAND user_id = ?`, [noteId, userId]);\n  const result = await db.query(sql);\n\n  if (!result.affectedRows) {\n    return JSON.stringify({\n      error: `Note ID ${noteId} not found!`\n    });\n  }\n\n  return JSON.stringify({\n    affectedRows: result.affectedRows\n  });\n}\n\nmodule.exports = {\n  index,\n  getOne,\n  create,\n  update,\n  remove,\n  removeTagById,\n  addTagById\n};\n\n//# sourceURL=webpack:///./controllers/note.js?");

/***/ }),

/***/ "./controllers/register.js":
/*!*********************************!*\
  !*** ./controllers/register.js ***!
  \*********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nconst validator = __webpack_require__(/*! validator */ \"validator\");\n\nconst bcrypt = __webpack_require__(/*! bcrypt */ \"bcrypt\");\n\nconst db = __webpack_require__(/*! ../database/db */ \"./database/db.js\");\n\nconst Auth = __webpack_require__(/*! ./login */ \"./controllers/login.js\"); // @TODO this number is shared across files so I think this should be an env variable\n\n\nconst SALT_ROUNDS = 6;\n\nasync function validateUsername(username) {\n  const sql = db.format(`SELECT COUNT(*) AS usernameExists\n\t\tFROM user\n\t\tWHERE username = ?`, [username]);\n\n  try {\n    const result = await db.fetchOne(sql);\n    return new Promise(resolve => {\n      resolve(result.usernameExists);\n    });\n  } catch (e) {\n    return e;\n  }\n}\n\nasync function insertUser(username, password, email) {\n  console.log('starting insert');\n  const hashedPassword = bcrypt.hashSync(password, SALT_ROUNDS);\n  const sql = db.format(`INSERT INTO user (username, password, user_email, group_id) VALUES (\n\t\t\t?, ?, ?, 2\n\t\t)`, [username, hashedPassword, email]);\n  console.log(sql);\n\n  try {\n    const result = await db.query(sql);\n    return new Promise(resolve => {\n      resolve(result);\n    });\n  } catch (e) {\n    return e;\n  }\n}\n\nasync function register(params) {\n  const {\n    username,\n    password,\n    passwordConf,\n    email\n  } = params;\n  let valid = true;\n  let message = 'Success'; // make sure all our fields are here\n\n  if (!username || !password || !passwordConf || !email) {\n    valid = false;\n    message = 'Error: missing required field';\n  } // check to make sure the username is unique\n\n\n  if (await validateUsername(username)) {\n    valid = false;\n    message = 'Username not valid';\n  } // make sure password and password confirmation are the same\n\n\n  if (password !== passwordConf) {\n    valid = false;\n    message = 'Passwords do not match';\n  } // validate the email\n\n\n  if (!validator.isEmail(email)) {\n    valid = false;\n    message = 'Email is not a valid email';\n  } // @TODO there should be a validation email sent here\n  // register the user\n\n\n  if (valid) {\n    await insertUser(username, password, email); // here we should also perform the login process\n\n    const authorized = await Auth.authorize({\n      username,\n      password\n    });\n    return new Promise(resolve => {\n      resolve(authorized);\n    });\n  }\n\n  console.log('rejecting register');\n  return new Promise((resolve, reject) => {\n    reject(message);\n  });\n}\n\nmodule.exports = {\n  register\n};\n\n//# sourceURL=webpack:///./controllers/register.js?");

/***/ }),

/***/ "./controllers/tags.js":
/*!*****************************!*\
  !*** ./controllers/tags.js ***!
  \*****************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nconst db = __webpack_require__(/*! ../database/db */ \"./database/db.js\");\n\nasync function index(userId) {\n  const sql = `SELECT tag.*\n\t\tFROM tag\n\t\t\tLEFT JOIN note_tag ON note_tag.tag_id = tag.tag_id\n\t\t\tLEFT JOIN note ON note_tag.note_id = note.note_id\n\t\tWHERE tag.user_id = ${userId}\n\t\tGROUP BY tag_id`;\n  const results = await db.query(sql);\n  const promises = results.map(async tag => {\n    tag.associated_notes = await getNotesForTag(tag.tag_id);\n    return tag;\n  });\n  return Promise.all(promises).then(tags => {\n    return JSON.stringify({\n      metadata: {\n        numResults: tags.length\n      },\n      tags\n    });\n  });\n}\n\nasync function getNotesForTag(tagId) {\n  const sql = db.format(`SELECT note_tag.note_id, note.title\n\t\tFROM note_tag\n\t\t\tLEFT JOIN note ON note.note_id = note_tag.note_id\n\t\tWHERE note_tag.tag_id = ?`, [tagId]); // @TODO better error handling\n\n  try {\n    const result = await db.query(sql);\n    return {\n      metadata: {\n        numRows: result.length\n      },\n      notes: result\n    };\n  } catch (e) {\n    return e;\n  }\n}\n\nasync function getTagsForNote(noteId) {\n  const sql = db.format(`SELECT tag.tag_id, name, IF(note_tag.note_id IS NOT NULL, 1, 0) AS is_applied\n\t\tFROM tag\n\t\t\tLEFT JOIN note_tag ON tag.tag_id = note_tag.tag_id \n\t\t\t\tAND note_id = ?`, [noteId]);\n\n  try {\n    const result = await db.query(sql);\n    return result;\n  } catch (e) {\n    return e;\n  }\n}\n\nasync function getOne(tagId) {\n  const sql = db.format(`SELECT *\n\t\tFROM tag\n\t\tWHERE tag_id = ?`, [tagId]);\n  const result = await db.query(sql);\n  return result;\n}\n\nasync function create(userId, data) {\n  const sql = db.format(`INSERT INTO tag\n\t\t(user_id, name, description) VALUES (\n\t\t\t${userId}, \n\t\t\t?,\n\t\t\t?)`, [data.name || '', data.description || null]);\n  const result = await db.query(sql);\n  const tag = await getOne(result.insertId);\n  return new Promise((resolve, reject) => {\n    if (result.affectedRows) {\n      resolve(JSON.stringify({\n        status: 'success',\n        tag: tag[0]\n      }));\n    } else {\n      reject(JSON.stringify({\n        status: 'error'\n      }));\n    }\n  });\n}\n\nasync function update(tagId) {}\n\nasync function remove(userId, tagId) {\n  const sql = db.format(`DELETE FROM tag\n\t\tWHERE user_id = ?\n\t\tAND tag_id = ?`, [userId, tagId]);\n  const noteTagSql = db.format(`DELETE FROM note_tag WHERE tag_id = ?`, [tagId]);\n  const result = await db.query(sql);\n\n  if (result.affectedRows) {\n    const noteTagResult = db.query(noteTagSql);\n  }\n\n  return new Promise((resolve, reject) => {\n    if (result.affectedRows) {\n      resolve(JSON.stringify({\n        status: 'success'\n      }));\n    } else {\n      reject(JSON.stringify({\n        status: 'error'\n      }));\n    }\n  });\n}\n\nmodule.exports = {\n  index,\n  getNotesForTag,\n  getTagsForNote,\n  getOne,\n  create,\n  update,\n  remove\n};\n\n//# sourceURL=webpack:///./controllers/tags.js?");

/***/ }),

/***/ "./database/db.js":
/*!************************!*\
  !*** ./database/db.js ***!
  \************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nconst mysql = __webpack_require__(/*! mysql */ \"mysql\");\n\nconst dbconfig = __webpack_require__(/*! ./dbconfig */ \"./database/dbconfig.js\");\n\nclass db {\n  format(sql, params) {\n    return mysql.format(sql, params);\n  }\n\n  query(sql) {\n    return new Promise((resolve, reject) => {\n      const connection = mysql.createConnection(dbconfig);\n      connection.connect();\n      connection.query(sql, (err, rows) => {\n        if (err) {\n          reject(err);\n        } else {\n          resolve(rows);\n        }\n\n        connection.end();\n      });\n    });\n  }\n\n  fetchOne(sql) {\n    return new Promise((resolve, reject) => {\n      const connection = mysql.createConnection(dbconfig);\n      connection.connect();\n      connection.query(sql, (err, rows) => {\n        if (err) {\n          reject(err);\n        } else {\n          resolve(rows[0]);\n        }\n\n        connection.end();\n      });\n    });\n  }\n\n}\n\nmodule.exports = new db();\n\n//# sourceURL=webpack:///./database/db.js?");

/***/ }),

/***/ "./database/dbconfig.js":
/*!******************************!*\
  !*** ./database/dbconfig.js ***!
  \******************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nconst dbconfig = {\n  host: 'localhost',\n  user: 'root',\n  password: 'maxanderson1',\n  database: 'dnd'\n};\nmodule.exports = dbconfig;\n\n//# sourceURL=webpack:///./database/dbconfig.js?");

/***/ }),

/***/ "./database/sessionDbConfig.js":
/*!*************************************!*\
  !*** ./database/sessionDbConfig.js ***!
  \*************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nmodule.exports = {\n  host: 'localhost',\n  user: 'root',\n  password: 'maxanderson1',\n  database: 'dnd'\n};\n\n//# sourceURL=webpack:///./database/sessionDbConfig.js?");

/***/ }),

/***/ "./routes/campaigns.js":
/*!*****************************!*\
  !*** ./routes/campaigns.js ***!
  \*****************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nconst express = __webpack_require__(/*! express */ \"express\");\n\nconst router = express.Router();\n\nconst campaignController = __webpack_require__(/*! ../controllers/campaign */ \"./controllers/campaign.js\");\n\nrouter.get('/', async (req, res, next) => {\n  const result = await campaignController.index(req.session.userId);\n  res.send(result);\n});\nrouter.get('/:campaignId', async (req, res, next) => {\n  const result = await campaignController.getOne(req.session.userId, req.params.campaignId);\n  res.send(result);\n});\nmodule.exports = router;\n\n//# sourceURL=webpack:///./routes/campaigns.js?");

/***/ }),

/***/ "./routes/index.js":
/*!*************************!*\
  !*** ./routes/index.js ***!
  \*************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nconst express = __webpack_require__(/*! express */ \"express\");\n\nconst router = express.Router();\n/* GET home page. */\n\nrouter.get('/', (req, res, next) => {\n  res.send('api home');\n});\n/* POST home page. */\n\nrouter.post('/', (req, res, next) => {\n  console.log(req.body);\n  res.send('api home');\n});\nmodule.exports = router;\n\n//# sourceURL=webpack:///./routes/index.js?");

/***/ }),

/***/ "./routes/login.js":
/*!*************************!*\
  !*** ./routes/login.js ***!
  \*************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nconst express = __webpack_require__(/*! express */ \"express\");\n\nconst router = express.Router(); // include the controllers here\n\nconst Auth = __webpack_require__(/*! ../controllers/login */ \"./controllers/login.js\"); // response message format\n// {\n// \tsuccess: [true, false],\n// \tmessage: 'Your message here'\n// }\n// @TODO this needs to be a POST eventually\n\n/* GET home page. */\n\n\nrouter.get('/', (req, res, next) => {\n  Auth.authorize(req.query).then(result => {\n    res.send(result);\n  }).catch(err => {\n    res.status(400);\n    res.send(err);\n  });\n});\n/* POST authorize based on credentials passed */\n\nrouter.post('/', (req, res, next) => {\n  console.log(req.body);\n  Auth.authorize(req.body).then(json => {\n    const data = JSON.parse(json); // create a session\n\n    console.log('adding accessToken to session');\n    console.log(req.session);\n    req.session.accessToken = data.token;\n    req.session.userId = data.userId;\n    console.log(req.session);\n    res.send(JSON.stringify({\n      success: true,\n      message: data.message,\n      token: data.token\n    }));\n  }).catch(err => {\n    console.log('error?!?!?!');\n    res.status(400);\n    res.send(JSON.stringify({\n      success: false,\n      message: err\n    }));\n  });\n});\nmodule.exports = router;\n\n//# sourceURL=webpack:///./routes/login.js?");

/***/ }),

/***/ "./routes/logout.js":
/*!**************************!*\
  !*** ./routes/logout.js ***!
  \**************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nconst express = __webpack_require__(/*! express */ \"express\");\n\nconst router = express.Router();\n/* POST logout and destroy session */\n\nrouter.post('/', (req, res, next) => {\n  console.log(req.cookies);\n  req.session.destroy();\n  res.clearCookie('accessToken');\n  res.redirect('/login');\n});\nmodule.exports = router;\n\n//# sourceURL=webpack:///./routes/logout.js?");

/***/ }),

/***/ "./routes/notes.js":
/*!*************************!*\
  !*** ./routes/notes.js ***!
  \*************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nconst express = __webpack_require__(/*! express */ \"express\");\n\nconst router = express.Router();\n\nconst noteController = __webpack_require__(/*! ../controllers/note */ \"./controllers/note.js\");\n/* GET all notes for a user */\n\n\nrouter.get('/', async (req, res, next) => {\n  const notes = await noteController.index(req.session.userId);\n  res.send(notes);\n});\n/* GET a specific note */\n\nrouter.get('/:noteId', async (req, res, next) => {\n  try {\n    const note = await noteController.getOne(req.session.userId, req.params.noteId);\n    res.send(note);\n  } catch (e) {\n    console.log('oh noooo');\n    console.log(err);\n    res.send('bad');\n  }\n});\n/* POST a new note */\n\nrouter.post('/', async (req, res, next) => {\n  const result = await noteController.create(req.session.userId, req.body);\n  res.send(result);\n});\n/* PUT update an existing note */\n\nrouter.put('/:noteId', async (req, res, next) => {\n  const result = await noteController.update(req.session.userId, req.params.noteId, req.body);\n  res.send(result);\n});\n/* DELETE remove a note */\n\nrouter.delete('/:noteId', async (req, res, next) => {\n  const result = await noteController.remove(req.session.userId, req.params.noteId);\n  res.send(result);\n});\n/* DELETE tag from note */\n\nrouter.delete('/:noteId/tags/:tagId', async (req, res, next) => {\n  // need to do a check to make sure note and tag id's are numeric to prevent injection\n  const result = await noteController.removeTagById(req.params.noteId, req.params.tagId);\n  res.send(result);\n});\n/* DELETE tag from note */\n\nrouter.post('/:noteId/tags/:tagId', async (req, res, next) => {\n  // need to do a check to make sure note and tag id's are numeric to prevent injection\n  const result = await noteController.addTagById(req.params.noteId, req.params.tagId);\n  res.send(result);\n});\nmodule.exports = router;\n\n//# sourceURL=webpack:///./routes/notes.js?");

/***/ }),

/***/ "./routes/register.js":
/*!****************************!*\
  !*** ./routes/register.js ***!
  \****************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nconst express = __webpack_require__(/*! express */ \"express\");\n\nconst router = express.Router();\n\nconst controller = __webpack_require__(/*! ../controllers/register */ \"./controllers/register.js\");\n/* GET home page. */\n\n\nrouter.get('/', (req, res, next) => {\n  controller.register(req);\n  res.send('register home');\n}); // {\n// \tsuccess: [true, false],\n// \tmessage: \"some message\",\n// \t<optional> token: 'access token'\n// }\n\n/* POST register */\n\nrouter.post('/', (req, res, next) => {\n  controller.register(req.body).then(data => {\n    // this result should be an object and should have the user_id and token\n    const result = JSON.parse(data);\n    res.send(JSON.stringify({\n      success: true,\n      message: result.message,\n      token: result.token\n    }));\n  }).catch(err => {\n    res.status(400);\n    res.send(JSON.stringify({\n      success: false,\n      message: err\n    }));\n  });\n});\nmodule.exports = router;\n\n//# sourceURL=webpack:///./routes/register.js?");

/***/ }),

/***/ "./routes/tags.js":
/*!************************!*\
  !*** ./routes/tags.js ***!
  \************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nconst express = __webpack_require__(/*! express */ \"express\");\n\nconst router = express.Router();\n\nconst tagsController = __webpack_require__(/*! ../controllers/tags */ \"./controllers/tags.js\"); // @TODO this whole thing needs to actually be implemented, this is basically a skeleton\n\n\nrouter.get('/', async (req, res, next) => {\n  // @TODO need more client-side input validation\n  console.log('tag index');\n\n  try {\n    const result = await tagsController.index(req.session.userId);\n    res.send(result);\n  } catch (e) {\n    res.status(500);\n    res.send(e);\n  }\n});\nrouter.get('/notes/:tagId', async (req, res, next) => {\n  try {\n    const result = await tagsController.getNotesForTag(req.params.tagId);\n    res.send(result);\n  } catch (e) {\n    res.status(500);\n    res.send(e);\n  }\n});\nrouter.get('/:tagId', async (req, res, next) => {\n  try {\n    const result = await tagsController.getOne(req.session.userId);\n    res.send(result);\n  } catch (e) {\n    res.status(500);\n    res.send(e);\n  }\n});\nrouter.post('/', async (req, res, next) => {\n  try {\n    const result = await tagsController.create(req.session.userId, req.body);\n    res.send(result);\n  } catch (e) {\n    res.status(500);\n    res.send(e);\n  }\n});\nrouter.put('/', async (req, res, next) => {\n  try {\n    const result = await tagsController.update(req.session.userId);\n    res.send(result);\n  } catch (e) {\n    res.status(500);\n    res.send(e);\n  }\n});\nrouter.delete('/:tagId', async (req, res, next) => {\n  try {\n    const result = await tagsController.remove(req.session.userId, req.params.tagId);\n    res.send(result);\n  } catch (e) {\n    res.status(500);\n    res.send(e);\n  }\n});\nmodule.exports = router;\n\n//# sourceURL=webpack:///./routes/tags.js?");

/***/ }),

/***/ "./routes/users.js":
/*!*************************!*\
  !*** ./routes/users.js ***!
  \*************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nconst express = __webpack_require__(/*! express */ \"express\");\n\nconst router = express.Router();\n/* GET users listing. */\n\nrouter.get('/', (req, res, next) => {\n  res.send('users home');\n});\nmodule.exports = router;\n\n//# sourceURL=webpack:///./routes/users.js?");

/***/ }),

/***/ "bcrypt":
/*!*************************!*\
  !*** external "bcrypt" ***!
  \*************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"bcrypt\");\n\n//# sourceURL=webpack:///external_%22bcrypt%22?");

/***/ }),

/***/ "cookie-parser":
/*!********************************!*\
  !*** external "cookie-parser" ***!
  \********************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"cookie-parser\");\n\n//# sourceURL=webpack:///external_%22cookie-parser%22?");

/***/ }),

/***/ "express":
/*!**************************!*\
  !*** external "express" ***!
  \**************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"express\");\n\n//# sourceURL=webpack:///external_%22express%22?");

/***/ }),

/***/ "express-mysql-session":
/*!****************************************!*\
  !*** external "express-mysql-session" ***!
  \****************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"express-mysql-session\");\n\n//# sourceURL=webpack:///external_%22express-mysql-session%22?");

/***/ }),

/***/ "express-session":
/*!**********************************!*\
  !*** external "express-session" ***!
  \**********************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"express-session\");\n\n//# sourceURL=webpack:///external_%22express-session%22?");

/***/ }),

/***/ "http":
/*!***********************!*\
  !*** external "http" ***!
  \***********************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"http\");\n\n//# sourceURL=webpack:///external_%22http%22?");

/***/ }),

/***/ "mysql":
/*!************************!*\
  !*** external "mysql" ***!
  \************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"mysql\");\n\n//# sourceURL=webpack:///external_%22mysql%22?");

/***/ }),

/***/ "path":
/*!***********************!*\
  !*** external "path" ***!
  \***********************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"path\");\n\n//# sourceURL=webpack:///external_%22path%22?");

/***/ }),

/***/ "uuid/v1":
/*!**************************!*\
  !*** external "uuid/v1" ***!
  \**************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"uuid/v1\");\n\n//# sourceURL=webpack:///external_%22uuid/v1%22?");

/***/ }),

/***/ "validator":
/*!****************************!*\
  !*** external "validator" ***!
  \****************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"validator\");\n\n//# sourceURL=webpack:///external_%22validator%22?");

/***/ })

/******/ });