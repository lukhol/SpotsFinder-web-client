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
        .then(response => response.json())
        .then(result => {
            dispatcher.dispatch({
                type: "UPLOAD_PLACES_COMPLETED", 
                places: result
            });
        })
        .catch(error => {
            dispatcher.dispatch({type: "UPLOAD_PLACES_ERROR"});
        });
    }, 1);
}