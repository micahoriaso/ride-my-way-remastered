import React from 'react';
import { Flex } from '@rebass/grid';
import styled from 'styled-components';

const Banner: React.SFC = () => (
  <React.Fragment>
    <StyledFlex>Don't ride alone.</StyledFlex>
  </React.Fragment>
);

export default Banner;

const StyledFlex = styled(Flex)`
  color: #525f7f;
  font-size: 42px;
  font-weight: bold;
  font-family: 'Poppins', sans-serif;
`;
