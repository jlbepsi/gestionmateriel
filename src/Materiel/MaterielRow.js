import React, { Component } from 'react';
import { Button } from 'reactstrap';
import {Link} from "react-router-dom";

// https://reactjs.org/docs/thinking-in-react.html


class MaterielRow extends Component {
    render() {
        const canModify = this.props.canModify;
        const materiel = this.props.materiel;

        /*const emprunterPar = materiel.dateEmprunt == null ?
            <td>&nbsp;</td> :
            <td>{materiel.emprunteur.nom} {materiel.emprunteur.prenom}</td>;
*/
        let button;
        if (materiel.dateEmprunt == null) {
            button = <Button tag={Link} to={`/component/emprunter/${materiel.id}`} outline color="primary" size="sm">Emprunter</Button>
        } else  {
            button = <Button tag={Link} to={`/component/restituer/${materiel.id}`} color="success" size="sm">Restituer</Button>
        }

        return (
            <tr>
                <td>{materiel.libelle}</td>
                /*{emprunterPar}*/
                <td>
                    {button}
                </td>
                (canModify &&
                <td>
                    <Button tag={Link} to={`/component/edit/${materiel.id}`} color="primary" size="sm">Modifier</Button>&nbsp;
                    <Button color="danger" size="sm" onClick={() => this.deleteItem(materiel.id)}>Supprimer</Button>
                </td>
                )
            </tr>
        );
    }
}

export default MaterielRow;