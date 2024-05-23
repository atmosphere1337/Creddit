import React from 'react';
import styled from "styled-components";
import PostSmall from "../large-components/PostSmall/PostSmall";
import CommentSection from "./CommentSection";


function PostPage() {
    return (
      <StyledDiv>
        <PostSmall name={ "what" } comments={ 1337 } rating={ 228 } />
        <CommentSection />
      </StyledDiv>
    );
}
const StyledDiv = styled.div`
    min-width: 765px;
    padding: 30px;
`;
export default PostPage;
