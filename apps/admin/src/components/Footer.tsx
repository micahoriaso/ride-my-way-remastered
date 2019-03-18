import React from 'react';
import styled from 'styled-components';
import { Flex } from '@rebass/grid';
import { Container } from '../atoms/Container';

const Footer: React.SFC = () => (
  <React.Fragment>
    <FooterWrapper>
      <Container alignItems="center" justifyContent="flex-start">
        <Logo width={1 / 4}>&copy;Ride My Way</Logo>
      </Container>
    </FooterWrapper>
  </React.Fragment>
);

export default Footer;

const FooterWrapper = styled(Flex)`
  height: 100px;
  width: 100%;
  background: #f5f9fc;
  border-top: 2px solid rgba(207, 215, 223, 0.25);
`;

const Logo = styled(Flex)`
  color: #aab7c4;
`;
