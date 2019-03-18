import React from 'react';
import styled from 'styled-components';

interface iProps {
  placeholder?: string;
  label?: string;
  name?: string;
  type?: string;
  error?: string;
  optional?: boolean;
  value?: any;
  onChange?: (e: React.FormEvent<HTMLInputElement>) => void;
  onFocus?: (e: React.FormEvent<HTMLInputElement>) => void;
}

class TextInput extends React.Component<iProps> {
  render() {
    const {
      placeholder,
      name,
      label,
      type = 'text',
      error,
      optional,
      value,
      onChange,
      onFocus
    } = this.props;
    return (
      <InputWrapper>
        <label htmlFor={name}>
          {label}
          {optional && <OptionalLabel> - Optional</OptionalLabel>}
        </label>
        <StyledInput
          placeholder={placeholder}
          name={name}
          type={type}
          value={value}
          onChange={onChange}
          onFocus={onFocus}
        />
        <ErrorLabel>{error}</ErrorLabel>
      </InputWrapper>
    );
  }
}

export default TextInput;

const StyledInput = styled.input`
  padding: 0.75rem;
  border-radius: 5px;
  border: solid #d1d7dd 1px;
  overflow: hidden;
  margin-top: 4px;
  color: black;

  :focus {
    outline: none;
    box-shadow: 0 0 1px #4553ff;
  }
`;

const ErrorLabel = styled.i`
  opacity: 0.6;
  color: #bd225e;
`;
const OptionalLabel = styled.i`
  opacity: 0.6;
`;

const InputWrapper = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 20px;
  width: 100%;
`;
