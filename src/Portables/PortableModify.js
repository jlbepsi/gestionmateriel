import React, { Component } from 'react'
import { Col, Button, Form, FormGroup, Label, Input, FormText } from 'reactstrap';

class PortableModify extends Component {

    constructor(props) {
        super(props);

        this.title = "";
        this.state = {
            testValueSelect: 'coconut',

            laptop: {
                id : 0,
                libelle : '',
                libellecourt : '',
                description : '',
                identifiant : '',
                marque : '',
                memory : 4,
                screen : 15,
                cpu : '',
                hdd1 : 1024,
                hdd2 : 0,
                cdrom : 0,
                emprunteur : null,
                dateEmprunt : null,
                validePar : null,
                dateRetour : null,
                retourPar : null,
            }
        };

        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleSelectChange = this.handleSelectChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    componentDidMount() {
        const {match: {params}} = this.props;

        console.log(params.id);
        fetch(`http://localhost:8080/api/portables/${params.id}`)
            .then(result => {
                return result.json()
            })
            .then(data => {
                this.setState({laptop: data})
            })
    }


    handleInputChange(event) {
        const {name, value} = event.target;
        let laptop = {...this.state.laptop, [name]: value};
        this.setState({laptop});

        /*const value = event.target.value;
        const name = 'laptop.' + event.target.name;

        this.setState({
            [name]: value
        });*/
    }

    handleSelectChange(event) {
        const value = event.target.value;
        const name = event.target.name;

        this.setState({
            [name]: value
        });
    }

    handleSubmit(event) {
        event.preventDefault();

        // The parameters we are gonna pass to the fetch function
        let fetchData = {
            method: 'PUT',
            headers: {
                Accept: 'application/json', 'Content-Type': 'application/json',
            },
            body: JSON.stringify(this.state.laptop)
        }

        fetch(`http://localhost:8080/api/portables/${this.state.laptop.id}`, fetchData
        )
            .then(response => {
                return response.json()
            })
            .then(data => {
                alert("Modifications enregistrées");
            })
            .catch(err => {
                console.error('Erreur de modification', err)
            });
    }

    render() {
        return (
            <div className="main">
                <h3>{this.title}</h3>

                <Form onSubmit={this.handleSubmit}>
                    <FormGroup row>
                        <Label for="identifiant" sm={2}>Identifiant</Label>
                        <Col sm={2}>
                            <Input type="text" name="identifiant" id="identifiant"
                                   value={this.state.laptop.identifiant}
                                   onChange={this.handleInputChange} />
                        </Col>

                        <Label for="marque" sm={1}>Marque</Label>
                        <Col sm={2}>
                            <Input type="text" name="marque" id="marque"
                                   value={this.state.laptop.marque}
                                   onChange={this.handleInputChange} />
                        </Col>
                    </FormGroup>

                    <FormGroup row>
                        <Label for="libelle" sm={2}>Libellé</Label>
                        <Col sm={5}>
                            <Input type="text" name="libelle" id="libelle"
                                   value={this.state.laptop.libelle}
                                   onChange={this.handleInputChange} />
                        </Col>

                        <Label for="libellecourt" sm={2}>Libellé court</Label>
                        <Col sm={2}>
                            <Input type="text" name="libellecourt" id="libellecourt"
                                   value={this.state.laptop.libellecourt}
                                   onChange={this.handleInputChange} />
                        </Col>
                    </FormGroup>

                    <FormGroup row>
                        <Label for="screen" sm={2}>Ecran</Label>
                        <Col sm={2}>
                            <select className="form-control" name="screen" id="screen"
                                    value={this.state.laptop.screen}
                                    onChange={this.handleSelectChange}>
                                <option value='13'>13</option>
                                <option value='14'>14</option>
                                <option value='15'>15</option>
                                <option value='17'>17</option>
                            </select>
                        </Col>

                        <Label for="cpu" sm={2}>Processeur</Label>
                        <Col sm={3}>
                            <Input type="text" name="cpu" id="cpu"
                                   value={this.state.laptop.cpu}
                                   onChange={this.handleInputChange} />
                        </Col>

                        <Label for="memory" sm={1}>Mémoire</Label>
                        <Col sm={2}>
                            <Input type="number" name="memory" id="memory"
                                   value={this.state.laptop.memory}
                                   onChange={this.handleInputChange} />
                        </Col>
                    </FormGroup>

                    <FormGroup row>
                        <Label for="hdd1" sm={2}>Disque 1 (Mo)</Label>
                        <Col sm={2}>
                            <Input type="number" name="hdd1" id="hdd1"
                                   value={this.state.laptop.hdd1}
                                   onChange={this.handleInputChange} />
                        </Col>

                        <Label for="hdd2" sm={2}>Disque 2 (Mo)</Label>
                        <Col sm={2}>
                            <Input type="number" name="hdd2" id="hdd2"
                                   value={this.state.laptop.hdd2}
                                   onChange={this.handleInputChange} />
                        </Col>
                    </FormGroup>

                    <FormGroup row>
                        <Col sm={{ size: 10, offset: 2 }}>
                            <Button color='primary' >Enregistrer</Button>
                        </Col>
                    </FormGroup>
                </Form>
            </div>
        )
    }
}

export default PortableModify;