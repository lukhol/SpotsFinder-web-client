import React from 'react';
import { Modal, Button } from 'react-bootstrap';

export default class AddPlaceModal extends React.Component {
    constructor(props) {
        super(props);

        this.modalStyle = {
            color: "black"
        };

        this.open = this.open.bind(this);
        this.close = this.close.bind(this);

        this.state = {
            showModal: true
        };
    }

    close() {
        this.setState({ showModal: false });
    }
    
    open() {
        this.setState({ showModal: true });
    }

    render() {
        return (
            <Modal show={this.state.showModal} onHide={this.close} style={this.modalStyle} >
                <Modal.Header closeButton>
                    <Modal.Title>Modal heading</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <h4>Text in a modal</h4>
                    <p>Duis mollis, est non commodo luctus, nisi erat porttitor ligula.</p> 
                    <h4>Popover in a modal</h4>
                </Modal.Body>
                <Modal.Footer>
                    <Button onClick={this.close}>Close</Button>
                </Modal.Footer>
            </Modal>
          )
    }
}