import AuthService from "../Security/AuthService";

export default class BaseAPI {

    // Initializing important variables
    constructor(domain) {
        this.domain = domain // API server domain
    }

    apiGetAll(){

        return fetch(this.domain)
            .then(BaseAPI._checkStatus)
            .then(response => response.json());
    }
    apiGet(id){

        const url = this.domain + '/' + id;
        return fetch(url)
            .then(BaseAPI._checkStatus)
            .then(response => response.json());
    }
    apiPost(data) {
        return this.apiFetchWithData(null, 'POST', data);
    }
    apiPut(idOrUrl, data) {
        return this.apiFetchWithData(idOrUrl, 'PUT', data);
    }
    apiDelete(id) {
        return this.apiFetchWithData(id, 'DELETE', null);
    }



    apiFetchWithData(urlToAdd, method, data) {

        // Données
        let fetchData = {
            method: method,
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + AuthService.getToken()
            },
            body: (data == null ? '' : JSON.stringify(data))
        };

        const url = this.domain + (urlToAdd == null ? '' : '/' + urlToAdd);

        return fetch(url, fetchData)
            .then(BaseAPI._checkStatus)
            .then(response => response.json());
    }


    static _checkStatus(response) {
        // raises an error in case response status is not a success
        if (response.status >= 200 && response.status < 300) { // Success status lies between 200 to 300
            return response;
        }

        throw new Error(response.statusText);
    }
}