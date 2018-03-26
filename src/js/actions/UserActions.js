import dispatcher from "../dispatcher.js";
import base64 from 'base-64';

export function login(username, password, remember) {
    const loginUrlWithParams = window.BASE_URL + "/user/login?email="+username+"&password="+password;
    const headers = new Headers();
    headers.append('Authorization', 'Basic ' + base64.encode("spotfinder" + ":" + "spotfinderSecret"));
    let userJson = {};

    setTimeout(function() {
        fetch(loginUrlWithParams, {
            method: "GET",
            headers: headers
        })
        .then(response => response.json())
        .then(result => {

            if(result.email !== undefined){
                userJson = result;
                var data = new URLSearchParams();
                data.append('username', userJson.id);
                data.append('password', password);
                data.append('grant_type', 'password');
            
                const oauthUrl = window.BASE_URL + "/oauth/token";
                fetch(oauthUrl, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded',
                        'Authorization' : 'Basic c3BvdGZpbmRlcjpzcG90ZmluZGVyU2VjcmV0'
                    },
                    body: data
                }).then(response => response.json())
                .then(result => {
                    dispatcher.dispatch({
                        type: "LOGIN_SUCCESS_ACTION",
                        user: userJson, 
                        accessToken: result.access_token,
                        refreshToken: result.refresh_token,
                        remember: remember
                    });
                });
            } else {
                dispatcher.dispatch({type: "LOGIN_FAILED_ACTION"});
            }
        })
        .catch(err => {
            dispatcher.dispatch({type: "LOGIN_FAILED_ACTION"});
        });
    }, 1);
}

export function logout() {
    // fetch("/logout", {
    //     method: "POST",
    //     credentials: 'same-origin'
    // }).then(result => console.log(result));
    dispatcher.dispatch({type: "LOGOUT_ACTION"});
}

export function fetchUserInfo(userId, accessToken, refreshToken) {
    const fetchUserInfoUrl = "http://80.211.223.50:8080" + "/user/info/" + userId;

    fetch(fetchUserInfoUrl, {
        method: 'GET',
        headers: {
            'Authorization' : 'Basic c3BvdGZpbmRlcjpzcG90ZmluZGVyU2VjcmV0'
        },
    })
    .then(response => response.json())
    .then(result => {
        dispatcher.dispatch({
            type: "LOGIN_SUCCESS_ACTION",
            user: result, 
            accessToken: accessToken,
            refreshToken: refreshToken,
            remember: true
        });
    });
}