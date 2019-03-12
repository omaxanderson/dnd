export default function(state = {}, action) {
	switch (action.type) {
		case "SET_TAGS":
			const { tags } = action.payload;
			return {
				...state,
				results: tags,
			}
		case 'SELECT_TAG':
			const { id } = action.payload;
			// @TODO this find function isn't working right
			const selectedTag = state.results.find(tag => tag.tag_id === Number(id));
			return {
				...state,
				selectedTag,
			}
		case 'DELETE_TAG':
			const { tag_id } = action.payload;
			return Object.assign({}, state, {
				results: state.results.filter(tag => tag.tag_id !== tag_id),
			});
		default: 
			return state;
	}
}
