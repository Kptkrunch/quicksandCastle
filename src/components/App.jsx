import React, { Component } from "react";

export default class App extends Component {

	constructor(props) {
		super(props);
		this.state = {

		}
	}
	render() {
		return (
			<div className="background" style={{ textAlign: "center" }}>
				<div id="phaser"></div>	
			</div>
		);
	}
}
