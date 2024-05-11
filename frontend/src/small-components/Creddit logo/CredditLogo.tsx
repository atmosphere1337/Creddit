import Picture  from './Picture';
import TextWhite from './TextWhite';
import styled from "styled-components";
function CredditLogo() {
    return (
        <StyledLogo>
            <a href="/">
                <Picture />
                <TextWhite />
            </a>
        </StyledLogo>
    );
}

const StyledLogo = styled.div`
    padding-left: 10px;
`;

export default CredditLogo;