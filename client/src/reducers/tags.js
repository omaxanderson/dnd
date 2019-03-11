export default function(state = {}, action) {
	console.log(action.type);
	switch (action.type) {
		case "SET_TAGS":
			console.log(action.payload);
			const { tags } = action.payload;
			return {
				...state,
				results: tags,
			}
			break;
		default: 
			return state;
	}
}
