import React, { Component } from 'react';
import { Col, Button, Input, Label, Row, Table } from 'reactstrap';

class UsersSelect extends Component{
    static BASE_URL = 'http://localhost:8081/api/users';

    constructor(props) {
        super(props);

        this.state = {
            filterUser: '',
            classeId: '',
            users: []
        };

        this.handleUserTextChange = this.handleUserTextChange.bind(this);
        this.handleClasseChange = this.handleClasseChange.bind(this);
        this.selectUser = this.selectUser.bind(this);
    }

    load(url) {
        fetch(url)
            .then(result => {
                console.log(result);

                if (result.status >= 200 && result.status < 300) {
                    result.json().then(data => {
                        console.log(data);

                        this.setState({users: data});
                    });
                } else {
                    alert('Erreur dans la récupération des données');
                }
            })

    }

    /*


    load(url) {
        fetch(url)
            .then(result => {
                if (result.status > 200 && result.status < 300)
                    return result.json();
                else
                    return null;
            })
            .then(data => {
                if (data == null)
                    this.setState({users: []});
                else
                    this.setState({users: data});
            });
    }

    componentDidMount() {
        this.load(UsersSelect.BASE_URL)
    }

    handleUserTextChange(event) {
        this.setState({filterUser: event.target.value});
    }

    handleClasseChange(event) {
        this.setState({classeId: event.target.value});

        const classe = event.target.value;
        const URL = UsersSelect.BASE_URL + (classe.length === 0 ? '' : '/classe/' + classe);
        this.load(URL);
    }*/

    handleUserTextChange(event) {
        this.setState({filterUser: event.target.value});
    }

    handleClasseChange(event) {
        this.setState({classeId: event.target.value});

        const classe = event.target.value;
        if (classe.length === 0) {
            this.setState({users: []})
        } else {
            const URL = UsersSelect.BASE_URL + '/classe/' + classe;
            this.load(URL);
        }
    }

    selectUser(user) {
        this.props.onUserSelect(user);
    }

    render() {
        const filterUser = this.state.filterUser.toLowerCase();
        const rows = [];

        this.state.users.forEach((user) => {
            if (filterUser !== '' &&
                (user.nom.toLowerCase().startsWith(filterUser) === false)) {
                return;
            }

            rows.push(<tr><td>{user.nom}</td><td>{user.prenom}</td>
                <td>{user.classe}</td>
                <td><Button color="success" size="sm" onClick={() => this.selectUser(user)}>Sélectionner</Button></td>
            </tr>);
        });

        return (
          <div>
              <Row>
                  <Label for="classe" sm={2}>Nom de l'emrunteur :</Label>
                  <Col sm={10}>
                      <Input type="text" name="text" id="emprunteurText"
                             placeholder="commence par ..."
                             value={this.state.filterUser}
                             onChange={this.handleUserTextChange}
                      />
                  </Col>
              </Row>
              <Row>
                  <Label for="classe" sm={2}>Classe</Label>
                  <Col sm={10}>
                      <select className="form-control" name="classe" id="classe"
                              value={this.props.classe}
                              onChange={this.handleClasseChange} >
                          <option value=''>Séléctionner une classe</option>
                          <optgroup label='EPSI'>
                              <option value='B1'>B1</option>
                              <option value='B2'>B2</option>
                              <option value='B3'>B3</option>
                              <option value='I4'>I4</option>
                              <option value='I5'>I5</option>
                          </optgroup>
                          <optgroup label='WIS'>
                              <option value='WIS1'>WIS1</option>
                              <option value='WIS2'>WIS2</option>
                              <option value='WIS3'>WIS3</option>
                              <option value='WIS4'>WIS4</option>
                              <option value='WIS5'>WIS5</option>
                          </optgroup>
                          <optgroup label='Autre'>
                              <option value='POE'>POE</option>
                              <option value='PROF'>Profs</option>
                          </optgroup>
                      </select>
                  </Col>
              </Row><br />

              <Row>
                  <Label for="classe" sm={2}>Etudiants</Label>
                  <Col sm={10}>
                      <Table size="sm" bordered striped condensed>
                          <thead>
                          <tr>
                              <th>Nom</th>
                              <th>Prénom</th>
                              <th>Classe</th>
                              <th>&nbsp;</th>
                          </tr>

                          </thead>
                          <tbody>{rows}</tbody>
                      </Table>
                  </Col>
              </Row>
          </div>
        );
    }

}

export default UsersSelect;