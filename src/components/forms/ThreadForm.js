import React, { Component } from "react";
import {connect} from 'react-redux';

import { Input, Button, Form } from "antd";
import {addPost} from "../../actions"

const FormItem = Form.Item;
const { TextArea } = Input;

class ThreadForm extends Component {
	state = {
		postTitle: "",
		postComment: "",
		votes: 0
	};

	handleTitleChange = value => {
		this.setState({ postTitle: value });
	};

	handleCommentChange = value => {
		this.setState({ postComment: value });
	};

	submitPost = e => {
		e.preventDefault();
		if (postTitle === "" || postComment === ""){
			alert('please complete all fields before submitting')
		}
		const {displayName, uid} = this.props.user;
		const {postTitle, postComment, votes} = this.state;
		const {coinUid} = this.props;
		this.props.addPost({postTitle, postComment, votes, coinUid, displayName, uid});
		this.props.handleThreadClose();
	};

	render() {
		console.log(this.props.user)
		return (
			<div className="review-box">
				<Form onSubmit={this.submitPost} className="review-form">
					<FormItem>
						<Input
							onChange={e => this.handleTitleChange(e.target.value)}
							placeholder="Please enter a post name"
							value={this.state.postTitle}
						/>
					</FormItem>
					<FormItem>
						<TextArea
							onChange={e => this.handleCommentChange(e.target.value)}
							placeholder={`Leave a comment`}
							value={this.state.postComment}
							rows={8}
							style={{ overflowX: "hidden", borderRadius: 4 }}
						/>,
					</FormItem>
					<FormItem>
						<Button htmlType="submit">Start A Thread</Button>

					</FormItem>
					<FormItem>
					<Button onClick={this.props.handleThreadClose}>Cancel</Button>
					</FormItem>

				</Form>
			</div>
		);
	}
}

const mapStateToProps = state => {
	const { user } = state.auth;

	return { user };
};

export default connect(mapStateToProps, {addPost})(ThreadForm);
