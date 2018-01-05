import { ADD_COIN } from "../constants/constants";

const INITIAL_STATE = {};

export const coinForm = (state = INITIAL_STATE, action) => {
	switch (action.type) {
		case ADD_COIN:
			return INITIAL_STATE;

		default:
			return state;
	}
};
