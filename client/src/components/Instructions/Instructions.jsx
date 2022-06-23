import React from "react";
import styled from "styled-components";
import HighlightedParahraph from "./HighlightedParagraph.jsx";
import start1 from "./../../assets/instructions/start-1.jpg";
import start2 from "./../../assets/instructions/start-2.jpg";
import start3 from "./../../assets/instructions/start-3.jpg";
import vcl from "./../../assets/instructions/vertical-cell-lines.jpeg";
import hcl from "./../../assets/instructions/horizontal-cell-lines.jpeg";

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

const StyledHeadingTop = styled.h1`
  font-size: 60px;
  line-height: 65px;
  font-weight: 700;
  margin: 10px;
`;

const StyledHeading1 = styled.h1`
  font-size: 60px;
  line-height: 65px;
  font-weight: 700;
  margin: 10px;
  margin-top:70px;
`;

const StyledHeading2 = styled.h2`
  font-size: 35px;
  line-height: 1.2;
  font-weight: 400;
  margin: 10px;
  margin-top:30px;
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
  list-style: inside;
  ul {
    padding-left: 2rem;
  };
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

const Instructions = () => {
  return (
    <StyledContainer>
      <StyledInstructionsWrapper>
        <StyledHeadingTop>Contents</StyledHeadingTop>
        <StyledParagraph>
        <ul>
          <li><a href="#tutorial">Tutorial</a></li>
          <ul>
            <li><a href="#upload_plan">Uploading a plan</a></li>
            <li><a href="#create_plan">Creating a new layout</a></li>
            <li><a href="#upload_layout">Uploading a layout</a></li>
          </ul>
          <li><a href="#faq">FAQ</a></li>
        </ul>
        </StyledParagraph>

        <StyledHeading1><a id="tutorial">Tutorial</a></StyledHeading1>
        <StyledParagraph>
        Welcome to our guide about how to get started with PLAID!{" "}
        </StyledParagraph>

        <StyledHeading2><a id="upload_plan">Uploading a plan</a></StyledHeading2>
        <StyledParagraph>
          Select this option to pre-populate all your experimental details using a JSON file.
          </StyledParagraph>

          <StyledParagraph>
          You'll be able to save your own experimental details after creating a plan, 
          but in the meantime here are some <a href="https://github.com/pharmbio/plaid/tree/main/gui-examples">examples</a> that you can download and use to familiarize yourself with PLAID.
        </StyledParagraph>
        
        <StyledParagraph>
          <StyledScaledImage
            src={start2}
            alt="Uploading an old plan"
            width="70%"
            height="70%"
          />
        </StyledParagraph>
        

        <StyledHeading2><a id="create_plan">Creating a new layout</a></StyledHeading2>
        <StyledParagraph>In the Tool page, select the "Let's get started!" button</StyledParagraph>
        <StyledParagraph>
          <StyledScaledImage
            src={start1}
            alt="Starting a new plan"
            width="70%"
            height="70%"
          />
        </StyledParagraph>
        <StyledHeading3>Plate size</StyledHeading3>
        <StyledParagraph>Select the size of the plates you want to use. 
          This will apply to all the plates in the plan. 
          If your plate size is not listed, select custum and input the plate size in terms of number of rows and columns.
        </StyledParagraph>
        <StyledHeading3>Cell line direction</StyledHeading3>
        <StyledParagraph>This is the number of divisions in the plate. Leave both values as 1 to use 
          the whole plate. All cell lines on the plate will have the same layout.
        </StyledParagraph>
        <StyledParagraph>
          Example of a plate with 2 vertical cell lines:
        </StyledParagraph>
        <StyledParagraph>
          <StyledScaledImage
            src={vcl}
            alt="2 vertical cell lines"
            width="70%"
            height="70%"
          />
        </StyledParagraph>
        <StyledParagraph>
          Example of a plate with 2 horizontal cell lines:
        </StyledParagraph>  
        <StyledParagraph>
          <StyledScaledImage
            src={hcl}
            alt="2 horizontal cell lines"
            width="70%"
            height="70%"
          />
        </StyledParagraph>
        <HighlightedParahraph title={"Note"} type={"Normal"}>
          <StyledParagraph>
            At the moment, when selecting an empty border, cell lines will be surrounded by that border,
            that is, the middle of the plate will be empty, as seen on the examples. 
          </StyledParagraph>
        </HighlightedParahraph>
        <StyledHeading3>Size of empty edges</StyledHeading3>
        <StyledParagraph>This is the number of rows and columns that should be left unused from the border of the plate.</StyledParagraph>
        <StyledHeading3>Allow empty wells</StyledHeading3>
        <StyledParagraph>This checkmark refers to inner empty wells (not the border). 
          If it is activated, it will only let you design layouts were all wells are used.</StyledParagraph>
        <StyledHeading3>Concentrations on different rows</StyledHeading3>
        <StyledParagraph>Forces all concentrations of a compound to appear on different rows.</StyledParagraph>
        <StyledHeading3>Concentrations on different columns</StyledHeading3>
        <StyledParagraph>Forces all concentrations of a compound to appear on different columns.</StyledParagraph>
        <StyledHeading3>Replicates on different plates</StyledHeading3>
        <StyledParagraph>Tries to place compound replicates to appear on different plates (if there are enough plates)</StyledParagraph>
        <StyledHeading3>Replicates on the same plate</StyledHeading3>
        <StyledParagraph>Forces replicates to appear on the same plate.</StyledParagraph>
        <HighlightedParahraph title={"Warning"} type={"Warning"}>
          <StyledParagraph>
            You cannot select both "Replicates on the same plate" and "Replicates on different plates". 
          </StyledParagraph>
        </HighlightedParahraph>
        <StyledHeading3>Next!</StyledHeading3>
        <StyledParagraph>
          Once you're ready with these settings, click next! 
          You'll be able to come back to this page if you need to.
        </StyledParagraph> 
        <StyledHeading3>Delimiter selection</StyledHeading3>
        <StyledParagraph>
          This is the character used to separate your compounds and concentrations.
          By default it is a comma, but you can type what you want, for example "\n" for a new line.
        </StyledParagraph> 
        <StyledHeading3>Compound names</StyledHeading3>
        <StyledParagraph>
          Here you need to type the names of your group of compounds. In general, there are no restrictions in 
          the names of the compounds, but, if you write them as "(1)(2)", this will be interpreted as a combination of
          compounds 1 and 2, and the corresponding wells will be displayed as half the color matching compound 2 and half
          with the color matching compound 2. We can display up to 4 combined compounds.
        </StyledParagraph> 
        <StyledHeading3>Compound concentrations</StyledHeading3>
        <StyledParagraph>
          Here you need to type the concentrations for the compounds you wrote above.
          These concentrations will apply to ALL of the compounds in the group!
          If you want other compounds in other concentrations, you can create a new group of compounds.
        </StyledParagraph> 
        <StyledHeading3>Compound replicates</StyledHeading3>
        <StyledParagraph>
          This is the number of replicates for all of the compounds in all of the concentrations in this group.
          If you want some compounds to have a different number of replicates, you should create a new group.
        </StyledParagraph> 
        <StyledHeading3>Next!</StyledHeading3>
        <StyledParagraph>
          Once you're ready with your compounds, click next! 
          You'll be able to come back to this page if you need to.
        </StyledParagraph> 
        <StyledHeading3>Delimiter selection</StyledHeading3>
        <StyledParagraph>
          This is the character used to separate your controls and their concentrations.
          By default it is a comma, but you can type what you want, for example "\n" for a new line.
        </StyledParagraph> 
        <StyledHeading3>Control names</StyledHeading3>
        <StyledParagraph>
          Here you need to type the names of your group of controls. Note that, similarly to the compounds,
          you can also create groups of controls.
        </StyledParagraph> 
        <StyledHeading3>Control concentrations</StyledHeading3>
        <StyledParagraph>
          Here you need to type the concentrations for the controls you wrote above.
          These concentrations will apply to ALL of the controls in the group!
          If you want other controls in other concentrations, you can create a new group of controls.
        </StyledParagraph> 
        <StyledHeading3>Control replicates</StyledHeading3>
        <StyledParagraph>
          This is the number of replicates for all of the controls in all of the concentrations in this group.
          If you want some controls to have a different number of replicates, you should create a new group.
        </StyledParagraph> 
        <StyledHeading3>Next!</StyledHeading3>
        <StyledParagraph>
          Once you're ready with these settings, click next! 
          You'll be able to come back to this page if you need to.
        </StyledParagraph> 
        <StyledHeading3>Download Input</StyledHeading3>
        <StyledParagraph>
          This button allows you to download a JSON file containing all the experimental information you just typed in.
          You can later on upload this file again to plan more plates with the same characteristics or to easily modify 
          only a couple of options.
        </StyledParagraph> 
        <StyledHeading3>Submit Form</StyledHeading3>
        <StyledParagraph>
          Once you're ready, click here to design your plates!

          On the next page, you'll need to wait until your layouts are ready. You'll then be able to download them as
          images, CSV, and a JSON file that can be later used to visualize it again using the "Upload" option.
        </StyledParagraph> 


        <StyledHeading2><a id="upload_layout">Uploading a layout</a></StyledHeading2>
        <StyledParagraph>
          <StyledScaledImage
            src={start3}
            alt="Uploading an old layout"
            width="70%"
            height="70%"
          />
        </StyledParagraph>
        <StyledParagraph>
          After planning a layout, you can download it an image, CSV file, and JSON file. 
          You can upload the JSON file here to visualize it again.
        </StyledParagraph>


        <StyledHeading1><a id="faq">FAQ</a></StyledHeading1>
        <StyledHeading2>Can I visualize a CSV file?</StyledHeading2>
        <StyledParagraph>No. At the moment, we only support the visualization of our own JSON file format.</StyledParagraph>

        <StyledHeading2>I am trying to create a new layout but it runs forever and I don't get any results. What is going on?</StyledHeading2>
        
        <StyledParagraph>Unfortunately, some particular designs can lead to unreasonably long runtimes. This is a known problem for constraint solvers, and even though we have done extensive performance testing, it is difficult to catch all cases [<a href="#ref1">1</a>, <a href="#ref2">2</a>]. 
        If you encounter this or any other issue, please save the details of your design and report the bug on <a href="https://github.com/pharmbio/plaid/issues">GitHub</a>. 
        This will help us find the cases that lead to extremely long runtimes. </StyledParagraph>

        <StyledParagraph>
        <a id="ref1">[1]</a> Goualard, Fr&eacute;d&eacute;ric, and Benhamou, Fr&eacute;d&eacute;ric. "Debugging Constraint Programs by Store Inspection." 
        Analysis and Visualization Tools for Constraint Programming. Springer, Berlin, Heidelberg, 2000. 273-297.
        </StyledParagraph>

        <StyledParagraph> 
        <a id="ref2">[2]</a> Meier, Micha. "Debugging constraint programs." International Conference on Principles and Practice of Constraint Programming. Springer, Berlin, Heidelberg, 1995.
        </StyledParagraph>


        <StyledHeading2>I have ideas on how to improve PLAID. How can I share them with you?</StyledHeading2>

        <StyledParagraph>We would love to hear from you! You just need to fill in our anonymous <a href="https://forms.gle/z1TKSqWZB9cxHkxZ8">suggestion form</a>.</StyledParagraph>

        
      </StyledInstructionsWrapper>
    </StyledContainer>
  );
};

export default Instructions;
