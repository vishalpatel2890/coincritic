import React, { Component } from "react";
import { connect } from "react-redux";
import { Input, Rate, Button, Form } from "antd";

import { addReview, updateReview } from "../../actions";

const FormItem = Form.Item;
const { TextArea } = Input;

class ReviewForm extends Component {
	state = {
		team: 0,
		whitepaper: 0,
		roadmap: 0,
		landscape: 0,
		realworld: 0,
		review: ""
	};

	componentWillMount(){
		const { reviewCheck } = this.props;
		if (reviewCheck.length > 0) {
			this.setState({
				team: reviewCheck[0].team,
				whitepaper: reviewCheck[0].whitepaper,
				roadmap: reviewCheck[0].roadmap,
				landscape: reviewCheck[0].landscape,
				realworld: reviewCheck[0].realworld,
				review: reviewCheck[0].review
			});
		} else{
			this.setState({
				team: 0,
				whitepaper: 0,
				roadmap: 0,
				landscape: 0,
				realworld: 0,
				review: ""
			})
		}
	}

	componentDidUpdate(prevProps, prevState){
		const { reviewCheck } = this.props;

		if (prevProps.reviewCheck.length != this.props.reviewCheck.length){
			if (reviewCheck.length > 0) {
				this.setState({
					team: reviewCheck[0].team,
					whitepaper: reviewCheck[0].whitepaper,
					roadmap: reviewCheck[0].roadmap,
					landscape: reviewCheck[0].landscape,
					realworld: reviewCheck[0].realworld,
					review: reviewCheck[0].review
				});
			} else{
				this.setState({
					team: 0,
					whitepaper: 0,
					roadmap: 0,
					landscape: 0,
					realworld: 0,
					review: ""
				})
			}
		}
	}

	handleTeamChange = value => {
		this.setState({ team: value });
	};

	handleWhitepaperChange = value => {
		this.setState({ whitepaper: value });
	};
	handleRoadmapChange = value => {
		this.setState({ roadmap: value });
	};

	handleLandscapeChange = value => {
		this.setState({ landscape: value });
	};

	handleRealworldChange = value => {
		this.setState({ realworld: value });
	};

	handleReviewChange = value => {
		this.setState({ review: value });
	};

	onSubmitReview = (e, reviewAvg) => {
		e.preventDefault();
		const { uid, displayName } = this.props.user;
		const { coinUid, currentCoin } = this.props;
		const {
			team,
			whitepaper,
			roadmap,
			landscape,
			realworld,
			review
		} = this.state;
		const newTeam = currentCoin.team + team;
		const newWhitepaper = currentCoin.whitepaper + whitepaper;
		const newRoadmap = currentCoin.roadmap + roadmap;
		const newLandscape = currentCoin.landscape + landscape;
		const newRealworld = currentCoin.realworld + realworld;
		const newReviewAvg = currentCoin.reviewAvg + reviewAvg;
		const newReviewCount = currentCoin.reviewCount + 1;
		if (review){
		this.props.addReview({
			newTeam,
			newWhitepaper,
			newRoadmap,
			newLandscape,
			newRealworld,
			newReviewAvg,
			newReviewCount,
			team,
			whitepaper,
			roadmap,
			landscape,
			realworld,
			reviewAvg,
			review,
			coinUid,
			displayName,
			uid
		})

	}
		else {
			alert(`Please write a review!`)
		}
	};

