import React, {useState} from 'react';
import styled, { css } from 'styled-components';


function AddEditPostPage() {
    const [title, setTitle ] = useState<string>("");
    const [body, setBody ] = useState<string>("");
    function submit() {
        alert("The post is submitted");
        window.location.href = "../";
    }
    function cancel() {
        alert("You canceled post submission");
        window.location.href = "../";
    }
    return (
        <StyledDiv>
            <StyledInlineBlock>
                Create a post
            </StyledInlineBlock>
            <StyledInput placeholder="title" value={title} onChange={(e : any) => setTitle(e.target.value)}/>
            <StyledTextArea placeholder="body" value={body} onChange={(e : any) => setBody(e.target.value)} />
            <StyledButtonDockDiv>
                <StyledButtonSubDockDiv>
                    <StyledSubmitButtonDiv onClick={ submit }>Submit</StyledSubmitButtonDiv>
                    <StyledCancelButtonDiv onClick={ cancel }>Cancel</StyledCancelButtonDiv>
                </StyledButtonSubDockDiv>
            </StyledButtonDockDiv>
        </StyledDiv>
    );
}

const StyledDiv = styled.div`
    min-width: 765px;
    padding: 30px;
`;
const StyledInlineBlock = styled.div`
    display: inline-block;
    margin-bottom: 20px;
`;
const StyledBasicField = css`
    display: block;
    width: 100%;
    background-color: black;
    color: white;
    &:focus { outline: none; }
`;
const StyledInput = styled.input`
    ${StyledBasicField};
    padding: 7px 14px;
    margin-bottom: 20px;
    border-radius: 666px;
`;
const StyledTextArea = styled.textarea`
    ${StyledBasicField};
    padding: 7px 14px 50px 14px;
    border-radius: 15px;
    height: 100px;
`;
const StyledButtonDockDiv = styled.div`
    display: flex;
    position: relative;    
    bottom: 50px;
`;
const StyledButtonSubDockDiv = styled.div`
    display: flex;
    margin-left: auto;
    gap: 7px;
`;
const StyledBasicButton = styled.div`
    display: inline-block;
    padding: 5px 10px;
    border-radius: 3px;
    cursor: pointer;
`;
const StyledSubmitButtonDiv = styled(StyledBasicButton)`
    background-color: blue;
`;
const StyledCancelButtonDiv = styled(StyledBasicButton)`
    background-color: gray;
`;

export default AddEditPostPage;
