import React, { useState, Children, ReactNode } from "react";
import styled from "styled-components";
import ModalReport from "large-components/modal-windows/ModalReport";
import RatingButton from "small-components/RatingButton/RatingButton";
import ReplyButton from "small-components/ReplyButton/ReplyButton";
import CommentTextField from "small-components/CommentTextField";
import { StyledA } from "other/styles/CommonStyles";
import {useParams} from "react-router-dom";
import {IconButton} from "@mui/material";
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import axios from "axios";
import {useAppDispatch} from "other/hooks";
import {deleteComment} from "../other/slices/commentSlice";
import { getCookie } from "other/widelyUsedFunctions";

type TypeProps =  {
    name:string,
    comment:string,
    rating: number,
    age:string,
    id:number,
    children: ReactNode,
    isDeleted: boolean,
    preVote: number,
    isOwnedByUser: boolean,
};


function CommentCard(
    {
        name = "default",
        comment = "default",
        rating = 0,
        age = "0",
        id = 0,
        children = <></>,
        isDeleted = false,
        preVote,
        isOwnedByUser = false,
    } : TypeProps
) {
    const dispatch = useAppDispatch();
    const params = useParams();
    const colors : string[] = ["red", "blue", "yellow", "green", "gray", "blueviolet", "brown", "aquamarine"];
    const [randomColor, setRandomColor] = useState<number>(Math.floor(100 * Math.random()) % colors.length);
    const [showOrEdit, setShowOrEdit] = useState<boolean>(true); // true = show, false = edit
    const [showCommentSwitch, setShowCommentSwitch] = useState<boolean>(false);
    const showComment = () :void => {setShowCommentSwitch(true)};
    const hideComment = () :void => {setShowCommentSwitch(false)};
    function deleteCommentHandler() : void {
        const config : {headers: {"Authorization" : string}} = {
            headers: {
                "Authorization" : `Bearer ${getCookie("token")}`,
            }
        }
        axios.delete(`/api/comment/${id}`, config)
            .then(
                (response) : void => {
                    if (response.data.EraseOrMark == 1) {
                        dispatch(deleteComment({id: id, markOrErase: 1}));
                    }
                    else {
                        dispatch(deleteComment({id: id, markOrErase: 2}));
                    }
                }
            )
            .catch(
                (error) : void => {
                    alert("error. tried to delete comment");
                }
            );
    }
    const MarkedDownAsDeletedMarkup = () => {
        return (
            <>
                <div style={{backgroundColor: "#222222", padding: "20px", marginBottom: "20px", borderRadius: "15px"}}>
                   The comment is deleted
                </div>
                <StyledDiv2>
                    {children}
                </StyledDiv2>
            </>
        );
    }
    const NormalMarkup = () => {
        return (
            <>
                <StyledDiv>
                    <div style={{display: "flex"}}>
                        <div style={{marginRight: "20px"}}>
                            <StyledAvatarDiv dynamicColor={colors[randomColor]}/>
                        </div>
                        <div>
                            <div style={{display: "flex", marginBottom: "10px"}}>
                                <div style={{marginRight: "20px", fontWeight: "bold"}}>
                                    <StyledA href={"/user/" + name}>
                                        {name}
                                    </StyledA>
                                </div>
                                <div style={{ color: "#9f9e9e" }}>
                                    {age}
                                </div>
                            </div>
                            <div style={{maxWidth: "580px"}}>
                                { showOrEdit &&
                                    <div style={{whiteSpace: "pre-wrap", wordWrap: "break-word"}}>
                                        {comment}
                                    </div>
                                }
                                { !showOrEdit &&
                                    <div style={{width: "parent"}}>
                                        <CommentTextField
                                            hide={ (): void => setShowOrEdit(true) }
                                            parentCommentId={ id }
                                            postId={params.post ? params.post : ""}
                                        />
                                    </div>
                                }
                            </div>
                            <StyledButtonPadDiv>
                                <RatingButton value={rating} type={2} targetId={id} preVote={preVote}/>
                                <div onClick={ showComment }>
                                    <ReplyButton />
                                </div>
                                <ModalReport />
                            </StyledButtonPadDiv>
                        </div>
                        <div style={{marginLeft: "auto"}}>
                            {isOwnedByUser &&
                                <>
                                    <IconButton aria-label="edit" size="small" onClick={(): void => setShowOrEdit(false)}>
                                        <EditIcon fontSize="small" />
                                    </IconButton>
                                    <IconButton aria-label="delete" size="small" onClick={deleteCommentHandler}>
                                        <DeleteIcon fontSize="small" />
                                    </IconButton>
                                </>
                            }
                        </div>
                    </div>
                </StyledDiv>
                <StyledDiv2>
                    {
                        showCommentSwitch &&
                        <CommentTextField
                            hide={ hideComment }
                            parentCommentId={ id }
                            postId={params.post ? params.post : ""}
                        />
                    }
                    {children}
                </StyledDiv2>
            </>
        );
    }
    return (
        <>
            { !isDeleted && <NormalMarkup /> }
            { isDeleted && <MarkedDownAsDeletedMarkup />  }
        </>
    );
}

const StyledDiv = styled.div`
    margin-bottom: 20px;
    padding: 20px;
    border-radius: 15px;
    background-color: #403f3f;
`;

const StyledAvatarDiv = styled.div<{ dynamicColor?: string }>`
    background-color: ${ props => props.dynamicColor };
    height: 30px;
    width: 30px;
    border-radius: 666px;
`;

const StyledButtonPadDiv = styled.div`
    display: flex;
    align-items: center;
    gap: 7px;
    margin-top: 15px;
`;

const StyledDiv2 = styled.div`
    padding-left: 30px;
`;

export default CommentCard;