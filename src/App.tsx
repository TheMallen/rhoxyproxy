import * as React from 'react';
import * as styles from './App.scss';

import {Router, Route, browserHistory} from 'react-router';
import Home from './pages/Home';
import ProxySheet from './pages/ProxySheet';

const logo = require('./logo.svg');
const heart = require('./heart.svg');
const rhino = require('./rhino.jpg');

class App extends React.Component<null, null> {
  render() {
    return (
      <div className={styles.App}>
        <header className={styles.Header}>
          <img
            src={rhino}
            className={styles.Logo}
            alt="A Rhino gazes lovingly at you, playfully licking the air."
          />
          <h1>Rhoxy Proxy</h1>
        </header>
        <main className={styles.Content}>
          <p className={styles.Intro}>
            Proxies a rhino could love.
          </p>

          <Router history={browserHistory}>
            <Route path="/" component={Home}/>
            <Route path="/proxy" component={ProxySheet}/>
          </Router>
        </main>
        <footer className={styles.Footer}>
          <p>Made with
            <img className={styles.FooterIcon} src={heart} alt="React" /> and
            <img className={styles.FooterIcon} src={logo} alt="React" />
          </p>
        </footer>
      </div>
    );
  }
}

export default App;
