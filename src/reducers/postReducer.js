import { ADD_POST } from "../constants/constants";

const INITIAL_STATE = {};

export const post = (state = INITIAL_STATE, action) => {
	switch (action.type) {
		case ADD_POST:
			return INITIAL_STATE;

		default:
			return state;
	}
};
