import styled from "styled-components";
import {useEffect, useState} from "react";
import { treeFirstLoad, inc } from '../other/commentSlice'
import { useAppSelector, useAppDispatch } from '../other/hooks'
import CommentCard from "../large-components/CommentCard";
import CommentTextField from "../small-components/CommentTextField";

function RecursiveComment() {
    const treeState = useAppSelector((state) => state.comment.tree);
    const valueState = useAppSelector((state) => state.comment.value);
    const dispatch = useAppDispatch()
    useEffect( () => {
        dispatch(treeFirstLoad());
        console.log("small rawTree");
        console.log( treeState );
        console.log("value", valueState);
    } );
    return (
        <>
            {
                treeState[0].children.map(x =>
                    <CommentCard name={x.name} comment={x.comment} rating={x.rating} age={x.age}>
                        {
                            x.children.map(
                                y => <RecursiveComment   />
                            )
                        }
                    </CommentCard>
                )
            }
        </>
    );
}

function CommentSection() {
    const [defaultComment, setDefaultComment] = useState(false);
    //const [rawTree, setRawTree] = useState<ITreeComment[]>( [ {id: 0, parent: -1, name:"", comment:"", rating: 0, age: 0, children: []}, ] );
    //const [rawQueue, setRawQueue] = useState<ITreeComment[]>([ rawTree[0] ]);
    const treeState = useAppSelector((state) => state.comment.tree);
    const valueState = useAppSelector((state) => state.comment.value);
    const dispatch = useAppDispatch()
    function switchDefaultComment() {
        setDefaultComment(x => !x);
    }
    useEffect( () => {
        dispatch(treeFirstLoad());
        console.log("rawTree");
        console.log( treeState )
        dispatch(inc());
    },[] );

    return (
        <StyledDiv>
            {
                defaultComment &&
                <div>
                    <CommentTextField hide={ switchDefaultComment } />
                </div>
            }
            {
                !defaultComment &&
                <StyledPopoutNewCommentDiv onClick={ switchDefaultComment }>
                    Add comment
                </StyledPopoutNewCommentDiv>
            }
            <RecursiveComment />
        </StyledDiv>
    );
}

const StyledDiv = styled.div`
    background-color: indigo;
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