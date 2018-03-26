import React from 'react';

import PlaceStore from "../stores/PlaceStore.js";
import * as PlaceActions from "../actions/PlaceActions.js";
import PlaceCard from "../components/PlaceCard.js";

export default class PlacesList extends React.Component {
    constructor(props) {
        super(props);

        this.placeStoreEvent = this.placeStoreEvent.bind(this);

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

    render() {
        let placesComponents = [];
        for(let i = 0 ; i < this.state.places.length ; i++) {
            placesComponents.push(
                <div className="col-sm-12 col-md-6 col-lg-4">
                    <PlaceCard place={this.state.places[i]}/>
                </div>
            );
        }

        return(
            <div className="container">
                Lista miejsc ({this.state.places.length}):
                <div className="row row-eq-height">
                    {placesComponents}
                </div>
            </div>
        )
    }
}