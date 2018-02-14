import { createStore, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";
import rootReducer from "../reducers";
import {loadState} from '../localStorage'

const persistedState = loadState();
export default function configureStore(initialState) {
	return createStore(rootReducer, persistedState, compose(applyMiddleware(thunk)));
}
