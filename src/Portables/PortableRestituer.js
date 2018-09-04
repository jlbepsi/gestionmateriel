import React, { Component } from 'react'
import { Button, Form, FormGroup } from 'reactstrap';

import AuthService from "../Security/AuthService";

class PortableRestituer extends Component {
    static BASE_URL = 'http://localhost:8080/api/portables';

    constructor(props) {
        super(props);

        this.state = {
            laptop: {
                id : 0,
                libelle : '',
                libellecourt : '',
                description : '',
                identifiant : '',
                marque : '',
                memory : 4,
                screen : 15,
                cpu : '',
                hdd1 : 1024,
                hdd2 : 0,
                cdrom : 0,
                emprunteur : {
                    login: '',
                    prenom: '',
                    nom: '',
                    classe: '',
                    nomComplet: ''
                },
                dateEmprunt : null,
                validePar :  '',
                dateRetour : null,
                retourPar :  ''
            }
        };

        this.handleSubmit = this.handleSubmit.bind(this);
    }

    componentDidMount() {
        const {match: {params}} = this.props;
        const URL = PortableRestituer.BASE_URL + '/' + params.id;

        fetch(URL)
            .then(result => {
                return result.json()
            })
            .then(data => {
                this.setState({laptop: data})
            })
    }

    handleSubmit(event) {
        event.preventDefault();

        // Fixe les valeurs pour le portable
        // Validé par
        let profil = this.authenticationService.getProfile();
        this.state.laptop.retourPar = profil.sub;

        // The parameters we are gonna pass to the fetch function
        let fetchData = {
            method: 'PUT',
            headers: {
                Accept: 'application/json', 'Content-Type': 'application/json',
            },
            body: JSON.stringify(this.state.laptop)
        };

        const URL = PortableRestituer.BASE_URL + '/restituer/' + this.state.laptop.id;

        fetch(URL, fetchData)
            .then(response => {
                return response.json()
            })
            .then(data => {
                console.log(data);

                // Retour à la liste des portables
                this.props.history.push("/portables");
            })
            .catch(err => {
                console.error('Erreur de modification', err)
            });
    }

    render() {
        const fullName = this.state.laptop.emprunteur.nomComplet + " (" + this.state.laptop.emprunteur.classe + ")";

        let allHdd = "";
        if (this.state.laptop.hdd1 > 1023) {
            allHdd = (this.state.laptop.hdd1 / 1024) + " To";
        } else {
            allHdd = this.state.laptop.hdd1 + " Mo";
        }
        if (this.state.laptop.hdd2 > 0) {
            allHdd += " et ";
            if (this.state.laptop.hdd2 > 1023) {
                allHdd += (this.state.laptop.hdd2 / 1024) + " To";
            } else {
                allHdd += this.state.laptop.hdd2 + " Mo";
            }
        }

        return (
            <div className="main">
                <h3>Restituer un portable</h3>


                <div className="card border-info">
                    <div className="card-header bg-info">Portable : {this.state.laptop.identifiant}</div>
                    <div className="card-body">
                        <h5 className="card-title">{this.state.laptop.libelle}</h5>
                        <ul>
                            <li>Descriptif : {this.state.laptop.description}</li>
                            <li>Couleur : {this.state.laptop.couleur}</li>
                            <li>Mémoire: {this.state.laptop.memory} Go</li>
                            <li>Ecran: {this.state.laptop.screen} pouces</li>
                            <li>Disque: {allHdd}</li>
                        </ul>
                    </div>
                </div>

                <br />

                <div className="card border-success">
                    <div className="card-header bg-success text-white">Emprunteur : {fullName}</div>
                    <div className="card-body">
                        <h5 className="card-title">{fullName}</h5>
                        <Form onSubmit={this.handleSubmit} >
                            <FormGroup>
                                <Button color="success">Restituer</Button>
                            </FormGroup>
                        </Form>
                    </div>
                </div>
            </div>
        )
    }
}

export default PortableRestituer;