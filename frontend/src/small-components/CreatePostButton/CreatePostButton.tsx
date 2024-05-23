import React from 'react';
import styled from "styled-components";
import PlusIconSVG from "./PlusIconSVG";

function CreatePostButton() {
    return (
        <StyledDiv>
          <StyledDiv2>
            <PlusIconSVG />
          </StyledDiv2>
          Create Post
        </StyledDiv>
    );
}
const StyledDiv = styled.div`
    display: flex;
    align-items: center;
    background-color: black;
    padding: 10px 20px;
    border-radius: 666px;
`;
const StyledDiv2 = styled.div`
    margin-bottom: -150px;
    margin-top: -150px;
`;
export default CreatePostButton;


