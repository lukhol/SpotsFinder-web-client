import React from "react";
import Menu from "./Menu.js";
import UserStore from "../stores/UserStore.js";

export default class Header extends React.Component {
    constructor(props) {
        super(props);
        this.updateMenu = this.updateMenu.bind(this);
        this.state = {
            menuItems: []
        };
    }

    componentWillMount() {
        //IMPORTANT: Subsribe to events
        UserStore.on("change", this.updateMenu);
        this.updateMenu();
    }

    componentWillUnmount() {
        //IMPORTANT: Unsubscribe to event!
        UserStore.removeListener("change", this.updateMenu);
    }

    updateMenu() {
        this.setState({
            menuItems: UserStore.getMenuItems()
        });
    }

    render() {
        return(
            <div>
                <Menu menuItems={this.state.menuItems} title="Spots Finder" />
                <div className="jumbotron text-center">
                    <h1> {this.props.title} </h1>
                    <small> {this.props.subtitle} </small>
                </div>
            </div>
        )
    }
}
 
Header.defaultProps = {
    title: "Spots Finder",
    subtitle: ""
}