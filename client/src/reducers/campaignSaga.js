import { all, call, put, takeEvery } from 'redux-saga/effects';

function* fetchCampaigns(action) {
	console.log('from fetchCampaigns');
	try {
		const results = yield fetch('/api/campaigns');
		const data = yield results.json();
		yield put({
			type: 'CAMPAIGNS_FETCH_SUCCEEDED',
			payload: data,
		})
	} catch (e) {
		yield put({
			type: 'CAMPAIGNS_FETCH_FAILED',
			payload: e,
		});
	}
}

function* fetchOneCampaign(action) {
	try {
		const results = yield fetch(`/api/campaigns/${action.payload.campaignId}`);
		const data = yield results.json();
		yield put({
			type: 'CAMPAIGN_FETCH_SUCCEEDED',
			payload: data,
		})
	} catch (e) {
		yield put({
			type: 'CAMPAIGN_FETCH_FAILED',
			payload: e,
		});
	}
}

export default function* watchCampaigns() {
	console.log('from watchCampaigns');
	yield all([
		takeEvery('CAMPAIGNS_FETCH_REQUESTED', fetchCampaigns),
		takeEvery('CAMPAIGN_FETCH_REQUESTED', fetchOneCampaign),
	]);
}
