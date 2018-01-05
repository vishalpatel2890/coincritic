import { NAV_COIN } from "../constants/constants";

export const navCoin = ({ coinUid }) => {
	console.log(coinUid);
	return {
		type: NAV_COIN,
		payload: coinUid
	};
};
