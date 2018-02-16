import { FETCH_COINS_REVIEWS_SUCCESS } from "../constants/constants";

export const coinReviews = (state = {}, action) => {
	switch (action.type) {
		case FETCH_COINS_REVIEWS_SUCCESS:
			return action.payload;
		default:
			return state;
	}
};
