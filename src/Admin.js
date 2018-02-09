import React, { Component } from "react";
import { reduxForm, Field } from "redux-form";
import { connect } from "react-redux";
import Button from 'material-ui/Button';

import { addCoin } from "./actions";
import FormInput from "./components/common/FormInput";
import "./App.css";

class Admin extends Component {
	onSubmit(values) {
		const { name, coin } = values;
    this.props.addCoin({ name, coin });

	}

	render() {
		const { handleSubmit } = this.props;
		return (
			<div className="App">
				<form onSubmit={handleSubmit(this.onSubmit.bind(this))}>
					<Field
						component={FormInput}
						type="text"
						label="Coin Name"
						name="name"
					/>
					<Field
						component={FormInput}
						type="text"
						label="Coin URI"
						name="coin"
					/>
					<Button type="submit">Add Coin</Button>
				</form>
			</div>
		);
	}
}

export default reduxForm({ form: "addCoin" })(connect(null, {addCoin})(Admin));
