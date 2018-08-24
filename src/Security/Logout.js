import React, { Component } from 'react';
import { Redirect } from "react-router-dom";
import AuthService from "./AuthService";



class Logout extends Component {

    constructor(props) {
        super(props);

        this.AuthenticationService = new AuthService();
    }

    render() {
        this.AuthenticationService.logout()

        return (
            <Redirect to='/login' />
        );
    }
}

export default Logout;