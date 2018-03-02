import {
  FOLLOW_COIN
} from "../constants/constants";

const INITIAL_STATE = {};

export const followCoin = (state = INITIAL_STATE, action) => {
	switch (action.type) {
		case FOLLOW_COIN:
			return INITIAL_STATE;
		default:
			return state;
	}
};
