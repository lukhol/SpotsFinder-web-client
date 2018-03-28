import React from 'react';
import ReactDOM from "react-dom";

import PlaceStore from "../stores/PlaceStore.js";
import * as PlaceActions from "../actions/PlaceActions.js";
import PlaceCard from "../components/PlaceCard.js";
import PlaceDetailsModal from "../pages/PlaceDetailsModal.js";

export default class PlacesList extends React.Component {
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
        //alert(event.target.id);
        // PlaceActions.downloadPlace(event.target.id);
        // document.getElementById("_modal").innerHTML = "";
        // ReactDOM.render(
        //     <PlaceDetailsModal />,
        //     document.getElementById("_modal")
        // );
    }

    render() {
        let placesComponents = [];
        for(let i = 0 ; i < this.state.places.length ; i++) {
            placesComponents.push(
                <div className="col-sm-12 col-lg-4">
                    <PlaceCard place={this.state.places[i]} id={this.state.places[i].id} onClick={this.detailsClicked}/>
                </div>
            );
        }

        if(this.state.loading) {
            return(
                <div className="sf-loader-big center-block">
                </div>
            )
        } else {
            return(
                <div className="container">
                    Lista miejsc ({this.state.places.length}):
                    <div className="row">
                        {placesComponents}
                    </div>
                </div>
            )
        }
    }
}