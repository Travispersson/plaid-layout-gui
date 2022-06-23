import React from "react";
import styled from "styled-components";
import HighlightedParahraph from "./HighlightedParagraph.jsx";
import img1 from "./../../assets/img1.png";
import logo from "./../../assets/plaid-logo.png";

const StyledContainer = styled.div`
  height: 100vh;
  overflow-y: scroll;
`;
const StyledInstructionsWrapper = styled.main`
  margin-top: 7.5rem;
  margin-right: 15rem;
  margin-left: 5rem;
  margin-bottom: 7.5rem;
  display: flex;

  flex-direction: column;
  color: ${props => props.theme.colors.text};
`;

const StyledHeading1 = styled.h1`
  font-size: 60px;
  line-height: 65px;
  font-weight: 700;
  margin: 10px;
`;

const StyledHeading2 = styled.h2`
  font-size: 35px;
  line-height: 1.2;
  font-weight: 400;
  margin: 10px;
`;

const StyledHeading3 = styled.h3`
  font-size: 27px;
  line-height: 1.2;
  font-weight: 400;
  margin: 10px;
`;

const StyledParagraph = styled.p`
  font-size: 17px;
  line-height: 1.7;
  font-weight: 400;
  font-style: normal;
  font-family: ${props => props.theme.fonts.secondary};
  margin: 10px;
`;

const StyledCenteredParagraph = styled.p`
  font-size: 17px;
  line-height: 1.7;
  font-weight: 400;
  font-style: normal;
  font-family: ${props => props.theme.fonts.secondary};
  margin: 10px;
  text-align: center;
`;

const StyledImage = styled.img.attrs((props) => ({
  src: props.src,
  alt: props.alt,
}))`
  display: inline-block;
  vertical-align: top;
  width: 100%;
  height: 100%;
`;


const StyledScaledImage = styled.img.attrs((props) => ({
  src: props.src,
  alt: props.alt,
  width: props.width,
  height: props.height,
}))`
  display: inline-block;
  vertical-align: top;
`;


const Home = () => {
  return (
    <StyledContainer>
      <StyledInstructionsWrapper>
      
        <StyledHeading1>Contact</StyledHeading1>
        <StyledParagraph>
        This project is coordinated by <a href="https://andreina-francisco.github.io/">Maria Andreina Francisco Rodriguez</a>, <a href="https://katalog.uu.se/empinfo/?id=N20-863">Jordi Carreras-Puigvert</a>, and <a href="https://katalog.uu.se/empInfo?id=N2-878">Ola Spjuth</a>, 
        and it is part of the research work at the <a href="https://pharmb.io/">Pharmaceutical Bioinformatics Research Group</a>, <a href="https://farmbio.uu.se/">Department of Pharmaceutical Biosciences</a>, Uppsala University, Sweden.
        </StyledParagraph>

        <StyledParagraph>
        Do you have any ideas for improvement? We would love to hear about your <a href="https://forms.gle/hwymMYgBs4yd9idWA">suggestions</a>!
        </StyledParagraph>
        
      </StyledInstructionsWrapper>
    </StyledContainer>
  );
};

export default Home;