	onUpdateReview = (e, reviewAvg) => {
		e.preventDefault();
		const { uid, displayName } = this.props.user;
		const { coinUid, currentCoin } = this.props;
		const {
			team,
			whitepaper,
			roadmap,
			landscape,
			realworld,
			review
		} = this.state;
		const reviewObj = this.props.reviewCheck[0];
		const reviewKey = reviewObj.uid;
		const newTeam = currentCoin.team - reviewObj.team + team;
		const newWhitepaper =
			currentCoin.whitepaper - reviewObj.whitepaper + whitepaper;
		const newRoadmap = currentCoin.roadmap - reviewObj.roadmap + roadmap;
		const newLandscape =
			currentCoin.landscape - reviewObj.landscape + landscape;
		const newRealworld =
			currentCoin.realworld - reviewObj.realworld + realworld;
		const newReviewAvg =
			currentCoin.reviewAvg - reviewObj.reviewAvg + reviewAvg;

		this.props.updateReview({
			newTeam,
			newWhitepaper,
			newRoadmap,
			newLandscape,
			newRealworld,
			newReviewAvg,
			team,
			whitepaper,
			roadmap,
			landscape,
			realworld,
			reviewAvg,
			review,
			coinUid,
			uid,
			reviewKey
		});
		alert('Review Updated')
	};

	render() {
		const x =
			(this.state.team +
				this.state.whitepaper +
				this.state.roadmap +
				this.state.landscape +
				this.state.realworld) /
			5;
		const reviewAvg = Math.round(x * 2) / 2;
		const {
			team,
			whitepaper,
			roadmap,
			landscape,
			realworld,
			review
		} = this.state;
		const { reviewCheck, user } = this.props;
		console.log(reviewCheck)
		return (
			<div className="review-box">
				<Form
					onSubmit={
						reviewCheck.length > 0
							? e => this.onUpdateReview(e, reviewAvg)
							: e => this.onSubmitReview(e, reviewAvg)
					}
					className="review-form"
				>
					<FormItem>
						<TextArea
							onChange={e => this.handleReviewChange(e.target.value)}
							placeholder={`Write your review`}
							rows={8}
							style={{ overflowX: "hidden", borderRadius: 4 }}
							value={review}
						/>,
					</FormItem>
					<div className="review-rating">
						<div className="review-rating-label">Team</div>
						<FormItem className="review-rating-stars">
							<Rate
								onChange={this.handleTeamChange}
								style={{ fontSize: 40 }}
								allowHalf
								value={team}
							/>
						</FormItem>
					</div>
					<div className="review-rating">
						<div className="review-rating-label">White Paper</div>
						<FormItem className="review-rating-stars">
							<Rate
								onChange={this.handleWhitepaperChange}
								style={{ fontSize: 40 }}
								allowHalf
								value={whitepaper}
							/>
						</FormItem>
					</div>
					<div className="review-rating">
						<div className="review-rating-label">Roadmap</div>
						<FormItem className="review-rating-stars">
							<Rate
								onChange={this.handleRoadmapChange}
								style={{ fontSize: 40 }}
								allowHalf
								value={roadmap}
							/>
						</FormItem>
					</div>
					<div className="review-rating">
						<div className="review-rating-label">Competetive Landscape</div>
						<FormItem className="review-rating-stars">
							<Rate
								onChange={this.handleLandscapeChange}
								style={{ fontSize: 40 }}
								allowHalf
								value={landscape}
							/>
						</FormItem>
					</div>
					<div className="review-rating">
						<div className="review-rating-label">Real World Application</div>
						<FormItem className="review-rating-stars">
							<Rate
								onChange={this.handleRealworldChange}
								style={{ fontSize: 40 }}
								allowHalf
								value={realworld}
							/>
						</FormItem>
					</div>
					<br />

					<div className="review-rating">
						<div className="review-rating-label">Average Rating</div>
						<FormItem className="review-rating-stars">
							<Rate style={{ fontSize: 40 }} allowHalf value={reviewAvg} />
						</FormItem>
						<FormItem>
							{user && reviewCheck.length > 0 ? (
								<Button htmlType="submit">Update Review</Button>
							) : (
								<Button htmlType="submit">Submit Review</Button>
							)}
						</FormItem>
						<FormItem>
							<Button onClick={this.props.handleReviewClose}>Cancel</Button>
						</FormItem>
					</div>
				</Form>
			</div>
		);
	}
}

const mapStateToProps = state => {
	const { user } = state.auth;

	return { user };
};

export default connect(mapStateToProps, { addReview, updateReview })(
	ReviewForm
);
