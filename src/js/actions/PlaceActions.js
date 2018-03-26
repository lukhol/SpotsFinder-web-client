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