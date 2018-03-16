import React, { Component } from "react";
import { connect } from "react-redux";
import { Button, Rate, Icon } from "antd";
import _ from "lodash";

import Header from "./Header";
import ReviewForm from "./components/forms/ReviewForm";
import ThreadForm from "./components/forms/ThreadForm";
import Thread from "./components/Thread";
import ReviewPage from "./components/ReviewPage";
import { fetchSingleCoin, fetchPostsForCoin, followCoin, unfollowCoin } from "./actions";
import placeholderLogo from "./assets/cc-logo-square.png"

class CoinPage extends Component {
	componentWillMount() {
		this.props.fetchSingleCoin(this.props.match.params.coin);
		this.props.fetchPostsForCoin(this.props.match.params.coin);
	}

	componentWillUpdate(nextProps, nextState){
		console.log(this.props)
		console.log(nextProps)
		if (this.props.match.params.coin !== nextProps.match.params.coin){
			this.setState({review: false, thread: false, readReviews: false, threadPage: false})
			this.props.fetchSingleCoin(nextProps.match.params.coin);
			this.props.fetchPostsForCoin(nextProps.match.params.coin);
		}
	}

	state = {
		review: false,
		thread: false,
		readReviews: false,
		threadPage: false
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

	handleThreadPageOpen = () =>{
		this.setState({threadPage: true})
	}

	handleReadReviewsOpen = () => {
		this.setState({ readReviews: true });
	};

	handleReadReviewsClose = () => {
		this.setState({ readReviews: false });
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
		const { currentCoin, postsForCoin, followedCoins, reviewsByUser, user } = this.props;
		const { review, thread, readReviews, threadPage} = this.state;
		const currentCoinUid = this.props.match.params.coin;
		const {team, whitepaper, roadmap, landscape, realworld, reviewCount} = currentCoin;
		var teamAvg = team/reviewCount
		var whitepaperAvg = whitepaper/reviewCount
		var roadmapAvg = roadmap/reviewCount
		var landscapeAvg = landscape/reviewCount
		var realworldAvg = realworld/reviewCount
		var totalAvg = ((team + whitepaper + roadmap + landscape + realworld)/5)/reviewCount
		var roundedTotalAvg = Math.round(totalAvg * 2) / 2;
		var coinCheck = followedCoins ? followedCoins.filter(function(coin){ return coin.uid === currentCoinUid   }) : null
		var reviewCheck = reviewsByUser ? reviewsByUser.filter(function(review) { return review.coinUid === currentCoinUid}) : null
		console.log(reviewCheck)
		return (
			<div className="App">
				<Header />
				<div className="coin-box">
					<div className="coin-box-left">
						<div className="coin-box-left-image">
							{currentCoin.image ? <img alt={currentCoin.coinUid} height="154" width="154" src={currentCoin.image}/> : <img alt={currentCoin.coinUid} height="154" width="154" src={placeholderLogo}/> }
						</div>
						<div className="coin-box-left-website">
							<p>{this.props.match.params.coin}</p>
							{review === false && thread === false && readReviews === false ? (
								<div>
									{user && reviewCheck.length > 0 ?
									<Button
									style={{ width: 125 }}
									onClick={this.handleReviewOpen}>
										Edit Review
									</Button>
									:
									<Button
										style={{ width: 125 }}
										onClick={this.handleReviewOpen}
									>
										Write A Review
									</Button>
								}
									<Button
										style={{ width: 125, margin: 10 }}
										onClick={this.handleThreadOpen}
									>
										Start A Thread
									</Button>
									{review === false && thread === false && readReviews === false && threadPage === true ?
										<Button

											onClick={()=> this.setState({threadPage: false })}
										>
											Return To Coin Page
										</Button> : null
									}
								</div>
							) :

							<Button onClick={()=> this.setState({review: false, thread: false, readReviews: false})}>Return To Coin Page</Button>}
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
									value={roundedTotalAvg}
								/>
							</div>
						</div>
						<div className="coin-box-right-reviews">
							<div className="coin-box-right-reviews-left">REVIEWS</div>
							<div className="coin-box-right-reviews-right">
								<p className="link-blue" onClick={this.handleReadReviewsOpen}>Read all <strong>{reviewCount}</strong> reviews</p>
							</div>
						</div>
						<div className="coin-box-right-reviews-breakdown">
							<div className="coin-box-right-reviews-breakdown-left">
								Team
							</div>
							<div className="coin-box-right-reviews-breakdown-right">
							<Rate
								style={{ fontSize: "1.5vw" }}
								character={<Icon type="star" />}
								disabled
								allowHalf
								value={teamAvg}
							/>
							</div>
						</div>
						<div className="coin-box-right-reviews-breakdown">
							<div className="coin-box-right-reviews-breakdown-left">
								White Paper
							</div>
							<div className="coin-box-right-reviews-breakdown-right">
							<Rate
								style={{ fontSize: "1.5vw" }}
								character={<Icon type="star" />}
								disabled
								allowHalf
								value={whitepaperAvg}
							/>
							</div>
						</div>
						<div className="coin-box-right-reviews-breakdown">
							<div className="coin-box-right-reviews-breakdown-left">
								Roadmap
							</div>
							<div className="coin-box-right-reviews-breakdown-right">
							<Rate
								style={{ fontSize: "1.5vw" }}
								character={<Icon type="star" />}
								disabled
								allowHalf
								value={roadmapAvg}
							/>
							</div>
						</div>
						<div className="coin-box-right-reviews-breakdown">
							<div className="coin-box-right-reviews-breakdown-left">
								Competetive Landscape
							</div>
							<div className="coin-box-right-reviews-breakdown-right">
							<Rate
								style={{ fontSize: "1.5vw" }}
								character={<Icon type="star" />}
								disabled
								allowHalf
								value={landscapeAvg}
							/>
							</div>
						</div>
						<div className="coin-box-right-reviews-breakdown">
							<div className="coin-box-right-reviews-breakdown-left">
								Real World Application
							</div>
							<div className="coin-box-right-reviews-breakdown-right">
							<Rate
								style={{ fontSize: "1.5vw" }}
								character={<Icon type="star" />}
								disabled
								allowHalf
								value={realworldAvg}
							/>
							</div>
						</div>
					</div>
				</div>
				{review === false && thread === false && readReviews === false ? (
					<Thread handleThreadPageOpen={this.handleThreadPageOpen} coinUid={this.props.match.params.coin} threadPage={threadPage} postsForCoin={postsForCoin} />
				) : review === true && thread === false && readReviews === false ? (
					<ReviewForm reviewCheck={reviewCheck} currentCoin={currentCoin} handleReviewClose={this.handleReviewClose} coinName={currentCoin.name} coinUid={this.props.match.params.coin}/>
				) : review === false && thread === true && readReviews === false ?
				(
					<ThreadForm handleThreadClose={this.handleThreadClose} coinUid={this.props.match.params.coin} />
				):
					<ReviewPage coinUid={this.props.match.params.coin}/>
			}
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
	const reviewsByUser = _.map(state.reviewsByUser, (val, uid) => {
		return { ...val, uid };
	});
	return { currentCoin, postsForCoin, followedCoins, reviewsByUser, user };
};

export default connect(mapStateToProps, { fetchSingleCoin, fetchPostsForCoin, followCoin, unfollowCoin })(
	CoinPage
);
