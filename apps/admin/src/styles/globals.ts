import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`

html, body {
    height: 100%;
    margin: 0;
    color: white;
    font-family:'Nunito', sans-serif;
    font-size: 14px;
  }
  *{
      box-sizing: border-box;
  }
  input, select, textarea, button {
    font-family:inherit;
    font-size:inherit;
    color: #525f7f;
  }
`;

export default GlobalStyle;
