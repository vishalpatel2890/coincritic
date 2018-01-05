//logic to render text area and label
import React, { Component } from "react";
import TextField from "material-ui/TextField";

class TextArea extends Component {
	render() {
		const { input, label, meta: { error, touched } } = this.props;

		return (
			<div>
				<TextField
					fullWidth={true}
					errorText={touched && error}
					hintText={label}
					multiLine
					textareaStyle={{ minHeight: 100 }}
					{...input}
				/>
			</div>
		);
	}
}

export default TextArea;
