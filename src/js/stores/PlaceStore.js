import { EventEmitter } from "events";
import dispatcher from "../dispatcher.js";
import * as PlaceActions from "../actions/PlaceActions.js";
import base64 from 'base-64';

class PlaceStore extends EventEmitter {
    constructor() {
        super();
        this.places = [];
        this.loading = false;
        this.uploading = false;
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

    uploadingStarted() {
        console.log("upload started");
        this.uploading = true;
        this.emit("change");
    }

    uploadingCompleted() {
        console.log("upload completed");
        this.uploading = false;
        this.emit("change");
    }

    uploadingError() {
        console.log("upload error");
        this.uploading = false;
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
            case "UPLOAD_PLACE_STARTED" : {
                this.uploadingStarted();
                break;
            }
            case "UPLOAD_PLACES_COMPLETED" : {
                this.uploadingCompleted();
                break;
            }
            case "UPLOAD_PLACES_ERROR" : {
                this.uploadingError();
                break;
            }
        }
    }
}

const placeStore = new PlaceStore;
dispatcher.register(placeStore.handleActions.bind(placeStore));
export default placeStore;