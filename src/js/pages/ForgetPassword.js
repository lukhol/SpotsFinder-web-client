import React from 'react';
import { Modal, Button} from 'react-bootstrap';
import Input from '../components/Input.js';
import * as UserActions from "../actions/UserActions.js";
import UserStore from '../stores/UserStore.js';

export default class ForgetPassword extends React.Component {
    constructor(props) {
        super(props);

        this.wrongStyle = { boxShadow: "0 0 5px rgba(165,11,14,1)" };
        this.correctStyle = { boxShadow: "0 0 5px rgba(95,193,56,1)" };
        this.emptyStyle =  { boxShadow: "0 0 0px rgba(0,0,0,1)" };

        this.state = {
            showModal: true,
            email: "",
            inputStyle: this.emptyStyle,
            isBusy: false,
            isMessageVisible: false,
            success: false,
            message: ""
        };

        this.modalStyle = {
            color: "black"
        };

        this.open = this.open.bind(this);
        this.close = this.close.bind(this);
        this.onInputChanged = this.onInputChanged.bind(this);
        this.changePassword = this.changePassword.bind(this);
        this.subscribeMethod = this.subscribeMethod.bind(this);
        this.checkIfEmailIsCorrect = this.checkIfEmailIsCorrect.bind(this);
    }

    componentWillMount() {
        UserStore.on("change", this.subscribeMethod);
    }

    componentWillUnmount() {
        UserStore.removeListener("change", this.subscribeMethod);
    }

    subscribeMethod() {
        this.setState({
            isBusy: UserStore.recoverAccount.isBusy,
            isMessageVisible: UserStore.recoverAccount.isMessageVisible,
            success: UserStore.recoverAccount.success,
            message: UserStore.recoverAccount.message
        });
    }

    close() {
        this.setState({ showModal: false });
    }
    
    open() {
        this.setState({ showModal: true });
    }

    changePassword() {
        if(this.checkIfEmailIsCorrect(this.state.email) == false)
            return;
            
        UserActions.recoverAccount(this.state.email);
    }

    onInputChanged(event) {
        let styleToSet = {};
        if(event.target.value == "") {
            styleToSet = this.emptyStyle;
        }
        else {
            let isEmailCorrect = this.checkIfEmailIsCorrect(event.target.value);
            if(isEmailCorrect)
                styleToSet = this.correctStyle;
            else
                styleToSet = this.wrongStyle;
        }

        this.setState({
            [event.target.id]: event.target.value,
            inputStyle: styleToSet
        });
    }

    checkIfEmailIsCorrect(email) {
        let re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(email.toLowerCase());
    }

    render() {
        let modalBody;
        if(this.state.isBusy) {
            modalBody = (
                <Modal.Body>
                    <div className="sf-loader-big center-block"></div>
                </Modal.Body>
            );
        } else {
            let message;
            if(this.state.isMessageVisible) {
                message = (
                    <div className={"alert alert-" + (this.state.success == true ? "success" : "danger") }>
                        {this.state.message}
                    </div>
                );
            }

            modalBody = (
                <Modal.Body>
                    <form>
                        <Input style={this.state.inputStyle} id="email" value={this.state.email} onChange={this.onInputChanged} placeholder="email" />
                    </form>
                    {message}
                </Modal.Body>
            );
        }

        return (
            <Modal show={this.state.showModal} onHide={this.close} style={this.modalStyle} >
                <Modal.Header closeButton>
                    <h3 className="text-center" style={{color: "black"}}>Zapomniałeś hasła?</h3>
                </Modal.Header>
                    {modalBody}
                <Modal.Footer>
                    <Button onClick={this.close}>Zamknij</Button>
                    <Button className="btn btn-primary" onClick={this.changePassword} disabled={this.state.isBusy}>Zmień hasło</Button>
                </Modal.Footer>
            </Modal>
        )
    }
}