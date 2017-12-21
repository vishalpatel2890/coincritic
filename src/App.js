import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import firebase from "firebase";

import Main from "./Main";

class App extends Component {

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

export default withRouter(App);
