import React from 'react';
import styled from "styled-components";
import PostSmall from  '../large-components/PostSmall/PostSmall';

const rawData = [
    {name: "Article 1", rating: 666, comments: 42},
    {name: "Article 2", rating: 1337, comments: 13},
    {name: "Article 3", rating: 322, comments: 137},
    {name: "Article 4", rating: 24, comments: 148},
    {name: "Article 5", rating: 999, comments: 111},
    {name: "Article 6", rating: 321, comments: 456},
]
function Feed() {
    return (
        <StyledFeed>
            { rawData.map((element) => <PostSmall
                                                name={element.name}
                                                rating={element.rating}
                                                comments={element.comments}
                                            />)}

        </StyledFeed>
    );
}
const StyledFeed = styled.div`
    min-width: 765px;
    padding: 30px;
`;
export default Feed;