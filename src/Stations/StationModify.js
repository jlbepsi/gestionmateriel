import React, { Component } from 'react'
import { Button, Form, FormGroup, Label, Input } from 'reactstrap';

import StationAPI from "../WebService/StationAPI";
import MaterielAPI from "../WebService/MaterielAPI";
import SelectMateriel from "./SelectMateriel";

class StationModify extends Component {

    constructor(props) {
        super(props);

        this.title = "";
        this.state = {
            boitiers: null,
            cartemeres: null,
            processeurs: null,
            disquesDurs: null,
            memoires: null,
            carteReseaux: null,
            carteGraphique: null,
            station: {
                id : 0,
                libelle : '',
                place : '',
                description : '',
                creationDate : null,
                updateDate : null,
                createur : null,
                replace : '',
                boitier: null,
                cartemere: null,
                cpu: null,
                ram1: null,
                ram2: null,
                ram3: null,
                ram4: null,
                hdd1: null,
                hdd2: null,
                hdd3: null,
                networkCard1: null,
                networkCard2: null,
                networkCard3: null,
                graphicCard: null,
                emprunteur : null,
                dateEmprunt : null,
                validePar : null,
                dateRetour : null,
                retourPar : null,
            }
        };

        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleSelectChange = this.handleSelectChange.bind(this);

        // Gestion des stations
        this.stationsAPI = new StationAPI();
        // Liste du matériel
        this.materielAPI = new MaterielAPI();
    }

    componentDidMount() {

        const {match: {params}} = this.props;

        this.materielAPI.getMateriels()
            .then(data => {
                //this.setState({materiels: data})

                let boitiers = [], cartemeres = [],
                    processeurs = [],
                    memoires = [],
                    disquesDurs = [],
                    carteReseaux = [],
                    carteGraphique = [];

                data.forEach((materiel) => {

                    switch (materiel.subcategory.category.id) {
                        case 1: // Boitier
                            boitiers.push(materiel);
                            break;
                        case 2: // Carte mère
                            cartemeres.push(materiel);
                            break;
                        case 3: // Processeur
                            processeurs.push(materiel);
                            break;
                        case 4: // Mémoires
                            memoires.push(materiel);
                            break;
                        case 5: // Disques durs
                            disquesDurs.push(materiel);
                            break;
                        case 6: // Cartes réseaux
                            carteReseaux.push(materiel);
                            break;
                        case 7: // Cartes graphiques
                            carteGraphique.push(materiel);
                            break;
                    }
                });

                this.setState({boitiers : boitiers});
                this.setState({cartemeres : cartemeres});
                this.setState({processeurs : processeurs});
                this.setState({memoires : memoires});
                this.setState({disquesDurs : disquesDurs});
                this.setState({carteReseaux : carteReseaux});
                this.setState({carteGraphique : carteGraphique});
            });

    }


    handleInputChange(event) {
        const {name, value} = event.target;
        let station = {...this.state.station, [name]: value};
        this.setState({station});
    }
    handleSelectChange(name, value) {
        console.log("name=" + name + ", value:");
        console.log(value);
        let station = {...this.state.station, [name]: value};
        this.setState({station});
    }

