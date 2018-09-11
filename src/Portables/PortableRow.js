import React, { Component } from 'react';
import { Button } from 'reactstrap';
import {Link} from "react-router-dom";

// https://reactjs.org/docs/thinking-in-react.html


class PortableRow extends Component {
    render() {
        const canModify = this.props.canModify;
        const laptop = this.props.laptop;

        const emprunterPar = laptop.dateEmprunt == null ?
            <td>&nbsp;</td> :
            <td>{laptop.emprunteur.nom} {laptop.emprunteur.prenom}</td>;

        let button;
        if (laptop.dateEmprunt == null) {
            button = <Button tag={Link} to={`/portable/emprunter/${laptop.id}`} outline color="primary" size="sm">Emprunter</Button>
        } else  {
            button = <Button tag={Link} to={`/portable/restituer/${laptop.id}`} color="success" size="sm">Restituer</Button>
        }

        let allHdd = "";
        if (laptop.hdd1 > 1023) {
            allHdd = (laptop.hdd1 / 1024) + " To";
        } else {
            allHdd = laptop.hdd1 + " Mo";
        }
        if (laptop.hdd2 > 0) {
            allHdd += " et ";
            if (laptop.hdd2 > 1023) {
                allHdd += (laptop.hdd2 / 1024) + " To";
            } else {
                allHdd += laptop.hdd2 + " Mo";
            }
        }



        return (
            <tr>
                <td>{laptop.identifiant}</td>
                <td>{laptop.libelle}</td>
                <td>{laptop.cpu}</td>
                <td>{laptop.memory} Go</td>
                {allHdd}
                {emprunterPar}
                <td>
                    {button}
                </td>
                (canModify &&
                <td>
                    <Button tag={Link} to={`/portable/edit/${laptop.id}`} color="primary" size="sm">Modifier</Button>&nbsp;
                    <Button color="danger" size="sm" onClick={() => this.deleteItem(laptop.id)}>Supprimer</Button>
                </td>
                )
            </tr>
        );
    }
}

export default PortableRow;