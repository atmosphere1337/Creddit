import styled from "styled-components";

const StyledA = styled.a`
    &:link {
        text-decoration: inherit;
        color: inherit;
        cursor: auto;
    }
    &:visited {
        text-decoration: inherit;
        color: inherit;
        cursor: auto;
    }
    &:hover {
        cursor: pointer;
    }
`;
export { StyledA };