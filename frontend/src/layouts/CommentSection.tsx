import React from "react";
import styled from "styled-components";
import {useEffect, useState} from "react";
import { treeFirstLoad, ITreeComment } from '../other/slices/commentSlice'
import { useAppSelector, useAppDispatch } from '../other/hooks'
import CommentCard from "../large-components/CommentCard";
import CommentTextField from "../small-components/CommentTextField";

function RecursiveComment( { node } : {node: ITreeComment}) {
    return (
        <CommentCard key={node.id} id={node.id} name={node.name} comment={node.comment} rating={node.rating} age={node.age}>
            {
                node.children.map(
                    (x : ITreeComment) => <RecursiveComment key={x.id} node={x} />
                )
            }
        </CommentCard>
    );
}

function CommentSection() {
    const [defaultComment, setDefaultComment] = useState(false);
    const treeState = useAppSelector((state) => state.comment.tree);
    const dispatch = useAppDispatch()
    function switchDefaultComment() {
        setDefaultComment(x => !x);
    }
    return (
        <StyledDiv>
            {
                defaultComment &&
                <div>
                    <CommentTextField hide={ switchDefaultComment } parentCommentId={ 0 }/> 
                </div>
            }
            {
                !defaultComment &&
                <StyledPopoutNewCommentDiv onClick={ switchDefaultComment }>
                    Add comment
                </StyledPopoutNewCommentDiv>
            }
            { /*
                Print comment tree with AllFatherComment
                <RecursiveComment key={0} node={ treeState[0] }/> 
            */ }
            {
                // Print comment tree without AllFather comment
                treeState[0].children.map((x => <RecursiveComment key={0} node={ x } />))
            }
        </StyledDiv>
    );
}

const StyledDiv = styled.div`
    padding: 10px;
`
const StyledPopoutNewCommentDiv = styled.div`
    padding: 5px 20px;
    margin-bottom: 18px;
    border: solid;    
    border-width: 1px;
    border-radius: 666px;
    color: #555555;
    cursor: pointer;
`;

export default CommentSection;