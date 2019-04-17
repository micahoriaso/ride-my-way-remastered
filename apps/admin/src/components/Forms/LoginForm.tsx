import React, { useState, useReducer } from 'react';
import axios from 'axios';
import Button from '../../atoms/Buttons/PlainButton';
import Input from '../../atoms/Inputs/TextInput';
import styled from 'styled-components';
import { Flex } from '@rebass/grid';
import WelcomeImage from '../WelcomeImage';

const LoginForm = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const { email, password } = formData;
  const updateFormData = (event: React.FormEvent<HTMLInputElement>) =>
    setFormData({
      ...formData,
      [event.currentTarget.name]: event.currentTarget.value
    });
  const clearFieldError = (event: React.FormEvent<HTMLInputElement>) => {
    const updatedError = { ...error };
    updatedError[event.currentTarget.name] = null;
    dispatch({
      type: 'CLEAR_FIELD_ERROR',
      error: updatedError
    });
  };

  const initialState = {
    loading: false,
    success: false,
    error: {
      email: null,
      password: null
    },
    response: null
  };

  const signUpReducer = (state: any, action: any) => {
    switch (action.type) {
      case 'SIGNUP_STARTED': {
        return { ...state, loading: true, success: false };
      }
      case 'SIGNUP_SUCCESS': {
        return {
          ...state,
          loading: false,
          success: true,
          response: action.response,
          error: {
            email: null,
            password: null
          }
        };
      }
      case 'SIGNUP_ERROR': {
        return {
          ...state,
          loading: false,
          success: false,
          error: action.error
        };
      }
      case 'CLEAR_FIELD_ERROR': {
        return {
          ...state,
          loading: false,
          success: false,
          error: action.error
        };
      }
      default: {
        return state;
      }
    }
  };
  const [{ loading, success, error, response }, dispatch] = useReducer(
    signUpReducer,
    initialState
  );

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    dispatch({ type: 'SIGNUP_STARTED' });
    try {
      const response = await axios.post('/auth/login', {
        email: email,
        password: password
      });
      dispatch({
        type: 'SIGNUP_SUCCESS',
        response: response.data.data.message
      });
    } catch (error) {
      const newError: any = {};
      console.log(error);
      //   error.response.data.error.errors.forEach((error: any) => {
      //     newError[error.property] = Object.values(error.constraints)[0];
      //   });
      //   dispatch({
      //     type: 'SIGNUP_ERROR',
      //     error: newError
      //   });
    }
  };

  return success ? (
    <React.Fragment>
      <Flex width={1} m="auto" flexDirection="column" alignItems="center">
        <StyledWelcomeMessage>{response}</StyledWelcomeMessage>
      </Flex>
      <Flex width={1 / 2} m="auto" flexDirection="column" alignItems="center">
        <WelcomeImage />
        <SignInPrompt>
          <SignIn>Log in</SignIn> to continue
        </SignInPrompt>
      </Flex>
    </React.Fragment>
  ) : (
    <React.Fragment>
      <Flex width={1 / 2} m="auto" flexDirection="column" alignItems="center">
        <h3>Login</h3>
        {response}
        <StyledForm onSubmit={handleSubmit}>
          <Input
            name="email"
            label="Email"
            value={email}
            onChange={e => {
              updateFormData(e);
              clearFieldError(e);
            }}
            error={error.email}
          />
          <Input
            name="password"
            label="Password"
            type="password"
            value={password}
            onChange={e => {
              updateFormData(e);
              clearFieldError(e);
            }}
            error={error.password}
          />
          <Button>Log in</Button>
        </StyledForm>
        <SignInPrompt>
          Don't have an account? <SignIn>Sign up.</SignIn>
        </SignInPrompt>
      </Flex>
    </React.Fragment>
  );
};

export default LoginForm;

export const SignInPrompt = styled.div`
  margin-top: 30px;
`;

const SignIn = styled.span`
  color: #4553ff;
`;

const StyledForm = styled.form`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const StyledWelcomeMessage = styled.div`
  font-family: 'Nunito', sans-serif;
  font-size: 32px;
  font-weight: bold;
  margin-top: 50px;
`;
