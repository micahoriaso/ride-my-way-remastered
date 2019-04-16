import React from 'react';
import {App} from './routes';
import GlobalStyle from './styles/globals';

class Root extends React.Component {
  render() {
    return (
      <React.Fragment>
        <GlobalStyle />
        <App />
      </React.Fragment>
    );
  }
}

export default Root;
