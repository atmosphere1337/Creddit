import React, {useEffect, useState}  from "react";
import styled from "styled-components";
import CommentCard from "large-components/CommentCard";
import CommentTextField from "small-components/CommentTextField";
import {ITreeComment, setListFirstLoad, treeFirstLoad} from 'other/slices/commentSlice'
import { useAppSelector, useAppDispatch } from 'other/hooks'
import axios from "axios";
import {ICommentCard, IListedComment, IPostMini} from "../other/widelyUsedTypes";
import {rawDataPostMany, rawListComments} from "../other/mocking-data/firstLoadData";
import {useParams} from "react-router";
import {getDateTimeStringAndTranslateItToAgeString} from "../other/widelyUsedFunctions";

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
    const params = useParams();
    const [defaultComment, setDefaultComment] = useState(false);
    const treeState = useAppSelector((state) => state.comment.tree);
    const dispatch = useAppDispatch()
    useEffect(() : void => {
        axios.get('/api/comment/' + params.post)
            .then((response) : void  => {
                const payload : IListedComment[] = response.data.map(
                    (comment : any) : IListedComment => {
                        const age: string = getDateTimeStringAndTranslateItToAgeString(comment.createdAt);
                        return {
                            id: comment.id,
                            parent: comment.parentCommentId,
                            name: comment.username,
                            comment: comment.body,
                            rating: comment.rating,
                            age: age,
                            /*
                            "id": 1,
                            "body": "Hi backend. It is the first comment.",
                            "userId": 1,
                            "postId": 1,
                            "parentCommentId": 0,
                            "rating": 0,
                            "amountOfChildComments": 1
                             */
                        }
                    }
                );
                dispatch(setListFirstLoad(payload));
                dispatch(treeFirstLoad());
            })
            .catch( error => {
                dispatch(setListFirstLoad(rawListComments));
                dispatch(treeFirstLoad());
            });
    }, []);
    function switchDefaultComment() {
        setDefaultComment(x => !x);
    }
    return (
        <StyledDiv>
            {
                defaultComment &&
                <div>
                    <CommentTextField
                        hide={ switchDefaultComment }
                        parentCommentId={ 0 }
                        postId={params.post ? params.post : ""}
                    />
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