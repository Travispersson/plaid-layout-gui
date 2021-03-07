import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { createGlobalStyle, ThemeProvider } from "styled-components";

const theme = {
  backgroundColors :{
    primary: "#f6f6f6",
    navbar: "#323439",
    highlightYellow: "rgba(255, 229, 100, 0.3)",
    highlightYellowSide: "#ffe564",
    highlightRed: "rgba(255,63, 63,0.3)",
    highlightRedSide:  "#ff3535",
    highlightBlue: "#bbeffd",
    downloadButtonBlue: "#bbeffd",
  },
  colors: {
    navbarNormal:"#c3c3c3",
    navbarActive: "#fafafa", 
    headers:"#000",
    text:"#000",
  },
  fonts : {
    primary: "'Roboto', sans-serif",
    secondary: "'Lato', sans-serif",
  }
}

const GlobalStyle = createGlobalStyle`
/* Global Styles + CSS Reset can be added here */
  *,
  *:after,
  *:before {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
}

html {
  box-sizing: border-box;
  background-color: ${props => props.theme.backgroundColors.primary};
  color:#000;
  font-family: ${props => props.theme.fonts.primary};
}
`;

ReactDOM.render(
  <React.StrictMode>

        <ThemeProvider theme={theme}>
        <GlobalStyle />
    <App />
    </ThemeProvider>
  </React.StrictMode>,
  document.getElementById('root')
);
