import React, { Component } from 'react';
import { Col, Button, Input, Label, Row, Table, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';

class UsersSelect extends Component{
    static BASE_URL = 'http://192.168.100.185:8081/api/users';

    constructor(props) {
        super(props);

        this.state = {
            modal: false,
            filterUser: '',
            classeId: '',
            users: []
        };

        this.handleUserTextChange = this.handleUserTextChange.bind(this);
        this.handleClasseChange = this.handleClasseChange.bind(this);
        this.selectUser = this.selectUser.bind(this);
        this.toggle = this.toggle.bind(this);
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

    toggle() {
        this.setState({
            modal: !this.state.modal
        });
    }

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

            rows.push(<tr key="{user.login}"><td width="175px">{user.nom}</td><td width="175px">{user.prenom}</td>
                <td width="70px">{user.classe}</td>
                <td width="110px"><Button color="success" size="sm" onClick={() => this.selectUser(user)}>Sélectionner</Button></td>
            </tr>);
        });

        let width;
        return (
            <div>
                <Button color="success" onClick={this.toggle}>Sélectionner un emprunteur</Button>
                <Modal isOpen={this.state.modal} toggle={this.toggle} size="lg">
                    <ModalHeader toggle={this.toggle}>Sélectionner un emprunteur</ModalHeader>
                    <ModalBody>
                        <Row>
                            <Label for="classe" sm={3}>Nom de l'emrunteur :</Label>
                            <Col sm={9}>
                                <Input type="text" name="text" id="emprunteurText"
                                       placeholder="commence par ..."
                                       value={this.state.filterUser}
                                       onChange={this.handleUserTextChange}
                                />
                            </Col>
                        </Row>
                        <Row>
                            <Label for="classe" sm={3}>Classe</Label>
                            <Col sm={9}>
                                <select className="form-control" name="classe" id="classe"
                                        value={this.props.classe}
                                        onChange={this.handleClasseChange}>
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
                        </Row><br/>

                        <Row>
                            <Label for="classe" sm={3}>Etudiants</Label>
                            <Col sm={9}>
                                <Table size="sm" bordered striped condensed  className="fixed_header">
                                    <thead>
                                    <tr>
                                        <th width="175px">Nom</th>
                                        <th width="175px">Prénom</th>
                                        <th width="70px">Classe</th>
                                        <th width="110px">&nbsp;</th>
                                    </tr>

                                    </thead>
                                    <tbody>{rows}</tbody>
                                </Table>
                            </Col>
                        </Row>
                    </ModalBody>
                    <ModalFooter>
                        <Button color="primary" onClick={this.toggle}>Fermer</Button>
                    </ModalFooter>
                </Modal>

            </div>
        );
    }

}

export default UsersSelect;