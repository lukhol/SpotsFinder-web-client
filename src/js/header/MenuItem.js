import React from 'react';
import ReactDOM from "react-dom";
import { Link } from "react-router";

export default class MenuItem extends React.Component {
    constructor(props){
        super();

        this.state = {
            isActiveStyle: {
                backgroundColor: "#e7e7e7"
            }
        };
    }

    render() {

        if(this.props.item.subitems.length == 0){
            
            return (
                <li> 
                    <Link to={this.props.item.link}> {this.props.item.title} </Link>
                </li>
            )
        } else {

            let subItems = [];
            for(let i = 0 ; i < this.props.item.subitems.length ; i++) {
                subItems.push(<MenuItem item={this.props.item.subitems[i]} key={i} />);
            }

            return (
                <li className="dropdown">
                    <a href="#" className="dropdown-toggle" data-toggle="dropdown"> {this.props.item.title} </a>
                    <ul className="dropdown-menu"> 
                        {subItems}
                    </ul>
                </li>
            )
        }
    }
}