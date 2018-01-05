import { FETCH_SINGLE_COIN_SUCCESS} from "../constants/constants"

const INITIAL_STATE = {};

export const currentCoin = (state = INITIAL_STATE, action) => {
	switch (action.type) {
		case FETCH_SINGLE_COIN_SUCCESS:
			return action.payload;

		default:
			return state;
	}
};
