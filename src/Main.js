import React, { Component } from "react";
import { Switch, Route } from "react-router-dom";


import Home from "./Home";
import Admin from "./Admin";
import Coins from "./Coins"

class Main extends Component {

	render() {
		return (
			<main>
				<Switch>
					<Route exact path="/" component={Home} />
					<Route path="/admin" component={Admin}/>
					<Route path="/coins" component={Coins} />
				</Switch>
			</main>
		);
	}
}



export default Main;
