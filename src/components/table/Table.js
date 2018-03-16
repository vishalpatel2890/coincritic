import React, { Component } from "react";
import { BootstrapTable, TableHeaderColumn } from "react-bootstrap-table";
import "../../../node_modules/react-bootstrap-table/dist/react-bootstrap-table-all.min.css";
import "../../App.css";
import "../../table.css"
import { connect } from "react-redux";
import _ from "lodash";
import { Link } from "react-router-dom";
import {Rate, Icon} from "antd"

import { followCoin, unfollowCoin } from "../../actions";
import square from "../../assets/cc-logo-square.png"

class Table extends Component {
	nameFormatter(cell,row) {
		return (
			<Link to={{ pathname: `coins/${row.uid}` }}>
				<p className="coin-name-column">{cell}</p>
			</Link>
		)
	}

	coinFormatter(cell, row) {
		return (
			<Link to={{ pathname: `coins/${row.uid}` }}>
				{cell ? <img alt={row.uid} height="31" width="31" src={cell} /> : <img height="31" width="31" src={square}/> }
			</Link>
		);
	}

	reviewFormmater(cell, row) {
		const {team, whitepaper, roadmap, landscape, realworld, reviewCount} = row;
		var totalAvg = ((team + whitepaper + roadmap + landscape + realworld)/5)/reviewCount
		var roundedTotalAvg = Math.round(totalAvg * 2) / 2;
		return(
			<Rate
				style={{ fontSize: 14 }}
				character={<Icon type="star" />}
				disabled
				allowHalf
				value={roundedTotalAvg}
			/>
		)
	}

	follow = (coinURI, coinUid) => {
		const userUid = this.props.user.uid;
		this.props.followCoin({ userUid, coinURI, coinUid });
	};

	unfollow = (coinUid) => {
		const userUid = this.props.user.uid;
		this.props.unfollowCoin({userUid, coinUid});
	}

	followFormatter(cell, row) {

		var coinCheck = this.props.followedCoins.filter(function(coin){ return coin.coinUid === row.uid   })
		if (this.props.user) {
		if (coinCheck.length === 0) {
			return <p className="follow-column link-blue" onClick={() => this.follow(row.image, row.uid)}>Follow</p>
		} else {
			return <p className="follow-column link-blue" onClick={() => this.unfollow(row.uid)}>Unfollow</p>
			;
		}
	} else null
	}

	render() {

		return (
			<BootstrapTable
				data={this.props.data}
				trClassName="tr-string-example"
				tableStyle={{ border: "none" }}
				tableBodyClass="coin-table-header"
				pagination={true}
			>
				<TableHeaderColumn
					dataField="image"
					dataFormat={this.coinFormatter}
					columnClassName="coin-img-td"
					className="coin-img-td"
					isKey
				>
					Name
				</TableHeaderColumn>
				<TableHeaderColumn dataField="uid" className="coin-name-td" columnName="coin-name-td" columnClassName="coin-name-td" dataFormat={this.nameFormatter}>{''}</TableHeaderColumn>
				<TableHeaderColumn dataField="reviewAvg" className="coin-rating-td" columnClassName="coin-rating-td" dataFormat={this.reviewFormmater}>CoinCritic Community Rating</TableHeaderColumn>
				<TableHeaderColumn dataField="reviewCount" className="coin-rating-td" columnClassName="coin-rating-td">Reviews</TableHeaderColumn>
				<TableHeaderColumn
					dataField="follow"
					dataFormat={this.followFormatter.bind(this)}
				/>
			</BootstrapTable>
		);
	}
}

const mapStateToProps = state => {
	const { user } = state.auth;
	const followedCoins = _.map(state.followedCoins, (val, uid) => {
		return { ...val, uid };
	});
	return { user, followedCoins };
};

export default connect(mapStateToProps, {
	followCoin,
	unfollowCoin
})(Table);
