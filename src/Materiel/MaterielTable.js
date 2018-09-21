import React, { Component } from 'react';
import { Table } from 'reactstrap';

import MaterielRow from './MaterielRow'


class MaterielTable extends Component {


    render() {
        const libelleText = this.props.libelleText.toLowerCase();
        const materielLibre = this.props.materielLibre;
        const emprunteurText = this.props.emprunteurText;
        const canModify = this.props.canModify;
        const rows = [];

        let materielEmprunte = true;

        this.props.materiels.forEach((materiel) => {

            materielEmprunte = false; //(materiel.dateEmprunt != null);

            if (materielLibre && materielEmprunte) {
                return;
            }
            if (materiel.libelle.toLowerCase().indexOf(libelleText) === -1) {
                return;
            }

            rows.push(
                <MaterielRow
                    materiel={materiel}
                    canModify={canModify}
                    key={materiel.id}
                />
            );
        });

        return (
            <div>
                <span>{this.props.materiels.length} matériels trouvés</span>
                <Table size="sm" bordered striped>
                    <thead>
                    <tr>
                        <th>Description</th>
                        <th>Quantité en stock</th>
                        <th>Quantité utilisé</th>
                        <th>Catégorie</th>
                        <th>Emprunté par</th>
                        <th width="120">&nbsp;</th>
                        {canModify &&
                        <td>&nbsp;</td>
                        }
                    </tr>

                    </thead>
                    <tbody>{rows}</tbody>
                </Table>

            </div>


        );
    }


}

export default MaterielTable;