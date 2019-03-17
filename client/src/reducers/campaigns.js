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
		default:
			return state;
	}
}
