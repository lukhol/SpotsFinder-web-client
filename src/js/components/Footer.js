import React from "react";

export default class Footer extends React.Component {
	constructor(props) {
	    super(props);
	}
	
	render() {
		var divStyle = {
			backgroundColor: 'black',
			color: 'white'
		};
		
		return (
			<div className="navbar navbar-fixed-bottom text-center bg-dark" style={divStyle}>
				<h4> { this.props.content } </h4>
			</div>
		)
	}
}

Footer.defaultProps = { 
    content: "Łukasz Hołdrowicz 214437"
}