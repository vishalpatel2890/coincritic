import {
  ADD_COMMENT_TO_COMMENT,
  FETCH_CHILD_COMMENTS_SUCCESS,
  VOTE_COMMENT
} from "../constants/constants";
import firebase from "firebase";

export const addCommentToComment = ({commentUid, childComment, newChildCount, parentUid, parentComment, displayName, uid }) => {
  var newCommentKey = firebase
		.database()
		.ref()
		.child("commentsByComment/" + commentUid)
		.push().key;
  var updates = {};
  updates["/commentsByComment/" + commentUid + "/" + newCommentKey] = {
   comment: childComment,
   votes: 0,
   user: displayName
  };
  updates["/commentsByComment/" + parentUid + "/" + commentUid + "/childCount"] = newChildCount;
  return dispatch => { 
    firebase
			.database()
			.ref()
			.update(updates)
			.then(() => {
				dispatch({ type: ADD_COMMENT_TO_COMMENT });
			});
  }
}

export const fetchChildComments = (parentUid) => {
  return dispatch => {
    firebase
      .database()
      .ref("/commentsByComment/" + parentUid)
      .on("value", snapshot => {
        dispatch({ type: FETCH_CHILD_COMMENTS_SUCCESS, payload: snapshot.val() });
      });
  };
}

export const voteComment = ({parentUid, commentUid, uid, newVoteTotal, userVote}) => {
  console.log('yo')
  var updates = {};
    updates["/commentsByComment/" + parentUid + "/" + commentUid + "/votes"] = newVoteTotal;
    updates["/votesforCommentsByUser/" + uid + "/" + commentUid] = userVote;
    return dispatch => {
      firebase
  			.database()
  			.ref()
  			.update(updates)
  			.then(() => {
  				dispatch({ type: VOTE_COMMENT });
  			});
    }
}
