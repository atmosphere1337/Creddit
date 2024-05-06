import styled from "styled-components";
import PostSmall from  '../large-components/PostSmall/PostSmall';

function Feed() {
    return (
        <StyledFeed>
            <PostSmall />
            <PostSmall />
            <PostSmall />
            <PostSmall />
        </StyledFeed>
    );
}
const StyledFeed = styled.div`
    padding: 30px;
    background-color: #491f0f;
`;
export default Feed;