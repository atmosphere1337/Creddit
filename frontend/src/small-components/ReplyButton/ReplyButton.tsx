import React from 'react';
import styled from "styled-components";
import CommentIconSVG from "small-components/ReplyButton/CommentIconSVG";

function ReplyButton() {
    return (
        <StyledDiv>
            <StyledDiv2>
                <CommentIconSVG />
                Reply
            </StyledDiv2>
        </StyledDiv>
    );
}

const StyledDiv = styled.div`
    padding: 5px 10px;
    border-radius: 100px;
    display: inline-block;
    background-color: #252e29;
    cursor: pointer;
`;

const StyledDiv2 = styled.div`
    display: flex;
    align-items: center;
    gap: 5px;
`;

export default ReplyButton;