//const db = require('../database/db');
import Db from '../database/db';

export default class Query {

	id;
	table;
	joins = [];
	where = [];
	select = [];
	group = [];
	order = [];

	set id(id) {
		this.id = id;
	}

	get id() {
		return this.id;
	}

}
