import React, { Component } from 'react';
import { Table } from 'reactstrap';

import PortableRow from './PortableRow'

// https://reactjs.org/docs/thinking-in-react.html


class PortableTable extends Component {

    render() {
        const identifiantText = this.props.identifiantText.toLowerCase();
        const emprunteurText = this.props.emprunteurText.toLowerCase();
        const ramMin = this.props.ramMin;
        const portableLibre = this.props.portableLibre;
        const rows = [];

        let portableEmprunte = true;

        this.props.laptops.forEach((laptop) => {

            portableEmprunte = (laptop.dateEmprunt != null);

            if (portableLibre && portableEmprunte) {
                return;
            }
            if (laptop.memory < ramMin) {
                return;
            }
            if (laptop.identifiant.toLowerCase().indexOf(identifiantText) === -1) {
                return;
            }
            if (emprunteurText !== '' &&
                (portableEmprunte ||
                    (laptop.emprunteur != null && laptop.emprunteur.nom.toLowerCase().indexOf(emprunteurText) === -1))) {
                return;
            }

            rows.push(
                <PortableRow
                    laptop={laptop}
                    key={laptop.id}
                />
            );
        });

        return (
            <div>
                <span>{this.props.laptops.length} portable(s) trouvé(s)</span>
                <Table size="sm" bordered striped>
                    <thead>
                        <tr>
                            <th width="120">Identifiant</th>
                            <th>Libellé</th>
                            <th>Processeur</th>
                            <th width="120">Mémoire</th>
                            <th>Disque</th>
                            <th>Emprunté par</th>
                            <th width="120"></th>
                            <th></th>
                        </tr>

                    </thead>
                    <tbody>{rows}</tbody>
                </Table>
            </div>
        )
    }


}

export default PortableTable;