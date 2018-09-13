import React, { Component } from 'react';
import { Button, Table } from 'reactstrap';

import AuthService from "../Security/AuthService";

import {Link} from "react-router-dom";
import MaterielAPI from "../WebService/MaterielAPI";
import MaterielsFilterBar from "../Materiel/MaterielsFilterBar";
import MaterielTable from "../Materiel/MaterielTable";

class Materiels extends Component {

    constructor(props) {
        super(props);
        this.state = {
            libelleText: '',
            materielLibre: false,
            emprunteurText: '',
            materiels: []
        };

        this.handleLibelleTextChange = this.handleLibelleTextChange.bind(this);
        this.handleMaterielLibre = this.handleMaterielLibre.bind(this);
        this.handleEmprunteurTextChange = this.handleEmprunteurTextChange.bind(this);

        this.materielAPI = new MaterielAPI();
    }


    componentDidMount() {
        this.materielAPI.getMateriels()
            .then(data => {
                this.setState({materiels: data})
            })
    }

    deleteItem(id) {
        console.log("id=" + id);

        /** TODO : faire la supression via l'API Materiel **/
        let newItems = this.state.materiels.filter( (item) => {
            return item.id !== id
        });
        this.setState({ materiels: newItems });
    }

    handleLibelleTextChange(filterText) {
        this.setState({
            libelleText: filterText
        });
    }

    handleEmprunteurTextChange(filterText) {
        this.setState({
            emprunteurText: filterText
        });
    }

    handleRamChange(ramMin) {
        this.setState({
            ramMin: ramMin
        })
    }

    handleMaterielLibre(materielLibre) {
        this.setState({
            materielLibre: materielLibre
        })
    }

    render() {
        const profil = AuthService.getProfile();
        const roles = profil.roles;
        const camModify = (roles.includes('ROLE_SUPERADMIN'));

        return (
            <div className="main">

                <h3>Liste du matériel</h3>

                (camModify &&
                <Button tag={Link} to="/materiel/new" color="primary" size="sm">Nouveau matériel</Button><br /><br />
                )


                <MaterielsFilterBar
                    libelleText={this.state.libelleText}
                    emprunteurText={this.state.emprunteurText}
                    materielLibre={this.state.materielLibre}
                    onLibelleTextChange={this.handleLibelleTextChange}
                    onEmprunteurTextChange={this.handleEmprunteurTextChange}
                    onMaterielLibre={this.handleMaterielLibre}
                />

                <MaterielTable
                    materiels={this.state.materiels}
                    camModify={camModify}
                    libelleText={this.state.libelleText}
                    emprunteurText={this.state.emprunteurText}
                    materielLibre={this.state.materielLibre}
                />
            </div>


        );
    }
}

export default Materiels;
