import firebase from 'firebase';
import {
  EMAIL_CHANGED,
  PASSWORD_CHANGED,
  LOGIN_USER_SUCCESS,
  LOGIN_USER_FAIL,
  LOGIN_USER,
  SIGNUP_USER,
  FETCH_FOLLOWED_COINS_SUCCESS,
  ADD_USERNAME_REF,
  FETCH_POSTS_USER_VOTES,
  FETCH_COMMENTS_USER_VOTES
} from '../constants/constants';

export const emailChanged = (text) => {
  return {
    type: EMAIL_CHANGED,
    payload: text
  };
};

export const passwordChanged = (text) => {
  return {
    type: PASSWORD_CHANGED,
    payload: text
  };
};

export const loginUser = ({ email, password }) => {
  return (dispatch) => {
    dispatch({ type: LOGIN_USER });
    firebase.auth().signInWithEmailAndPassword(email, password)
      .then(user => loginUserSuccess(dispatch, user))
      .catch((error) => {
        console.log(error.code)
      });

  };
};

export const signUpUser = ({ registerEmail, registerPassword, registerUsername }) => {

  return (dispatch) => {
    dispatch({ type: SIGNUP_USER });
        firebase.auth().createUserWithEmailAndPassword(registerEmail, registerPassword)
          .then(user => loginUserSuccess(dispatch, user, registerUsername))
          .then(()=>
            firebase
      			  .database()
        			.ref("/userIds")
        			.child(registerUsername)
              .set(registerEmail)
        			.then(() => {
        				dispatch({ type: ADD_USERNAME_REF});
        			}))

          .catch((error) => loginUserFail(dispatch, error));

  };
};

const loginUserFail = (dispatch, error) => {
  console.log(error)
  dispatch({ type: LOGIN_USER_FAIL });
};

const loginUserSuccess = (dispatch, user, registerUsername) => {
  user.updateProfile({displayName: registerUsername})
  dispatch({
    type: LOGIN_USER_SUCCESS,
    payload: user
  })
  firebase
    .database()
    .ref("/coinsFollowedByUser/" + user.uid)
    .on("value", snapshot => {
      dispatch({ type: FETCH_FOLLOWED_COINS_SUCCESS, payload: snapshot.val() });
    })
    firebase
      .database()
      .ref("/votesByUser/" + user.uid )
      .on("value", snapshot => {
        dispatch({ type: FETCH_POSTS_USER_VOTES, payload: snapshot.val() });
      })
      firebase
        .database()
        .ref("/votesforCommentsByUser/" + user.uid )
        .on("value", snapshot => {
          dispatch({ type: FETCH_COMMENTS_USER_VOTES, payload: snapshot.val() });
        });
};
