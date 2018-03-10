import React, { Component } from "react";
import { connect } from "react-redux";
import { Input, Button, Form, Icon } from "antd";

import { addCommentToComment, voteComment } from "../actions";

const { TextArea } = Input;
const FormItem = Form.Item;

class PanelComponent extends Component {
	state = {
		active: false,
		reply: false,
		childComment: ""
	};

	upvoteOnComment = (e, parentUid, commentUid, votes, commentsVotesCheck) => {
		e.stopPropagation();
		const { uid } = this.props.user;
		const userVote = commentsVotesCheck[commentUid]=== "downvote" ? null : "upvote";
		const newVoteTotal = votes + 1;
		this.props.voteComment({
			parentUid,
			commentUid,
			uid,
			newVoteTotal,
			userVote
		});
	};

	downvoteOnComment = (e, parentUid, commentUid, votes, commentsVotesCheck) => {
		e.stopPropagation();
		const { uid } = this.props.user;
		const userVote = commentsVotesCheck[commentUid]=== "upvote" ? null : "downvote";
		const newVoteTotal = votes - 1;

		this.props.voteComment({
			parentUid,
			commentUid,
			uid,
			newVoteTotal,
			userVote
		});
	};

	onReplyClick = e => {
		e.stopPropagation();
		this.setState({ reply: !this.state.reply });
	};

	handleCommentChange = value => {
		this.setState({ childComment: value });
	};

	submitComment = e => {
		e.stopPropagation();
		e.preventDefault();
		const { childComment } = this.state;
		if (childComment === "") {
			alert('Comment cannot be empty')
		}
		else {
		const {
			commentUid,
			childCount,
			parentUid,
			parentComment,
			coinUid,
			commentCount,
			postUid
		} = this.props;
		const {displayName, uid} = this.props.user;
		const newChildCount = childCount ? childCount + 1 : 1;
		this.props.addCommentToComment({
			commentUid,
			childComment,
			newChildCount,
			parentUid,
			parentComment,
			coinUid,
			commentCount,
			postUid,
			displayName,
			uid
		});
		this.setState({childComment: ""})
	 }
	};
	render() {
		const renderReplyCount = this.props.openPanels
			? this.props.openPanels.includes(this.props.commentUid) ? false : true
			: true;
		const {
			commentVotes,
			parentUid,
			commentUid,
			commentsVotes,
			commentUser,
			user
		} = this.props;
		const commentsVotesCheck = commentsVotes ? commentsVotes : [];
		console.log(commentUser);
		return (
			<div
				onMouseEnter={() => this.setState({ active: true })}
				onMouseLeave={() => this.setState({ active: false })}
			>
				<div className="header-row">
					<div className="header-buttons">
						{this.state.active && user ? (
							<div>
								<Button
									onClick={
										commentsVotesCheck[commentUid] === "upvote"
											? e => e.stopPropagation()
											: e =>
													this.upvoteOnComment(
														e,
														parentUid,
														commentUid,
														commentVotes,
														commentsVotesCheck
													)
									}
								>
									<Icon type="up" />
								</Button>
								<Button
								onClick={
									commentsVotesCheck[commentUid] === "downvote"
										? e => e.stopPropagation()
										: e =>
												this.downvoteOnComment(
													e,
													parentUid,
													commentUid,
													commentVotes,
													commentsVotesCheck
												)
								}>
									<Icon
										type="down"

									/>
								</Button>
							</div>
						) : null}
					</div>
					<div className="header-content">
						<p>{commentUser} {commentVotes} points</p>
						<p>{this.props.parentComment}</p>
						{this.props.childCount && renderReplyCount ? (
							<p>+{this.props.childCount} replies </p>
						) : null}
						{this.state.reply ? (
							<Form onSubmit={this.submitComment} className="review-form">
								<FormItem>
									<TextArea
										onClick={e => e.stopPropagation()}
										onChange={e => this.handleCommentChange(e.target.value)}
										placeholder={`Enter your comment`}
										value={this.state.childComment}
										rows={4}
										style={{ overflowX: "hidden", borderRadius: 4 }}
									/>
								</FormItem>
								<FormItem>
									<Button htmlType="submit">Post</Button>
								</FormItem>
							</Form>
						) : null}
					</div>
					<div className="header-reply">
						{this.state.active && user ? (
							<Button onClick={e => this.onReplyClick(e)}>reply</Button>
						) : null}
					</div>
				</div>
			</div>
		);
	}
}

const mapStateToProps = state => {
	const { user } = state.auth;
	const { commentsVotes } = state.userVotes;
	return { user, commentsVotes };
};

export default connect(mapStateToProps, { addCommentToComment, voteComment })(
	PanelComponent
);
