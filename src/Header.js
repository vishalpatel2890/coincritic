import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { Input, Icon, Avatar, Modal, Button, Form } from "antd";
import firebase from "firebase";
import _ from "lodash"

import logo from "./logo.svg";
import placeholderLogo from "./assets/cc-logo-square.png"
import landscape from "./assets/cc-logo-landscape.png"
import "./App.css";
import {
	emailChanged,
	passwordChanged,
	loginUser,
	loginFailReset,
	signUpUser,
	reLoginUser,
	signOutUser,
	fetchCoins
} from "./actions";
import Autosuggest from "react-autosuggest";

const FormItem = Form.Item;

class Header extends Component {
	state = {
		signInOpen: false,
		registerOpen: false,
		registerEmail: "",
		registerEmailCheck: "",
		registerEmailValidate: "",
		registerEmailValidateRegex: "",
		registerEmailValidateUnique: "",
		registerPassword: "",
		registerPasswordValidate: "",
		registerVerifyPassword: "",
		registerVerifyPasswordValidate: "",
		registerUsername: "",
		registerUsernameValidate: "",
		registerUsernameValidateUnique: "",
		registerUsernameValidateLength: "",
		value: "",
		suggestions: []
	};

	componentWillMount() {
		this.props.fetchCoins();
		if (this.props.user) {
			this.props.reLoginUser(this.props.user);
		}
	}



