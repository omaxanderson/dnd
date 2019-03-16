import Db from '../database/db';

export default class Campaign {

	_userId;

	constructor(userId) {
		this._userId = userId;
	}

	set userId(userId) {
		this._userId = userId;
	}

	async createCampaign(payload) {
		if (!this._userId) {
			return { message: 'error' };
		}

		if (!payload.title) {
			return { message: 'error' };
		}

		const sql = Db.format(`
			INSERT INTO campaign (title, user_id)
			VALUES (?, ?)
		`, [payload.title, this._userId]);

		const result = await Db.query(sql);

		return result;
	}

}
