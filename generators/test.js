const yaml = require('js-yaml');
const fs = require('fs');

try {
	const api = yaml.safeLoad(fs.readFileSync('api.yml', 'utf8'));
	// for each main structure, create a route and controller file
	//console.log(JSON.stringify(api, null, 3));
	for (const model of api) {
		// console.log(JSON.stringify(route, null, 3));
		console.log(`name: ${model.name}`);
		const { routes } = model;
		const filename = `${model.name}.js`;
		const controllerName = `${model.name}Controller`;
		fs.writeFile(filename,

/* FILE FORMATTING */
`var express = require('express');
var router = express.Router();
const ${model.name} = require('../controllers/${model.name}')\n`, 

			(err) =>{
				console.log(err);
			});

		for (const idx in routes) {
			const r = routes[idx];
			const bodyParams = r.body ? 
				`const { ${r.body.join(', ')} } = req.body;` : 
				null;
			const reqParams = r.params ? 
				`const { ${r.params.join(', ')} } = req.params;` : 
				null;
			fs.appendFile(filename,

/* FILE FORMATTING */
`\nrouter.${r.method}('${r.path}', 
async (req, res, next) => {
	${bodyParams || ''}
	${reqParams || ''}
	return await ${controllerName}.${r.controllerMethod}(
		req.session.userId${r.params ? ', ' + r.params.join(', ') : ''}
		${r.body ? ', ' + r.body.join(', ') : ''}
	);
});\n`
/* END FILE FORMATTING */

			);
		}
	}
} catch (e) {
	console.log(e);
}
