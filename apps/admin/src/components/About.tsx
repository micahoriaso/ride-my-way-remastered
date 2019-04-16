import React from 'react';
import styled from 'styled-components';
interface iProps {
  extra?: boolean;
  auth: any;
}
export const About: React.SFC<iProps> = () => <StyledDiv>About</StyledDiv>;

const StyledDiv = styled.div`
  color: black;
`;
