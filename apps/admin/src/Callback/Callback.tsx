import React, {Component} from 'react';
import loading from './loading.svg';
import styled from 'styled-components';

class Callback extends Component<any, any> {
  render() {
    return (
      <StyledDiv>
        <img src={loading} alt="loading" />
      </StyledDiv>
    );
  }
}

const StyledDiv = styled.div`
  position: 'absolute';
  display: 'flex';
  justifycontent: 'center';
  height: '100vh';
  width: '100vw';
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  backgroundcolor: 'white';
`;

export default Callback;
