const db = require('../database/db');
const UserCampaigns = require('../classes/UserCampaigns');

async function index(userId) {
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

	const sql = db.format(`SELECT ${fields.map(item => item.field).join(',')}
		FROM campaign
		WHERE user_id = ?`, [userId]);
	console.log(sql);


	const campaigns = await db.query(sql);
	return JSON.stringify({
		metadata: {
			numResults: campaigns.length,
			fieldNames: fields,
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
