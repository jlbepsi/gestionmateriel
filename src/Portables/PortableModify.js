import React, { Component } from 'react'
import { Col, Button, Form, FormGroup, Label, Input } from 'reactstrap';

import PortableAPI from "../WebService/PortableAPI";

class PortableModify extends Component {

    constructor(props) {
        super(props);

        this.title = "";
        this.state = {
            laptop: {
                id : 0,
                libelle : '',
                description : '',
                mi : '',
                numserie : '',
                couleur : '',
                marque : '',
                memory : 4,
                screen : 0,
                cpu : '',
                hdd1 : 0,
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

        // Gestion des portables
        this.portablesAPI = new PortableAPI();
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

        let laptop = {...this.state.laptop, [name]: value};
        this.setState({laptop});
    }

    render() {
        return (
            <div className="main">
                <h3>{this.title}</h3>

                <Form onSubmit={this.handleSubmit}>

                    <FormGroup>
                        <Label for="mi">Numéro MI</Label>
                        <Input type="text" name="mi" id="mi"
                               value={this.state.laptop.mi}
                               onChange={this.handleInputChange} />
                    </FormGroup>

                    <FormGroup>
                        <Label for="numserie">Numéro de série</Label>
                        <Input type="text" name="numserie" id="numserie"
                               value={this.state.laptop.numserie}
                               onChange={this.handleInputChange} />
                    </FormGroup>

                    <FormGroup>
                        <Label for="marque">Marque</Label>
                            <Input type="text" name="marque" id="marque"
                                   value={this.state.laptop.marque}
                                   onChange={this.handleInputChange} />
                    </FormGroup>

                    <FormGroup>
                        <Label for="libelle">Libellé</Label>
                        <Input type="text" name="libelle" id="libelle"
                               value={this.state.laptop.libelle}
                               onChange={this.handleInputChange} />
                    </FormGroup>

                    <FormGroup>
                        <Label for="description">Description</Label>
                        <Input type="text" name="description" id="description"
                               value={this.state.laptop.description}
                               onChange={this.handleInputChange} />
                    </FormGroup>

                    <FormGroup>
                        <Label for="couleur">Couleur</Label>
                        <Input type="text" name="couleur" id="couleur"
                               value={this.state.laptop.couleur}
                               onChange={this.handleInputChange} />
                    </FormGroup>

                    <FormGroup>
                        <Label for="screen">Ecran</Label>
                        <select className="form-control" name="screen" id="screen"
                                value={this.state.laptop.screen}
                                onChange={this.handleSelectChange}>
                            <option value='13'>13</option>
                            <option value='14'>14</option>
                            <option value='15'>15</option>
                            <option value='17'>17</option>
                        </select>
                    </FormGroup>

                    <FormGroup>
                        <Label for="cpu">Processeur</Label>
                        <Input type="text" name="cpu" id="cpu"
                               value={this.state.laptop.cpu}
                               onChange={this.handleInputChange} />
                    </FormGroup>

                    <FormGroup>
                    <Label for="memory">Mémoire</Label>
                        <select className="form-control" name="memory" id="memory"
                                value={this.state.laptop.memory}
                                onChange={this.handleSelectChange}>
                            <option value='2'>2</option>
                            <option value='4'>4</option>
                            <option value='6'>6</option>
                            <option value='8'>8</option>
                            <option value='12'>12</option>
                            <option value='16'>16</option>
                        </select>
                    </FormGroup>

                    <FormGroup>
                        <Label for="hdd1">Disque 1</Label>
                        <select className="form-control" name="hdd1" id="hdd1"
                                value={this.state.laptop.hdd1}
                                onChange={this.handleSelectChange}>
                            <option value="300">300 Go</option>
                            <option value="320">320 Go</option>
                            <option value="512">500 Go</option>
                            <option value="600">600 Go</option>
                            <option value="750">750 Go</option>
                            <option value="1024">1 To</option>
                            <option value="1536">1,5 To</option>
                            <option value="2048">2 To</option>
                            <option value="3072">3 To</option>
                            <option value="4096">4 To</option>
                        </select>
                    </FormGroup>

                    <FormGroup>
                        <Label for="hdd2">Disque 2</Label>
                        <select className="form-control" name="hdd2" id="hdd2"
                                value={this.state.laptop.hdd2}
                                onChange={this.handleSelectChange}>
                            <option value="0">Aucun</option>
                            <option value="300">300 Go</option>
                            <option value="320">320 Go</option>
                            <option value="512">500 Go</option>
                            <option value="600">600 Go</option>
                            <option value="750">750 Go</option>
                            <option value="1024">1 To</option>
                            <option value="1536">1,5 To</option>
                            <option value="2048">2 To</option>
                            <option value="3072">3 To</option>
                            <option value="4096">4 To</option>
                        </select>
                    </FormGroup>


                    <FormGroup>
                        <Button color='primary' >Enregistrer</Button>
                    </FormGroup>
                </Form>
            </div>
        )
    }
}

export default PortableModify;