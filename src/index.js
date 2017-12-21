import { BrowserRouter } from "react-router-dom";
import React from "react";
import { render } from "react-dom";
import { Provider } from "react-redux";
import registerServiceWorker from "./registerServiceWorker";
import configureStore from "./store/configureStore";
import "./index.css";
import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";
import App from './App';

const initialState = {};
const store = configureStore(initialState);

render(
	<BrowserRouter>
		<MuiThemeProvider>
			<Provider store={store}>
				<App />
			</Provider>
		</MuiThemeProvider>
	</BrowserRouter>,
	document.getElementById("root")
);

registerServiceWorker();
