import React, { Component } from "react";
import { connect } from "react-redux";
import {Button, Rate, Icon} from 'antd';

import Header from "./Header";
import { fetchSingleCoin } from "./actions";

class CoinPage extends Component {
	componentWillMount() {
		this.props.fetchSingleCoin(this.props.match.params.coin);
	}
	render() {
		const { currentCoin } = this.props;
		return (
			<div className="App">
				<Header />
				<div className="coin-box">
					<div className="coin-box-left">
						<div className="coin-box-left-image">
							<img height="154" width="154" src={currentCoin.coin} />
						</div>
						<div className="coin-box-left-website">
							<p>{currentCoin.name}</p>
							<Button>Write A Review</Button>
						</div>
					</div>
					<div className="coin-box-right">
						<p style={{textTransform: 'uppercase'}}>{currentCoin.name}</p>
						<div className="coin-box-right-avg">
							<div className="coin-box-right-avg-label"><p>Average Coincritic Community Rating</p></div>
							<div className="coin-box-right-avg-rating">								<Rate
																style={{ fontSize: 28 }}
																character={<Icon type="star" />}
																disabled
																allowHalf
																defaultValue={2.5}
															/></div>
						</div>
						
					</div>
				</div>
			</div>
		);
	}
}

const mapStateToProps = state => {
	const { currentCoin } = state;

	return { currentCoin };
};

export default connect(mapStateToProps, { fetchSingleCoin })(CoinPage);
