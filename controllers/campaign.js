import db from '../database/db';
import Query from '../classes/Query';
// const db = require('../database/db');
// const UserCampaigns = require('../classes/UserCampaigns');
// const Query = require('../classes/Query');

async function index(userId) {
	const query = new Query();
	query.setId(1);
	const fields = [
		{
			field: 'campaign_id',
			displayName: 'Campaign ID',
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

	const sql = db.format(`SELECT
		${fields.map(item => item.field).join(',')}
		FROM campaign
		WHERE user_id = ?`, [userId]);
	console.log(sql);


	const campaigns = await db.query(sql);
	return JSON.stringify({
		metadata: {
			numResults: campaigns.length,
			fieldNames: fields,
			max: 'test',
		},
		campaigns,
	});
}

async function getOne(userId, campaignId) {
	const results = JSON.parse(await index(userId));
	return JSON.stringify(results.campaigns.find(campaign => campaign.campaign_id = campaignId));
}

module.exports = {
	index,
	getOne,
}
