//const db = require('../database/db');
import Db from '../database/db';

export default class Query {

	_id;
	_table;
	_joins = [];
	_where = [];
	_select = [];
	_group = [];
	_order = [];

	constructor(id) {
		this._id = id;
	}

	addJoin(join) {
		this._joins.push(join);
	}

	addWhere(where) {
		this._where.push(where);
	}

	addSelect(select) {
		this._select.push(select);
	}
	
	addGroup(group) {
		this._group.push(group);
	}

	addOrder(order) {
		this._order.push(order);
	}

	set table(table) {
		this._table = table;
	}

	// Getters and setters
	set id(id) {
		this._id = id;
	}

	execute() {
	}

}
