import React, { Component } from "react";
import { connect } from "react-redux";
import Badge from "material-ui/Badge";
import IconButton from "material-ui/IconButton";
import MailOutline from "material-ui-icons/MailOutline";
import { Input, Icon, Rate, Avatar, Modal, Button, Form } from "antd";

import logo from "./logo.svg";
import "./App.css";
import { emailChanged, passwordChanged, loginUser } from "./actions";

const FormItem = Form.Item;

class Header extends Component {
	state = {
		open: false
	};

	handleOpen = () => {
		this.setState({ open: true });
	};

	handleClose = () => {
		this.setState({ open: false });
	};

	onLogin = e => {
		e.preventDefault();

		const { email, password } = this.props;
		this.props.loginUser({ email, password });
		console.log(this.props.error);
		this.setState({ open: false });
	};

	render() {
		const { user } = this.props;
		return (
			<header className="App-header">
				<img src={logo} className="App-logo" alt="logo" />
				<Input
					placeholder="search coins"
					prefix={<Icon type="user" style={{ color: "rgba(0,0,0,.25)" }} />}
					className="App-search"
				/>

					{user ? (
            <div className="App-account">
							<div className="App-user-star">
								<div className="App-user">
									<p style={{ marginBottom: 0 }}>Hank</p>
								</div>
								<Rate
									style={{ fontSize: 12 }}
									character={<Icon type="star" />}
									disabled
									allowHalf
									defaultValue={2.5}
								/>
							</div>
							<div className="App-avatar">
								<Avatar
									className="App-avatar-border"
									size="large"
									src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png"
								/>
							</div>
							<div className="App-notification">
							 <Badge
									style={{ padding: 0, margin: -2 }}
									badgeContent={10}
									color="accent"
								>
									<IconButton
										iconStyle={{ width: 30, height: 30 }}
										tooltip="Notifications"
									>
										<MailOutline />
									</IconButton>
								</Badge>
							</div>
						</div>
					) : (
            <div className="App-account">
						<div className="App-sign-in">
							<p onClick={this.handleOpen}>Sign In</p>

							<Modal
								visible={this.state.open}
								onOk={this.handleClose}
								onCancel={this.handleClose}
								footer={null}
								style={{
									textAlign: "center",
									display: "flex",
									flexDirection: "flex-column"
								}}
							>
								<Form onSubmit={this.onLogin} className="login-form">
									<FormItem>
										<Input
											placeholder="email"
											value={this.props.email}
											onChange={e => this.props.emailChanged(e.target.value)}
											style={{ width: "50%", margin: 10 }}
										/>
									</FormItem>
									<FormItem>
										<Input
											placeholder="password"
											value={this.props.password}
											onChange={e => this.props.passwordChanged(e.target.value)}
											style={{ width: "50%", margin: 10 }}
											type="password"
										/>
									</FormItem>
									<br />
									<FormItem>
										<Button htmlType="submit">Log In</Button>
									</FormItem>
								</Form>
							</Modal>

							<p style={{ width: 10, textAlign: "center" }}> / </p>
							<p onClick={() => this.onLogin()}>Register</p>
						</div>
            </div>
					)}

			</header>
		);
	}
}

const mapStateToProps = state => {
	const { email, password, error, loading, user } = state.auth;

	return { email, password, error, loading, user };
};

export default connect(mapStateToProps, {
	emailChanged,
	passwordChanged,
	loginUser
})(Header);
