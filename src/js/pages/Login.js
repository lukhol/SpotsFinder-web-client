import React from "react";
import ReactDOM from "react-dom";
import * as UserActions from "../actions/UserActions.js";
import UserStore from "../stores/UserStore.js";
import { Button } from 'react-bootstrap';
import Input from '../components/Input.js';
import ForgetPassword from "./ForgetPassword.js";

export default class Login extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            login: '',
            password: '',
            remember: true,
            wrongCredential: false
        };

        this.changeLoginChanged = this.changeLoginChanged.bind(this);
        this.handlePasswordChanged = this.handlePasswordChanged.bind(this);
        this.login = this.login.bind(this);
        this.forgetPassword = this.forgetPassword.bind(this);
        this.getIsWrongCredential = this.getIsWrongCredential.bind(this);
        this.handleRemember = this.handleRemember.bind(this);
        this.style = {
            display: "none"
        };
    }

    componentWillMount() {
        //IMPORTANT: Subsribe to events
        UserStore.on("change", this.getIsWrongCredential);
    }

    componentWillUnmount() {
        //IMPORTANT: Unsubscribe to event!
        UserStore.removeListener("change", this.getIsWrongCredential);
    }

    changeLoginChanged(event) {
        this.setState( {
            login: event.target.value
        });
    }

    handlePasswordChanged(e) {
        this.setState( {
            password: e.target.value
        });
    }

    handleRemember(e) {
        this.remember = e.target.value;
    }

    login(event) {
        event.preventDefault();
        UserActions.login(this.state.login, this.state.password, this.remember);
    }

    forgetPassword(event) {
        event.preventDefault();

        document.getElementById("_modal").innerHTML = "";
        ReactDOM.render(
            <ForgetPassword />,
            document.getElementById("_modal")
        );
    }

    getIsWrongCredential() {
        if(UserStore.loginFailure === true){
            this.style = {
                display: "block"
            };
        }   
        else {
            this.style = {
                display: "none"
            };
        }

        this.setState({
            wrongCredential: UserStore.loginFailure
        });
    }

    render(){
        let loginStyle = {
            maxWidth: "400px"
        };

        return (
            <div> 
                <form name='f' action="login" method='POST'>
                    <div className="container" style={loginStyle}>
                        <h1 className="text-center">Login</h1>

                        <Input type="text" placeholder="Email" value={this.state.login} onChange={this.changeLoginChanged} placeholder="Email" />
                        <Input type='password' placeholder='Password' value={this.state.password} onChange={this.handlePasswordChanged} />
                        
                        <label>
                            <input id="remember_me" name="remember-me" type="checkbox" value={this.state.remember} onChange={this.handleRemember}/> Remember me
                        </label> <br/>

                        <Button className="btn btn-primary btn-block" onClick={this.login}>Login</Button>
                        <Button className="btn btn-link" onClick={this.forgetPassword}>Zapomniałeś hasła?</Button>
                        <br/>
                        {UserStore.registraionSuccess == true ? (
                                <span className="alert alert-success center-block">
                                    Rejestracja przebiegła pomyślnie. Możesz się zalogować!
                                </span>
                            ) : ""}
                        <div className="alert alert-danger" style={this.style}>
                            Wrong credential
                        </div>
                    </div>
                </form>
            </div>
        )
    }
}