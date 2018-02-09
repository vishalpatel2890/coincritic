import { FETCH_POSTS_FOR_COIN_SUCCESS } from "../constants/constants";

export const postsForCoin = (state = {}, action) => {
	switch (action.type) {
		case FETCH_POSTS_FOR_COIN_SUCCESS:
			return action.payload;
		default:
			return state;
	}
};
