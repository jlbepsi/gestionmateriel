import React, { Component } from 'react';
import { Button } from 'reactstrap';
import {Link} from "react-router-dom";

// https://reactjs.org/docs/thinking-in-react.html


class StationRow extends Component {

    getLibelle(value) {
        if (value != null && value.libelle != null)
            return value.libelle;

        return '-';
    }
    getLibelleWithComa(value) {
        if (value != null && value.libelle != null)
            return ', ' + value.libelle;

        return '';
    }

    render() {
        const canModify = this.props.canModify;
        const station = this.props.station;

        const emprunterPar = <td>&nbsp;</td>;
        let button = <td>&nbsp;</td>;

        let composants = 'Boitier: ' + station.boitier.libelle + '\n' + station.cartemere.libelle
                        + '(' + station.cpu.libelle + ', ' + station.ram1.libelle + this.getLibelleWithComa(station.ram2)
                        + this.getLibelleWithComa(station.ram3) + this.getLibelleWithComa(station.ram4) + ')';
        composants +=  '\nDisques: ' +  station.hdd1.libelle + this.getLibelleWithComa(station.hdd2) + this.getLibelleWithComa(station.hdd2)
                   + this.getLibelleWithComa(station.hdd3)+ this.getLibelleWithComa(station.hdd4)+ this.getLibelleWithComa(station.hdd5);
        composants += '\nCartes réseaux: ' + this.getLibelle(station.networkCard1) + this.getLibelleWithComa(station.networkCard2) + this.getLibelleWithComa(station.networkCard3);
        composants += '\nCarte graphique: ' + this.getLibelle(station.graphicCard);

        return (
            <tr>
                <td>{station.libelle}</td>
                <td>{station.place}</td>
                <td>{station.description}</td>
                <td><pre>{composants}</pre></td>
                {emprunterPar}
                {button}
                {canModify &&
                <td>
                    <Button tag={Link} to={`/component/edit/${station.id}`} color="primary"
                            size="sm">Modifier</Button>&nbsp;
                    <Button color="danger" size="sm" onClick={() => this.deleteItem(station.id)}>Supprimer</Button>
                </td>
                }
            </tr>
        );
    }
}

export default StationRow;