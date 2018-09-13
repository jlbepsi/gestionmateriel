import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import {
    Collapse,
    Navbar,
    NavbarToggler,
    NavbarBrand,
    Nav,
    NavItem,
    NavLink
} from 'reactstrap';

class MenuPrincipal extends Component {
    state = {
        isOpen: false
    };
    toggle = ()  => {
        this.setState({
            isOpen: !this.state.isOpen
        });
    };


    render() {
        return (
            <div>
                <header>
                    <Navbar color="light" light expand="md">
                        <NavbarBrand>Gestion du matériel</NavbarBrand>
                        <NavbarToggler onClick={this.toggle} />
                        <Collapse isOpen={this.state.isOpen} navbar>
                            <Nav className="mr-auto" navbar>
                                <NavItem>
                                    <NavLink>
                                        <Link to='/'>Dashboard</Link>
                                    </NavLink>
                                </NavItem>
                                <NavItem>
                                    <NavLink>
                                        <Link to='/portables'>Portables</Link>
                                    </NavLink>
                                </NavItem>
                                <NavItem>
                                    <NavLink>
                                        <Link to='/stations'>Stations</Link>
                                    </NavLink>
                                </NavItem>
                                <NavItem>
                                    <NavLink>
                                        <Link to='/materiel'>Matériels</Link>
                                    </NavLink>
                                </NavItem>
                            </Nav>
                            <Nav className="ml-auto" navbar>
                                <NavItem>
                                    <NavLink href="/profil">Profil</NavLink>
                                </NavItem>
                                <NavItem>
                                    <NavLink href="/logout">Déconnexion</NavLink>
                                </NavItem>
                            </Nav>
                        </Collapse>
                    </Navbar>
                </header>
            </div>
    );
    }
}

export default MenuPrincipal;
