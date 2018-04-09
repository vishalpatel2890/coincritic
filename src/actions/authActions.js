import firebase from "firebase";
import {
	EMAIL_CHANGED,
	PASSWORD_CHANGED,
	LOGIN_USER_SUCCESS,
	LOGIN_USER_FAIL,
	LOGIN_USER_FAIL_RESET,
	LOGIN_USER,
	SIGNUP_USER,
	FETCH_FOLLOWED_COINS_SUCCESS,
	FETCH_FOLLOWED_POSTS_SUCCESS,
	ADD_USERNAME_REF,
	FETCH_POSTS_USER_VOTES,
	FETCH_COMMENTS_USER_VOTES,
	FETCH_RATINGS_SUCCESS,
	SIGNOUT_USER
} from "../constants/constants";

export const emailChanged = text => {
	return {
		type: EMAIL_CHANGED,
		payload: text
	};
};

export const passwordChanged = text => {
	return {
		type: PASSWORD_CHANGED,
		payload: text
	};
};

export const loginFailReset = () => {
	return{
		type: LOGIN_USER_FAIL_RESET
	}
}

export const loginUser = ({ email, password }) => {
	return dispatch => {
		dispatch({ type: LOGIN_USER });
		firebase
			.auth()
			.setPersistence(firebase.auth.Auth.Persistence.LOCAL)
			.then(() => {
				firebase
					.auth()
					.signInWithEmailAndPassword(email, password)
					.then(user => loginUserSuccess(dispatch, user))
					.catch(error => {
						loginUserFail(dispatch, error.code)
					});
			})
			.catch(error => {
				console.log(error.code);
			});
	};
};

export const signUpUser = ({
	registerEmail,
	registerPassword,
	registerUsername
}) => {
	return dispatch => {
		dispatch({ type: SIGNUP_USER });
		firebase
			.auth()
			.createUserWithEmailAndPassword(registerEmail, registerPassword)
			.then(user => loginUserSuccess(dispatch, user, registerUsername))
			.then(() =>
				firebase
					.database()
					.ref("/userIds")
					.child(registerUsername)
					.set(registerEmail)
					.then(() => {
						dispatch({ type: ADD_USERNAME_REF });
					})
			)
			.catch(error => loginUserFail(dispatch, error));
	};
};

const loginUserFail = (dispatch, error) => {

	dispatch({ type: LOGIN_USER_FAIL, payload: error });
};

const loginUserSuccess = (dispatch, user, registerUsername) => {
	user.updateProfile({ displayName: registerUsername });
	dispatch({
		type: LOGIN_USER_SUCCESS,
		payload: user
	});
	firebase
		.database()
		.ref("/coinsFollowedByUser/" + user.uid)
		.on("value", snapshot => {
			dispatch({ type: FETCH_FOLLOWED_COINS_SUCCESS, payload: snapshot.val() });
		});
	firebase
		.database()
		.ref("/votesByUser/" + user.uid)
		.on("value", snapshot => {
			dispatch({ type: FETCH_POSTS_USER_VOTES, payload: snapshot.val() });
		});
	firebase
		.database()
		.ref("/votesforCommentsByUser/" + user.uid)
		.on("value", snapshot => {
			dispatch({ type: FETCH_COMMENTS_USER_VOTES, payload: snapshot.val() });
		});
	firebase
		.database()
		.ref("/postsFollowedByUser/" + user.uid)
		.on("value", snapshot => {
			dispatch({ type: FETCH_FOLLOWED_POSTS_SUCCESS, payload: snapshot.val() });
		});
	firebase
		.database()
		.ref("/ratingsByUser/" + user.uid)
		.on("value", snapshot => {
			dispatch({ type: FETCH_RATINGS_SUCCESS, payload: snapshot.val() });
		});
};

export const reLoginUser = user => {
	return dispatch => {
		dispatch({
			type: LOGIN_USER_SUCCESS,
			payload: user
		});

		firebase
			.database()
			.ref("/coinsFollowedByUser/" + user.uid)
			.on("value", snapshot => {
				dispatch({
					type: FETCH_FOLLOWED_COINS_SUCCESS,
					payload: snapshot.val()
				});
			});
		firebase
			.database()
			.ref("/votesByUser/" + user.uid)
			.on("value", snapshot => {
				dispatch({ type: FETCH_POSTS_USER_VOTES, payload: snapshot.val() });
			});
		firebase
			.database()
			.ref("/votesforCommentsByUser/" + user.uid)
			.on("value", snapshot => {
				dispatch({ type: FETCH_COMMENTS_USER_VOTES, payload: snapshot.val() });
			});
		firebase
			.database()
			.ref("/postsFollowedByUser/" + user.uid)
			.on("value", snapshot => {
				dispatch({
					type: FETCH_FOLLOWED_POSTS_SUCCESS,
					payload: snapshot.val()
				});
			});
		firebase
			.database()
			.ref("/ratingsByUser/" + user.uid)
			.on("value", snapshot => {
				dispatch({ type: FETCH_RATINGS_SUCCESS, payload: snapshot.val() });
			});
	};
};

export const signOutUser = () => {
	return dispatch => {
		dispatch({type: SIGNOUT_USER})
	}
}
