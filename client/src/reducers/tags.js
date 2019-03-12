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
		case 'DELETE_TAG':
			const { tag_id } = action.payload;
			console.log(state);
			// const tags = state.tags.results.filter(tag => tag.tag_id !== tag_id);
			return Object.assign({}, state, {
				results: state.results.filter(tag => tag.tag_id !== tag_id),
			});
		default: 
			return state;
	}
}
