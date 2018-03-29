import dispatcher from "../dispatcher.js";

export function fetchPlaces(criteria) {
    setTimeout(function() {
        dispatcher.dispatch({type: "FETCH_PLACES_STARTED"})
        fetch('http://localhost:8080/places/searches', {
            method: 'POST',
            body: JSON.stringify(criteria),
            headers: {
                'Authorization': 'Basic c3BvdGZpbmRlcjpzcG90ZmluZGVyU2VjcmV0',
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
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
        fetch('http://localhost:8080/places',{
            method: 'POST',
            body: JSON.stringify(place),
            headers: {
                'Authorization': 'Basic c3BvdGZpbmRlcjpzcG90ZmluZGVyU2VjcmV0',
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
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
            Promise
                .resolve(error.json())
                .then(errors => {
                    dispatcher.dispatch({type: "UPLOAD_PLACES_ERROR", errors: errors});
                });
        });
    }, 1);
}

export function downloadPlace(id) {
    setTimeout(function() {
        dispatcher.dispatch({
            type: "DOWNLOAD_PLACE_STARTED", 
            id: id
        });

        fetch('http://localhost:8080/places/' + id, {
            method: "GET",
            headers: {
                'Authorization': 'Basic c3BvdGZpbmRlcjpzcG90ZmluZGVyU2VjcmV0',
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
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