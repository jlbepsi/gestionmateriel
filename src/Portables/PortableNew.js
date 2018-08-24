import React, { Component } from 'react'
import { Col, Button, Form, FormGroup, Label, Input, FormText } from 'reactstrap';
import PortableModify from "./PortableModify";

class PortableNew extends PortableModify {

    constructor(props) {
        super(props);

        this.title = "Ajout d'un portable";
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

    handleSubmit(event) {
        event.preventDefault();

        // The parameters we are gonna pass to the fetch function
        let fetchData = {
            method: 'POST',
            headers: {
                Accept: 'application/json', 'Content-Type': 'application/json',
            },
            body: JSON.stringify(this.state.laptop)
        };

        fetch(`http://localhost:8080/api/laptops/${this.state.laptop.id}`, fetchData
        )
            .then(response => {
                return response.json()
            })
            .then(data => {
                alert("Modifications enregistrées");
            })
            .catch(err => {
                console.error('Request failed', err)
            });
    }
}

export default PortableNew;