import React from 'react';
import * as PlaceActions from "../actions/PlaceActions.js";
import { Modal, Button } from 'react-bootstrap';

var serialize = require('form-serialize');

export default class PlaceSearchModal extends React.Component {
    constructor(props) {
        super(props);
        this.handleFormSubmit = this.handleFormSubmit.bind(this);
        this.onCheckboxChange = this.onCheckboxChange.bind(this);
        this.onInputChanged = this.onInputChanged.bind(this);
        this.onRangeChanged = this.onRangeChanged.bind(this);
        this.open = this.open.bind(this);
        this.close = this.close.bind(this);

        this.modalStyle = {
            color: "black"
        };

        //0-Skatepark, 1-Skatespot, 2-DIY
        this.state = {
            skatepark: true, 
            skatespot: true,
            diy: true,
            modalStyle: {
                display: "block"
            },
            bank: false,
            bowl: false,
            ledge: false,
            corners: false,
            curb: false,
            downhill: false,
            gap: false, 
            handrail: false, 
            manualpad: false, 
            openYourMind: false, 
            pyramid: false, 
            rail: false, 
            stairs: false, 
            wallride: false,
            city: "Łódź",
            distance: 5,
            showModal: true
        };
    }

    handleFormSubmit(event) {
        event.preventDefault();
        let json = serialize(event.target, { hash: true });        
        json.location.latitude = null;
        json.location.longitude = null;
        json.location.city = this.state.city;
        json.distance = Number(json.distance); 
        json.bank = this.state.bank;
        json.bowl = this.state.bowl;
        json.corners = this.state.corners;
        json.curb = this.state.curb;
        json.downhill = this.state.downhill;
        json.gap = this.state.gap;
        json.handleFormSubmit = this.state.handrail;
        json.ledge = this.state.ledge;
        json.manualpad = this.state.manualpad;
        json.openYourMind = this.state.openYourMind;
        json.pyramid = this.state.pyramid;
        json.rail = this.state.rail;
        json.stairs = this.state.stairs;
        json.wallride = this.state.wallride;
        json.handrail = this.state.handrail;
        delete json.handleFormSubmit;

        json.type = [];
        if(this.state.skatepark)
            json.type.push(0);
        if(this.state.skatespot)
            json.type.push(1);
        if(this.state.diy) 
            json.type.push(2);
        
        PlaceActions.fetchPlaces(json);
        this.close();
    }

    onCheckboxChange(event) {
        this.setState({
            [event.target.id]: !this.state[event.target.id]
        });
    }

    onInputChanged(event) {
        this.setState({
            [event.target.id]: event.target.value
        });
    }

    onRangeChanged(event) {
        this.setState({
            distance: event.target.value
        });
    }

    close() {
        this.setState({ showModal: false });
    }
    
    open() {
        this.setState({ showModal: true });
    }

