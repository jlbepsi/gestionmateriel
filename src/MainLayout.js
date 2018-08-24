import React, { Component } from 'react';
import { Route } from 'react-router-dom';

import MenuPrincipal from "./Html/MenuPrincipal";
import Footer from "./Html/Footer"

const MainLayout = ({component: Component, ...rest}) => {
    return (
        <Route {...rest} render={matchProps => (
            <div>
                <MenuPrincipal/>

                <Component {...matchProps} />

                <Footer/>
            </div>
        )} />
    )
};

export default MainLayout;