import React, { Component } from "react";
import { connect } from "react-redux";
import { Input, Button, Form, Collapse } from "antd";
import { Icon as IconA } from "antd";
import _ from "lodash";
import Flag from 'material-ui-icons/Flag';

import Comments from "./Comments";
import PanelComponent from "./PanelComponent";
import {
	addCommentToPost,
	fetchCommentsForPost,
	fetchPostDetails,
	followPost,
	unfollowPost,
	votePost,
	fetchUsersFollowingPost,
	incrementCommentCount
} from "../actions";

var moment = require("moment");

const FormItem = Form.Item;
const { TextArea } = Input;
const Panel = Collapse.Panel;

class ThreadPage extends Component {
	state = {
		comment: "",
		commentCount: this.props.commentCount,
		openPanels: [],
		active: false
	};

	componentWillMount() {
		this.props.fetchCommentsForPost(this.props.postUid);
		this.props.fetchPostDetails(this.props.postUid, this.props.coinUid);
		this.props.fetchUsersFollowingPost(this.props.postUid);
	}

	handlePostChange = value => {
		this.setState({ comment: value });
	};

	submitComment = e => {
		e.preventDefault();
		const { postUid, coinUid, usersFollowingPost } = this.props;
		const { displayName, uid } = this.props.user;
		const { comment, commentCount } = this.state;
		if (comment){
		this.props.addCommentToPost({
			postUid,
			comment,
			coinUid,
			commentCount,
			displayName,
			uid
		});
		this.setState({ comment: "", commentCount: commentCount + 1 })

	} else {
		alert('Please enter a comment!')
	}
	};

	followPost = postUid => {
		const { uid } = this.props.user;
		this.props.followPost({ uid, postUid });
	};

	unfollowPost = postUid => {
		const { uid } = this.props.user;
		this.props.unfollowPost({ uid, postUid });
	};

	upvoteOnPost = (postUid, votes, userVotesCheck) => {
		const { uid } = this.props.user;
		const userVote = userVotesCheck[postUid]=== "downvote" ? null : "upvote";
		const newVoteTotal = votes + 1;
		const { coinUid } = this.props;
		this.props.votePost({ postUid, uid, newVoteTotal, userVote, coinUid });
	};

	downvoteOnPost = (postUid, votes, userVotesCheck) => {
		const { uid } = this.props.user;
		const userVote = userVotesCheck[postUid]=== "upvote" ? null : "downvote";
		const newVoteTotal = votes - 1;
		const { coinUid } = this.props;
		this.props.votePost({ postUid, uid, newVoteTotal, userVote, coinUid });
	};

	render() {
		const {
			commentsForPost,
			postUid,
			coinUid,
			commentCount,
			postDetails,
			followedPosts,
			user,
			postsVotes
		} = this.props;
		var postCheck = followedPosts
			? followedPosts.filter(function(followedPost) {
					return postUid === followedPost.uid;
				})
			: null;
		const userVotesCheck = postsVotes ? postsVotes : [];
		return (
			<div className="thread">
				<div className="thread-row">
					<div className="thread-header">
						<div className="post-comment">

							<div onMouseEnter={() => this.setState({ active: true })}
							onMouseLeave={() => this.setState({ active: false })} className="vote-count">{this.state.active && user ? (<div>
								<IconA
									type="up"
									onClick={
										userVotesCheck[postUid] === "upvote"
											? null
											: () => this.upvoteOnPost(postUid, postDetails.votes, userVotesCheck)
									}
								/>
								<p style={{textAlign: "center", marginTop: 1, marginBottom: 1}} className="post-vote">{postDetails.votes}</p>
								<IconA
									type="down"
									onClick={
										userVotesCheck[postUid] === "downvote"
											? null
											: () => this.downvoteOnPost(postUid, postDetails.votes, userVotesCheck)
									}
								/>
							</div>
						) : (<div className="post-vote">{postDetails.votes}</div>)}</div>

							<div style={{ display: "flex", flexDirection: "column" }}>
								{postDetails ? (
									<div>
										<p className="post-title">{postDetails.postTitle}</p>
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
								<div style={{display:"flex", justifyContent: "flex-end"}}><span style={{color: "#ababb6"}}>Submitted by: <span className="bold"> {postDetails.displayName}</span></span></div>
								<p style={{color: "#ababb6"}}>{moment(postDetails.postDate, "YYYYMMDDhhmm a").fromNow()}</p>
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
	const usersFollowingPost = _.map(state.usersFollowingPost, (val, uid) => {
		return { ...val, uid };
	});
	const { postsVotes } = state.userVotes;
	return { currentCoin, commentsForPost, user, postDetails, followedPosts, postsVotes, usersFollowingPost };
};

export default connect(mapStateToProps, {
	addCommentToPost,
	fetchCommentsForPost,
	fetchPostDetails,
	followPost,
	unfollowPost,
	votePost,
	fetchUsersFollowingPost,
	incrementCommentCount
})(ThreadPage);
