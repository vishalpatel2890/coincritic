import { FETCH_USERS_FOLLOWING_POST } from "../constants/constants";

export const usersFollowingPost = (state = {}, action) => {
	switch (action.type) {
		case FETCH_USERS_FOLLOWING_POST:
			return action.payload;

		default:
			return state;
	}
};
