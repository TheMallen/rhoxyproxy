import * as React from 'react';
import * as styles from './App.scss';

import {Router, Route, browserHistory} from 'react-router';
import Home from './pages/Home';
import ProxySheet from './pages/ProxySheet';

const logo = require('./logo.svg');

class App extends React.Component<null, null> {
  render() {
    return (
      <div className={styles.App}>
        <div className={styles.AppHeader}>
          <img src={logo} className={styles.AppLogo} alt="logo" />
          <h1>Rhoxy Proxy</h1>
        </div>

        <p className={styles.AppIntro}>
          Proxies a rhino could love.
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
