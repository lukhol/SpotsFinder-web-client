import React from "react";
import * as UserActions from "../actions/UserActions.js";
import UserStore from "../stores/UserStore.js";

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

    login(e) {
        e.preventDefault();
        UserActions.login(this.state.login, this.state.password, this.remember);
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
                        <h1>Login</h1>
                        <label htmlFor="username">Username:</label>  <br/>
                        <input type='text' name='username' value={this.state.login} onChange={this.changeLoginChanged} />  <br/>

                        <label htmlFor="password">Password:</label>  <br/>
                        <input type='password' name='password' value={this.state.password} onChange={this.handlePasswordChanged} />  <br/>
                        
                        
                        <label>
                            <input id="remember_me" name="remember-me" type="checkbox" value={this.state.remember} onChange={this.handleRemember}/> Remember me
                        </label> <br/>

                        <button name="submit" className="btn btn-primary btn-block" onClick={this.login}>Login</button>
                        
                        <br/>
                        <div className="alert alert-danger" style={this.style}>
                            Wrong credential
                        </div>
                    </div>
                </form>
            </div>
        )
    }
}