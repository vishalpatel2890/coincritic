import React, { Component } from "react";
import { connect } from "react-redux";
import { Button, Rate, Icon } from "antd";
import _ from "lodash";

import Header from "./Header";
import ReviewForm from "./components/forms/ReviewForm";
import ThreadForm from "./components/forms/ThreadForm";
import Thread from "./components/Thread";
import { fetchSingleCoin, fetchPostsForCoin, followCoin, unfollowCoin } from "./actions";

class CoinPage extends Component {
	componentWillMount() {
		this.props.fetchSingleCoin(this.props.match.params.coin);
		this.props.fetchPostsForCoin(this.props.match.params.coin);
	}

	state = {
		review: false,
		thread: false
	};

	handleReviewOpen = () => {
		this.setState({ review: true });
	};

	handleReviewClose = () => {
		this.setState({ review: false });
	};

	handleThreadOpen = () => {
		this.setState({ thread: true });
	};

	handleThreadClose = () => {
		this.setState({ thread: false });
	};

	follow = () => {
		const userUid = this.props.user.uid;
		const coinUid = this.props.match.params.coin
		const coinURI = this.props.currentCoin.image
		this.props.followCoin({ userUid, coinURI, coinUid });
	};

	unfollow = () => {
		const userUid = this.props.user.uid;
		const coinUid = this.props.match.params.coin;
		this.props.unfollowCoin({userUid, coinUid});
	}

	render() {
		const { currentCoin, postsForCoin, followedCoins, user } = this.props;
		const { review, thread } = this.state;
		const currentCoinUid = this.props.match.params.coin;
		var coinCheck = followedCoins ? followedCoins.filter(function(coin){ return coin.uid === currentCoinUid   }) : null
		return (
			<div className="App">
				<Header />
				<div className="coin-box">
					<div className="coin-box-left">
						<div className="coin-box-left-image">
							<img height="154" width="154" src={currentCoin.image} />
						</div>
						<div className="coin-box-left-website">
							<p>{this.props.match.params.coin}</p>
							{this.state.review === false && this.state.thread === false ? (
								<div>
									<Button
										style={{ width: 125 }}
										onClick={this.handleReviewOpen}
									>
										Write A Review
									</Button>
									<Button
										style={{ width: 125, margin: 10 }}
										onClick={this.handleThreadOpen}
									>
										Start A Thread
									</Button>
								</div>
							) : null}
						</div>
					</div>
					<div className="coin-box-right">
						<p style={{ textTransform: "uppercase" }}>{currentCoin.name}</p>
						{user ? coinCheck.length > 0 ? <p onClick={this.unfollow}>UNFOLLOW</p> : <p onClick={this.follow}>FOLLOW</p> : (null)}
						<div className="coin-box-right-avg">

							<div className="coin-box-right-avg-label">
								<p>Average Coincritic Community Rating</p>
							</div>
							<div className="coin-box-right-avg-rating">

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
				{review === false && thread === false ? (
					<Thread coinUid={this.props.match.params.coin} postsForCoin={postsForCoin} />
				) : review === true && thread === false ? (
					<ReviewForm handleReviewClose={this.handleReviewClose} coinName={currentCoin.name} />
				) : (
					<ThreadForm handleThreadClose={this.handleThreadClose} coinUid={this.props.match.params.coin} />
				)}
			</div>
		);
	}
}

const mapStateToProps = state => {
	const { currentCoin } = state;
	const postsForCoin = _.map(state.postsForCoin, (val, uid) => {
		return { ...val, uid };
	});
	const {user} = state.auth;
	const followedCoins = _.map(state.followedCoins, (val, uid) => {
		return { ...val, uid };
	});
	return { currentCoin, postsForCoin, followedCoins, user };
};

export default connect(mapStateToProps, { fetchSingleCoin, fetchPostsForCoin, followCoin, unfollowCoin })(
	CoinPage
);
