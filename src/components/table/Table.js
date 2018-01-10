import React, { Component } from "react";
import { BootstrapTable, TableHeaderColumn } from "react-bootstrap-table";
import "../../../node_modules/react-bootstrap-table/dist/react-bootstrap-table-all.min.css";
import "../../App.css";
import { connect } from "react-redux";
import _ from "lodash";
import { Link } from "react-router-dom";

import { followCoin, unfollowCoin } from "../../actions";

class Table extends Component {
	nameFormatter(cell,row) {
		return (
			<Link to={{ pathname: `coins/${row.uid}` }}>
				{cell}
			</Link>
		)
	}

	coinFormatter(cell, row) {
		return (
			<Link to={{ pathname: `coins/${row.uid}` }}>
				<img height="31" width="31" src={cell} />
			</Link>
		);
	}

	follow = (coinUid, coinURI, coinName) => {
		const userUid = this.props.user.uid;
		this.props.followCoin({ userUid, coinUid, coinURI, coinName });
	};

	unfollow = (coinUid) => {
		const userUid = this.props.user.uid;
		this.props.unfollowCoin({userUid, coinUid});
	}

	followFormatter(cell, row) {

		var coinCheck = this.props.followedCoins.filter(function(coin){ return coin.uid === row.uid   })
		console.log(coinCheck)
		if (coinCheck.length == 0) {
			return <p onClick={() => this.follow(row.uid, row.coin, row.name)}>Follow</p>
		} else {
			return <p onClick={() => this.unfollow(row.uid)}>Unfollow</p>
			;
		}
	}

	render() {
		console.log(this.props.user);
		return (
			<BootstrapTable
				data={this.props.data}
				trClassName="tr-string-example"
				tableStyle={{ border: "none" }}
				tableBodyClass="coin-table-header"
			>
				<TableHeaderColumn
					dataField="coin"
					dataFormat={this.coinFormatter}
					columnClassName="coin-img-td"
					isKey
				>
					Name
				</TableHeaderColumn>
				<TableHeaderColumn dataField="name" dataFormat={this.nameFormatter} />
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
