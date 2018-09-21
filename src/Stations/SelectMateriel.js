import React, { Component } from 'react'


class SelectMateriel extends Component {

    constructor(props) {
        super(props);

        this.handleSelectChange = this.handleSelectChange.bind(this);
    }

    handleSelectChange(event) {
        const value = event.target.value;
        const name = event.target.name;

        const id = parseInt(value);
        let materiel = null;
        if (id !== 0) {
            materiel = this.props.optionsMateriel.find( materiel => materiel.id === id);

        }
        this.props.onChangeMateriel(name, materiel);
    }

    render() {
        const id = this.props.id;
        const materiel = this.props.materiel;
        //const options = this.props.optionsMateriel;
        const value = (materiel==null ? null : materiel.id);

        let options = [];
        if (this.props.optionAucun != null) {
            options.push(<option value='0'>{this.props.optionAucun}</option>);
        }


        if (this.props.optionsMateriel != null) {
            this.props.optionsMateriel.forEach((materiel) => {
                options.push(<option key={materiel.id} value={materiel.id}>{materiel.description}</option>);
            });
        }

        return (

            <select className="form-control" name={id} id={id}
                    value={value}
                    onChange={this.handleSelectChange}>
                    options={options}
            </select>
        )
    }
}

export default SelectMateriel;