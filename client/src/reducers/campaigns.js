export default function(state = {}, action) {
	switch (action.type) {
		case 'FETCH_CAMPAIGNS':
			console.log(action.type);
			return {
				...state,
				results: action.payload.campaigns,
				metadata: action.payload.metadata,
			}
		case 'CAMPAIGNS_FETCH_SUCCEEDED':
			return {
				...state,
				results: action.payload.campaigns,
				metadata: action.payload.metadata,
			}
		case 'CAMPAIGNS_FETCH_FAILED':
			return {
				...state,
			}
		case 'CAMPAIGN_FETCH_SUCCEEDED':
			console.log(action.type);
			return {
				...state,
				campaign: action.payload
			}
		case 'CAMPAIGN_FETCH_FAILED':
			return {
				...state,
			}
		default:
			return state;
	}
}
