import React from 'react';
import Home from './routes/Home';
import GlobalStyle from './styles/globals';

class Root extends React.Component {
  render() {
    return (
      <React.Fragment>
        <GlobalStyle />
        <Home />
      </React.Fragment>
    );
  }
}

export default Root;
