import React, { Component } from 'react';

import AuthService from "./AuthService";


class Profil extends Component {

    constructor(props) {
        super(props);
    }

    render() {
        const profil = AuthService.getProfile();

        console.log(profil);
        return (
            <div>
                <p>Profil : </p>
                <ul>
                    <li>{profil.sub}</li>
                    <li>{profil.nom}</li>
                    <li>{profil.prenom}</li>
                    <li>{profil.classe}</li>
                    <li>{profil.mail}</li>
                    <li>{profil.roles}</li>
                </ul>
            </div>
        );
    }
}

export default Profil;