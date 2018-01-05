import { FETCH_FOLLOWED_COINS_SUCCESS } from "../constants/constants";

export const followedCoins = (state = {}, action) => {
	switch (action.type) {
		case FETCH_FOLLOWED_COINS_SUCCESS:
			return action.payload;
		default:
			return state;
	}
};
