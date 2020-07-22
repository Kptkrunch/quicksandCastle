import React, { Component } from "react";

export default class App extends Component {

	constructor(props) {
		super(props);
		this.state = {

		}
	}
	render() {
		return (
			<div style={{ textAlign: "center" }}>
				<div className="background">
					<h1>Quicksand Castle</h1>
					<div id="phaser"></div>	
				</div>
			</div>
		);
	}
}
