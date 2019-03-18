import React from 'react';
import { Flex } from '@rebass/grid';
import styled from 'styled-components';
import driver, {
  ReactComponent as DriverLogo
} from '../assets/undraw_fast_car.svg';

const BannerImage: React.SFC = () => (
  <React.Fragment>
    <Flex width={1 / 2}>
      <StyledDriverLogo />
    </Flex>
  </React.Fragment>
);

export default BannerImage;

const StyledDriverLogo = styled(DriverLogo)`
  height: 500px;
`;
