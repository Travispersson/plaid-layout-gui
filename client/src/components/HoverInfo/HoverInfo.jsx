import React, { useState } from "react";
import styled from "styled-components";
import { ReactComponent as InfoIcon } from "../../assets/icons/info-circle-fill.svg";


const StyledInfoIcon = styled(InfoIcon)`
    margin-bottom: 5px;
`
const StyledInfoContainer = styled.div`
    position: relative;
    width: 
`
const StyledInfoBox = styled.div`
    position: absolute;
    bottom: 50px;
    margin-left: 10px;
    width: 200px;
	height: 200px;
    padding: 20px 10px 10px 20px;
	background-color: #2C2F33;
    color:  	#FFFFFF;
    border-radius: 10px;
    :after{
	content: ' ';
	position: absolute;
	width: 0;
	height: 0;
	left: 0px;
    right: auto;
    top: auto;
	bottom: -20px;
	border: 22px solid;
	border-color: transparent transparent transparent #2C2F33;
    }
`


const HoverInfo = (props) => {
    const [hover, setHover] = useState(false);



    return (
        <StyledInfoContainer>
            {hover ? <StyledInfoBox>
                {props.children}
            </StyledInfoBox> : null}
            <StyledInfoIcon
                onMouseEnter={() => setHover(true)}
                onMouseLeave={() => setHover(false)}>
            </StyledInfoIcon>
        </StyledInfoContainer>);
}

export default HoverInfo