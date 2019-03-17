import Db from '../database/db';

class Notes {

	_userId;
	_campaignId;
	_fields = [
		{
			field: 'title',
			displayName: 'Title',
		},
		{
			field: 'created_at',
			displayName: 'Created At',
		},
		{
			field: 'updated_at',
			displayName: 'Updated At',
		},
	];

	constructor(userId = null) {
		this.userId = userId;
	}

	set userId(userId) {
		if ((typeof userId) !== 'number') {
			throw 'User id must be a number';
		}
		this._userId = userId;
	}

	setUserId(userId) {
		this.userId = userId;
		return this;
	}

	set campaignId(campaignId) {
		this._campaignId = campaignId;
	}

	setCampaignId(campaignId) {
		this._campaignId = campaignId;
		return this;
	}

	set fields(fields) {
		this._fields = fields;
	}

	// Add a field to the select statement
	addField(field) {
		this._fields.push(field);
	}

	async getCampaignNotes() {
		if (!this._campaignId) {
			throw 'No campaign id set!';
		}

		const sql = `
			SELECT 
				note_id as id
				${ this._fields ? ',' + this._fields.map(field => (
					`note.${field.field}${field.alias ? ` AS field.alias` : ''}`
				)).join(',') : ''}
			FROM note
				JOIN campaign_note USING (note_id)
			WHERE campaign_note.campaign_id = ${this._userId}`;

		const result = await Db.query(sql);
		return result;
	}

	async getUserNotes() {
		if (!this._userId) {
			throw 'No user id set!';
		}

		const sql = `
			SELECT 
				note_id as id
				${ this._fields ? ',' + this._fields.map(field => `${field.field}${field.alias ? ` AS field.alias` : ''}`).join(',') : ''}
			FROM note
			WHERE user_id = ${this._userId}`;
		const result = await Db.query(sql);
		return result;
	}
}

export default Notes;
