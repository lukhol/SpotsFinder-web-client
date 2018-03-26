import React from 'react';

import UserStore from "../stores/UserStore.js";
import PlaceStore from "../stores/PlaceStore.js";
import * as PlaceActions from "../actions/PlaceActions.js";

export default class PlacesMap extends React.Component {
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
        if(this.state.loading) {
            return(
                <div className="sf-loader-big center-block">
                </div>
            )
        } else {
            return (
                <div>
                    Mapa: {this.state.places.length}
                </div>
            )
        }
    }
}