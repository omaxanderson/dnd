
const initialState = {
	names: ['test', 'max'],
	max: 'cool',
};

export default function(state = initialState, action) {
	switch (action.type) {
		case "TEST_ACTION":
			const { content } = action.payload;
			return {
				...state,
				content,
			};
		default: 
			return state;
	}
}
