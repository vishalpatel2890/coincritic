import { FETCH_POST_DETAILS } from "../constants/constants";

const INITIAL_STATE = {};

export const postDetails = (state = INITIAL_STATE, action) => {
	switch (action.type) {
		case FETCH_POST_DETAILS:
      return action.payload
		default:
			return state;
	}
};
