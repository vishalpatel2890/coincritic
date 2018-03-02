import { FETCH_CHILD_COMMENTS_SUCCESS } from "../constants/constants";

export const childComments = (state = {}, action) => {
	switch (action.type) {
		case FETCH_CHILD_COMMENTS_SUCCESS:
			return action.payload;
		default:
			return state;
	}
};
