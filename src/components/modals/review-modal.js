import React, { Component } from "react";

import { Input, Rate, Modal, Button, Form } from "antd";

const FormItem = Form.Item;
const { TextArea } = Input;


class ReviewModal extends Component {
  state = {
    team: '',
    whitepaper: '',
    roadmap: '',
    landscape:'',
    realword:''
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

	render() {
		const x =(this.state.team + this.state.whitepaper + this.state.roadmap + this.state.landscape + this.state.realworld)/5;
    const reviewAvg = Math.round(x*2)/2
    console.log(reviewAvg);
		return (
			<div className="review-box">
				<Form onSubmit={this.onLogin} className="review-form">
          <FormItem>
            <TextArea placeholder={`Write your review of ${this.props.coinName}`} rows={8} style={{overflowX:"hidden", borderRadius:4}} />,
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
							<Rate
								onChange={this.handleRealworldChange}
								style={{ fontSize: 40 }}
								allowHalf
                value={reviewAvg}
							/>
						</FormItem>
						<FormItem>
							<Button htmlType="submit">Submit Review</Button>
						</FormItem>
					</div>
				</Form>
			</div>
		);
	}
}

export default ReviewModal;
