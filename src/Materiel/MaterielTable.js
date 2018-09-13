import React, { Component } from 'react';
import { Table } from 'reactstrap';

import MaterielRow from './MaterielRow'


class MaterielTable extends Component {


    render() {
        const libelleText = this.props.libelleText.toLowerCase();
        const materielLibre = this.props.materielLibre;
        const emprunteurText = this.props.emprunteurText;
        const rows = [];

        let materielEmprunte = true;

        const profil = AuthService.getProfile();
        const roles = profil.roles;
        const camModify = (roles.includes('ROLE_SUPERADMIN'));

        this.props.materiels.forEach((materiel) => {

            materielEmprunte = false; //(materiel.dateEmprunt != null);

            if (materielLibre && materielEmprunte) {
                return;
            }
            if (materiel.libelle.toLowerCase().indexOf(libelleText) === -1) {
                return;
            }
            /*if (emprunteurText !== '' &&
                (materielEmprunte ||
                    (materiel.emprunteur != null && materiel.emprunteur.nom.toLowerCase().indexOf(emprunteurText) === -1))) {
                return;
            }*/

            rows.push(
                <MaterielRow
                    materiel={materiel}
                    canModify={camModify}
                    key={materiel.id}
                />
            );
        });

        return (
            <div>
                <span>{this.state.materiels.length} matériels trouvés</span>
                <Table size="sm" bordered striped>
                    <thead>
                    <tr>
                        <th>Libellé</th>
                        <th>Descriptif</th>
                        <th width="240">&nbsp;</th>
                    </tr>

                    </thead>
                    <tbody>{rows}</tbody>
                </Table>

            </div>


        );
    }


}

export default MaterielTable;