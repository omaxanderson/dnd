import db from '../database/db';
import UserCampaigns from '../classes/UserCampaigns';
import Campaign from '../classes/Campaign';
import Notes from '../classes/Notes';

export async function index(userId) {
	const service = new UserCampaigns(userId);
	const campaigns = await service.execute();

	return {
		metadata: {
			numResults: campaigns.length,
			fieldNames: service.fields,
		},
		campaigns,
	};
}

export async function getOne(userId, campaignId) {
	try {
		const results = await index(userId);
		const campaign = results.campaigns.find(campaign => campaign.id == campaignId);
		if (!campaign) {
			throw `No campaign found by id ${campaignId}`
		}
		
		// Get user's notes
		const noteService = new Notes(userId);
		const notes = await noteService
			.setCampaignId(campaignId)
			.getCampaignNotes();

		campaign.notes = notes;

		return campaign;
	} catch (e) {
		return {
			error: e,
		}
	}
}

export async function create(userId, payload) {
	const service = new Campaign(userId);
	const result = await service.createCampaign(payload)

	return result;
}
