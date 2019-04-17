import React, { Component } from 'react';
import styled from 'styled-components';
import { Flex, Box } from '@rebass/grid';
import { Container } from '../atoms/Container';
import Modal from '../atoms/Modal/Modal';
import SignupForm from '../components/Forms/SignupForm';
import LoginForm from '../components/Forms/LoginForm';

interface iState {
  showModal: boolean;
  showLoginModal: boolean;
  showSignupModal: boolean;
}

class Header extends Component<{}, iState> {
  state: iState = {
    showModal: false,
    showLoginModal: false,
    showSignupModal: false
  };

  handleOpenSignUpModal = () => {
    this.setState({
      showModal: true,
      showLoginModal: false,
      showSignupModal: true
    });
  };

  handleOpenLoginModal = () => {
    this.setState({
      showModal: true,
      showLoginModal: true,
      showSignupModal: false
    });
  };

  handleCloseModal = () => {
    this.setState({
      showModal: false
    });
  };
  render() {
    const { showModal, showLoginModal, showSignupModal } = this.state;
    return (
      <React.Fragment>
        <HeaderWrapper>
          <Container alignItems="center" justifyContent="center">
            <Logo width={3 / 4}>Ride My Way</Logo>
            <Flex width={1 / 4} justifyContent="flex-end">
              <Flex p={2} onClick={this.handleOpenLoginModal}>
                Login
              </Flex>
              <Flex p={2} onClick={this.handleOpenSignUpModal}>
                <SignupButton>Signup</SignupButton>
              </Flex>
            </Flex>
          </Container>
        </HeaderWrapper>
        <Modal
          isShown={showModal}
          onClose={this.handleCloseModal}
          size="medium"
        >
          {showLoginModal && <LoginForm />}
          {showSignupModal && <SignupForm />}
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

const SignupButton = styled.span`
  :hover {
    cursor: pointer;
  }
`;
