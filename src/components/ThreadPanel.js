import React, { Component } from "react";
import { connect } from "react-redux";
import { Icon as IconA } from "antd";
import Flag from "material-ui-icons/Flag";
import _ from "lodash";

import { votePost, followPost, unfollowPost} from "../actions";

var moment = require("moment");

class ThreadPanel extends Component {
	state = {
		thread: "",
		active: false
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

	followPost = postUid => {
		const { uid } = this.props.user;
		this.props.followPost({ uid, postUid });
	};

	unfollowPost = postUid => {
		const { uid } = this.props.user;
		this.props.unfollowPost({ uid, postUid });
	};

	render() {
		const { onThreadClick, post, userVotes, user, followedPosts } = this.props;
		var postCheck = followedPosts
			? followedPosts.filter(function(followedPost) {
					return post.uid === followedPost.uid;
				})
			: null;
		const userVotesCheck = userVotes ? userVotes : [];
		return (
			<div
				key={post.uid}
				className="thread-row"
				onMouseEnter={() => this.setState({ active: true })}
				onMouseLeave={() => this.setState({ active: false })}
			>
				<div className="vote-count">
					{this.state.active && user ? (
						<div>
							<IconA
								type="up"
								onClick={
									userVotesCheck[post.uid] === "upvote"
										? null
										: () => this.upvoteOnPost(post.uid, post.votes, userVotesCheck)
								}
							/>
							<p style={{textAlign: "center", marginTop: 1, marginBottom: 1}} className="post-vote">{post.votes}</p>
							<IconA
								type="down"
								onClick={
									userVotesCheck[post.uid] === "downvote"
										? null
										: () => this.downvoteOnPost(post.uid, post.votes, userVotesCheck)
								}
							/>
						</div>
					) : (
						<div>
							<p className="post-vote">{post.votes}</p>
						</div>
					)}
				</div>
				<div className="post">
					<div className="post-row">
						<div className="post-row-left">
							<p
								className="post-title"
								onClick={() => onThreadClick(post.uid, post.commentCount)}
							>
								{post.postTitle}
							</p>
						</div>
						<div className="post-row-right">
							<p>Submitted by: {post.displayName}</p>
						</div>
					</div>

					<div className="post-row">
						<div className="post-row-left">
							<p>{post.postComment}</p>
						</div>
						<div className="post-row-right">
							<p>{moment(post.postDate, "YYYYMMDDhhmm a").fromNow()}</p>
						</div>
					</div>
					<div className="post-row">
						<div className="post-row-left">
							<p>{post.commentCount} comments</p>
						</div>
					</div>
				</div>
				<div className="follow">
					{user ? (
						postCheck.length > 0 ? (
							<Flag style={{ color:' red' }} onClick={()=> this.unfollowPost(post.uid)} />
						) : (
							<Flag
								onClick={() => this.followPost(post.uid)}
								className="follow-flag"
							/>
						)
					) : null}
				</div>
			</div>
		);
	}
}

const mapStateToProps = state => {
	const { user } = state.auth;
	const followedPosts = _.map(state.followedPosts, (val, uid) => {
		return { ...val, uid };
	});
	return { user, followedPosts };
};

export default connect(mapStateToProps, { votePost, followPost, unfollowPost })(ThreadPanel);
