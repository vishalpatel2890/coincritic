import { combineReducers } from "redux";
import { reducer as reduxForm } from "redux-form";
import { coinForm } from "./coinReducer";
import { coins } from "./coinFetchReducer";
import { auth, error } from "./AuthReducer";
import { followCoin } from "./userFollowReducer"
import { followedCoins } from "./fetchFollowedCoinsReducer"
import { followedPosts } from "./fetchFollowedPostsReducer"
import {usersFollowingPost} from "./fetchUsersFollowingPost"
import {currentCoin} from "./fetchSingleCoinReducer"
import {postsForCoin} from "./fetchPostsForCoinReducer"
import {commentsForPost} from "./fetchCommentsForPostReducer"
import {childComments} from "./fetchChildCommentsReducer"
import {userVotes} from "./fetchUserVotes"
import {postDetails} from "./fetchPostDetailsReducer"
import {post} from "./postReducer"
import {coinReviews} from "./fetchCoinReviewsReducer"
import {reviewsByUser} from "./fetchReviewsLeftReducer"

const rootReducer = combineReducers({
	auth,
	error,
	coinForm,
	coins,
	followCoin,
	followedCoins,
	followedPosts,
	currentCoin,
	post,
	postsForCoin,
	postDetails,
	commentsForPost,
	childComments,
	userVotes,
	coinReviews,
	reviewsByUser,
	usersFollowingPost,
	form: reduxForm
});

export default rootReducer;
