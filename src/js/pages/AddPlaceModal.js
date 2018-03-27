import React from 'react';
import { Modal, Button } from 'react-bootstrap';
import { Map, TileLayer, Marker, Popup } from 'react-leaflet';

import * as PlaceActions from "../actions/PlaceActions.js";
import UserStore from '../stores/UserStore';
var serialize = require('form-serialize');

export default class AddPlaceModal extends React.Component {
    constructor(props) {
        super(props);

        this.modalStyle = {
            color: "black"
        };

        this.open = this.open.bind(this);
        this.close = this.close.bind(this);
        this.handleFormSubmit = this.handleFormSubmit.bind(this);
        this.onCheckboxChange = this.onCheckboxChange.bind(this);
        this.onInputChanged = this.onInputChanged.bind(this);
        this.onSelectChanged = this.onSelectChanged.bind(this);
        this.onMapClicked = this.onMapClicked.bind(this);

        this.state = {
            showModal: true, 
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
            name: "",
            description: "",
            userId: UserStore.user.id,
            id: null,
            version: 0,
            type: "0",
            location: {
                latitude: 51.75924850,
                longitude: 19.45598330
            },
            zoom: 7
            //images - [{ "id": null, "image" : "base64"}]
        };

        //id - long/null
        //userId - int
        //version - long
        //type - int
        //location {"latitude" : 51, "longitude" : 19}
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

    onSelectChanged(event) {
        this.setState({[event.target.id]: event.target.value});
    }

    close() {
        this.setState({ showModal: false });
    }
    
    open() {
        this.setState({ showModal: true });
    }

    onMapClicked(event) {
        var coord = event.latlng.toString().split(',');
        var lat = coord[0].split('(');
        var lng = coord[1].split(')');

        let location = {
            latitude: parseFloat(lat[1]),
            longitude: parseFloat(lng[0])
        };

        this.setState({
            location: location,
            zoom: event.sourceTarget._zoom
        });
    }

    handleFormSubmit(event) {
        event.preventDefault();
        let json = {};
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
        json.name = this.state.name;
        json.description = this.state.description;
        json.userId = this.state.userId;
        json.id = this.state.id;
        json.version = this.state.version;
        json.type = Number(this.state.type);
        json.location = this.state.location;
        console.log(json);
    }

    render() {
        let st = {
            width: "94%",
            height: "300px",
            marginLeft: "3%",
            marginRight: "3%"
        };

        let marker = (
            <Marker position={[this.state.location.latitude, this.state.location.longitude]} />
        );

        return (
            <Modal show={this.state.showModal} onHide={this.close} style={this.modalStyle} >
                <Modal.Header closeButton>
                    <div className="text-center">
                        <h2 style={this.modalStyle}>Dodaj nowy spot</h2>
                    </div>
                </Modal.Header>
                <Modal.Body>
                    <form onSubmit={this.handleFormSubmit} id="place-form" >
                        <div className="row">
                            <div className="col-sm-12">
                                <label htmlFor="name">Nazwa:</label>
                                <input className="form-control" id="name" name="name" type="text" value={this.state.name} onChange={this.onInputChanged} />
                            </div>
                            <br/>
                            <div className="col-sm-12">
                                <label htmlFor="description">Opis:</label>
                                <input className="form-control" id="description" name="description" type="text" value={this.state.description} onChange={this.onInputChanged} />
                            </div> 
                        </div>

                        <div className="row">
                            <div className="col-xs-12">
                                <label>Typ:</label>
                                <div>
                                    <select className="form-control" id="type" value={this.state.type} onChange={this.onSelectChanged}>
                                        <option value="0">Skatepark</option>
                                        <option value="1">Skatespot</option>
                                        <option value="2">DIY</option>
                                    </select>
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
                        <hr />
                    </form>
                    <div className="row">
                        <div className="col-sm-12">
                            <label>Lokalizacja:</label>
                        </div>
                        <Map style={st} center={[this.state.location.latitude, this.state.location.longitude]} zoom={this.state.zoom} onClick={this.onMapClicked}>
                            <TileLayer
                                attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                                url='http://{s}.tile.osm.org/{z}/{x}/{y}.png'/>
                            {marker}
                        </Map>
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <Button onClick={this.close}>Zamknij</Button>
                    <button type="submit" form="place-form" className="btn btn-primary">Szukaj</button>
                </Modal.Footer>
            </Modal>
          )
    }
}