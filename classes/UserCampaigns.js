import Db from '../database/db';

class UserCampaigns {

	campaignIds = [];
	_userId = 0;
	_fields = [
		{
			field: 'campaign_id',
			displayName: 'Campaign ID',
			alias: 'id',
		},
		{
			field: 'title',
			displayName: 'Title',
		},
		{
			field: 'created_at',
			displayName: 'Created',
		},
	];

	constructor(userId = 0) {
		this._userId = userId
	}

	set userId(userId) {
		this._userId = userId;
	}

	get fields() {
		return this._fields;
	}

	async execute() {
		if (!this._userId) {
			throw new Exception('Error: userId not set');
		}

		const sql = Db.format(`SELECT
			${this._fields.map(field => `${field.field}${field.alias ? ` AS ${field.alias}` : ''}`).join(',')}
			FROM campaign
			WHERE user_id = ?`, [this._userId]);

		const campaigns = await Db.query(sql);
		return campaigns;
	}

}

module.exports = UserCampaigns;

