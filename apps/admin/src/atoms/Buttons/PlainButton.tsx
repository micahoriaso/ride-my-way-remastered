import React from 'react';
import styled from 'styled-components';

interface iProps {
  color?: string;
  bgColor?: string;
  className?: string;
  onClick?: () => void;
  type?: string;
}

const Button: React.SFC<iProps> = props => {
  const { className, children, onClick, type } = props;
  return (
    <React.Fragment>
      <StyledDiv className={className} onClick={onClick} type={type}>
        {children}
      </StyledDiv>
    </React.Fragment>
  );
};

const StyledDiv = styled.button`
  padding: 10px;
  border-radius: 8px;
  overflow: hidden;
  outline: none;
  border: none;

  :hover {
    cursor: pointer;
  }
`;

const PlainButton = styled(Button)`
  background-color: ${props => props.bgColor || '#4553ff'};
  color: ${props => props.color || 'white'};
`;

export default PlainButton;
