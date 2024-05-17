import styled from "styled-components";
import {useState} from "react";

function CommentTextField({hide}:{hide: any}) {
    const [text, setText] = useState("");
    function refreshField(element : any) {
        element.target.style.height = "0px";
        element.target.style.height = (17 + element.target.scrollHeight) + "px";
        setText( element.target.value );
    }
    return (
        <div>
            <StyledTextArea value = { text } onChange={ ( e ) => { refreshField(e) } }>
            </StyledTextArea>
            <div style={{ display: "flex" }}>
                <div style={{ marginLeft: "auto", marginRight: "10px" }}>
                    <StyledCancelButtonDiv onClick={ hide }>
                        Cancel
                    </StyledCancelButtonDiv>
                    <StyledCommentButtonDiv>
                        Comment
                    </StyledCommentButtonDiv>
                </div>
            </div>
        </div>
    );
}
const StyledTextArea = styled.textarea`
    box-sizing: border-box;
    padding: 15px 15px 50px 15px;
    width: 100%;
    border-radius: 10px;
    background-color: black;
    color: white;
    resize: none;
`;

const StyledButtonDiv = styled.div`
    position: relative;
    bottom: 50px;
    display: inline-block;
    padding: 10px 20px;
    border-radius: 666px;
    margin-bottom: -500px;
    margin-top: -500px;
    cursor: pointer;
`;
const StyledCommentButtonDiv = styled(StyledButtonDiv)`
    background-color: blue;

    &:hover {
        background-color: #4646fa;
    }
`;
const StyledCancelButtonDiv = styled(StyledButtonDiv)`
    background-color: #333333;
    margin-right: 7px;
    &:hover {
        background-color: #555555;
    }
`;

export default CommentTextField;