const db = require('../database/db');

class UserCampaigns {

	campaignIds = [];
	userId = 0;

	constructor(userId = 0) {
		this.userId = userId
	}

	get userId() {
		return this.userId;
	}

	get campaignIds() {
		return this.campaignIds;
	}

	set userId(userId) {
		this.userId = userId;
	}

}

module.exports = UserCampaigns;

