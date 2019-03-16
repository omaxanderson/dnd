import db from '../database/db';
import UserCampaigns from '../classes/UserCampaigns';
import Campaign from '../classes/Campaign';

export async function index(userId) {
	const service = new UserCampaigns(userId);
	const campaigns = await service.execute();
	console.log(campaigns);

	return {
		metadata: {
			numResults: campaigns.length,
			fieldNames: service.fields,
		},
		campaigns,
	};
}

export async function getOne(userId, campaignId) {
	const results = await index(userId);
	return results.campaigns.find(campaign => campaign.id == campaignId)
		|| {
			message: `Error: no campaign found by id ${campaignId}`,
		};
}

export async function create(userId, payload) {
	const service = new Campaign(userId);
	const result = await service.createCampaign(payload)

	return result;
}
