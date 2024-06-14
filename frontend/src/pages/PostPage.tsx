import React, {useEffect} from 'react';
import styled from "styled-components";
import PostSmall from "large-components/PostSmall/PostSmall";
import CommentSection from "large-components/CommentSection";
import {useAppSelector} from "other/hooks";
import { useParams } from 'react-router';

function PostPage() {
    const selectOnePost = useAppSelector((state) => state.post.onePost);
    const params = useParams();
    useEffect(() => {
        alert(params.post);
    }, []);
    return (
      <StyledDiv>
        <PostSmall props={selectOnePost} />
        <CommentSection />
      </StyledDiv>
    );
}

const StyledDiv = styled.div`
    min-width: 765px;
    padding: 30px;
`;

export default PostPage;
