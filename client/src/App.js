import Navbar from "./components/Navbar";
import Instructions from "./components/Instructions";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import styled from "styled-components";
import Tool from "./components/Tool";
import Home from "./components/Home";
import Contact from "./components/Contact";
import Publications from "./components/Publications";
import { Helmet } from 'react'



const StyledGridWrapper = styled.div`
  display: grid;
  grid-template-columns: 11rem minmax(50rem, 100%);
`;

const TITLE = 'PLAID'

const App = () => {
  document.title = TITLE
  return (
    <div className="App">
        <StyledGridWrapper>
          <Router>
            <Navbar />
            <Switch>
              <Route path="/instructions">
                <Instructions />
              </Route>
              <Route path="/tool">
                <Tool />
              </Route>
              <Route path="/publications">
                <Publications />
              </Route>
              <Route path="/contact">
                <Contact />
              </Route>
              <Route path="/">
	        <Home />
              </Route>
            </Switch>
          </Router>
        </StyledGridWrapper>
    </div>
  );
};

export default App;
