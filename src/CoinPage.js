import React, { Component } from "react";
import { connect } from "react-redux";
import { Button, Rate, Icon, Input, Form } from "antd";

import Header from "./Header";
import ReviewModal from "./components/modals/review-modal";
import { fetchSingleCoin } from "./actions";

const FormItem = Form.Item;

class CoinPage extends Component {
	componentWillMount() {
		this.props.fetchSingleCoin(this.props.match.params.coin);
	}

	state = {
		review: false
	};

	handleReviewOpen = () => {
		this.setState({ review: true });
	};

	handleReviewClose = () => {
		this.setState({ review: false });
	};

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
							{this.state.review === false ? (
							<Button onClick={this.handleReviewOpen}>Write A Review</Button>
						) : (
							null
						)
					}
						</div>
					</div>
					<div className="coin-box-right">
						<p style={{ textTransform: "uppercase" }}>{currentCoin.name}</p>
						<div className="coin-box-right-avg">
							<div className="coin-box-right-avg-label">
								<p>Average Coincritic Community Rating</p>
							</div>
							<div className="coin-box-right-avg-rating">
								{" "}
								<Rate
									style={{ fontSize: 28 }}
									character={<Icon type="star" />}
									disabled
									allowHalf
									defaultValue={2.5}
								/>
							</div>
						</div>
						<div className="coin-box-right-reviews">
							<div className="coin-box-right-reviews-left">REVIEWS</div>
							<div className="coin-box-right-reviews-right">
								Read all 24 reviews
							</div>
						</div>
						<div className="coin-box-right-reviews-breakdown">
							<div className="coin-box-right-reviews-breakdown-left">
								REVIEWS
							</div>
							<div className="coin-box-right-reviews-breakdown-right">
								Read all 24 reviews
							</div>
						</div>
						<div className="coin-box-right-reviews-breakdown">
							<div className="coin-box-right-reviews-breakdown-left">
								REVIEWS
							</div>
							<div className="coin-box-right-reviews-breakdown-right">
								Read all 24 reviews
							</div>
						</div>
						<div className="coin-box-right-reviews-breakdown">
							<div className="coin-box-right-reviews-breakdown-left">
								REVIEWS
							</div>
							<div className="coin-box-right-reviews-breakdown-right">
								Read all 24 reviews
							</div>
						</div>
						<div className="coin-box-right-reviews-breakdown">
							<div className="coin-box-right-reviews-breakdown-left">
								REVIEWS
							</div>
							<div className="coin-box-right-reviews-breakdown-right">
								Read all 24 reviews
							</div>
						</div>
						<div className="coin-box-right-reviews-breakdown">
							<div className="coin-box-right-reviews-breakdown-left">
								REVIEWS
							</div>
							<div className="coin-box-right-reviews-breakdown-right">
								Read all 24 reviews
							</div>
						</div>
					</div>
				</div>
				{this.state.review === false ? (
				null
			) : (
				<ReviewModal coinName={currentCoin.name}/>
			)
		}
			</div>
		);
	}
}

const mapStateToProps = state => {
	const { currentCoin } = state;

	return { currentCoin };
};

export default connect(mapStateToProps, { fetchSingleCoin })(CoinPage);
