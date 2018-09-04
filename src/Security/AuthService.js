import decode from 'jwt-decode';


export default class AuthService {
    // Initializing important variables
    constructor(domain) {
        this.domain = domain || 'http://localhost:8081/api/auth' // API server domain
        AuthService.fetch = AuthService.fetch.bind(this) // React binding stuff
        this.login = this.login.bind(this)
        this.getProfile = this.getProfile.bind(this)
    }

    login(username, password) {
        // Get a token from api server using the fetch api
        return AuthService.fetch(`${this.domain}/login`, {
            method: 'POST',
            body: JSON.stringify({
                username,
                password
            })
        }).then(res => {
            this.setToken(res.token) // Setting the token in localStorage
            return Promise.resolve(res);
        })
    }

    static loggedIn() {
        // Checks if there is a saved token and it's still valid
        const token = AuthService.getToken() // Getting token from localstorage
        return !!token && !AuthService.isTokenExpired(token) // handwaiving here
    }

    static isTokenExpired(token) {
        try {
            const decoded = decode(token);
            if (decoded.exp < Date.now() / 1000) { // Checking if token is expired. N
                return true;
            }
            else
                return false;
        }
        catch (err) {
            return false;
        }
    }

    static setToken(idToken) {
        // Saves user token to localStorage
        localStorage.setItem('id_token', idToken)
    }

    static getToken() {
        // Retrieves the user token from localStorage
        return localStorage.getItem('id_token')
    }

    static logout() {
        // Clear user token and profile data from localStorage
        localStorage.removeItem('id_token');
    }

    static getProfile() {
        // Using jwt-decode npm package to decode the token
        return decode(AuthService.getToken());
    }


    static fetch(url, options) {
        // performs api calls sending the required authentication headers
        const headers = {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        };

        // Setting Authorization header
        // Authorization: Bearer xxxxxxx.xxxxxxxx.xxxxxx
        if (AuthService.loggedIn()) {
            headers['Authorization'] = 'Bearer ' + AuthService.getToken()
        }

        return fetch(url, {
            headers,
            ...options
        })
            .then(AuthService._checkStatus)
            .then(response => response.json())
    }

    static _checkStatus(response) {
        // raises an error in case response status is not a success
        if (response.status >= 200 && response.status < 300) { // Success status lies between 200 to 300
            return response
        } else {
            var error = new Error(response.statusText)
            error.response = response
            throw error
        }
    }
}