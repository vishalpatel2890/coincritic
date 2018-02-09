import React, { Component } from "react";
import { connect } from "react-redux";
import Badge from "material-ui/Badge";
import IconButton from "material-ui/IconButton";
import MailOutline from "material-ui-icons/MailOutline";
import { Input, Icon, Rate, Avatar, Modal, Button, Form } from "antd";
import firebase from "firebase";

import logo from "./logo.svg";
import "./App.css";
import {
	emailChanged,
	passwordChanged,
	loginUser,
	signUpUser
} from "./actions";

const FormItem = Form.Item;

class Header extends Component {
	state = {
		signInOpen: false,
		registerOpen: false,
		registerEmail: "",
		registerEmailCheck: "",
		registerEmailValidate: "",
		registerPassword: "",
		registerPasswordValidate: "",
		registerVerifyPassword: "",
		registerVerifyPasswordValidate: "",
		registerUsername: "",
		registerUsernameValidate: "",
		registerUsernameValidateUnique: "",
		registerUsernameValidateLength: ""
	};

	componentDidUpdate(prevProps, prevState) {
		const {
			registerPassword,
			registerVerifyPassword,
			registerUsername,
			registerEmail,
			registerEmailCheck
		} = this.state;
		if (prevState.registerPassword != registerPassword) {
			var regex = /^(?=.*[0-9]+.*)(?=.*[a-zA-Z]+.*)[0-9a-zA-Z]{8,}$/;

			if (regex.test(registerPassword)) {
				this.setState({ registerPasswordValidate: "success" });
			} else {
				this.setState({ registerPasswordValidate: "error" });
			}
			if (registerVerifyPassword) {
				if (registerVerifyPassword == registerPassword) {
					this.setState({ registerVerifyPasswordValidate: "success" });
				} else {
					this.setState({ registerVerifyPasswordValidate: "error" });
				}
			}
		}

		if (prevState.registerVerifyPassword != registerVerifyPassword) {
			if (registerVerifyPassword == registerPassword) {
				this.setState({ registerVerifyPasswordValidate: "success" });
			} else {
				this.setState({ registerVerifyPasswordValidate: "error" });
			}
		}

		if (prevState.registerUsername != registerUsername) {
			if (registerUsername.length >= 6) {
				const userRef = firebase
					.database()
					.ref("/userIds/" + registerUsername)
					.once("value", snapshot => {
						if (snapshot.val()) {
							this.setState({
								registerUsernameValidateUnique: "error",
								registerUsernameValidate: "error"
							});
						} else {
							this.setState({ registerUsernameValidate: "success" });
						}
					});
			} else {
				this.setState({
					registerUsernameValidate: "error",
					registerUsernameValidateLength: "error"
				});
			}
		}

		if (prevState.registerEmail != registerEmail) {
			var regex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
			if (regex.test(registerEmail)) {
				firebase.auth().fetchProvidersForEmail(registerEmail)
					.then(providers => this.setState({registerEmailCheck: providers}))
			} else {
				this.setState({ registerEmailValidate: "error" });
			}
		}
		if (prevState.registerEmailCheck != registerEmailCheck) {
			if (registerEmailCheck.length > 0) { this.setState({registerEmailValidate: "error"})}
			else {this.setState({registerEmailValidate: "success"})}
		}
	}

	handleSignInOpen = () => {
		this.setState({ signInOpen: true });
	};

	handleSignInClose = () => {
		this.setState({ signInOpen: false });
	};

	handleRegisterOpen = () => {
		this.setState({ registerOpen: true });
	};

	handleRegisterClose = () => {
		this.setState({ registerOpen: false });
	};

	handlePasswordChange = e => {
		this.setState({ registerPassword: e.target.value });
	};

	handleVerifyPasswordChange = e => {
		this.setState({ registerVerifyPassword: e.target.value });
	};

	onLogin = e => {
		e.preventDefault();

		const { email, password } = this.props;
		this.props.loginUser({ email, password });
		console.log(this.props.error);
		this.setState({ signInOpen: false });
	};

	onRegister = e => {
		e.preventDefault();

		const { registerEmail, registerPassword, registerUsername } = this.state;
		this.props.signUpUser({
			registerEmail,
			registerPassword,
			registerUsername
		});
		console.log(this.props.error);
		this.setState({ registerOpen: false });
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

							</div>
							<p style={{ marginBottom: 0 }}>{user.displayName}</p>
						</div>
						<div className="App-avatar">
							<Avatar size="large" icon="user" />

						</div>
						<div className="App-notification">

						</div>
					</div>
				) : (
					<div className="App-account">
						<div className="App-sign-in">
							<p onClick={this.handleSignInOpen}>Sign In</p>

							<Modal
								visible={this.state.signInOpen}
								onOk={this.handleSignInClose}
								onCancel={this.handleSignInClose}
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
							<p onClick={this.handleRegisterOpen}>Register</p>
							<Modal
								visible={this.state.registerOpen}
								onOk={this.handleRegisterClose}
								onCancel={this.handleRegisterClose}
								footer={null}
								style={{
									textAlign: "center",
									display: "flex",
									flexDirection: "flex-column"
								}}
							>
								<Form onSubmit={this.onRegister} className="login-form">
									<FormItem
										validateStatus={this.state.registerEmailValidate}
										hasFeedback
										help="Should be combination of numbers & alphabets"
									>
										<Input
											placeholder="email"
											value={this.state.registerEmail}
											onChange={e =>
												this.setState({ registerEmail: e.target.value })}
											style={{ width: "50%", margin: 10 }}
										/>
									</FormItem>
									<FormItem
										validateStatus={this.state.registerUsernameValidate}
										hasFeedback
										help="Should be combination of numbers & alphabets"
									>
										<Input
											placeholder="username"
											value={this.state.registerUsername}
											onChange={e =>
												this.setState({ registerUsername: e.target.value })}
											style={{ width: "50%", margin: 10 }}
										/>
									</FormItem>
									<FormItem
										validateStatus={this.state.registerPasswordValidate}
										hasFeedback
										help="Should be combination of numbers & alphabets"
									>
										<Input
											placeholder="password"
											value={this.state.registerPassword}
											onChange={e => this.handlePasswordChange(e)}
											style={{ width: "50%", margin: 10 }}
											type="password"
										/>
									</FormItem>
									<FormItem
										hasFeedback
										validateStatus={this.state.registerVerifyPasswordValidate}
										help="Should be combination of numbers & alphabets"
									>
										<Input
											placeholder="verify-password"
											value={this.state.registerVerifyPassword}
											onChange={e => this.handleVerifyPasswordChange(e)}
											style={{ width: "50%", margin: 10 }}
											type="password"
										/>
									</FormItem>
									<br />
									<FormItem>
										<Button htmlType="submit">Register</Button>
									</FormItem>
								</Form>
							</Modal>
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
	loginUser,
	signUpUser
})(Header);
