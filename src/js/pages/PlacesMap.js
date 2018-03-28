import React from 'react';
import ReactDOM from "react-dom";

import UserStore from "../stores/UserStore.js";
import PlaceStore from "../stores/PlaceStore.js";
import PlaceDetailsModal from "../pages/PlaceDetailsModal.js";
import * as PlaceActions from "../actions/PlaceActions.js";

import L from 'leaflet';
import { Map, TileLayer, Marker, Popup } from 'react-leaflet';
import { Modal } from 'react-bootstrap';

export default class PlacesMap extends React.Component {
    constructor(props) {
        super(props);

        this.placeStoreEvent = this.placeStoreEvent.bind(this);
        this.detailsClicked = this.detailsClicked.bind(this);

        this.state = {
            loading: PlaceStore.loading,
            places: PlaceStore.places
        };
    }

    componentWillMount() {
        PlaceStore.on("change", this.placeStoreEvent);
    }

    componentWillUnmount() {
        PlaceStore.removeListener("change", this.placeStoreEvent);
    }

    placeStoreEvent() {
        this.setState({
            loading: PlaceStore.loading,
            places: PlaceStore.places
        });
    }

    detailsClicked(event) {
        PlaceActions.downloadPlace(event.target.id);
        document.getElementById("_modal").innerHTML = "";
        ReactDOM.render(
            <PlaceDetailsModal />,
            document.getElementById("_modal")
        );
    }

    render() {
        const mapCenterPosition = [51.19, 19.1];

        let minusMarginStyle = {
            marginTop: "-50px"
        };

        let markers = [];
        let bounds = [];
        for(let i = 0 ; i < this.state.places.length ; i++) {
            let pos = [
                this.state.places[i].location.latitude,
                this.state.places[i].location.longitude
            ];
            bounds.push(pos);
            markers.push(
                <Marker position={pos}>
                    <Popup>
                        <div className="text-center">
                            <h3 className="text-center">{this.state.places[i].name}</h3>
                            <img className="center-block" src={'data:image/jpg;base64,' + this.state.places[i].mainPhoto} height="250" width="250" />
                            <h5 id={this.state.places[i].id} className="btn btn-link text-center" onClick={this.detailsClicked}> 
                                Szczegóły
                            </h5>
                        </div>
                    </Popup>
                </Marker>
            );
        }

        if(this.state.loading) {
            return(
                <div className="sf-loader-big center-block">
                </div>
            )
        } else {
            return (
                <div style={minusMarginStyle}>
                    <Map center={mapCenterPosition} zoom={12} bounds={bounds}>
                        <TileLayer
                            attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                            url='http://{s}.tile.osm.org/{z}/{x}/{y}.png'/>
                        {markers}
                    </Map>
                </div>
            )
        }
    }
}