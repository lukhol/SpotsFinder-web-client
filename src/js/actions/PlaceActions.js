import dispatcher from "../dispatcher.js";
import AppStore from "../stores/AppStore.js";

export function fetchPlaces(criteria) {
    setTimeout(function() {
        dispatcher.dispatch({type: "FETCH_PLACES_STARTED"})
        fetch(AppStore.SERVER_URL + '/places/searches', {
            method: 'POST',
            body: JSON.stringify(criteria),
            headers: AppStore.getJsonBasicHeaders()
        })
        .then(response => response.json())
        .then(result => {
            dispatcher.dispatch({
                type: "FETCH_PLACES_COMPLETED", 
                places: result
            });
        });
    }, 1)
}

//Here i should pass user access token too, but for now without it.
export function uploadPlace(place) {
    setTimeout(function() {
        dispatcher.dispatch({type: "UPLOAD_PLACE_STARTED"});
        fetch(AppStore.SERVER_URL + '/places',{
            method: 'POST',
            body: JSON.stringify(place),
            headers: AppStore.getJsonBearerHeaders()
        })
        .then(response => {
            if(response.status != 201) {
                throw response;
            } else {
                return response;
            }
        })
        .then(response => response.json())
        .then(result => {
            dispatcher.dispatch({
                type: "UPLOAD_PLACES_COMPLETED", 
                places: result
            });
        })
        .catch(error => {
            if(error.status == 401) {
                dispatcher.dispatch({type: "UNAUTHORIZED"});
            } else {
                Promise
                    .resolve(error.json())
                    .then(errors => {
                        dispatcher.dispatch({type: "UPLOAD_PLACES_ERROR", errors: errors});
                    });
            }
        });
    }, 1);
}

export function downloadPlace(id) {
    setTimeout(function() {
        dispatcher.dispatch({
            type: "DOWNLOAD_PLACE_STARTED", 
            id: id
        });

        fetch(AppStore.SERVER_URL + '/places/' + id, {
            method: "GET",
            headers: AppStore.getJsonBasicHeaders()
        })
        .then(response => response.json())
        .then(result => {
            dispatcher.dispatch({
                type: "DOWNLOAD_PLACE_COMPLETED",
                place: result
            });
        })
        .catch(error => {
            dispatcher.dispatch({
                type: "DOWNLOAD_PLACE_ERROR",
                error: "error do zrobienia - single place"
            });
        });
    }, 1);
}