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
    isEdited: boolean,
    profilePicture: string,
    ownerId: number,
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
        isEdited = false,
        profilePicture = "default",
        ownerId = 0,
    } : TypeProps
) {
    const dispatch = useAppDispatch();
    const params = useParams();
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
                        <div style={{marginRight: "20px", width: "40px"}}>
                            <StyledA href={"/user/" + ownerId}>
                                {
                                    profilePicture != "default" &&
                                    <StyledAvatarDiv
                                        style={{backgroundImage: `url(${profilePicture})`, backgroundSize: "100% 100%"}}
                                    />
                                }
                                {
                                    profilePicture == "default" &&
                                    <StyledAvatarDiv
                                        style={{
                                            backgroundImage: `url(https://i.pinimg.com/736x/2f/15/f2/2f15f2e8c688b3120d3d26467b06330c.jpg)`,
                                            backgroundSize: "100% 100%",
                                        }}
                                    />
                                }
                            </StyledA>
                        </div>
                        <div style={{flexGrow: "1"}}>
                            <div style={{display: "flex", marginBottom: "10px"}}>
                                <div style={{marginRight: "20px", fontWeight: "bold"}}>
                                    <StyledA href={"/user/" + ownerId}>
                                        {name}
                                    </StyledA>
                                </div>
                                <div style={{ color: "#9f9e9e", marginRight: "15px" }}>
                                    {age}
                                </div>
                                { isEdited &&
                                    <div style={{color: "#9f9e9e"}}>
                                        edited
                                    </div>
                                }
                            </div>
                            <div style={{}}>
                                { showOrEdit &&
                                    <div style={{whiteSpace: "pre-wrap", wordWrap: "break-word", wordBreak: "break-all"}}>
                                        {comment}
                                    </div>
                                }
                                { !showOrEdit &&
                                    <div>
                                        <CommentTextField
                                            hide={ (): void => setShowOrEdit(true) }
                                            parentCommentId={ id }
                                            postId={params.post ? params.post : ""}
                                            mode={"edit"}
                                            editedBodyInitialState={comment}
                                            commentId={id}
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
                        <div style={{display: "flex", alignItems: "flex-start"}}>
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
                            mode={"create"}
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

const StyledAvatarDiv = styled.div`
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