import dispatcher from "../dispatcher.js";
import AppStore from "../stores/AppStore.js";
import base64 from 'base-64';

export function login(username, password, remember) {
    const loginUrlWithParams = AppStore.SERVER_URL + "/user/login?email="+username+"&password="+password;
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
                        'Authorization' : AppStore.getBasicAuthHeader()
                    },
                    body: data
                })
                .then(response => response.json())
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
    dispatcher.dispatch({type: "LOGOUT_ACTION"});
}

export function fetchUserInfo(userId, accessToken, refreshToken) {
    const fetchUserInfoUrl = AppStore.SERVER_URL + "/user/info/" + userId;

    fetch(fetchUserInfoUrl, {
        method: 'GET',
        headers: {
            'Authorization' : AppStore.getBasicAuthHeader()
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

export function register(firstname, lastname, email, password) {
    let user = {
        firstname: firstname,
        lastname: lastname,
        email: email,
        password: password
    };

    setTimeout(function() {
        dispatcher.dispatch({type: "REGISTRATION_START_ACTION"});

        fetch(AppStore.SERVER_URL + "/user/register", {
            method: "POST",
            headers: AppStore.getJsonBasicHeaders(),
            body: JSON.stringify(user)
        })
        .then(response => {
            if(response.status != 200)
                throw response;
            else
                return response;
        })
        .then(response => response.json())
        .then(result => {
            dispatcher.dispatch({type: "REGISTRATION_SUCCESS_ACTION"});
        })
        .catch(error => {
            Promise
                .resolve(error.json())
                .then(errors => {
                    dispatcher.dispatch({type: "REGISTRATION_FAILD_ACTION", errors: errors});
                });
        });
    }, 1);
}