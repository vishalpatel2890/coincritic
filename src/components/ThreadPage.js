import React, { Component } from "react";
import { connect } from "react-redux";
import { Input, Button, Form, Collapse } from "antd";
import _ from "lodash";
import Flag from 'material-ui-icons/Flag';

import Comments from "./Comments";
import PanelComponent from "./PanelComponent";
import {
	addCommentToPost,
	fetchCommentsForPost,
	fetchPostDetails,
	followPost,
	unfollowPost
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
		this.props.fetchPostDetails(this.props.postUid, this.props.coinUid);
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

	followPost = postUid => {
		const { uid } = this.props.user;
		this.props.followPost({ uid, postUid });
	};

	unfollowPost = postUid => {
		const { uid } = this.props.user;
		this.props.unfollowPost({ uid, postUid });
	};

	render() {
		const {
			commentsForPost,
			postUid,
			coinUid,
			commentCount,
			postDetails,
			followedPosts,
			user
		} = this.props;
		var postCheck = followedPosts
			? followedPosts.filter(function(followedPost) {
					return postUid === followedPost.uid;
				})
			: null;
		return (
			<div className="thread">
				<div className="thread-row">
					<div className="thread-header">
						<div className="post-comment">
							<div className="vote-count">x</div>

							<div style={{ display: "flex", flexDirection: "column" }}>
								{postDetails ? (
									<div>
										<h1>{postDetails.postTitle}</h1>
										<p>{postDetails.postComment}</p>
										<p>{postDetails.commentCount} comments</p>
									</div>
								) : (
									<div>
										<p>loading</p>
									</div>
								)}
							</div>
							<div className="post-row-right">
								<p>Submitted by: {postDetails.displayName}</p>
								<p>osdos</p>
							</div>
							<div className="follow">

							{user ? (
							 postCheck.length > 0 ? (
								 <Flag style={{ color:' red' }} onClick={()=> this.unfollowPost(postUid)} />
							 ) : (
								 <Flag
									 onClick={() => this.followPost(postUid)}
									 className="follow-flag"
								 />
							 )
						 ) : null}

							</div>
						</div>
						<div className="post-reply">
							<Form onSubmit={this.submitComment} className="review-form">
								<FormItem>
									<TextArea
										onChange={e => this.handlePostChange(e.target.value)}
										placeholder={`Enter your comment`}
										value={this.state.comment}
										rows={8}
										style={{ overflowX: "hidden", borderRadius: 4 }}
									/>
								</FormItem>
								<FormItem>

									{user ?
									<Button htmlType="submit">Post</Button>
									:
									<Button>Login To Leave A Comment</Button>
								}
								</FormItem>
							</Form>
						</div>
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
	const { currentCoin, postDetails } = state;
	const { user } = state.auth;
	const commentsForPost = _.map(state.commentsForPost, (val, uid) => {
		return { ...val, uid };
	});
	const followedPosts = _.map(state.followedPosts, (val, uid) => {
		return { ...val, uid };
	});
	return { currentCoin, commentsForPost, user, postDetails, followedPosts };
};

export default connect(mapStateToProps, {
	addCommentToPost,
	fetchCommentsForPost,
	fetchPostDetails,
	followPost,
	unfollowPost
})(ThreadPage);
