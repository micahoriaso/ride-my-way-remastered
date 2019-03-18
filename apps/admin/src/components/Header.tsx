import React from 'react';
import styled from 'styled-components';
import { Flex, Box } from '@rebass/grid';
import { Container } from '../atoms/Container';

const Header: React.SFC = () => (
  <React.Fragment>
    <HeaderWrapper>
      <Container alignItems="center" justifyContent="center">
        <Logo width={3 / 4}>Ride My Way</Logo>
        <Flex width={1 / 4} justifyContent="flex-end">
          <Flex p={2}>Login</Flex>
          <Flex p={2}>Signup</Flex>
        </Flex>
      </Container>
    </HeaderWrapper>
  </React.Fragment>
);

export default Header;

const HeaderWrapper = styled(Flex)`
  height: 100px;
  width: 100%;
  background: rgb(62, 76, 251);
  background: linear-gradient(
    90deg,
    rgba(62, 76, 251, 1) 0%,
    rgba(69, 83, 255, 1) 47%,
    rgba(0, 212, 255, 1) 100%
  );
`;

const Logo = styled(Flex)`
  font-weight: bold;
  font-family: 'Poppins', sans-serif;
`;
