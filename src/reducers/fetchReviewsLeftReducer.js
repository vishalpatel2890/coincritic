import { FETCH_RATINGS_SUCCESS } from "../constants/constants";

export const reviewsByUser = (state = {}, action) => {
	switch (action.type) {
		case FETCH_RATINGS_SUCCESS:
			return action.payload;
		default:
			return state;
	}
};
