import React, { Component } from 'react';
import { Button, Table } from 'reactstrap';

class Materiels extends Component {
    state =  {
        materiels: [],
        materiels2 : [
            { id: 1, libelle: 'lib mat 1', descriptif: 'desc mat 1' },
            { id: 2, libelle: 'lib mat 2', descriptif: 'desc mat 2' },
            { id: 3, libelle: 'lib mat 3', descriptif: 'desc mat 3' },
            { id: 4, libelle: 'lib mat 4', descriptif: 'desc mat 4' }
        ]
    }

    componentDidMount() {
        fetch('http://localhost:8080/api/computers')
        .then(result => {
            return result.json()
        })
        .then(data => {
            this.setState({materiels: data})
        })
    }

    displayMaterielItem(items) {
        return (
            items.map((materiel, index) =>  (
                <tr>
                    <td>{materiel.libelle}</td>
                    <td>{materiel.description}</td>
                    <td>
                        <Button color="primary" size="sm">Modifier</Button>&nbsp;
                        <Button color="danger" size="sm" onClick={() => this.onDeleteClick(index)}>Supprimer</Button>
                    </td>
                </tr>
            ))
        );
    }

    onDeleteClick(index) {
        this.state.materiels2.splice(index, 1)
    }

    render() {
        return (
            <div className="main">

                <h3>Liste du matériel</h3>

                <p><a className="btn btn-primary btn-sm" href="">Nouveau matériel</a></p>

                <span>{this.state.materiels.length} matériels trouvés</span>


                <Table size="sm" bordered striped>
                    <thead>
                    <tr>
                        <th>Libellé</th>
                        <th>Descriptif</th>
                        <th width="240"></th>
                    </tr>

                    </thead>
                    <tbody>
                        {this.displayMaterielItem(this.state.materiels)}
                    </tbody>
                </Table>

            </div>


        );
    }
}

export default Materiels;
