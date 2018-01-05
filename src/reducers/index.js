import { combineReducers } from "redux";
import { reducer as reduxForm } from "redux-form";
import { coinForm } from "./coinReducer";
import { coins } from "./coinFetchReducer";
import { auth } from "./AuthReducer";
import { followCoin} from "./userFollowReducer"
import { followedCoins } from "./fetchFollowedCoinsReducer"
import {currentCoin} from "./fetchSingleCoinReducer"

const rootReducer = combineReducers({
	auth,
	coinForm,
	coins,
	followCoin,
	followedCoins,
	currentCoin,
	form: reduxForm
});

export default rootReducer;
