import { FETCH_COINS_REVIEWS_SUCCESS, SIGNOUT_USER } from "../constants/constants";

export const coinReviews = (state = {}, action) => {
	switch (action.type) {
		case FETCH_COINS_REVIEWS_SUCCESS:
			return action.payload;
			case SIGNOUT_USER:
				 return state
		default:
			return state;
	}
};
