import { NAV_COIN } from "../constants/constants";

const INITIAL_STATE = {};

export const currentCoin = (state = INITIAL_STATE, action) => {
	switch (action.type) {
		case NAV_COIN:
			return action.payload;

		default:
			return state;
	}
};
