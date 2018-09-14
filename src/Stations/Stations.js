import React, { Component } from 'react';
import { Button, Table } from 'reactstrap';
import {Link} from "react-router-dom";

import AuthService from "../Security/AuthService";
import StationAPI from "../WebService/StationAPI";
import StationsFilterBar from "../Stations/StationsFilterBar";
import StationTable from "../Stations/StationTable";

class Stations extends Component {

    constructor(props) {
        super(props);
        this.state = {
            emprunteurText: '',
            libelleText: '',
            stationLibre: false,
            stations: []
        };

        this.handleLibelleTextChange = this.handleLibelleTextChange.bind(this);
        this.handleEmprunteurTextChange = this.handleEmprunteurTextChange.bind(this);
        this.handleStationLibre = this.handleStationLibre.bind(this);
        this.deleteItem = this.deleteItem.bind(this);

        this.stationAPI = new StationAPI();
    }

    componentDidMount() {
        this.stationAPI.getStations()
            .then(data => {
                this.setState({stations: data})
            })
    }

    deleteItem(id) {
        console.log("id=" + id);

        const station = this.state.stations.find( station => station.id === id);
        if (window.confirm("Confirmer la suppression de la station '"+ station.libelle +"' ?")) {
            this.stationAPI.deleteStation(id)
                . then(data => {
                    let newItems = this.state.stations.filter((item) => {
                        return item.id !== id
                    });
                    this.setState({stations: newItems});
                })
                .catch(err => {
                    alert('La suppression a échoué');
                    console.error('Suppression impossible ', err)
                });
        }
    }

    handleLibelleTextChange(libelleText) {
        this.setState({
            libelleText: libelleText
        });
    }

    handleEmprunteurTextChange(filterText) {
        this.setState({
            emprunteurText: filterText
        });
    }

    handleStationLibre(stationLibre) {
        this.setState({
            stationLibre: stationLibre
        })
    }


    render() {
        const profil = AuthService.getProfile();
        const roles = profil.roles;
        const canModify = (roles.includes('ROLE_SUPER_ADMIN'));

        return (
            <div className="main">

                <h3>Liste des stations</h3>

                {canModify &&
                <div>
                    <Button tag={Link} to="/station/new" color="primary" size="sm">Nouvelle station</Button>
                    <br />
                    <br />
                </div>
                }

                <StationsFilterBar
                    libelleText={this.state.libelleText}
                    emprunteurText={this.state.emprunteurText}
                    onLibelleTextChange={this.handleLibelleTextChange}
                    onEmprunteurTextChange={this.handleEmprunteurTextChange}
                    onStationLibre={this.handleStationLibre}
                />

                <StationTable
                    stations={this.state.stations}
                    canModify={canModify}
                    libelleText={this.state.libelleText}
                    emprunteurText={this.state.emprunteurText}
                    stationLibre={this.state.stationLibre}
                    deleteItem ={this.deleteItem}
                />

            </div>


        );
    }
}

export default Stations;
