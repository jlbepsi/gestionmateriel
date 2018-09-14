import React, { Component } from 'react';
import { Button } from 'reactstrap';
import { Link } from "react-router-dom";

import PortablesFilterBar from "./PortablesFilterBar";
import PortableTable from './PortableTable'
import PortableAPI from '../WebService/PortableAPI'
import AuthService from "../Security/AuthService";


class Portables extends Component {

    constructor(props) {
        super(props);
        this.state = {
            identifiantText: '',
            emprunteurText: '',
            ramMin: '',
            portableLibre: false,
            laptops: []
        };

        this.handleIdentifiantTextChange = this.handleIdentifiantTextChange.bind(this);
        this.handleEmprunteurTextChange = this.handleEmprunteurTextChange.bind(this);
        this.handleRamChange = this.handleRamChange.bind(this);
        this.handlePortableLibre = this.handlePortableLibre.bind(this);
        this.deleteItem = this.deleteItem.bind(this);

        this.portableAPI = new PortableAPI();
    }

    componentDidMount() {
        this.portableAPI.getPortables()
            .then(data => {
                this.setState({laptops: data})
            })
    }

    deleteItem(id) {
        console.log("id=" + id);

        const portable = this.state.laptops.find( laptop => laptop.id === id);
        if (window.confirm("Confirmer la suppression du portable '"+ portable.identifiant +"' ?")) {

            /** TODO : faire la supression via l'API Portable **/

            this.portableAPI.deletePortable(id)
                . then(data => {
                    let newItems = this.state.laptops.filter((item) => {
                        return item.id !== id
                    });
                    this.setState({laptops: newItems});
                })
                .catch(err => {
                    alert('La suppression a échoué');
                    console.error('Suppression impossible ', err)
                });
        }
    }

    handleIdentifiantTextChange(filterText) {
        this.setState({
            identifiantText: filterText
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

    handlePortableLibre(portableLibre) {
        this.setState({
            portableLibre: portableLibre
        })
    }

    render() {
        const profil = AuthService.getProfile();
        const roles = profil.roles;
        const canModify = (roles.includes('ROLE_SUPER_ADMIN'));

        return (
            <div className="main">

                <h3>Liste des portables</h3>

                {canModify &&
                <div>
                    <Button tag={Link} to="/portable/new" color="primary" size="sm">Nouveau portable</Button>
                    <br />
                    <br />
                </div>
                }

                <PortablesFilterBar
                    identifiantText={this.state.identifiantText}
                    emprunteurText={this.state.emprunteurText}
                    ramMin={this.state.ramMin}
                    onIdentifiantTextChange={this.handleIdentifiantTextChange}
                    onEmprunteurTextChange={this.handleEmprunteurTextChange}
                    onRamChange={this.handleRamChange}
                    onPortableLibre={this.handlePortableLibre}
                />

                <PortableTable
                    laptops={this.state.laptops}
                    canModify={canModify}
                    identifiantText={this.state.identifiantText}
                    emprunteurText={this.state.emprunteurText}
                    ramMin={this.state.ramMin}
                    portableLibre={this.state.portableLibre}
                    deleteItem ={this.deleteItem}
                />
            </div>


        );
    }
}

export default Portables;
