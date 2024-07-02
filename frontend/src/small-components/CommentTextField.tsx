import React, {useEffect, useState} from "react";
import styled from "styled-components";
import {addComment, INewComment, updateComment} from "other/slices/commentSlice";
import {useAppDispatch, useAppSelector} from "other/hooks";
import axios from "axios";
import {IPopularChannel} from "../other/widelyUsedTypes";
import {rawDataPopularChannels} from "../other/mocking-data/firstLoadData";
import {getCookie} from "../other/widelyUsedFunctions";

interface ICommentTextFieldProps {
    hide: () => void,
    parentCommentId: number,
    postId: string,
    commentId?: number,
    editedBodyInitialState?: string,
    mode: "create" | "edit",
}

function CommentTextField({
                              hide,
                              parentCommentId,
                              postId,
                              editedBodyInitialState = "",
                              mode = "create",
                              commentId,
                          }: ICommentTextFieldProps) {
    const [text, setText] = useState("");
    const dispatch = useAppDispatch();
    let getName: string = useAppSelector((state) => state.user.username);
    let getId: number = -1 * Math.floor(Math.random() * 1000) - 3; // get from api?
    useEffect((): void => {
        setText(editedBodyInitialState ? editedBodyInitialState : "");
    }, [editedBodyInitialState]);

    function refreshField(element: any): void {
        element.target.style.height = "0px";
        element.target.style.height = (17 + element.target.scrollHeight) + "px";
        setText(element.target.value);
    }

    function sendCommentToRedux(): void {
        let payload: INewComment = {id: getId, comment: text, name: getName, parent: parentCommentId};
        const config: {headers: {"Content-Type" : string, "Authorization" : string}} = {
            headers: {
                "Content-Type": "application/x-www-form-urlencoded",
                "Authorization": `Bearer ${getCookie("token")}`,
            }
        };
        axios.post('/api/comment', {
            commentBody: text,
            postId: parseInt(postId),
            setParentCommentId: parentCommentId,
        }, config)
            .then((response): void => {
                payload.id = response.data.idOfCreatedComment;
                dispatch(addComment(payload));
                hide();
            })
            .catch(error => {
                alert('error');
                console.log(error);
            });
    }
    function updateCommentHandler(): void {
        if (!commentId)
            return;
        const requestBody: {commentBody: string} = {
            commentBody: text,
        };
        const config: {headers: {"Content-Type" : string, "Authorization" : string}} = {
            headers: {
                "Content-Type": "application/x-www-form-urlencoded",
                "Authorization": `Bearer ${getCookie("token")}`,
            }
        };
        axios.put('/api/comment/' + commentId, requestBody, config)
            .then((response): void => {
                if (commentId)
                    dispatch(updateComment({id: commentId, body: text}));
                hide();
            })
            .catch((): void => {
                alert('error');
            }
            );
    }

    return (
        <div>
            <StyledTextArea
                value={text}
                onChange={(e): void => {
                    refreshField(e)
                }}
                rows={text.length / 55}
            >
            </StyledTextArea>
            <div style={{display: "flex"}}>
                <div style={{marginLeft: "auto", marginRight: "10px"}}>
                    <StyledCancelButtonDiv onClick={hide}>
                        Cancel
                    </StyledCancelButtonDiv>
                    <StyledCommentButtonDiv onClick={mode == "create" ? sendCommentToRedux : updateCommentHandler}>
                        {mode == "create" && "Comment"}
                        {mode == "edit" && "Save edits"}
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