import React, { Component } from 'react'
import { Alert, Button, Form, FormGroup } from 'reactstrap';

import UsersSelect from '../Users/UsersSelect'
import AuthService from "../Security/AuthService";

class PortableEmprunter extends Component {
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
                couleur : '',
                marque : '',
                memory : 4,
                screen : 15,
                cpu : '',
                hdd1 : 1024,
                hdd2 : 0,
                cdrom : 0,
                emprunteur : null,
                dateEmprunt : null,
                validePar : null,
                dateRetour : null,
                retourPar : null,
            },
            emprunteur: {
                login: '',
                prenom: '',
                nom: '',
                classe: '',
                nomComplet: ''
            },
            errorMessage: ''
        };


        this.onDismissAlert = this.onDismissAlert.bind(this);
        this.handleEmprunteurSelected = this.handleEmprunteurSelected.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    componentDidMount() {
        const {match: {params}} = this.props;
        const URL = PortableEmprunter.BASE_URL + '/' + params.id;

        fetch(URL)
            .then(result => {
                return result.json()
            })
            .then(data => {
                this.setState({laptop: data})
            })

    }

    onDismissAlert() {
        this.setState({ errorMessage: '' });
    }

    handleSubmit(event) {
        event.preventDefault();

        // Fixe les valeurs pour le portable
        // L'emprunteur :
        this.state.laptop.emprunteur = this.state.emprunteur;
        // Validé par
        let profil = AuthService.getProfile();
        this.state.laptop.validePar = profil.sub;

        // The parameters we are gonna pass to the fetch function
        let fetchData = {
            method: 'PUT',
            headers: {
                Accept: 'application/json', 'Content-Type': 'application/json',
            },
            body: JSON.stringify(this.state.laptop)
        };

        const URL = PortableEmprunter.BASE_URL + '/emprunter/' + this.state.laptop.id;

        AuthService.fetch(URL, fetchData)
            .then(data => {
                console.log(data);

                // Retour à la liste des portables
                this.props.history.push("/portables");
            })
            .catch(err => {
                console.error('Erreur de modification', err);

                this.setState({ errorMessage: err });
            });

        /*fetch(URL, fetchData
        )
            .then(response => {
                if (response.ok) {
                    return response.json();
                }
                // Raise an exception to reject the promise and trigger the outer .catch() handler.
                // By default, an error response status (4xx, 5xx) does NOT cause the promise to reject!
                throw Error(response.statusText);
            })
            .then(data => {
                console.log(data);

                // Retour à la liste des portables
                this.props.history.push("/portables");
            })
            .catch(err => {
                console.error('Erreur de modification', err);

                this.setState({ errorMessage: err });
            });*/
    }

    handleEmprunteurSelected(emprunteurSelected) {
        this.setState( {emprunteur: emprunteurSelected });
    }

    render() {
        const isEmprunteurPresent = (this.state.emprunteur.nomComplet.length !== 0);
        const fullName = isEmprunteurPresent === true ?
            this.state.emprunteur.nomComplet + " (" + this.state.emprunteur.classe + ")" :
            'Sélectionner un emprunteur';

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
                <h3>Emprunter un portable</h3>

                <div>
                    <Alert color="danger" isOpen={this.state.errorMessage !== ''} toggle={this.onDismissAlert} fade={false}>
                        {this.state.errorMessage}
                    </Alert>
                </div>



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
                        {isEmprunteurPresent === false &&
                        <h5 className="card-title">Sélectionner un emprunteur</h5>
                        }

                        {isEmprunteurPresent === true &&
                        <Form onSubmit={this.handleSubmit}>
                            <FormGroup row>
                                <Button color="primary">Emprunter</Button>
                            </FormGroup>
                        </Form>
                        }

                        <UsersSelect
                            userClasse = ''
                            userLogin = ''
                            onUserSelect={this.handleEmprunteurSelected}
                        />

                    </div>
                </div>
            </div>
        )
    }
}

export default PortableEmprunter;