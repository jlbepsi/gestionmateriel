import BaseAPI from "./BaseAPI";

export default class MaterielAPI extends BaseAPI {

    // Initializing important variables
    constructor() {
        super('http://localhost:8080/api/materiels');
    }

    /*
     * Gestion des materiels
     *
     */
    getMateriels() {
        return super.apiGetAll();
    }

    getMateriel(id) {
        return super.apiGet(id);
    }

    addMateriel(materiel) {
        return super.apiPost(materiel);
    }

    updateMateriel(materiel) {
        return super.apiPut(materiel.id, materiel);
    }

    deleteMateriel(idMateriel) {
        return super.apiDelete(idMateriel);
    }

    emprunterMateriel(materiel) {
        return super.apiPut('emprunter/' + materiel.id, materiel);
    }


    restituerMateriel(materiel) {
        return super.apiPut('restituer/' + materiel.id, materiel);
    }
}