import React, { Component } from "react";
import TextField from "material-ui/TextField";
import Badge from "material-ui/Badge";
import IconButton from "material-ui/IconButton";
import MailOutline from "material-ui/svg-icons/communication/mail-outline";
import { Input, Icon, Rate, Avatar } from "antd";

import logo from "./logo.svg";
import "./App.css";

class Home extends Component {
	render() {
		return (
			<div className="App">
				<header className="App-header">
					<img src={logo} className="App-logo" alt="logo" />
					<Input
						placeholder="search coins"
						prefix={<Icon type="user" style={{ color: "rgba(0,0,0,.25)" }} />}
						className="App-search"
					/>
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
            style={{padding: 0}}
							badgeContent={10}
							secondary={true}
							badgeStyle={{ top: -1 , right: -3 }}
						>
							<IconButton iconStyle={{width: 30, height: 30}} tooltip="Notifications">
								<MailOutline  />
							</IconButton>
						</Badge>
            </div>
					</div>
				</header>
        <div className="Following">
          <div className="Following-avatar">
          <Avatar
            size="large"
           icon="user"
          />
        </div>
          <p>+ Sign in to add your favorite coins to your dashboard</p>
        </div>
				<p className="App-intro">
					To get started, edit <code>src/App.js</code> and save to reload.
				</p>
			</div>
		);
	}
}

export default Home;
