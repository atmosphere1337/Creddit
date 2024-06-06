import React from 'react';
import styled from "styled-components";
import {useAppSelector} from "../other/hooks";
import PostSmall from  '../large-components/PostSmall/PostSmall';

function FeedPage() {
    const allPosts = useAppSelector((state) => state.post.manyPosts);
    return (
        <StyledFeed>
            {  allPosts.map((element) => <PostSmall
                                                name={element.name}
                                                rating={element.rating}
                                                comments={element.comments}
                                                body={element.body}
                                            />) }


        </StyledFeed>
    );
}
const StyledFeed = styled.div`
    min-width: 765px;
    padding: 30px;
`;
export default FeedPage;