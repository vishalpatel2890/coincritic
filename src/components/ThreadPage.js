import React, { Component } from "react";
import { connect } from "react-redux";
import { Input, Button, Form, Collapse } from "antd";
import _ from "lodash";

import Comments from "./Comments";
import PanelComponent from "./PanelComponent";
import {
	addCommentToPost,
	fetchCommentsForPost,
	fetchPostsForCoin
} from "../actions";

const FormItem = Form.Item;
const { TextArea } = Input;
const Panel = Collapse.Panel;

class ThreadPage extends Component {
	state = {
		comment: "",
		commentCount: this.props.commentCount,
		openPanels: []
	};

	componentWillMount() {
		this.props.fetchCommentsForPost(this.props.postUid);
	}

	handlePostChange = value => {
		this.setState({ comment: value });
	};

	submitComment = e => {
		e.preventDefault();
		const { postUid, coinUid } = this.props;
		const { displayName, uid } = this.props.user;
		const { comment, commentCount } = this.state;
		this.props.addCommentToPost({
			postUid,
			comment,
			coinUid,
			commentCount,
			displayName,
			uid
		});
		this.setState({ comment: "", commentCount: commentCount + 1 });
	};

	render() {
		const { commentsForPost, postUid, coinUid, commentCount } = this.props;
		console.log(commentsForPost);
		return (
			<div className="thread">
				<div className="thread-row">
					<div className="post-comment">
						<p>Comment</p>
					</div>
					<div className="post">
						<Form onSubmit={this.submitComment} className="review-form">
							<FormItem>
								<TextArea
									onChange={e => this.handlePostChange(e.target.value)}
									placeholder={`Write your review of ${this.props.coinName}`}
									value={this.state.comment}
									rows={8}
									style={{ overflowX: "hidden", borderRadius: 4 }}
								/>
							</FormItem>
							<FormItem>
								<Button htmlType="submit">Post</Button>
							</FormItem>
						</Form>
					</div>
				</div>
				<Collapse
					onChange={e => this.setState({ openPanels: e })}
					className="comment"
					bordered={false}
				>
					{commentsForPost.map((comment, idx) => (
						<Panel
							showArrow={false}
							className="comment-row"
							header={
								<PanelComponent
									parentUid={postUid}
									coinUid={coinUid}
									commentCount={commentCount}
									parentComment={comment.comment}
									commentUser={comment.user}
									commentUid={comment.uid}
									commentVotes={comment.votes}
									childCount={comment.childCount}
									openPanels={this.state.openPanels}
								/>
							}
							key={comment.uid}
						>
							{comment.childCount ? (
								<Comments
									level={1}
									commentUser={comment.user}
									coinUid={coinUid}
									postUid={postUid}
									commentCount={commentCount}
									commentVotes={comment.votes}
									parentUid={comment.uid}
								/>
							) : null}
						</Panel>
					))}
				</Collapse>
			</div>
		);
	}
}

const mapStateToProps = state => {
	const { currentCoin } = state;
	const { user } = state.auth;
	const commentsForPost = _.map(state.commentsForPost, (val, uid) => {
		return { ...val, uid };
	});
	return { currentCoin, commentsForPost, user };
};

export default connect(mapStateToProps, {
	addCommentToPost,
	fetchCommentsForPost
})(ThreadPage);
