import BaseAPI from "./BaseAPI";

export default class MaterielAPI extends  BaseAPI{
    
    // Initializing important variables
    constructor() {
        super('http://localhost:8080/api/portables');
    }

    /*
     * Gestion des portables
     *
     */
    getPortables() {
        return super.apiGetAll();
    }

    getPortable(id) {
        return super.apiGet(id);
    }

    addPortable(portable) {
        return super.apiPost(portable);
    }

    updatePortable(portable) {
        return super.apiPut(portable.id, portable);
    }

    deletePortable(idPortable) {
        return super.apiDelete(idPortable);
    }

    emprunterPortable(portable) {
        return super.apiPut('emprunter/' + portable.id, portable);
    }


    restituerPortable(portable) {
        return super.apiPut('restituer/' + portable.id, portable);
    }
}