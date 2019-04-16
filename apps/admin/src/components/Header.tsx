import React, {Component} from 'react';
import styled from 'styled-components';
import {Flex, Box} from '@rebass/grid';
import {Container} from '../atoms/Container';
import Modal from '../atoms/Modal/Modal';
import SignupForm from '../components/Forms/SignupForm';

interface iState {
  showModal: boolean;
}

class Header extends Component<{}, iState> {
  state: iState = {
    showModal: false
  };

  handleOpenModal = () => {
    this.setState({
      showModal: true
    });
  };

  handleCloseModal = () => {
    this.setState({
      showModal: false
    });
  };
  render() {
    const {showModal} = this.state;
    return (
      <React.Fragment>
        <HeaderWrapper>
          <Container alignItems="center" justifyContent="center">
            <Logo width={3 / 4}>Ride My Way</Logo>
            <Flex width={1 / 4} justifyContent="flex-end">
              <Flex p={2}>Login</Flex>
              <Flex p={2} onClick={this.handleOpenModal}>
                <SignupButton>Signup</SignupButton>
              </Flex>
            </Flex>
          </Container>
        </HeaderWrapper>
        <Modal isShown={showModal} onClose={this.handleCloseModal} size="medium">
          <SignupForm />
        </Modal>
      </React.Fragment>
    );
  }
}

export default Header;

const HeaderWrapper = styled(Flex)`
  height: 100px;
  width: 100%;
  background: rgb(62, 76, 251);
  background: linear-gradient(90deg, rgba(62, 76, 251, 1) 0%, rgba(69, 83, 255, 1) 47%, rgba(0, 212, 255, 1) 100%);
`;

const Logo = styled(Flex)`
  font-weight: bold;
  font-family: 'Poppins', sans-serif;
`;

const SignupButton = styled.span`
  :hover {
    cursor: pointer;
  }
`;
