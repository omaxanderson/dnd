export default function(state = {}, action) {
	switch (action.type) {
		case 'NOTES_FETCH_SUCCEEDED':
			console.log(action.payload);
			return {
				...state,
				results: action.payload.notes,
				metadata: action.payload.metadata,
			}
		case 'NOTES_FETCH_FAILED':
			return {
				message: 'Notes failed to load!',
			}
		default:
			return state;
	}

}
