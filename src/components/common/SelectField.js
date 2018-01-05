import React, { Component } from "react";
import SelectField from "material-ui/SelectField";

class DropdownSelect extends Component {
	render() {
		const { input, label, children, meta: { error, touched } } = this.props;

		return (
			<div>
				<SelectField
					fullWidth={true}
					errorText={touched && error}
					hintText={label}
					{...input}
					onChange={(event, index, value) => input.onChange(value)}
					children={children}
				/>
			</div>
		);
	}
}

export default DropdownSelect;