    render() {
        const station = this.state.station;
        console.log(station);

        return (
            <div className="main">
                <h3>{this.title}</h3>

                <Form onSubmit={this.handleSubmit}>

                    <FormGroup>
                        <Label for="libelle">Libellé</Label>
                        <Input type="text" name="libelle" id="libelle"
                               value={this.state.station.libelle}
                               onChange={this.handleInputChange} />
                    </FormGroup>

                    <FormGroup>
                        <Label for="place">Emplacement</Label>
                        <Input type="text" name="place" id="place"
                               value={this.state.station.place}
                               onChange={this.handleInputChange} />
                    </FormGroup>
                    <FormGroup>
                        <Label for="description">Description</Label>
                        <Input type="text" name="description" id="description"
                               value={this.state.station.description}
                               onChange={this.handleInputChange} />
                    </FormGroup>

                    <FormGroup>
                        <Label for="boitier">Boitier</Label>

                        <SelectMateriel id="boitier"
                            materiel={this.state.station.boitier}
                            onChangeMateriel={this.handleSelectChange}
                            optionsMateriel={this.state.boitiers}>
                        </SelectMateriel>

                    </FormGroup>

                    <FormGroup>
                        <Label for="cartemere">Carte mère</Label>

                        <SelectMateriel id="cartemere"
                                        materiel={this.state.station.cartemere}
                                        onChangeMateriel={this.handleSelectChange}
                                        optionsMateriel={this.state.cartemeres}>
                        </SelectMateriel>
                    </FormGroup>

                    <FormGroup>
                        <Label for="cpu">Processeur</Label>

                        <SelectMateriel id="cpu"
                                        materiel={this.state.station.cpu}
                                        onChangeMateriel={this.handleSelectChange}
                                        optionsMateriel={this.state.processeurs}>
                        </SelectMateriel>
                    </FormGroup>

                    <FormGroup>
                        <Label for="ram1">Ram - DIMM 1</Label>

                        <SelectMateriel id="ram1"
                                        materiel={this.state.station.ram1}
                                        onChangeMateriel={this.handleSelectChange}
                                        optionsMateriel={this.state.memoires}>
                        </SelectMateriel>
                    </FormGroup>

                    <FormGroup>
                        <Label for="ram2">Ram - DIMM 2</Label>

                        <SelectMateriel id="ram2"
                                        materiel={this.state.station.ram2}
                                        onChangeMateriel={this.handleSelectChange}
                                        optionsMateriel={this.state.memoires}>
                        </SelectMateriel>
                    </FormGroup>

                    <FormGroup>
                        <Label for="ram3">Ram - DIMM 3</Label>

                        <SelectMateriel id="ram3"
                                        materiel={this.state.station.ram3}
                                        onChangeMateriel={this.handleSelectChange}
                                        optionsMateriel={this.state.memoires}
                                        optionAucun={"Aucune"}>
                        </SelectMateriel>
                    </FormGroup>

                    <FormGroup>
                        <Label for="ram4">Ram - DIMM 4</Label>

                        <SelectMateriel id="ram4"
                                        materiel={this.state.station.ram4}
                                        onChangeMateriel={this.handleSelectChange}
                                        optionsMateriel={this.state.memoires}
                                        optionAucun={"Aucune"}>
                        </SelectMateriel>
                    </FormGroup>

                    <FormGroup>
                        <Label for="hdd1">Disque 1</Label>

                        <SelectMateriel id="hdd1"
                                        materiel={this.state.station.hdd1}
                                        onChangeMateriel={this.handleSelectChange}
                                        optionsMateriel={this.state.disquesDurs}>
                        </SelectMateriel>
                    </FormGroup>

                    <FormGroup>
                        <Label for="hdd2">Disque 2</Label>

                        <SelectMateriel id="hdd2"
                                        materiel={this.state.station.hdd2}
                                        onChangeMateriel={this.handleSelectChange}
                                        optionsMateriel={this.state.disquesDurs}
                                        optionAucun={"Aucun"}>
                        </SelectMateriel>
                    </FormGroup>

                    <FormGroup>
                        <Label for="hdd3">Disque 3</Label>

                        <SelectMateriel id="hdd3"
                                        materiel={this.state.station.hdd3}
                                        onChangeMateriel={this.handleSelectChange}
                                        optionsMateriel={this.state.disquesDurs}
                                        optionAucun={"Aucun"}>
                        </SelectMateriel>
                    </FormGroup>

                    <FormGroup>
                        <Label for="networkCard1">Carte réseau 1</Label>

                        <SelectMateriel id="networkCard1"
                                        materiel={this.state.station.networkCard1}
                                        onChangeMateriel={this.handleSelectChange}
                                        optionsMateriel={this.state.carteReseaux}
                                        optionAucun={"Aucune"}>
                        </SelectMateriel>
                    </FormGroup>

                    <FormGroup>
                        <Label for="networkCard2">Carte réseau 2</Label>

                        <SelectMateriel id="networkCard2"
                                        materiel={this.state.station.networkCard2}
                                        onChangeMateriel={this.handleSelectChange}
                                        optionsMateriel={this.state.carteReseaux}
                                        optionAucun={"Aucune"}>
                        </SelectMateriel>
                    </FormGroup>

                    <FormGroup>
                        <Label for="graphicCard">Carte graphique 1</Label>

                        <SelectMateriel id="graphicCard"
                                        materiel={this.state.station.graphicCard}
                                        onChangeMateriel={this.handleSelectChange}
                                        optionsMateriel={this.state.carteGraphique}
                                        optionAucun={"Aucune"}>
                        </SelectMateriel>
                    </FormGroup>

                    <FormGroup>
                        <Button color='primary' >Enregistrer</Button>
                    </FormGroup>
                </Form>
            </div>
        )
    }
}

export default StationModify;