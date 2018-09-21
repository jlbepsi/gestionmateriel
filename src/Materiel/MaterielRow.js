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

        let quantityClass = "";
        if (materiel.quantitystock < 2) {
            quantityClass = "QtyDanger";
        } else if (materiel.quantitystock < 5) {
            quantityClass = "QtyWarning";
        }

        return (
            <tr className={quantityClass}>
                <td>{materiel.description}</td>
                <td>{materiel.quantitystock}</td>
                <td>{materiel.quantityused}</td>
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