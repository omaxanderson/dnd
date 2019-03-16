import Db from '../database/db';

export default class NoteCampaign {

	associateNoteToCampaign(noteId, campaignId) {
		const sql = Db.format(`
			INSERT INTO campaign_note (campaign_id, note_id)
			VALUES (?, ?)
		`, [campaignId, noteId]);
		console.log(sql);
	}

}
