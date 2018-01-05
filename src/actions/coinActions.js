import {
  ADD_COIN,
  FETCH_COIN_SUCCESS,
  FETCH_SINGLE_COIN_SUCCESS
} from "../constants/constants";
import firebase from "firebase";


export const addCoin = ({ name, coin }) => {
	return dispatch => {
		firebase
			.database()
			.ref("/coins")
			.push({ name, coin })
			.then(() => {
				dispatch({ type: ADD_COIN });
			});
	};
};

export const fetchCoins = () => {
	return dispatch => {
		firebase
			.database()
			.ref("/coins")
			.on("value", snapshot => {
				dispatch({ type: FETCH_COIN_SUCCESS, payload: snapshot.val() });
			});
	};
};

export const fetchSingleCoin = (coinUid) => {
  return dispatch => {
		firebase
			.database()
			.ref("/coins/" + coinUid)
			.on("value", snapshot => {
				dispatch({ type: FETCH_SINGLE_COIN_SUCCESS, payload: snapshot.val() });
			});
	};
}
