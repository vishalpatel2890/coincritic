import { ADD_REVIEW } from "../constants/constants";
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
	review,
	coinUid,
	displayName,
	uid
}) => {
	console.log(
	newLandscape)
	const reviewDate = moment().format("YYYYMMDDhhmm a");
	var newReviewKey = firebase
		.database()
		.ref()
		.child("ratingsByCoin/" + coinUid)
		.push().key;
	var updates = {};
	updates["ratingsByCoin/" + coinUid + "/" + newReviewKey] = {
		team: newTeam,
		whitepaper: newWhitepaper,
		roadmap: newRoadmap,
		landscape: newLandscape,
		realworld: newRealworld,
    reviewAvg: newReviewAvg,
    review,
		displayName,
    reviewDate
	};
	updates["ratingsByUser/" + uid + "/" + newReviewKey] = {
		team: newTeam,
		whitepaper: newWhitepaper,
		roadmap: newRoadmap,
		landscape: newLandscape,
		realworld: newRealworld,
    reviewAvg: newReviewAvg,
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
