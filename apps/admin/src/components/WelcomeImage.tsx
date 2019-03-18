import React from 'react';
import { Flex } from '@rebass/grid';
import styled from 'styled-components';
import driver, {
  ReactComponent as WelcomeImage
} from '../assets/undraw_welcome.svg';

const BannerImage: React.SFC = () => (
  <React.Fragment>
    <Flex width={1}>
      <StyledWelcomeImage />
    </Flex>
  </React.Fragment>
);

export default BannerImage;

const StyledWelcomeImage = styled(WelcomeImage)`
  height: 300px;
`;
