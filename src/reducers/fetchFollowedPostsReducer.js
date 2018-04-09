import { FETCH_FOLLOWED_POSTS_SUCCESS, SIGNOUT_USER } from "../constants/constants";

export const followedPosts = (state = {}, action) => {
	switch (action.type) {
		case FETCH_FOLLOWED_POSTS_SUCCESS:
			return action.payload;
		case SIGNOUT_USER:
			 return state
		default:
			return state;
	}
};