    render(){
        let marginPadding = {
            margin: "0px",
            padding: "0px"
        };

        let marginRight = {
            marginRight: "15px"
        };

        return(
            <Modal show={this.state.showModal} onHide={this.close} style={this.modalStyle} >
                <Modal.Header closeButton>
                    <div className="text-center">
                        <h2 style={this.modalStyle}>Szukaj spotów</h2>
                        <small>Wyniki zostaną przedstawione w zakładce Lista oraz Mapa.</small>
                    </div>
                </Modal.Header>
                <Modal.Body>
                    <form onSubmit={this.handleFormSubmit} id="place-form" >
                        <input type="hidden" name="location[latitude]" value="null" />
                        <input type="hidden" name="location[longitude]" value="null" />

                        <div className="row">
                            <div className="col-sm-12">
                                <label htmlFor="distance">Dystans wyszukiwania:</label>
                                <input className="form-control" id="dinstance" name="distance" type="range" min="1" max="20" value={this.state.distance} onChange={this.onRangeChanged}/>
                                {this.state.distance} km
                            </div>
                            <br/><br/>
                            <div className="col-sm-12">
                                <label htmlFor="city">Miasto:</label>
                                <input className="form-control" id="city" name="location[city]" type="text" value={this.state.city} onChange={this.onInputChanged}/>
                            </div> 
                        </div>

                        <div className="row">
                            <div class="col-xs-12">
                                <label>Typ:</label>
                            </div>
                            <div className="col-sm-12">
                                <div className="checkbox">
                                    <label htmlFor="skatepark" style={marginRight}>
                                        <input id="skatepark" name="skatepark" type="checkbox" value={this.state.skatepark} checked={this.state.skatepark} onChange={this.onCheckboxChange}/>
                                        Skatepark
                                    </label>

                                    <label htmlFor="skatespot" style={marginRight}>
                                        <input id="skatespot" name="skatespot" type="checkbox" value={this.state.skatespot} checked={this.state.skatespot} onChange={this.onCheckboxChange}/>
                                        Skatespot
                                    </label>
                                
                                    <label htmlFor="diy" style={marginRight}>
                                        <input id="diy" name="diy" type="checkbox" value={this.state.diy} onChange={this.onCheckboxChange} checked={this.state.diy}/>
                                        DIY
                                    </label>
                                </div>
                            </div>
                        </div>

                        <div className="row">
                            <div class="col-xs-12">
                                <label>Przeszkody:</label>
                            </div>
                            <div className="col-xs-12 col-sm-6 col-md-3">
                                <div className="checkbox">
                                    <label htmlFor="bank">
                                        <input id="bank" name="bank" type="checkbox" value={this.state.bank} checked={this.state.bank}  onChange={this.onCheckboxChange}/>
                                        Bank
                                    </label>
                                </div>
                                <div className="checkbox">
                                    <label htmlFor="bowl">
                                        <input id="bowl" name="bowl" type="checkbox" value={this.state.bowl} checked={this.state.bowl} onChange={this.onCheckboxChange}/>
                                        Bowl
                                    </label>
                                </div>
                            </div>
                            <div className="col-xs-12 col-sm-6 col-md-3">
                                <div className="checkbox">
                                    <label htmlFor="ledge">
                                        <input id="ledge" name="ledge" type="checkbox" value={this.state.ledge} checked={this.state.ledge} onChange={this.onCheckboxChange}/>
                                        Murek
                                    </label>
                                </div>
                                <div className="checkbox">
                                    <label htmlFor="corners">
                                        <input id="corners" name="corners" type="checkbox" value={this.state.corners} checked={this.state.corners} onChange={this.onCheckboxChange}/>
                                        Kąty
                                    </label>
                                </div>
                            </div>
                            <div className="col-xs-12 col-sm-6 col-md-3">
                                <div className="checkbox">
                                    <label htmlFor="curb">
                                        <input id="curb" name="curb" type="checkbox" value={this.state.curb} checked={this.state.curb} onChange={this.onCheckboxChange}/>
                                        Krawężnik
                                    </label>
                                </div>
                                <div className="checkbox">
                                    <label htmlFor="downhill">
                                        <input id="downhill" name="downhill" type="checkbox" value={this.state.downhill} checked={this.state.downhill} onChange={this.onCheckboxChange}/>
                                        Downhill
                                    </label>
                                </div>
                            </div>
                            <div className="col-xs-12 col-sm-6 col-md-3">
                                <div className="checkbox">
                                    <label htmlFor="gap">
                                        <input id="gap" name="gap" type="checkbox" value={this.state.gap} checked={this.state.gap} onChange={this.onCheckboxChange}/>
                                        Gap
                                    </label>
                                </div>
                                <div className="checkbox">
                                    <label htmlFor="handrail">
                                        <input id="handrail" name="handrail" type="checkbox" value={this.state.handrail} checked={this.state.handrail} onChange={this.onCheckboxChange}/>
                                        Poręcz
                                    </label>
                                </div>
                            </div>
                            <div className="col-xs-12 col-sm-6 col-md-3">
                                <div className="checkbox">
                                    <label htmlFor="manualpad">
                                        <input id="manualpad" name="manualpad" type="checkbox" value={this.state.manualpad} checked={this.state.manualpad} onChange={this.onCheckboxChange}/>
                                        Manualpad
                                    </label>
                                </div>
                                <div className="checkbox">
                                    <label htmlFor="openYourMind">
                                        <input id="openYourMind" name="openYourMind" type="checkbox" value={this.state.openYourMind} checked={this.state.openYourMind} onChange={this.onCheckboxChange}/>
                                        Open your mind!
                                    </label>
                                </div>
                            </div>
                            <div className="col-xs-12 col-sm-6 col-md-3">
                                <div className="checkbox">
                                    <label htmlFor="pyramid">
                                        <input id="pyramid" name="pyramid" type="checkbox" value={this.state.pyramid} checked={this.state.pyramid} onChange={this.onCheckboxChange}/>
                                        Piramida
                                    </label>
                                </div>
                                <div className="checkbox">
                                    <label htmlFor="rail">
                                        <input id="rail" name="rail" type="checkbox" value={this.state.rail} checked={this.state.rail} onChange={this.onCheckboxChange}/>
                                        Rurka
                                    </label>
                                </div>
                            </div>
                            <div className="col-xs-12 col-sm-6 col-md-3">
                                <div className="checkbox">
                                    <label htmlFor="stairs">
                                        <input id="stairs" name="stairs" type="checkbox" value={this.state.stairs} checked={this.state.stairs} onChange={this.onCheckboxChange}/>
                                        Schody
                                    </label>
                                </div>
                                <div className="checkbox">
                                    <label htmlFor="wallride">
                                        <input id="wallride" name="wallride" type="checkbox" value={this.state.wallride} checked={this.state.wallride} onChange={this.onCheckboxChange}/>
                                        Wallride
                                    </label>
                                </div>
                            </div>
                        </div>
                    </form>
                </Modal.Body>
                <Modal.Footer>
                    <button type="button" className="btn btn-secondary" onClick={this.close}>Anuluj</button>
                    <button type="submit" form="place-form" className="btn btn-primary">Szukaj</button>
                </Modal.Footer>
            </Modal>
        )
    }
}