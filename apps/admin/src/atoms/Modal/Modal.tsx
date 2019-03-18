import React from 'react';
import ReactDOM from 'react-dom';
import styled from 'styled-components';
import { Box } from '@rebass/grid';

interface iProps {
  onClose: () => void;
  isShown: boolean;
  size: string;
}

export interface ModalSize {
  [key: string]: string;
}

const modalSize: ModalSize = {
  medium: '600px',
  large: '940px',
  fullWidth: '100%'
};

class Modal extends React.Component<iProps> {
  el: HTMLDivElement;
  modalRoot = document.getElementById('modal-root');
  constructor(props: iProps) {
    super(props);
    this.el = document.createElement('div');
  }

  componentDidMount() {
    this.modalRoot!.appendChild(this.el);
  }

  componentWillUnmount() {
    this.modalRoot!.removeChild(this.el);
  }
  render() {
    const { children, onClose, isShown, size } = this.props;
    return ReactDOM.createPortal(
      isShown ? (
        <ModalBackdrop>
          <Box width={modalSize[size]} m="auto">
            <ModalWrapper>
              <CloseIcon className="fas fa-times" onClick={onClose} />
              {children}
            </ModalWrapper>
          </Box>
        </ModalBackdrop>
      ) : null,
      this.el
    );
  }
}

export default Modal;

const ModalBackdrop = styled.div`
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  display: grid;
  justify-content: center;
  align-items: center;
  background-color: rgba(0, 0, 0, 0.2);
`;

const ModalWrapper = styled.div`
  padding: 0 1.875rem 1.875rem 1.875rem;
  background: #fff;
  display: flex;
  flex-direction: column;
  min-height: 300px;
  margin: 1rem;
  position: relative;
  width: 100%;
  box-shadow: 0 20px 45px -10px rgba(0, 0, 0, 0.2);
  transition: all 250ms cubic-bezier(0.165, 0.84, 0.44, 1);
  justify-self: center;
  color: #525f7f;
  border-radius: 10px;
  overflow: hidden;
`;

const CloseIcon = styled.i`
  display: inline-block;
  position: absolute;
  top: 0.75rem;
  right: 0.75rem;

  :hover {
    color: #aab7c4;
    cursor: pointer;
  }
`;
