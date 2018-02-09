import { combineReducers } from "redux";
import { reducer as reduxForm } from "redux-form";
import { coinForm } from "./coinReducer";
import { coins } from "./coinFetchReducer";
import { auth } from "./AuthReducer";
import { followCoin} from "./userFollowReducer"
import { followedCoins } from "./fetchFollowedCoinsReducer"
import { followedPosts } from "./fetchFollowedPostsReducer"
import {currentCoin} from "./fetchSingleCoinReducer"
import {postsForCoin} from "./fetchPostsForCoinReducer"
import {commentsForPost} from "./fetchCommentsForPostReducer"
import {childComments} from "./fetchChildCommentsReducer"
import {userVotes} from "./fetchUserVotes"
import {postDetails} from "./fetchPostDetailsReducer.js"
import {post} from "./postReducer"

const rootReducer = combineReducers({
	auth,
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
	form: reduxForm
});

export default rootReducer;
