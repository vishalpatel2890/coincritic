import {
  ADD_COIN,
  FETCH_COIN_SUCCESS,
  FETCH_SINGLE_COIN_SUCCESS
} from "../constants/constants";
import firebase from "firebase";


export const addCoin = ({ name, ticker, image, url }) => {
	return dispatch => {
		firebase
			.database()
			.ref("/coins")
      .child(name)
      .set({'image': image, 'ticker': ticker, 'url': url, team: 0, landscape: 0, whitepaper: 0, realworld: 0, roadmap: 0, reviewCount: 0, reviewAvg: 0 })
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
