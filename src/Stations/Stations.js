import React, { Component } from 'react';
import { Button, Table } from 'reactstrap';

class Stations extends Component {
    state =  {
        materiels: []
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

    deleteItem(id) {
        console.log("id=" + id);

        let newItems = this.state.materiels.filter( (item) => {
            return item.id !== id
        });
        this.setState({ materiels: newItems });
    }

    render() {
        return (
            <div className="main">

                <h3>Liste des stations</h3>

                <p><a className="btn btn-primary btn-sm" href="">Nouvelle station</a></p>

                <span>{this.state.materiels.length} station(s) trouvée(s)</span>


                <Table size="sm" bordered striped>
                    <thead>
                    <tr>
                        <th>Libellé</th>
                        <th>Boitier</th>
                        <th>Processeur</th>
                        <th>Emplacement</th>
                        <th>Crée par</th>
                        <th width="200"></th>
                    </tr>

                    </thead>
                    <tbody>
                    {this.state.materiels.map( (item) =>
                        <tr key={item.id}>
                            <td>{item.libelle}</td>
                            <td>{item.boitier.shortlibelle}</td>
                            {item.cpu != null ?
                                (<td> {item.cpu.shortlibelle}</td>) :
                                ( <td>Aucun</td>)
                            }
                            <td>{item.place}</td>
                            <td>{item.createur.nom} {item.createur.prenom} le {item.creationDate}</td>
                            <td>
                                <Button color="primary" size="sm">Modifier</Button>&nbsp;
                                <Button color="danger" size="sm" onClick={() => this.deleteItem(item.id)}>Supprimer</Button>
                            </td>
                        </tr>
                    )}
                    </tbody>
                </Table>

            </div>


        );
    }
}

export default Stations;
