import React, { Component } from 'react';
import { Input, Form, Label } from 'reactstrap';


class MaterielsFilterBar extends Component {
    constructor(props) {
        super(props);
        this.handleLibelleTextChange = this.handleLibelleTextChange.bind(this);
        this.handleEmprunteurTextChange = this.handleEmprunteurTextChange.bind(this);
        this.handleMaterielLibre = this.handleMaterielLibre.bind(this);
    }


    handleLibelleTextChange(e) {
        this.props.onLibelleTextChange(e.target.value);
    }
    handleEmprunteurTextChange(e) {
        this.props.onEmprunteurTextChange(e.target.value);
    }

    handleMaterielLibre(e) {
        this.props.onMaterielLibre(e.target.checked);
    }


    render() {
        return (
            <Form inline>
                <Label>
                    Libelle :
                    <Input type="text" name="text" id="libelleText"
                           placeholder="Libelle ..."
                           value={this.props.libelleText}
                           onChange={this.handleLibelleTextChange}
                    />
                </Label>&nbsp;
                <Label>
                    Nom de l'emrunteur :
                    <Input type="text"
                           placeholder="commence par ..."
                           value={this.props.filterText}
                           onChange={this.handleEmprunteurTextChange}
                    />
                </Label>&nbsp;

                <Label check>
                    <Input type="checkbox"
                           value={this.props.materielLibre}
                           onChange={this.handleMaterielLibre}
                    />{' '}
                    Materiel libre uniquement
                </Label>
            </Form>
        )
    }
}

export default MaterielsFilterBar;
