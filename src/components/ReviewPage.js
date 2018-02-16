import React, { Component } from "react";
import { connect } from "react-redux";
import _ from "lodash";
import { Rate, Icon, Avatar } from "antd";

import { fetchCoinsReviews } from "../actions";

var moment = require("moment");

class ReviewPage extends Component {
	componentWillMount() {
		this.props.fetchCoinsReviews(this.props.coinUid);
	}
	render() {
		const { coinReviews } = this.props;

		return (
			<div className="review">
				{coinReviews.map((review, idx) => (
					<div className="review-row" key={idx}>
						<div className="review-avatar"><Avatar size="small" icon="user" /></div>
						<div className="review-left">
							<div className="review-left-username">{review.displayName}</div>
							<div className="review-left-date">
								{moment(review.reviewDate, "YYYYMMDDhhmm a").format(
									"MMM, Do YYYY"
								)}
							</div>
							<div className="review-left-review">{review.review}</div>
						</div>
						<div className="review-right">
							<div className="review-right-overall">
								<div className="review-right-overall-label">Overall</div>
								<div className="review-right-overall-rating">
									<Rate
										style={{ fontSize: 12 }}
										character={<Icon type="star" />}
										disabled
										allowHalf
										value={review.reviewAvg}
									/>
								</div>
							</div>
							<div className="review-right-breakdown">
								<div className="review-right-breakdown-label">Team</div>
								<div className="review-right-breakdown-rating"><Rate
                  style={{ fontSize: 12 }}
                  character={<Icon type="star" />}
                  disabled
                  allowHalf
                  value={review.team}
                /></div>
							</div>
							<div className="review-right-breakdown">
								<div className="review-right-breakdown-label">White Paper</div>
								<div className="review-right-breakdown-rating"><Rate
                  style={{ fontSize: 12 }}
                  character={<Icon type="star" />}
                  disabled
                  allowHalf
                  value={review.whitepaper}
                /></div>
							</div>
							<div className="review-right-breakdown">
								<div className="review-right-breakdown-label">Roadmap</div>
								<div className="review-right-breakdown-rating"><Rate
                  style={{ fontSize: 12 }}
                  character={<Icon type="star" />}
                  disabled
                  allowHalf
                  value={review.roadmap}
                /></div>
							</div>
							<div className="review-right-breakdown">
								<div className="review-right-breakdown-label">
									Competetive Landscape
								</div>
								<div className="review-right-breakdown-rating"><Rate
                  style={{ fontSize: 12 }}
                  character={<Icon type="star" />}
                  disabled
                  allowHalf
                  value={review.landscape}
                /></div>
							</div>
							<div className="review-right-breakdown">
								<div className="review-right-breakdown-label">
									Realworld Application
								</div>
								<div className="review-right-breakdown-rating"><Rate
                  style={{ fontSize: 12 }}
                  character={<Icon type="star" />}
                  disabled
                  allowHalf
                  value={review.realworld}
                /></div>
							</div>
						</div>
					</div>
				))}
			</div>
		);
	}
}

const mapStateToProps = state => {
	const { user } = state.auth;
	const coinReviews = _.map(state.coinReviews, (val, uid) => {
		return { ...val, uid };
	});

	return { user, coinReviews };
};

export default connect(mapStateToProps, { fetchCoinsReviews })(ReviewPage);
