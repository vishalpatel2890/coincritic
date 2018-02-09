import React, { Component } from "react";
import { connect } from "react-redux";
import { Collapse } from "antd";
import _ from "lodash";
import firebase from 'firebase'

import PanelComponent from "./PanelComponent";
import { fetchChildComments } from "../actions";

const Panel = Collapse.Panel;

class Comments extends Component {
  constructor(props) {
    super(props);
    this.state = {
      openPanels: [],
      [this.props.parentUid]: []
    }
  }

  componentWillMount() {
  const itemsRef = firebase.database().ref("/commentsByComment/" + this.props.parentUid);
  itemsRef.on('value', (snapshot) => {
    let items = snapshot.val();
    this.setState({
      [this.props.parentUid]: _.map(items, (val, uid) => {
  			return { ...val, uid };
  		}),
      items: _.map(items, (val, uid) => {
  			return { ...val, uid };
  		})
    });
  });
}

	render() {
		const {coinUid, commentCount, postUid} = this.props;
		return (

			<Collapse onChange={(e)=> this.setState({ openPanels: e})} className="comment" bordered={false}>
      	{this.state[this.props.parentUid].map((comment, idx) => (
					<Panel
						className="comment-row-sub"
						header={
							<PanelComponent
								parentUid={this.props.parentUid}
                coinUid={coinUid}
                postUid={postUid}
                commentCount={commentCount}
                commentVotes={comment.votes}
								commentUid={comment.uid}
                commentUser={comment.user}
								parentComment={comment.comment}
								childCount={comment.childCount}
                openPanels={this.state.openPanels}
							/>
						}
						key={comment.uid}
						onMouseLeave={() => this.setState({ avtive: "" })}
					>
						{comment.childCount ? (
							<Comments
                parentUid={comment.uid}
                commentVotes={comment.votes}
                commentUser={comment.user}
                postUid={postUid}
                commentCount={commentCount}
                coinUid={coinUid}
								fetchChildComments={this.props.fetchChildComments}
							/>
						) : null}
					</Panel>
				))}

			</Collapse>

		);
	}
}


export default connect(null, {
	fetchChildComments
})(Comments);
