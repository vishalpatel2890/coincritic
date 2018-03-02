import { FETCH_COIN_SUCCESS } from "../constants/constants";

export const coins = (state = {}, action) => {
	switch (action.type) {
		case FETCH_COIN_SUCCESS:
			return action.payload;
		default:
			return state;
	}
};
