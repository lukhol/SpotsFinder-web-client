import { EventEmitter } from "events";
import dispatcher from "../dispatcher.js";

//Stores:
import PlaceStore from "./PlaceStore.js";
import UserStore from "./UserStore.js";

class AppStore extends EventEmitter {
    constructor() {
        super();
        this.SERVER_URL = 'http://localhost:8080';
        //this.SERVER_URL = 'http://80.211.223.50';

        this.getBasicAuthHeader = this.getBasicAuthHeader.bind(this);
        this.getBearerAuthHeader = this.getBearerAuthHeader.bind(this);
    }

    handleActions(action) {

    }

    getBasicAuthHeader() {
        return 'Basic c3BvdGZpbmRlcjpzcG90ZmluZGVyU2VjcmV0';
    }

    getBearerAuthHeader() {
        return 'Bearer ' + UserStore.accessToken;
    }

    getJsonBearerHeaders() {
        let headers = {
            'Authorization': this.getBearerAuthHeader(),
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        };

        return headers;
    }

    getJsonBasicHeaders() {
        let headers = {
            'Authorization': this.getBasicAuthHeader(),
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        }

        return headers;
    }
}

const appStore = new AppStore;
dispatcher.register(appStore.handleActions.bind(appStore));
export default appStore;