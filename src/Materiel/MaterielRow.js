import React, { Component } from 'react';
import { Button } from 'reactstrap';
import {Link} from "react-router-dom";

// https://reactjs.org/docs/thinking-in-react.html


class MaterielRow extends Component {
    render() {
        const canModify = this.props.canModify;
        const materiel = this.props.materiel;

        const emprunterPar = <td>&nbsp;</td>;
        let button = <td>&nbsp;</td>

        return (
            <tr>
                <td>{materiel.description}</td>
                <td>{materiel.quantitystock}</td>
                <td>{materiel.subcategory.category.libelle} {materiel.subcategory.libelle}</td>
                {emprunterPar}
                {button}
                {canModify &&
                <td>
                    <Button tag={Link} to={`/component/edit/${materiel.id}`} color="primary"
                            size="sm">Modifier</Button>&nbsp;
                    <Button color="danger" size="sm" onClick={() => this.deleteItem(materiel.id)}>Supprimer</Button>
                </td>
                }
            </tr>
        );
    }
}

export default MaterielRow;