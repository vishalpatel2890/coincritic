import {
  ADD_POST,
  FETCH_POSTS_FOR_COIN_SUCCESS,
  ADD_COMMENT_TO_POST,
  FETCH_COMMENTS_FOR_POST_SUCCESS,
  VOTE_POST,
  FETCH_POSTS_USER_VOTES,
  FETCH_USERS_FOLLOWING_POST,
  FETCH_POST_DETAILS
} from "../constants/constants";
import firebase from "firebase";

var moment = require("moment");

export const addPost = ({ postTitle, postComment, votes, coinUid, displayName, uid }) => {
  const postDate = moment().format('YYYYMMDDhhmm a')
  const commentCount = 1;
	return dispatch => {
		firebase
			.database()
			.ref("/postsByCoin/" + coinUid)
			.push({ postTitle, postComment, votes, displayName, postDate, commentCount })
			.then(() => {
				dispatch({ type: ADD_POST });
			});
	};
};

export const fetchPostsForCoin = (coinUid) => {

  return dispatch => {
    firebase
			.database()
			.ref("/postsByCoin/" + coinUid)
			.on("value", snapshot => {
				dispatch({ type: FETCH_POSTS_FOR_COIN_SUCCESS, payload: snapshot.val() });
			});
  }
}

export const fetchUsersFollowingPost = (postUid) => {
  return dispatch => {
    firebase
      .database()
      .ref("/followersbyPost/" + postUid)
      .on("value", snapshot => {
        dispatch({ type: FETCH_USERS_FOLLOWING_POST, payload: snapshot.val() });
      });
  }
}

export const addCommentToPost = ({postUid, comment, coinUid, commentCount, displayName, uid}) => {
  var newCommentCount = commentCount + 1;

  var newCommentKey = firebase
    .database()
    .ref()
    .child("commentsByComment/" + postUid)
    .push().key;
  var updates = {};
  updates["/postsByCoin/" + coinUid + "/" + postUid + "/commentCount"] = newCommentCount
  updates["/commentsByComment/" + postUid + "/" + newCommentKey] = {comment: comment, votes: 0, user: displayName}
  return dispatch => {
    firebase
      .database()
      .ref()
      .update(updates)
      .then(() => {
        dispatch({ type:ADD_COMMENT_TO_POST });
      });
  }
}

export const fetchCommentsForPost = (postUid) => {
  return dispatch => {
    firebase
      .database()
      .ref("/commentsByComment/" + postUid)
      .on("value", snapshot => {
        dispatch({ type: FETCH_COMMENTS_FOR_POST_SUCCESS, payload: snapshot.val() });
      });
  }
}

export const votePost = ({postUid, uid, newVoteTotal, userVote, coinUid}) => {
  var updates = {};
    updates["/postsByCoin/" + coinUid + "/" + postUid + "/votes"] = newVoteTotal;
    updates["/votesByUser/" + uid + "/" + postUid] = userVote;
    return dispatch => {
      firebase
  			.database()
  			.ref()
  			.update(updates)
  			.then(() => {
  				dispatch({ type: VOTE_POST });
  			});
    }
}

export const fetchPostsUserVotes = (userUid) => {
  return dispatch => {
    firebase
      .database()
      .ref("/votesByUser/" + userUid )
      .on("value", snapshot => {
        dispatch({ type: FETCH_POSTS_USER_VOTES, payload: snapshot.val() });
      });
  }
}

export const fetchPostDetails = (postUid, coinUid) => {

  return dispatch => {
    firebase
      .database()
      .ref("/postsByCoin/" + coinUid + "/" + postUid)
      .on("value", snapshot => {
        dispatch({ type: FETCH_POST_DETAILS, payload: snapshot.val() });
      });
  }
}

export const incrementCommentCount = (usersFollowingPost) => {
  console.log(usersFollowingPost)
}
