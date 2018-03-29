import React from "react";
import ReactDOM from "react-dom";
import { Router, Route, IndexRoute, hashHistory } from "react-router";

import Layout from "./components/Layout";
import Welcome from "./pages/Welcome.js";
import Login from "./pages/Login.js";
import PlacesMap from "./pages/PlacesMap.js";
import AddPlace from "./pages/AddPlace.js";
import PlaceSearchModal from "./pages/PlaceSearchModal.js";
import AddPlaceModal from "./pages/AddPlaceModal.js";
import PlacesList from "./pages/PlacesList.js";

import dispatcher from './dispatcher.js';

import  * as UserActions from './actions/UserActions.js';

window.BASE_URL = "http://localhost:8080";

ReactDOM.render(
    <Router history={hashHistory}>
        <Route path="/" component={Layout}>
            <IndexRoute component={Welcome}></IndexRoute>
            <Route path="/login" component={Login} > </Route>
            <Route path="/logout" component={Welcome} onEnter={() =>{ UserActions.logout(); }}> </Route>
            <Route path="/placesMap" component={PlacesMap}> </Route>
            <Route path="/placesList" component={PlacesList}> </Route>
            <Route path="/search" onEnter={ () => { searchPlaces(); }} />
            <Route path="/addPlace" onEnter={ () => { addPlace(); }} />
        </Route>
    </Router>,
    document.getElementById('app')
);

function searchPlaces() {
    hashHistory.goBack();
    document.getElementById("_modal").innerHTML = "";
    ReactDOM.render(
        <PlaceSearchModal />,
        document.getElementById("_modal")
    );
}

function addPlace() {
    hashHistory.goBack();
    document.getElementById("_modal").innerHTML = "";
    ReactDOM.render(
        <AddPlaceModal />,
        document.getElementById("_modal")
    );
}