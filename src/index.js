import { BrowserRouter } from "react-router-dom";
import React from "react";
import { render } from "react-dom";
import { Provider } from "react-redux";
import registerServiceWorker from "./registerServiceWorker";
import configureStore from "./store/configureStore";
import { saveState } from './localStorage'
import "./index.css";
import App from './App';

const store = configureStore()

store.subscribe	(()=> {
	saveState({
		'auth': store.getState().auth
	})
})

render(
	<BrowserRouter>
			<Provider store={store}>
				<App />
			</Provider>
	</BrowserRouter>,
	document.getElementById("root")
);

registerServiceWorker();
