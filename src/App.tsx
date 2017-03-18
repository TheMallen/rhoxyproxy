import * as React from 'react';
import './App.css';

import {Router, Route, browserHistory} from 'react-router';
import Home from './pages/Home';
import ProxySheet from './pages/ProxySheet';

const logo = require('./logo.svg');

class App extends React.Component<null, null> {
  render() {
    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1>Rhoxy Proxy</h1>
        </div>

        <p className="App-intro">
          To get started, edit <code>src/App.tsx</code> and save to reload.
        </p>

        <Router history={browserHistory}>
          <Route path="/" component={Home}/>
          <Route path="/proxy" component={ProxySheet}/>
        </Router>
      </div>
    );
  }
}

export default App;
