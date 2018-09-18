import React, { Component } from 'react';
import { Redirect, Route, Switch  } from 'react-router-dom';

import Dashboard from "./Dashboard/Dashboard";
import Command from "./Command/Command";
import Stations from "./Stations/Stations";
import Portables from "./Portables/Portables";
import PortableNew from "./Portables/PortableNew";
import PortableEdit from "./Portables/PortableEdit"
import PortableEmprunter from  "./Portables/PortableEmprunter"
import PortableRestituer from "./Portables/PortableRestituer"
import Login from "./Security/Login"
import Logout from "./Security/Logout"
import Profil from "./Security/Profil"

import MainLayout from "./MainLayout"
import EmptyLayout from "./EmptyLayout";
import Materiels from "./Materiel/Materiels";
import StationNew from "./Stations/StationNew";
import StationEdit from "./Stations/StationEdit";


class Routeur extends Component {
    render() {
        return (
            <Switch>
                <MainLayout exact path='/' component={ Dashboard } />
                <MainLayout exact path='/portables' component={ Portables } />
                <MainLayout exact path='/portable/new' component={ PortableNew } />
                <MainLayout exact path='/portable/edit/:id' component={ PortableEdit } />
                <MainLayout exact path='/portable/emprunter/:id' component={ PortableEmprunter } />
                <MainLayout exact path='/portable/restituer/:id' component={ PortableRestituer } />
                <MainLayout exact path='/stations' component={ Stations } />
                <MainLayout exact path='/stations/new' component={ StationNew } />
                <MainLayout exact path='/stations/edit/:id' component={ StationEdit } />
                <MainLayout exact path='/materiel' component={ Materiels } />
                <MainLayout exact path='/command' component={ Command } />
                <MainLayout exact path='/profil' component={ Profil } />

                <EmptyLayout exact path='/login' component={ Login } />
                <Route exact path='/logout' component={ Logout } />
                <Redirect from='*' to='/' />
            </Switch>
        )
    }
}

export default Routeur;