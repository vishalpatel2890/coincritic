import React, { Component } from "react";
import { connect } from "react-redux";

import ThreadPage from "./ThreadPage";
import ThreadPanel from "./ThreadPanel";
import { votePost, fetchPostsUserVotes } from "../actions";

class Thread extends Component {
	state = {
		thread: "",
		commentCount: ""
	};

	componentWillUpdate(nextProps, nextState){
		if (this.props.threadPage === true && nextProps.threadPage === false){
			this.setState({thread: null})
		}
	}

	onThreadClick = (postUid, commentCount) => {
		this.props.handleThreadPageOpen();
		this.setState({ thread: postUid, commentCount: commentCount });
	};

	render() {
		const { postsForCoin, coinUid, postsVotes } = this.props;
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

	const { postsVotes, } = state.userVotes;
	return { user, postsVotes };
};

export default connect(mapStateToProps, { votePost, fetchPostsUserVotes })(
	Thread
);
