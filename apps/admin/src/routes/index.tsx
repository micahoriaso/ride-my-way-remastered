import React from 'react';
import {Router, Route, Switch} from 'react-router-dom';
import Home from './Home';
import Callback from '../Callback/Callback';
import {About} from '../components/About';

import Auth from '../Auth/Auth';
import history from '../history';

const auth = new Auth();

const handleAuthentication = ({location}: any) => {
  if (/access_token|id_token|error/.test(location.hash)) {
    auth.handleAuthentication();
  }
};

export const App = () => {
  const someVariable = true;

  return (
    <Router history={history}>
      <Switch>
        <Route exact path="/" render={props => <Home {...props} auth={auth} />} />
        <Route path="/about" render={props => <About {...props} extra={someVariable} auth={auth} />} />
        <Route
          path="/callback"
          render={props => {
            handleAuthentication(props);
            return <Callback {...props} />;
          }}
        />
      </Switch>
    </Router>
  );
};
