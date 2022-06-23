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
        <StyledHeading1>Publications</StyledHeading1>

        <StyledHeading2>Citation</StyledHeading2>
        <StyledParagraph>
        Our bioRxiv preprint can be used to cite this project:
        </StyledParagraph>

        <StyledParagraph>
        M. A. Francisco Rodr&iacute;guez, J. Carreras Puigvert, and O. Spjuth. Designing Microplate Layouts Using Artificial Intelligence April, 2022. DOI: <a href="https://doi.org/10.1101/2022.03.31.486595">10.1101/2022.03.31.486595</a>
        </StyledParagraph>

        <StyledHeading2>Other Publications</StyledHeading2>
        <StyledParagraph>
        M. A. Francisco Rodr&iacute;guez, and O. Spjuth. A Constraint Programming Approach to Microplate Layout Design In: J. Espasa and N. Dang (editors), Proceedings of ModRef 2020, the 19th International Workshop on Constraint Modelling and Reformulation, held at CP 2020, September 2020. 
        </StyledParagraph>

        <StyledParagraph>
        [<a href="https://modref.github.io/papers/ModRef2020_A%20Constraint%20Programming%20Approach%20to%20Microplate%20Layout%20Design.pdf">PDF</a>] [<a href="https://modref.github.io/slides/ModRef2020_Slides_A%20Constraint%20Programming%20Approach%20to%20Microplate%20Layout%20Design.pdf">Slides</a>] [<a href="https://www.youtube.com/watch?v=naddH2TQIjE&ab_channel=CP2020">Video</a>]
        </StyledParagraph>
        

      </StyledInstructionsWrapper>
    </StyledContainer>
  );
};

export default Home;
