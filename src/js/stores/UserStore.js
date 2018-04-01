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

        //User
        this.user = {};
        this.isUserLoggedIn = false;
        this.accessToken = "";
        this.refreshToken = "";

        //Registration:
        this.registrationLoader = null;
        this.registraionLoader = false;
        this.registraionSuccess = false;
    }

    getCookie(name) {
        let match = document.cookie.match(new RegExp(name + '=([^;]+)'));
        if (match) 
            return match[1];
    }

    getMenuItems() {

        let login, placesMap, menuItems, search,placesList, addPlace,
            registerUser;

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

        registerUser = {
            title: "Rejestracja",
            link: "/registerUser",
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

            menuItems = [placesMap, placesList,search, registerUser, login];
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
        
        //Clear register state:!
        this.registrationLoader = null;
        this.registraionLoader = false;
        this.registraionSuccess = false;

        if(remember) {
            document.cookie = "userId=" + user.id;
            document.cookie = "at=" + accessToken;
            document.cookie = "rt=" + refreshToken;
        }

        hashHistory.replace('/');
        this.emit("change");
    }
    
    //Registraion: 
    registrationStart() {
        console.log("registraion start");
        this.registrationErrors = null;
        this.registrationLoader = true;
        this.registraionSuccess = false;
        this.emit("change");
    }

    registerUserFaild(errors) {
        console.log("registraion failed");
        this.registrationErrors = errors;
        this.registrationLoader = false;
        this.registraionSuccess = false;
        this.emit("change");
    }

    registrationUserSuccess() {
        console.log("registraion success");
        this.registrationErrors = null;
        this.registrationLoader = false;
        this.registraionSuccess = true;
        this.emit("change");
        hashHistory.replace("/login");
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
            case "UNAUTHORIZED" : {
                //TODO: logout and go to login page
                break;
            }
            case "REGISTRATION_START_ACTION": {
                this.registrationStart();
                break;
            }
            case "REGISTRATION_FAILD_ACTION": {
                this.registerUserFaild(action.errors);
                break;
            }
            case "REGISTRATION_SUCCESS_ACTION": {
                this.registrationUserSuccess();
                break;
            }
        }
    }
}

const userStore = new UserStore;
dispatcher.register(userStore.handleActions.bind(userStore));
export default userStore;