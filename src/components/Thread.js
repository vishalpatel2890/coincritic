import React, { Component } from "react";
import { connect } from "react-redux";
import { Icon } from "antd";
import _ from "lodash";

import ThreadPage from "./ThreadPage";
import ThreadPanel from "./ThreadPanel";
import { votePost, fetchPostsUserVotes } from "../actions";

class Thread extends Component {
	state = {
		thread: "",
		commentCount: ""
	};

	onThreadClick = (postUid, commentCount) => {
		this.setState({ thread: postUid, commentCount: commentCount });
	};

	render() {
		const { postsForCoin, coinUid, postsVotes, commentsVotes } = this.props;
		return (
			<div>
				{this.state.thread ? (
					<ThreadPage
						coinUid={coinUid}
						postUid={this.state.thread}
						commentCount={this.state.commentCount}
						comments={postsForCoin}
					/>
				) : (
					<div className="thread">
						{postsForCoin.map((post, idx) => (
							<ThreadPanel
								key={idx}
								userVotes={postsVotes}
								coinUid={coinUid}
								onThreadClick={this.onThreadClick}
								post={post}
							/>
						))}
					</div>
				)}
			</div>
		);
	}
}

const mapStateToProps = state => {
	const { user } = state.auth;
	const { postsVotes, commentsVotes } = state.userVotes;
	return { user, postsVotes, commentsVotes };
};

export default connect(mapStateToProps, { votePost, fetchPostsUserVotes })(
	Thread
);
