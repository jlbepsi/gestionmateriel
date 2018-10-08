import React, { Component } from 'react';
import { Input, Form, Label } from 'reactstrap';


class PortablesFilterBar extends Component {
    constructor(props) {
        super(props);
        this.handleIdentifiantTextChange = this.handleIdentifiantTextChange.bind(this);
        this.handleEmprunteurTextChange = this.handleEmprunteurTextChange.bind(this);
        this.handleRamChange = this.handleRamChange.bind(this);
        this.handlePortableLibre = this.handlePortableLibre.bind(this);
    }


    handleIdentifiantTextChange(e) {
        this.props.onIdentifiantTextChange(e.target.value);
    }
    handleEmprunteurTextChange(e) {
        this.props.onEmprunteurTextChange(e.target.value);
    }

    handleRamChange(e) {
        this.props.onRamChange(e.target.value);
    }

    handlePortableLibre(e) {
        this.props.onPortableLibre(e.target.checked);
    }


    render() {
        return (
            <Form inline>
                <Label>
                    MI :
                    <Input type="text" name="text" id="identifiantText"
                           placeholder="Numéro du MI ..."
                           value={this.props.identifiantText}
                           onChange={this.handleIdentifiantTextChange}
                    />
                </Label>&nbsp;
                <Label>
                    RAM minimum :
                    <Input
                        type="text"
                        placeholder="RAM minimale en Go"
                        value={this.props.ramMin}
                        onChange={this.handleRamChange}
                    />
                </Label>&nbsp;
                <Label>
                    Nom de l'emrunteur :
                    <Input type="text"
                           placeholder="commence par ..."
                           value={this.props.emprunteurText}
                           onChange={this.handleEmprunteurTextChange}
                    />
                </Label>&nbsp;

                <Label check>
                    <Input type="checkbox"
                           value={this.props.portableLibre}
                           onChange={this.handlePortableLibre}
                    />{' '}
                    Portable libre uniquement
                </Label>
            </Form>
        )
    }
}

export default PortablesFilterBar;
