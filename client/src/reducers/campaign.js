export default function(state = {}, action) {
	switch (action.type) {
		case 'CAMPAIGN_FETCH_SUCCEEDED':
			return {
				...action.payload,
			}
		case 'CAMPAIGN_FETCH_FAILED':
			return {
				...state,
			}
		default:
			return state;
	}
}