	componentDidUpdate(prevProps, prevState) {
		const {
			registerPassword,
			registerVerifyPassword,
			registerUsername,
			registerEmail,
			registerEmailCheck
		} = this.state;
		if (prevState.registerPassword !== registerPassword) {
			var regex = /^(?=.*[0-9]+.*)(?=.*[a-zA-Z]+.*)[0-9a-zA-Z]{8,}$/;

			if (regex.test(registerPassword)) {
				this.setState({ registerPasswordValidate: "success" });
			} else {
				this.setState({ registerPasswordValidate: "error" });
			}
			if (registerVerifyPassword) {
				if (registerVerifyPassword === registerPassword) {
					this.setState({ registerVerifyPasswordValidate: "success" });
				} else {
					this.setState({ registerVerifyPasswordValidate: "error" });
				}
			}
		}

		if (prevState.registerVerifyPassword !== registerVerifyPassword) {
			if (registerVerifyPassword === registerPassword) {
				this.setState({ registerVerifyPasswordValidate: "success" });
			} else {
				this.setState({ registerVerifyPasswordValidate: "error" });
			}
		}

		if (prevState.registerUsername !== registerUsername) {
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
							this.setState({ registerUsernameValidate: "success", registerUsernameValidateUnique: "success", registerUsernameValidateLength: "success"});
						}
					});
			} else {
				this.setState({
					registerUsernameValidate: "error",
					registerUsernameValidateLength: "error"
				});
			}
		}

		if (prevState.registerEmail !== registerEmail) {
			var regex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
			if (regex.test(registerEmail)) {
				firebase
					.auth()
					.fetchProvidersForEmail(registerEmail)
					.then(providers => this.setState({ registerEmailCheck: providers }));
			} else {
				this.setState({ registerEmailValidate: "error", registerEmailValidateRegex: "error" });
			}
		}
		if (prevState.registerEmailCheck !== registerEmailCheck) {
			if (registerEmailCheck.length > 0) {
				this.setState({ registerEmailValidate: "error", registerEmailValidateUnique: "error" });
			} else {
				this.setState({ registerEmailValidate: "success", registerEmailValidateUnique: "success", registerEmailValidateRegex:"success" });
			}
		}

		if (prevProps.error !== this.props.error) {
			if (this.props.error !== null) {
			if (this.props.error === "auth/user-not-found"){
		        alert('Sorry, user not found')

		      }
		      else if (this.props.error === "auth/wrong-password") {
		        alert('Sorry, wrong password')
		        this.props.loginFailReset();
		      }
		      else if (this.props.error === "auth/invalid-email"){
		        alert('Sorry this is not a valid email address')
		        this.props.loginFailReset();
		      }
		      else {
		        alert('sorry something went wrong!')
		        this.props.loginFailReset();
		      }
		    }
				else{
					null
			}
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

	}

	onRegister = e => {
		e.preventDefault();

		const { registerEmail, registerPassword, registerUsername} = this.state;
		this.props.signUpUser({
			registerEmail,
			registerPassword,
			registerUsername
		});
		this.setState({ registerOpen: false });
	};

	escapeRegexCharacters(str) {
		return str.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
	}

	getSuggestions(value) {
		const escapedValue = this.escapeRegexCharacters(value.trim());

		if (escapedValue === "") {
			return [];
		}

		const regex = new RegExp("^" + escapedValue, "i");

		return this.props.coins.filter(coin => regex.test(coin.ticker));
	}

	getSuggestionValue(suggestion) {
		return suggestion.uid	;
	}

	renderSuggestion(suggestion) {
		const suggestionimage = suggestion.image;
		const logo = suggestion.image ? (suggestion.image) : (placeholderLogo)
		return <Link to={`/coins/${suggestion.uid}`} replace={true}><span><img src={logo} height="31" width="31" style={{marginRight: "1em" }}/>
						{suggestion.uid} ({suggestion.ticker})
					</span></Link>;
	}

	onChange = (event, { newValue, method }) => {
		this.setState({
			value: newValue
		});
	};

	onSuggestionsFetchRequested = ({ value }) => {
		this.setState({
			suggestions: this.getSuggestions(value)
		});
	};

	onSuggestionsClearRequested = () => {
		this.setState({
			suggestions: []
		});
	};

	render() {
		const { user } = this.props;
		const { value, suggestions, registerEmailValidate, registerEmailValidateRegex, registerEmailValidateUnique, registerVerifyPasswordValidate, registerPasswordValidate, registerUsernameValidateUnique, registerUsernameValidateLength} = this.state
		const inputProps = {
      placeholder: "search by coin ticker",
      value,
      onChange: this.onChange
    };
		console.log(this.state.signInOpen)


		return (
			<header className="App-header">
				<Link to='/' style={{width: "15%", marginRight: "2vw"}}><img src={landscape} alt="logo" style={{width: "100%"}}/></Link>
				<Autosuggest
        suggestions={suggestions}
        onSuggestionsFetchRequested={this.onSuggestionsFetchRequested}
        onSuggestionsClearRequested={this.onSuggestionsClearRequested}
        getSuggestionValue={this.getSuggestionValue}
        renderSuggestion={this.renderSuggestion}
        inputProps={inputProps} />


				{user ? (
					<div className="App-account">
						<div className="App-user-star">
							<div className="App-user" />
							<p style={{ marginBottom: 0 }}>{user.displayName}</p>
							<p onClick={() => this.props.signOutUser()}>Sign Out</p>
						</div>
						<div className="App-avatar">
							<Avatar size="large" icon="user" />
						</div>
						<div className="App-notification" />
					</div>
				) : (
					<div className="App-account">
						<div className="App-sign-in">
							<p className="link-blue" onClick={this.handleSignInOpen}>Sign In</p>

							<Modal
								visible={this.state.signInOpen}
								onOk={this.handleSignInClose}
								onCancel={this.handleSignInClose}
								footer={null}
								bodyStyle={{width: "25vw",
								height:"35vh"}}
								style={{
									textAlign: "center",
									display: "flex",
									flexDirection: "flex-column",

								}}
							>
								<div style={{display:"flex"}}>
									<div className="register-modal-top-left">Sign In</div>
									<div className="register-modal-top-right">
										<div className="register-modal-top-right-top">
											New User?
										</div>
										<div className="register-modal-top-right-bottom">
											Register
										</div>
									</div>
								</div>
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
							<p className="link-blue" onClick={this.handleRegisterOpen}>Register</p>
							<Modal
								visible={this.state.registerOpen}
								onOk={this.handleRegisterClose}
								onCancel={this.handleRegisterClose}
								footer={null}
								bodyStyle={{width: "26vw",
								height:"60vh"}}
								style={{
									textAlign: "center",
									display: "flex",
									flexDirection: "flex-column"
								}}
							>
								<Form onSubmit={this.onRegister} className="login-form">
									<FormItem
										validateStatus={registerEmailValidate}
										hasFeedback
										help={registerEmailValidateUnique === "error" ? ("This email is already in use.") : (registerEmailValidateRegex === "error" ? ("Not a valid email address" ): (null)) }
									>
										<Input
											placeholder="email"
											value={this.state.registerEmail}
											onChange={e =>
												this.setState({ registerEmail: e.target.value })}
											style={{ width: "18vw",  height:"2.65vw", margin: 10 }}
										/>
									</FormItem>
									<FormItem
										validateStatus={this.state.registerUsernameValidate}
										hasFeedback
										help={registerUsernameValidateUnique === "error" ? ("Username is already taken") : (registerUsernameValidateLength === "error" ? ("Username must be at least 6 characters long") : (null))}
									>
										<Input
											placeholder="username"
											value={this.state.registerUsername}
											onChange={e =>
												this.setState({ registerUsername: e.target.value })}
											style={{ width: "18vw", height:"2.65vw",  margin: 10 }}
										/>
									</FormItem>
									<FormItem
										validateStatus={this.state.registerPasswordValidate}
										hasFeedback
										help={registerPasswordValidate === "error" ? "Must have >8 character and least one number." : null}
									>
										<Input
											placeholder="password"
											value={this.state.registerPassword}
											onChange={e => this.handlePasswordChange(e)}
											style={{ width: "18vw",  height:"2.65vw", margin: 10 }}
											type="password"
										/>
									</FormItem>
									<FormItem
										hasFeedback
										validateStatus={this.state.registerVerifyPasswordValidate}
										help={registerVerifyPasswordValidate === "error" ? "Passwords do not match." : null}
									>
										<Input
											placeholder="verify-password"
											value={this.state.registerVerifyPassword}
											onChange={e => this.handleVerifyPasswordChange(e)}
											style={{ width: "18vw",  height:"2.65vw", margin: 10 }}
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
	const { email, password, loading, user } = state.auth;
	const {error} = state;
	const coins = _.map(state.coins, (val, uid) => {
		return { ...val, uid };
	});

	return { email, password, error, loading, user, coins };
};

export default connect(mapStateToProps, {
	emailChanged,
	passwordChanged,
	loginUser,
	loginFailReset,
	reLoginUser,
	signUpUser,
	signOutUser,
	fetchCoins
})(Header);
