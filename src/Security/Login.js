import React, { Component } from 'react';
import { Button, Input, InputGroup, InputGroupAddon, Form, FormGroup } from 'reactstrap';
import AuthService from './AuthService';



import { library } from '@fortawesome/fontawesome-svg-core'
import { fab } from '@fortawesome/free-brands-svg-icons'
import {
    faUser, faKey
} from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

library.add(
    fab,
    faUser, faKey
)

class Login extends Component {

    constructor() {
        super();

        this.AuthenticationService = new AuthService();
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    componentWillMount(){
        if(this.AuthenticationService.loggedIn())
            this.props.history.replace('/');
    }

    handleChange(e){
        this.setState(
            {
                [e.target.name]: e.target.value
            }
        )
    }

    handleSubmit(event) {
        event.preventDefault();


        this.AuthenticationService.login(this.state.username, this.state.password)
            .then(res =>{
                this.props.history.replace('/');
            })
            .catch(err =>{
                alert(err);
            })
    }

    render() {
        return (
            <div className="row justify-content-center login-panel">
                <div className="col-10 col-sm-7 col-md-5 col-lg-4">

                    <div className="card">
                        <div className="card-header">EPSI Gestion du matériel</div>
                        <div className="card-body">

                            <Form onSubmit={this.handleSubmit}>
                                <FormGroup>
                                    <InputGroup>
                                            <InputGroupAddon addonType="prepend">
                                            <span className="input-group-text">
                                                <span className="fa-layers fa-fw">
                                                    <FontAwesomeIcon icon={faUser} />
                                                </span>
                                            </span>
                                        </InputGroupAddon>
                                        <Input
                                            type="text"
                                            name="username"
                                            placeholder="Identifiant ECampus"
                                            onChange={this.handleChange}
                                        />
                                    </InputGroup>
                                </FormGroup>
                                <FormGroup>
                                    <InputGroup>
                                        <InputGroupAddon addonType="prepend">
                                        <span className="input-group-text">
                                            <span className="fa-layers fa-fw">
                                                <FontAwesomeIcon icon={faKey} />
                                            </span>
                                        </span>
                                        </InputGroupAddon>
                                        <Input
                                            type="password"
                                            name="password"
                                            placeholder="Mot de passe ECampus"
                                            onChange={this.handleChange}
                                        />
                                    </InputGroup>
                                </FormGroup>
                                <FormGroup>
                                    <Button color='primary' block >Connexion</Button>
                                </FormGroup>
                            </Form>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Login;