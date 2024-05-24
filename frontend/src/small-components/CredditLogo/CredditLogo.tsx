import styled from "styled-components";
import { StyledA } from "../../other/styles/CommonStyles";
import Picture  from './Picture';
import TextWhite from './TextWhite';

function CredditLogo() {
    return (
      <StyledA href="/">
        <StyledLogo>
          <Picture />
          <TextWhite />
        </StyledLogo>
      </StyledA>
    );
}

const StyledLogo = styled.div`
    padding-left: 10px;
`;

export default CredditLogo;