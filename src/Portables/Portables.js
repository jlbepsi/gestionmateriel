import React, { Component } from 'react';
import { Button } from 'reactstrap';
import { Link } from "react-router-dom";

import PortablesFilterBar from "./PortablesFilterBar";
import PortableTable from './PortableTable'


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
    }

    componentDidMount() {
        fetch('http://localhost:8080/api/portables')
        .then(result => {
            return result.json()
        })
        .then(data => {
            this.setState({laptops: data})
        })
    }

    deleteItem(id) {
        console.log("id=" + id);

        /** TODO : faire la supression via l'API Materiel **/
        let newItems = this.state.laptops.filter( (item) => {
            return item.id !== id
        });
        this.setState({ laptops: newItems });
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
        return (
            <div className="main">

                <h3>Liste des portables</h3>

                <Button tag={Link} to="/portable/new" color="primary" size="sm">Nouveau portable</Button><br /><br />

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
                    identifiantText={this.state.identifiantText}
                    emprunteurText={this.state.emprunteurText}
                    ramMin={this.state.ramMin}
                    portableLibre={this.state.portableLibre}
                />
            </div>


        );
    }
}

export default Portables;
