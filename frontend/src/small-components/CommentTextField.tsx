import React, {useState} from "react";
import styled from "styled-components";
import { addComment, INewComment } from "other/slices/commentSlice";
import { useAppDispatch } from "other/hooks";
import axios from "axios";
import {IPopularChannel} from "../other/widelyUsedTypes";
import {rawDataPopularChannels} from "../other/mocking-data/firstLoadData";

function CommentTextField({hide, parentCommentId, postId}:{hide: () => void, parentCommentId: number, postId: string}) {
    const [text, setText] = useState("");
    const dispatch = useAppDispatch();
    function refreshField(element : any) {
        element.target.style.height = "0px";
        element.target.style.height = (17 + element.target.scrollHeight) + "px";
        setText( element.target.value );
    }
    async function sendCommentToRedux() {
        let getId : number = -1 * Math.floor(Math.random() * 1000) -3; // get from api?
        let getName : string = "Creddible1337"; // get from what?
        let payload : INewComment = {id: getId, comment: text, name: getName, parent: parentCommentId};

        const config = {
            headers: {
                "Content-Type": "application/x-www-form-urlencoded"
            }
        };
        axios.post('/api/comment', {
            commentBody: text,
            postId: parseInt(postId),
            setParentCommentId : parentCommentId,
        }, config
            )
            .then((response) : void  => { })
            .catch( error => {
                alert('error');
                console.log(error);
            });
        dispatch(addComment(payload));
        hide();
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
                    <StyledCommentButtonDiv onClick={ sendCommentToRedux }> 
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