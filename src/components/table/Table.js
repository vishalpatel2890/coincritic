import React, { Component } from "react";
import { BootstrapTable, TableHeaderColumn } from "react-bootstrap-table";
import "../../../node_modules/react-bootstrap-table/dist/react-bootstrap-table-all.min.css";
import "../../App.css";
import {connect} from 'react-redux';
import { Link } from 'react-router-dom'

import {followCoin} from '../../actions'

class Table extends Component {
	priceFormatter(cell, row) {
		return <Link to={{pathname:`coins/${row.uid}`,}}>
		<img
      height="31"
      width="31"
      src= {cell}
    />
		</Link>
	}

	follow = (coinUid, coinURI, coinName) => {
		console.log(coinUid)
		const userUid = this.props.user.uid;
		this.props.followCoin({userUid, coinUid, coinURI, coinName});
	};

	followFormatter(cell, row) {
		return <p onClick={()=>this(row.uid, row.coin, row.name)}>{cell}</p>;
	}

	render() {
		console.log(this.props.user)
		return (
			<BootstrapTable
				data={this.props.data}
				trClassName="tr-string-example"
				tableStyle={{ border: "none" }}
				tableBodyClass="coin-table-header"
			>
				<TableHeaderColumn
					dataField="coin"
					dataFormat={this.priceFormatter}
					columnClassName="coin-img-td"
					isKey
				>
					Name
				</TableHeaderColumn>
				<TableHeaderColumn dataField="name" />
				<TableHeaderColumn
					dataField="follow"
					dataFormat={this.followFormatter.bind(this.follow)}
				/>
			</BootstrapTable>
		);
	}
}

const mapStateToProps = state => {
	const { user } = state.auth;

	return { user };
};

export default connect(mapStateToProps, {
followCoin
})(Table);
