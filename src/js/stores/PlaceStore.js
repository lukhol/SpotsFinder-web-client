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
        this.uploadedSuccesfully = false;
        this.uploadingError = null;

        //Single place
        this.singlePlaceId = 0;
        this.loadingSinglePlace = false;
        this.loadingSinglePlaceError = null;
        this.singlePlace = null;
    }

    getPlaces() {
        return this.recentlyAdded;
    }

    fetchStarted() {
        this.places = [];
        this.loading = true;
        this.uploadingError = null;
        this.emit("change");
    }

    fetchCompleted(places) {
        this.places = places;
        this.loading = false;
        this.uploadingError = null;
        this.emit("change");
    }

    uploadingStarted() {
        //console.log("upload started");
        this.uploading = true;
        this.uploadedSuccesfully = false;
        this.uploadingError = null;
        this.emit("change");
    }

    uploadingCompleted() {
        //console.log("upload completed");
        this.uploading = false;
        this.uploadedSuccesfully = true;
        this.uploadingError = null;
        this.emit("change");
    }

    uploadingErrorMethod(error) {
        //console.log("upload error");
        this.uploading = false;
        this.uploadedSuccesfully = false;
        this.uploadingError = error;
        this.emit("change");
    }

    //Single place:
    downloadSinglePlaceStarted(id) {
        //console.log("download single place started");
        this.singlePlaceId = id;
        this.loadingSinglePlace = true;
        this.loadingSinglePlaceError = null;
        this.singlePlace = null;
        this.emit("change");
    }

    downloadSinglePlaceCompleted(place) {
        //console.log("download single place completed");
        this.singlePlaceId = place.id;
        this.loadingSinglePlace = false;
        this.loadingSinglePlaceError = null;
        this.singlePlace = place;
        this.emit("change");
    }

    downloadSinglePlaceError(error) {
        //console.log("download single place error");
        this.loadingSinglePlace = false;
        this.loadingSinglePlaceError = error;
        this.singlePlace = null;
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
                this.uploadingErrorMethod(action.errors);
                break;
            }
            case "DOWNLOAD_PLACE_STARTED" : {
                this.downloadSinglePlaceStarted(action.id);
                break;
            }
            case "DOWNLOAD_PLACE_COMPLETED" : {
                this.downloadSinglePlaceCompleted(action.place);
                break;
            }
            case "DOWNLOAD_PLACE_ERROR" : {
                this.downloadSinglePlaceError(action.error);
                break;
            }
        }
    }
}

const placeStore = new PlaceStore;
dispatcher.register(placeStore.handleActions.bind(placeStore));
export default placeStore;