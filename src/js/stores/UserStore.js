import { EventEmitter } from "events";
import dispatcher from "../dispatcher.js";
import { hashHistory } from "react-router";

import  * as UserActions from '../actions/UserActions.js';

class UserStore extends EventEmitter {
    constructor(props) {
        super(props);

        if(this.getCookie("userId") != undefined) {
            UserActions.fetchUserInfo(
                this.getCookie("userId"),
                this.getCookie("at"),
                this.getCookie("rt")
            );
        }

        this.user = {};
        this.isUserLoggedIn = false;
        this.accessToken = "";
        this.refreshToken = "";
    }

    getCookie(name) {
        let match = document.cookie.match(new RegExp(name + '=([^;]+)'));
        if (match) 
            return match[1];
    }

    getMenuItems() {

        let login;
        let placesMap;
        let menuItems;
        let search;
        let placesList;
        let addPlace;

        placesMap = {
            title: "Mapa",
            link: "/placesMap",
            subitems: []
        };

        placesList = {
            title: "Lista",
            link: "/placesList",
            subitems: []
        };     

        search = {
            title: "Szukaj", 
            link: "/search",
            subitems: []
        };

        addPlace = {
            title: "Dodaj",
            link: "/addPlace",
            subitems: []
        };

        if(this.isUserLoggedIn == true){
            login = {
                title: "Logout",
                link: "/logout",
                subitems: []
            };

            menuItems = [placesMap, placesList, search, addPlace, login];
        } else {
            login = {
                title: "Login",
                link: "/login",
                subitems: []
            };

            menuItems = [placesMap, placesList,search, login];
        }
        this.menuItems = menuItems;
        return menuItems;
    }

    logout() {
        this.isUserLoggedIn = false;
        this.user = {};
        this.accessToken = "";
        this.refreshToken = "";

        document.cookie = "userId=;expires=Thu, 01 Jan 1970 00:00:00 GMT";
        document.cookie = "at=;expires=Thu, 01 Jan 1970 00:00:00 GMT";
        document.cookie = "rt=;expires=Thu, 01 Jan 1970 00:00:00 GMT";

        hashHistory.replace('/');
        this.emit("change");
    }

    login(user, accessToken, refreshToken, remember) {
        this.isUserLoggedIn = true;
        this.user = user;
        this.accessToken = accessToken;
        this.refreshToken = refreshToken;

        if(remember) {
            document.cookie = "userId=" + user.id;
            document.cookie = "at=" + accessToken;
            document.cookie = "rt=" + refreshToken;
        }

        hashHistory.replace('/');

        //console.log(this.isUserLoggedIn);
        //console.log(this.user);
        //console.log(this.accessToken);
        //console.log(this.refreshToken);

        this.emit("change");
    }

    handleActions(action) {
        switch(action.type) {
            case "LOGOUT_ACTION":{
                this.logout();
                break;
            }
            case "LOGIN_SUCCESS_ACTION": {
                this.login(action.user, action.accessToken, action.refreshToken, action.remember);
                break;
            }
            case "LOGIN_FAILED_ACTION": {
                this.loginFailure = true;
                this.emit("change");
                break;
            }
        }
    }
}

const userStore = new UserStore;
dispatcher.register(userStore.handleActions.bind(userStore));
export default userStore;