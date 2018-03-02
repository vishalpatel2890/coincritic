import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import firebase from "firebase";


import Main from "./Main";

class App extends Component {

	componentWillMount(state) {
		const config = {
			apiKey: "AIzaSyDswjCdV5xhNfZZnnexUoje5LEQxskTO2M",
			authDomain: "coincritic.firebaseapp.com",
			databaseURL: "https://coincritic.firebaseio.com",
			projectId: "coincritic",
			storageBucket: "coincritic.appspot.com",
			messagingSenderId: "487868920510"
		};

		firebase.initializeApp(config);

	}


	render() {
		return (
			<div>
				<div>
					<Main />
				</div>
			</div>
		);
	}
}


export default withRouter(App)
