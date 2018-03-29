import React from 'react';
import { Modal, Button } from 'react-bootstrap';
import { Map, TileLayer, Marker, Popup } from 'react-leaflet';

import * as PlaceAction from '../actions/PlaceActions.js';
import PlaceStore from "../stores/PlaceStore.js";

export default class PlaceDetailsModal extends React.Component {
    constructor(props) {
        super(props);

        this.open = this.open.bind(this);
        this.close = this.close.bind(this);
        this.placeDownloaded = this.placeDownloaded.bind(this);
        this.placeDownloaded = this.placeDownloaded.bind(this);
        this.createImagesSection = this.createImagesSection.bind(this);
        this.createObstaclesSection = this.createObstaclesSection.bind(this);

        this.modalStyle = {
            color: "black"
        };

        this.marginTopStyle = {
            marginTop: "5px"
        };

        this.paddingTopStyle = {
            paddingTop: "5px"
        }

        this.mapStyle = {
            width: "94%",
            height: "300px",
            marginLeft: "3%",
            marginRight: "3%"
        };

        this.fixedRightStyle = {
            position: "fixed",
            top: "5px",
            bottom: "5px"
        };

        this.state = {
            showModal: true,
            isLoading: PlaceStore.loadingSinglePlace,
            place: PlaceStore.singlePlace
        };
    }

    componentWillMount() {
        PlaceStore.on("change", this.placeDownloaded);
    }

    componentWillUnmount() {
        PlaceStore.removeListener("change", this.placeDownloaded);
    }

    placeDownloaded() {
        this.setState({
            isLoading: PlaceStore.loadingSinglePlace,
            place: PlaceStore.singlePlace
        });
    }

    createObstaclesSection() {
        let obstacles = [];

        if(this.state.place.bank == true)
            obstacles.push(<p>-Bank</p>);

        if(this.state.place.bowl == true)
            obstacles.push(<p>-Bowl</p>);

        if(this.state.place.corners == true)
            obstacles.push(<p>-Kąty</p>);

        if(this.state.place.curb == true)
            obstacles.push(<p>-Krawężnik</p>);

        if(this.state.place.downhill == true)
            obstacles.push(<p>-Downhill</p>);

        if(this.state.place.gap == true)
            obstacles.push(<p>-Gap</p>);

         if(this.state.place.ledge == true)
            obstacles.push(<p>-Murek</p>);

        if(this.state.place.manualpad == true)
            obstacles.push(<p>-Manualpad</p>);

        if(this.state.place.openYourMind == true)
            obstacles.push(<p>-Open your mind!</p>);

        if(this.state.place.pyramid == true)
            obstacles.push(<p>-Piramida</p>);

        if(this.state.place.rail == true)
            obstacles.push(<p>-Rurka</p>);

        if(this.state.place.stairs == true)
            obstacles.push(<p>-Schody</p>);

        if(this.state.place.wallride == true)
            obstacles.push(<p>-Wallride</p>);

         if(this.state.place.handrail == true)
            obstacles.push(<p>-Poręcz</p>);

        return obstacles;
    }

    createImagesSection() {
        let images = [];
        for(let i = 0 ; i < this.state.place.images.length ; i++) {
             images.push(
                 <img className="img-responsive center-block" src={"data:image/jpeg;base64," + this.state.place.images[i].image} style={this.paddingTopStyle}/>
             );
        }

        return images;
    }

    close() {
        this.setState({ showModal: false });
    }
    
    open() {
        this.setState({ showModal: true });
    }

    render(){
        let modalBody = "";
        if(this.state.isLoading) {
            modalBody = (
                <Modal.Body>
                    <div className="sf-loader-big center-block">
                    </div>
                </Modal.Body>
            )
        } else {
            if(this.state.place != null){
                let type;
                switch(this.state.place.type) {
                    case 0: type = (<span className="label label-primary">Skatepark</span>); break;
                    case 1: type = (<span className="label label-info">Skatespot</span>); break;
                    case 2: type = (<span className="label label-success">DIY</span>); break;
                }

                let obstaclesElements = this.createObstaclesSection();
                let images = this.createImagesSection();

                modalBody = (
                    <div>  
                        <Modal.Header className="text-center">
                            <h4>{type}</h4>
                            <h2 style={this.modalStyle}>
                                {this.state.place.name}
                            </h2>
                        </Modal.Header>
                        <Modal.Body style={this.paddingTopStyle} className="">
                            <div>
                                <div className="row">
                                    <div className="col-xs-12">
                                        <label>Opis:</label> <br/>
                                        <h4 style={this.marginTopStyle}>{this.state.place.description}</h4>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-xs-12">
                                        <label>Przeszkody:</label> <br/>
                                        {obstaclesElements}
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-xs-12">
                                        <label>Zdjęcia:</label> <br/>
                                        <div className="col-xs-12">
                                            {images}
                                        </div>
                                    </div>
                                </div>
                                <hr />
                                <div className="row">
                                    <Map center={[this.state.place.location.latitude, this.state.place.location.longitude]} zoom={16} style={this.mapStyle}>
                                        <TileLayer
                                            attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                                            url='http://{s}.tile.osm.org/{z}/{x}/{y}.png'/>
                                            <Marker position={[this.state.place.location.latitude, this.state.place.location.longitude]} >
                                                <Popup>
                                                    <div>
                                                        Latitude: {this.state.place.location.latitude} <br/>
                                                        Longitude: {this.state.place.location.longitude}
                                                    </div>
                                                </Popup>
                                            </Marker>
                                    </Map>
                                </div>
                            </div>
                        </Modal.Body>
                    </div>
                )
                                
            }
        }

        return(
            <Modal show={this.state.showModal} onHide={this.close} style={this.modalStyle} >
                {modalBody}
                <Modal.Footer>
                    <Button onClick={this.close}>Zamknij</Button>
                </Modal.Footer>
            </Modal>
        )
    }
}