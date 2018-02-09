import { FETCH_COMMENTS_FOR_POST_SUCCESS } from "../constants/constants";

export const commentsForPost = (state = {}, action) => {
	switch (action.type) {
		case FETCH_COMMENTS_FOR_POST_SUCCESS:
			return action.payload;
		default:
			return state;
	}
};
