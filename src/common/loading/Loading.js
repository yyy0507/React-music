import React from "react";
import loadingImg from "./loading.gif";
import "./loading.styl";

export default class Loading extends React.Component{
	render(){
		let displayStyle = this.props.show === true ? {display: ""} : {display: "none"};
		return (
			<div className = "loading-container"  style = {displayStyle}>
				<div className="loading-wrapper">
					<img src={loadingImg} width="18px" height="18px" alt="loading" />
					<div className="loading-title">{this.props.title}</div>
				</div>
			</div>
		)
	}
}