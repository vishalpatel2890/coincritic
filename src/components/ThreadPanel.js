import React, { Component } from "react";
import { connect } from "react-redux";
import { Icon as IconA } from "antd";
import Flag from 'material-ui-icons/Flag';

import ThreadPage from "./ThreadPage";
import { votePost } from "../actions";

var moment = require("moment");

class ThreadPanel extends Component {
	state = {
		thread: "",
		active: false
	};

	upvoteOnPost = (postUid, votes) => {
		const { uid } = this.props.user;
		const userVote = "upvote";
		const newVoteTotal = votes + 1;
		const { coinUid } = this.props;
		this.props.votePost({ postUid, uid, newVoteTotal, userVote, coinUid });
	};

	downvoteOnPost = (postUid, votes) => {
		const { uid } = this.props.user;
		const userVote = "downvote";
		const newVoteTotal = votes - 1;
		const { coinUid } = this.props;
		this.props.votePost({ postUid, uid, newVoteTotal, userVote, coinUid });
	};

	render() {
		const { onThreadClick, post, userVotes, user } = this.props;
		console.log(post)
		const userVotesCheck = userVotes ? userVotes : []
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
										: () => this.upvoteOnPost(post.uid, post.votes)
								}
							/>
							<p>{post.votes}</p>
							<IconA
								type="down"
								onClick={
									userVotesCheck[post.uid] === "downvote"
										? null
										: () => this.downvoteOnPost(post.uid, post.votes)
								}
							/>
						</div>
					) : (
						<div>
							<p>{post.votes}</p>
						</div>
					)}
				</div>
				<div className="post">
					<div className="post-row">
						<div className="post-row-left">
							<p
								style={{
									color: "#4a90e2",
									fontSize: 18,
									fontWeight: "bold"
								}}
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
							<p>{moment(post.postDate, 'YYYYMMDDhhmm a').fromNow()}</p>
						</div>
					</div>
					<div className="post-row">
						<div className="post-row-left">
							<p>{post.commentCount} comments</p>
						</div>
					</div>
				</div>
				<div className="follow">

					 <Flag className="follow-flag"/>

				</div>
			</div>
		);
	}
}

const mapStateToProps = state => {
	const { user } = state.auth;

	return { user };
};

export default connect(mapStateToProps, { votePost })(ThreadPanel);
