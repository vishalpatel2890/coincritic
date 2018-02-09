import { FETCH_FOLLOWED_POSTS_SUCCESS } from "../constants/constants";

export const followedPosts = (state = {}, action) => {
	switch (action.type) {
		case FETCH_FOLLOWED_POSTS_SUCCESS:
			return action.payload;
		default:
			return state;
	}
};
