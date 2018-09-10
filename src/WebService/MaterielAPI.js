import AuthService from "../Security/AuthService";

export default class MaterielAPI {
    static BASE_URL = 'http://localhost:8080/api/portables';

    // Initializing important variables
    constructor(domain) {
        this.domain = domain || 'http://localhost:8080/api/' // API server domain
    }

    /*
     * Gestion des portables
     *
     */
    getPortables() {
        return fetch(MaterielAPI.BASE_URL)
            .then(MaterielAPI._checkStatus)
            .then(response => response.json())
    }
    getPortable(id) {
        return fetch(MaterielAPI.BASE_URL + '/' + id)
            .then(MaterielAPI._checkStatus)
            .then(response => response.json())
    }

    emprunterPortable(portable) {
        // Données
        let fetchData = {
            method: 'PUT',
            headers: {
                'Content-Type' : 'application/json',
                'Authorization' : 'Bearer ' + AuthService.getToken()
            },
            body: JSON.stringify(portable)
        };


        const url = MaterielAPI.BASE_URL + '/emprunter/' + portable.id;

        return fetch(url, fetchData)
            .then(MaterielAPI._checkStatus)
            .then(response => response.json())
    }


    static _checkStatus(response) {
        // raises an error in case response status is not a success
        if (response.status >= 200 && response.status < 300) { // Success status lies between 200 to 300
            return response;
        }

        throw new Error(response.statusText);
    }
}