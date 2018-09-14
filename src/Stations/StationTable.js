import React, { Component } from 'react';
import { Table } from 'reactstrap';

import StationRow from "./StationRow";


class StationTable extends Component {


    render() {
        const libelleText = this.props.libelleText.toLowerCase();
        const stationLibre = this.props.stationLibre;
        const emprunteurText = this.props.emprunteurText;
        const canModify = this.props.canModify;
        const rows = [];

        let stationEmprunte = true;

        this.props.stations.forEach((station) => {

            stationEmprunte = false; //(station.dateEmprunt != null);

            if (stationLibre && stationEmprunte) {
                return;
            }
            if (station.libelle.toLowerCase().indexOf(libelleText) === -1) {
                return;
            }

            rows.push(
                <StationRow
                    station={station}
                    canModify={canModify}
                    key={station.id}
                />
            );
        });

        return (
            <div>
                <span>{this.props.stations.length} stations trouvées</span>
                <Table size="sm" bordered striped>
                    <thead>
                    <tr>
                        <th>Libelle</th>
                        <th>Emplacement</th>
                        <th>Description</th>
                        <th>Composants</th>
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

export default StationTable;