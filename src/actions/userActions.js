import {
	FOLLOW_COIN,
	FETCH_FOLLOWED_COINS_SUCCESS
} from "../constants/constants";
import firebase from "firebase";

export const followCoin = ({ userUid, coinUid, coinURI, coinName }) => {
	console.log(coinUid);
	var updates = {};
	updates["/coinsFollowedByUser/" + userUid + "/" + coinUid] = {
		coinURI,
		coinName
	};
	updates["/followersbyCoin/" + coinUid + "/" + userUid] = {
		following: "following"
	};
	return dispatch => {
		firebase
			.database()
			.ref()
			.update(updates)
			.then(() => {
				dispatch({ type: FOLLOW_COIN });
			});
	};
};

export const unfollowCoin = ({ userUid, coinUid }) => {
	console.log(userUid);
	console.log(coinUid);
	var updates = {};
	updates["/coinsFollowedByUser/" + userUid + "/" + coinUid] = null;
	updates["/followersbyCoin/" + coinUid + "/" + userUid] = null;
	return dispatch => {
		firebase
			.database()
			.ref()
			.update(updates);
	};
};
