import React, { Component } from 'react';
import { Button } from 'reactstrap';
import {Link} from "react-router-dom";

// https://reactjs.org/docs/thinking-in-react.html


class PortableRow extends Component {
    render() {
        const laptop = this.props.laptop;
        const portableLibre = (laptop.dateEmprunt == null);
        const canModify = (this.props.canModify && portableLibre);

        const emprunterPar = portableLibre ?
            <td>&nbsp;</td> :
            <td>{laptop.emprunteur.nom} {laptop.emprunteur.prenom}</td>;

        let button;
        if (portableLibre) {
            button = <Button tag={Link} to={`/portable/emprunter/${laptop.id}`} outline color="primary" size="sm">Emprunter</Button>
        } else  {
            button = <Button tag={Link} to={`/portable/restituer/${laptop.id}`} color="success" size="sm">Restituer</Button>
        }

        let allHdd = "";
        if (laptop.hdd1 > 1023) {
            allHdd = (laptop.hdd1 / 1024) + " To";
        } else {
            allHdd = laptop.hdd1 + " Go";
        }
        if (laptop.hdd2 > 0) {
            allHdd += " et ";
            if (laptop.hdd2 > 1023) {
                allHdd += (laptop.hdd2 / 1024) + " To";
            } else {
                allHdd += laptop.hdd2 + " Go";
            }
        }



        return (
            <tr>
                <td>{laptop.marque}-{laptop.id}</td>
                <td>{laptop.libelle}</td>
                <td>{laptop.cpu}</td>
                <td>{laptop.memory} Go</td>
                {allHdd}
                {emprunterPar}
                <td>
                    {button}
                </td>
                {canModify &&
                <td>
                    <Button tag={Link} to={`/portable/edit/${laptop.id}`} color="primary"
                            size="sm">Modifier</Button>&nbsp;
                    <Button color="danger" size="sm" onClick={() => this.props.deleteItem(laptop.id)}>Supprimer</Button>
                </td>
                }
            </tr>
        );
    }
}

export default PortableRow;