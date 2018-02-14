//logic to render single field and label
import React, { Component } from "react";
import TextField from "material-ui/TextField";

class FormInput extends Component {
	render() {
		const { input, label, meta: { error, touched } } = this.props;

		return (
			<div>
				<TextField
					fullWidth={false}
					errorText={touched && error}
					label={label}
					{...input}
					style={{width: '20%	'}}
				/>
			</div>
		);
	}
}

export default FormInput;
