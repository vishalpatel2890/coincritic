import {
	FOLLOW_COIN,
	FOLLOW_POST
} from "../constants/constants";
import firebase from "firebase";

export const followCoin = ({ userUid, coinURI, coinUid }) => {
	var updates = {};
	updates["/coinsFollowedByUser/" + userUid + "/" + coinUid] = {
		coinURI,
		coinUid
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

export const followPost = ({ uid, postUid}) => {
	var updates = {};
	updates["/postsFollowedByUser/" + uid + "/" + postUid] = {
		following: "following"
	};
	updates["/followersbyPost/" + postUid + "/" + uid] = {
		following: "following"
	};
	return dispatch => {
		firebase
			.database()
			.ref()
			.update(updates)
			.then(() => {
				dispatch({ type: FOLLOW_POST });
			});
	};
};

export const unfollowPost = ({ uid, postUid }) => {
	var updates = {};
	updates["/postsFollowedByUser/" + uid + "/" + postUid] = null;
	updates["/followersbyPost/" + postUid + "/" + uid] = null;
	return dispatch => {
		firebase
			.database()
			.ref()
			.update(updates);
	};
};
