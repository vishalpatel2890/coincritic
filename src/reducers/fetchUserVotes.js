import { FETCH_POSTS_USER_VOTES, FETCH_COMMENTS_USER_VOTES } from "../constants/constants";

const INITIAL_STATE = {
  postsVotes: null,
	commentsVotes: null
};

export const userVotes = (state = INITIAL_STATE, action) => {
	switch (action.type) {
		case FETCH_POSTS_USER_VOTES:
			return { ...state, postsVotes: action.payload };
			case FETCH_COMMENTS_USER_VOTES:
			return {...state, commentsVotes: action.payload}
		default:
			return state;
	}
};
