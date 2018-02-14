import React, { Component } from "react";
import { connect } from "react-redux";
import { Input, Rate, Button, Form } from "antd";

import { addReview } from "../../actions";

const FormItem = Form.Item;
const { TextArea } = Input;

class ReviewForm extends Component {
	state = {
		team: "",
		whitepaper: "",
		roadmap: "",
		landscape: "",
		realworld: "",
		review: ""
	};

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

	onSubmitReview = reviewAvg => {

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
		const newTeam = currentCoin.team + team
		const newWhitepaper = currentCoin.whitepaper + whitepaper;
		const newRoadmap = currentCoin.roadmap + roadmap;
		const newLandscape = landscape;
		const newRealworld = currentCoin.realworld + realworld;
		const newReviewAvg = currentCoin.reviewAvg + reviewAvg;
		const newReviewCount = currentCoin.reviewCount + 1;
		console.log(newLandscape)
		this.props.addReview({
			newTeam,
			newWhitepaper,
			newRoadmap,
			newLandscape,
			newRealworld,
			newReviewAvg,
			newReviewCount,
      review,
			coinUid,
			displayName,
			uid
		});
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
		console.log(this.props.currentCoin);
		return (
			<div className="review-box">
				<Form
					onSubmit={() => this.onSubmitReview(reviewAvg)}
					className="review-form"
				>
					<FormItem>
						<TextArea
							onChange={e => this.handleReviewChange(e.target.value)}
							placeholder={`Write your review of ${this.props.coinName}`}
							rows={8}
							style={{ overflowX: "hidden", borderRadius: 4 }}
						/>,
					</FormItem>
					<div className="review-rating">
						<div className="review-rating-label">Team</div>
						<FormItem className="review-rating-stars">
							<Rate
								onChange={this.handleTeamChange}
								style={{ fontSize: 40 }}
								allowHalf
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
							<Button htmlType="submit">Submit Review</Button>
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

export default connect(mapStateToProps, { addReview })(ReviewForm);
