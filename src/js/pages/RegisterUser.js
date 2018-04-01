import React from 'react';
import Input from '../components/Input.js';
import { Button } from 'react-bootstrap';
import UserStore from "../stores/UserStore.js";

import * as UserActions from "../actions/UserActions.js";

export default class RegisterUser extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            firstname: "",
            lastname: "",
            email: "", 
            password: "",
            error: null,
            isBusy: UserStore.registrationLoader,
            success: UserStore.registraionSuccess
        };

        this.onInputChanged = this.onInputChanged.bind(this);
        this.onRegisterClicked = this.onRegisterClicked.bind(this);
        this.registerSubscription = this.registerSubscription.bind(this);
    }

    onInputChanged(event) {
        this.setState({ [event.target.id]: event.target.value });
    }

    onRegisterClicked() {
        UserActions.register(
            this.state.firstname, 
            this.state.lastname, 
            this.state.email, 
            this.state.password
        );
    }

    componentWillMount() {
        UserStore.on("change", this.registerSubscription);
    }

    componentWillUnmount() {
        UserStore.removeListener("change", this.registerSubscription);
    }

    registerSubscription() {
        this.setState({
            error: UserStore.registrationErrors,
            success: UserStore.success,
            isBusy: UserStore.registrationLoader
        });

        this.setEmptyInitialState();
    }

    setEmptyInitialState() {
        this.setState({
            firstname: "",
            lastname: "",
            email: "", 
            password: "",
        });
    }

    render() {
        let errorStyle = {color: "red"};

        if(this.state.isBusy)
            return (
                <div className="sf-loader-big center-block">
                </div>
            )
        else 
            return (
                <div className="container">
                    <form className="center-block" style={{ maxWidth: "400px" }}>
                        <h1 style={{ textAlign: "center" }}>Rejestracja:</h1>

                        <Input id="firstname" type="text" placeholder="Imie" val={this.state.firstname} onInputChanged={this.onInputChanged}/>
                        {this.state.error != null ? (<span style={errorStyle}>{this.state.error.firstname}</span>) : " "}

                        <Input id="lastname" type="text" placeholder="Nazwisko" val={this.state.lastname} onInputChanged={this.onInputChanged}/>
                        {this.state.error != null ? (<span style={errorStyle}>{this.state.error.lastname}</span>): " "}

                        <Input id="email" type="text" placeholder="Email" val={this.state.email} onInputChanged={this.onInputChanged}/>
                        {this.state.error != null ? (<span style={errorStyle}>{this.state.error.email} </span>): " "}

                        <Input id="password" type="password" placeholder="Hasło" val={this.state.password} onInputChanged={this.onInputChanged}/>
                        {this.state.error != null ? (<span style={errorStyle}>{this.state.error.password} </span>): " "}

                        <Button className="btn-lg btn-block btn-success" onClick={this.onRegisterClicked}>Rejestruj</Button>
                    </form>
                </div>
            )
    }
}