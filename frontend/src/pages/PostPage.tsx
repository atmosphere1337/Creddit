import React from 'react';
import styled from "styled-components";
import {useAppSelector} from "../other/hooks";
import PostSmall from "../large-components/PostSmall/PostSmall";
import CommentSection from "./CommentSection";


function PostPage() {
    const selectOnePost = useAppSelector((state) => state.post.onePost);
    return (
      <StyledDiv>
        <PostSmall
            name={ selectOnePost.name }
            comments={ selectOnePost.comments }
            rating={ selectOnePost.rating }
            body={selectOnePost.body}
        />
        <CommentSection />
      </StyledDiv>
    );
}
const StyledDiv = styled.div`
    min-width: 765px;
    padding: 30px;
`;
export default PostPage;
