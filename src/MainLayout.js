import React from 'react';
import { Route, Redirect } from 'react-router-dom';

import MenuPrincipal from "./Html/MenuPrincipal";
import Footer from "./Html/Footer"
import AuthService from  "./Security/AuthService"

const MainLayout = ({component: Component, ...rest}) => {

    const isLoggedIn = AuthService.isLoggedIn();

    return (

        isLoggedIn ? (
        <Route {...rest} render={matchProps => (
            <div>
                <MenuPrincipal/>

                <Component {...matchProps} />

                <Footer/>
            </div>
        )} />
        ) : (
            <Redirect to={{ pathname: '/login'}} />
        )
    )
};

export default MainLayout;