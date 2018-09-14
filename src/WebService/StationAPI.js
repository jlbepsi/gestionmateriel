import BaseAPI from "./BaseAPI";

export default class StationAPI extends BaseAPI {

    // Initializing important variables
    constructor() {
        super('http://localhost:8080/api/computers');
    }

    /*
     * Gestion des stations
     *
     */
    getStations() {
        return super.apiGetAll();
    }

    getStation(id) {
        return super.apiGet(id);
    }

    addStation(station) {
        return super.apiPost(station);
    }

    updateStation(station) {
        return super.apiPut(station.id, station);
    }

    deleteStation(idStation) {
        return super.apiDelete(idStation);
    }

    emprunterStation(station) {
        return super.apiPut('emprunter/' + station.id, station);
    }


    restituerStation(station) {
        return super.apiPut('restituer/' + station.id, station);
    }
}