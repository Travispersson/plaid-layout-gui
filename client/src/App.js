//import Homepage from "./components/Homepage";
import Navbar from "./components/Navbar";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import styled, { createGlobalStyle } from "styled-components";

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
  background-color: #EFEAE1;
}
`;

const GridWrapper = styled.div`
  display: grid;
  grid-template-columns: 22vh minmax(75vh, auto);
`;

const App = () => {
  return (
    <div className="App">
      <GridWrapper>
        <GlobalStyle />
        <Router>
          <Navbar />
          <Switch>
            <Route path="/instructions">
              <h1>This is the instructions page!</h1>
            </Route>
            <Route path="/tool">
              <h1>This is the tool page!</h1>
            </Route>
            <Route path="/publications">
              <h1>This is the publications page!</h1>
            </Route>
            <Route path="/contacts">
              <h1>This is the contact page!</h1>
            </Route>
            <Route path="/">
              <h1>This is the home page!</h1>
            </Route>
          </Switch>
        </Router>
      </GridWrapper>
    </div>
  );
};

export default App;
