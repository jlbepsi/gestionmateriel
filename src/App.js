import React, { Component } from 'react';
import { BrowserRouter  } from 'react-router-dom';
import './App.css';

import Routeur from "./Routeur"

class App extends Component {

  render() {
    return (
        <BrowserRouter>
            <Routeur/>
        </BrowserRouter>
    );
  }
}

export default App;


/*

 */