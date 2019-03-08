
const initialState = {
	names: ['test'],
};

export default function(state = initialState, action) {
	switch (action.type) {
		case "TEST_ACTION":
			const { id, content } = action.payload;
			return {
				...state,
			};
		default: 
			return state;
	}
}
