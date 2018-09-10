import React, { Component } from 'react';
import { Alert, Button, Input, InputGroup, InputGroupAddon, Form, FormGroup } from 'reactstrap';
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

    constructor(props) {
        super(props);

        this.state = {
            errorMessage: ''
        };

        this.authenticationService = new AuthService();
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    componentWillMount(){
        if(AuthService.isLoggedIn())
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

        console.log("login.handleSubmit");
        this.authenticationService.login(this.state.username, this.state.password, "ROLE_ADMIN")
            .then(res =>{
                console.log("login AuthService.login.then");
                this.props.history.replace('/');
            })
            .catch(error =>{
                console.log(error);
                this.setState({ errorMessage: 'Le login ou le mot de passe sont incorrects' });
            })
    }

    render() {
        return (
            <div className="row justify-content-center login-panel">
                <div className="col-10 col-sm-7 col-md-5 col-lg-4">

                    <div className="card">
                        <div className="card-header">EPSI Gestion du matériel</div>
                        <div className="card-body">

                            <Alert color="danger" isOpen={this.state.errorMessage !== ''}>
                                {this.state.errorMessage}
                            </Alert>

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
                                            placeholder="Identifiant"
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
                                            placeholder="Mot de passe"
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