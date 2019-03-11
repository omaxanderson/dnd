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
			const selectedTag = state.results.find(tag => tag.tag_id === id);
			console.log(id);
			console.log(selectedTag);
			return {
				...state,
				tag: selectedTag,
			}
			break;
		default: 
			return state;
	}
}
