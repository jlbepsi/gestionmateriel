import React, { Component } from 'react';


class Footer extends Component {
    render() {
        return (
            <footer className="footer">
                <div className="container">
                    <div className="row">
                        <div className="col-md-4"><a href="mailto:admin.reseau@montpellier-epsi.fr"
                                                     title="Envoyer un email">Envoyer un email à l'administrateur
                            réseau</a></div>
                        <div className="col-md-4"><a href="http://ecampusmontpellier.epsi.fr/" target="_blank"
                                                     title="ECampus Montpellier">ECampus Montpellier</a></div>
                        <div className="col-md-4">1.0.0.0</div>
                    </div>
                </div>
            </footer>
        );
    }
}

export default Footer;
