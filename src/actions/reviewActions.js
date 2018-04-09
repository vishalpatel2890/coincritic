import { ADD_REVIEW, FETCH_COINS_REVIEWS_SUCCESS, UPDATE_REVIEW } from "../constants/constants";
import firebase from "firebase";

var moment = require("moment");

export const addReview = ({
	newTeam,
	newWhitepaper,
	newRoadmap,
	newLandscape,
	newRealworld,
	newReviewAvg,
	newReviewCount,
	team,
	whitepaper,
	roadmap,
	landscape,
	realworld,
	reviewAvg,
	review,
	coinUid,
	displayName,
	uid
}) => {

	const reviewDate = moment().format("YYYYMMDDhhmm a");
	var newReviewKey = firebase
		.database()
		.ref()
		.child("ratingsByCoin/" + coinUid)
		.push().key;
	var updates = {};
	updates["ratingsByCoin/" + coinUid + "/" + newReviewKey] = {
		team: team,
		whitepaper: whitepaper,
		roadmap: roadmap,
		landscape: landscape,
		realworld: realworld,
    reviewAvg: reviewAvg,
    review,
		displayName,
    reviewDate
	};
	updates["ratingsByUser/" + uid + "/" + newReviewKey] = {
		team: team,
		whitepaper: whitepaper,
		roadmap: roadmap,
		landscape: landscape,
		realworld: realworld,
    reviewAvg: reviewAvg,
    review,
		coinUid
	};
  updates["coins/" + coinUid + "/team"] = newTeam;
  updates["coins/" + coinUid + "/whitepaper"] = newWhitepaper;
  updates["coins/" + coinUid + "/roadmap"] = newRoadmap;
  updates["coins/" + coinUid + "/landscape"] = newLandscape;
  updates["coins/" + coinUid + "/realworld"] = newRealworld;
  updates["coins/" + coinUid + "/reviewAvg"] = newReviewAvg;
  updates["coins/" + coinUid + "/reviewCount"] = newReviewCount;

	return dispatch => {
		firebase
			.database()
			.ref()
			.update(updates)
			.then(() => {
				dispatch({ type: ADD_REVIEW });
			});
	};
};

export const fetchCoinsReviews = (coinUid) => {
	return dispatch => {
		firebase
			.database()
			.ref("/ratingsByCoin/" + coinUid)
			.on("value", snapshot => {
				dispatch({ type: FETCH_COINS_REVIEWS_SUCCESS, payload: snapshot.val() });
			});
	};
};

export const updateReview = ({
	newTeam,
	newWhitepaper,
	newRoadmap,
	newLandscape,
	newRealworld,
	newReviewAvg,
	team,
	whitepaper,
	roadmap,
	landscape,
	realworld,
	review,
	reviewAvg,
	coinUid,
	uid,
	reviewKey
}) => {
	var updates = {};
	updates["ratingsByCoin/" + coinUid + "/" + reviewKey + "/team"] = team;
	updates["ratingsByCoin/" + coinUid + "/" + reviewKey + "/whitepaper"] = whitepaper;
	updates["ratingsByCoin/" + coinUid + "/" + reviewKey + "/roadmap"] = roadmap;
	updates["ratingsByCoin/" + coinUid + "/" + reviewKey + "/landscape"] = landscape;
	updates["ratingsByCoin/" + coinUid + "/" + reviewKey + "/realworld"] = realworld;
	updates["ratingsByCoin/" + coinUid + "/" + reviewKey + "/reviewAvg"] = reviewAvg;
	updates["ratingsByCoin/" + coinUid + "/" + reviewKey + "/review"] = review;
	updates["ratingsByUser/" + uid + "/" + reviewKey + "/team"] = team;
	updates["ratingsByUser/" + uid + "/" + reviewKey + "/whitepaper"] = whitepaper;
	updates["ratingsByUser/" + uid + "/" + reviewKey + "/roadmap"] = roadmap;
	updates["ratingsByUser/" + uid + "/" + reviewKey + "/landscape"] = landscape;
	updates["ratingsByUser/" + uid + "/" + reviewKey + "/realworld"] = realworld;
	updates["ratingsByUser/" + uid + "/" + reviewKey + "/reviewAvg"] = reviewAvg;
	updates["ratingsByUser/" + uid + "/" + reviewKey + "/review"] = review;
	updates["coins/" + coinUid + "/team"] = newTeam;
  updates["coins/" + coinUid + "/whitepaper"] = newWhitepaper;
  updates["coins/" + coinUid + "/roadmap"] = newRoadmap;
  updates["coins/" + coinUid + "/landscape"] = newLandscape;
  updates["coins/" + coinUid + "/realworld"] = newRealworld;
  updates["coins/" + coinUid + "/reviewAvg"] = newReviewAvg;

	return dispatch => {
		firebase
			.database()
			.ref()
			.update(updates)
			.then(() => {
				dispatch({ type: UPDATE_REVIEW });
			});
	};
}
