import React from "react";
import MenuItem from './MenuItem.js';

export default class Menu extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        let darkStyle = {
            backgroundColor: "#232323"
        };

        let notDisplayStyle = {
            display: "none"
        };

        let menuStyle = {
            margin: "0px",
            position: "sticky",
            top: "0"
        };

        let menuItems  = [];
        for(let i = 0 ; i < this.props.menuItems.length ; i++) {
            menuItems.push(<MenuItem item={this.props.menuItems[i]} key={i} />);
        }

        return (
            <nav className="navbar navbar-default" style={menuStyle}>
                <div className="container-fluid">
                    <div className="navbar-header">
                        <button type="button" className="navbar-toggle" data-toggle="collapse" data-target="#mynavbar-content">
                            <span className="icon-bar"></span>
                            <span className="icon-bar"></span>
                            <span className="icon-bar"></span>
                        </button>
                        <a className="navbar-brand" href="#">{this.props.title}</a>
                    </div>
                    
                    <div className="collapse navbar-collapse" id="mynavbar-content" role="navigation">
                        <ul className="nav navbar-nav">
                            {menuItems}
                        </ul>
                    </div>
                </div>
            </nav>
        )
    }
}