import React, { useState, Children, ReactNode } from "react";
import styled from "styled-components";
import ModalReport from "large-components/modal-windows/ModalReport";
import RatingButton from "small-components/RatingButton/RatingButton";
import ReplyButton from "small-components/ReplyButton/ReplyButton";
import CommentTextField from "small-components/CommentTextField";
import { StyledA } from "other/styles/CommonStyles";
import {useParams} from "react-router-dom";

type TypeProps =  { name:string, comment:string, rating: number, age:string, id:number, children: ReactNode };

function CommentCard({ name = "default", comment = "default", rating = 0, age = "0", id = 0, children = <></>} : TypeProps) {
    const params = useParams();
    const colors : string[] = ["red", "blue", "yellow", "green", "gray", "blueviolet", "brown", "aquamarine"];
    const [randomColor, setRandomColor] = useState(Math.floor(100 * Math.random()) % colors.length);
    const [showCommentSwitch, setShowCommentSwitch] = useState(false);
    const showComment = () => {setShowCommentSwitch(true)};
    const hideComment = () => {setShowCommentSwitch(false)};
    return (
        <>
            <StyledDiv>
                <div style={{ display: "flex" }}>
                    <div style={{ marginRight: "20px" }}>
                        <StyledAvatarDiv dynamicColor={ colors[randomColor] } />
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
                        <div>
                            {comment}
                        </div>
                        <StyledButtonPadDiv>
                            <RatingButton value={rating}/>
                            <div onClick={ showComment }>
                                <ReplyButton />
                            </div>
                            <ModalReport />
                        </StyledButtonPadDiv>
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