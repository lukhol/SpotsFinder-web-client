import { EventEmitter } from "events";
import dispatcher from "../dispatcher.js";
import * as PlaceActions from "../actions/PlaceActions.js";
import base64 from 'base-64';

class PlaceStore extends EventEmitter {
    constructor() {
        super();
        this.places = [];
        this.loading = false;
    }

    getPlaces() {
        return this.recentlyAdded;
    }

    fetchStarted() {
        this.places = [];
        this.loading = true;
        this.emit("change");
    }

    fetchCompleted(places) {
        this.places = places;
        this.loading = false;
        this.emit("change");
    }

    handleActions(action) {
        switch(action.type) {
            case "FETCH_PLACES_STARTED": {
                this.fetchStarted();
                break;
            }
            case "FETCH_PLACES_COMPLETED": {
                this.fetchCompleted(action.places);
                break;
            }
        }
    }
}

const placeStore = new PlaceStore;
dispatcher.register(placeStore.handleActions.bind(placeStore));
export default placeStore;