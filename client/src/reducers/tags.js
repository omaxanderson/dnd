export default function(state = {}, action) {
	console.log(action.type);
	switch (action.type) {
		case "SET_TAGS":
			const { tags } = action.payload;
			return {
				...state,
				results: tags,
			}
			break;
		case 'SELECT_TAG':
			const { id } = action.payload;
			// @TODO this find function isn't working right
			console.log(state.results);
			const selectedTag = state.results.find(tag => tag.tag_id === Number(id));
			return {
				...state,
				selectedTag,
			}
			break;
		default: 
			return state;
	}
}
