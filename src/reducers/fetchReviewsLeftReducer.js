import { FETCH_RATINGS_SUCCESS, SIGNOUT_USER } from "../constants/constants";

export const reviewsByUser = (state = {}, action) => {
	switch (action.type) {
		case FETCH_RATINGS_SUCCESS:
			return action.payload;
		case SIGNOUT_USER:
			 return state
		default:
			return state;
	}
};
