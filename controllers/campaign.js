const db = require('../database/db');

async function index(userId) {
	const sql = db.format(`SELECT *
		FROM campaign
		WHERE user_id = ?`, [userId]);
	console.log(sql);

	const campaigns = await db.query(sql);
	return JSON.stringify({
		metadata: {
			numResults: campaigns.length,
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
