import React, { Component } from 'react';
import { Flex } from '@rebass/grid';
import styled from 'styled-components';
import Banner from './Banner';
import BannerImage from './BannerImage';
import { Container } from '../atoms/Container';
import PlainButton from '../atoms/Buttons/PlainButton';
import Modal from '../atoms/Modal/Modal';
import SignupForm from '../components/Forms/SignupForm';

interface iState {
  showModal: boolean;
}

class Content extends Component<{}, iState> {
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

  handleToggleModal = () => {
    this.setState(prevState => {
      return {
        showModal: !prevState.showModal
      };
    });
  };

  render() {
    const { showModal } = this.state;
    return (
      <React.Fragment>
        <StyledContent>
          <Container>
            <StyledFlex flexDirection="column" alignItems="center">
              <BannerImage />
              <Banner />
              <PlainButton
                bgColor="#4553ff"
                className="myButton"
                onClick={this.handleOpenModal}
              >
                Join us
              </PlainButton>
            </StyledFlex>
          </Container>
        </StyledContent>
        <Modal
          isShown={showModal}
          onClose={this.handleCloseModal}
          size="medium"
        >
          <SignupForm />
        </Modal>
      </React.Fragment>
    );
  }
}
// const Content: React.SFC = () => (
//   <React.Fragment>
//     <StyledContent>
//       <Container>
//         <StyledFlex flexDirection="column" alignItems="center">
//           <BannerImage />
//           <Banner />
//           <PlainButton bgColor="#4553ff" className="myButton">
//             Join us
//           </PlainButton>
//         </StyledFlex>
//       </Container>
//     </StyledContent>
//   </React.Fragment>
// );

export default Content;

export const StyledContent = styled(Flex)`
  min-height: 80vh;
  width: 100%;
`;

export const StyledFlex = styled(Flex)`
  margin: auto;
`;
