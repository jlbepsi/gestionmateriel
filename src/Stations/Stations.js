import React, { Component } from 'react';
import { Table } from 'reactstrap';

class Stations extends Component {
    state =  {
        stations: []
    }

    componentDidMount() {
        fetch('http://localhost:8080/api/computers')
        .then(result => {
            return result.json()
        })
        .then(data => {
            this.setState({stations: data})
        })
    }


    render() {
        return (
            <div className="main">

                <h3>Liste des stations</h3>

                <p><a className="btn btn-primary btn-sm" href="">Nouvelle station</a></p>

                <span>{this.state.stations.length} station(s) trouvée(s)</span>


                <Table size="sm" bordered striped>
                    <thead>
                    <tr>
                        <th>Libellé</th>
                        <th>Boitier</th>
                        <th>Processeur</th>
                        <th>Emplacement</th>
                        <th>Crée par</th>
                    </tr>

                    </thead>
                    <tbody>
                    {this.state.stations.map( (item) =>
                        <tr key={item.id}>
                            <td>{item.libelle}</td>
                            <td>{item.boitier.shortlibelle}</td>
                            {item.cpu != null ?
                                (<td> {item.cpu.shortlibelle}</td>) :
                                ( <td>Aucun</td>)
                            }
                            <td>{item.place}</td>
                            <td>{item.createur.nom} {item.createur.prenom} le {item.creationDate}</td>
                        </tr>
                    )}
                    </tbody>
                </Table>

            </div>


        );
    }
}

export default Stations;
