import Feed from './Feed';
import ContentSidebarRight from "./ContentSidebarRight";
import styled from "styled-components";
function Content() {
    return (
        <StyledDiv>
            <Feed />
            <ContentSidebarRight />
        </StyledDiv>
    );
}
const StyledDiv = styled.div`
    display: flex;
    justify-content: center;
`;
export default Content;