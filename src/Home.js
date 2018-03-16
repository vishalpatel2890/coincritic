import React, { Component } from "react";
import _ from "lodash";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { Avatar, Row, Col } from "antd";

import "./App.css";
import Table from "./components/table/Table";
import Header from "./Header";
import square from "./assets/cc-logo-square.png"
import { fetchCoins, navCoin } from "./actions";

class Home extends Component {
	componentWillMount() {
		this.props.fetchCoins();
	}

	render() {
		const { coins, user, followedCoins } = this.props;
		let coinsSignedIn = this.props.coins.map(coin => {
			let newArray = Object.assign({}, coin);
			newArray.follow = "follow";
			return newArray;
		});

		const coinData = this.props.user ? coinsSignedIn : coins;
		return (
			<div className="App">
				<Header />
				{user ? (
					<div className="Following">
						<div className="Following-avatar">
							<Avatar size="large" icon="user" />
							<p className="Following-following">FOLLOWING</p>
						</div>
						{followedCoins ? (
							<div className="Following-grid">
								<Row gutter={48}>
									{followedCoins.map((coin, idx) => (
										<Col
										key={idx}
											style={{ width: "20%", marginBottom: "5em" }}
											className="gutter-row"
											span={4}
										>
											<Link
												to={{
													pathname: `coins/${coin.coinUid}`}}
													>
												{coin.coinURI ? <img alt={coin.coinUid} height="110" width="110" src={coin.coinURI} /> : <img alt={coin.coinUid} height="110" width="110" src={square	} />}
												<p style={{ marginTop: 16, fontWeight: "bold" }}>
													{coin.coinUid}
												</p>
											</Link>
										</Col>
									))}
								</Row>
							</div>
						) : (
							<p>You have no coins you are following.</p>
						)}
					</div>
				) : (
					<div className="Following">
						<div className="Following-avatar">
							<Avatar size="large" icon="user" />
							<p className="Following-following">FOLLOWING</p>
						</div>

						<p>+ Sign in to add your favorite coins to your dashboard</p>
					</div>
				)}

				<Table data={coinData} />
			</div>
		);
	}
}

const mapStateToProps = state => {
	const coins = _.map(state.coins, (val, uid) => {
		return { ...val, uid };
	});
	const followedCoins = _.map(state.followedCoins, (val, uid) => {
		return { ...val, uid };
	});
	const { email, password, error, loading, user } = state.auth;

	return { email, password, error, loading, user, coins, followedCoins };
};

export default connect(mapStateToProps, {
	fetchCoins,
	navCoin
})(Home);
