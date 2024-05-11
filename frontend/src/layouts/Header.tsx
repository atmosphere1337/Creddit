import React from 'react';
import styled from "styled-components"
import CredditLogo from "../small-components/Creddit logo/CredditLogo";
import SearchBar from "../small-components/SearchBar/SarchBar";
import RedButton from "../small-components/RedButton/RedButton";
function Header() {
    return (
        /*
            semantic tag?
            material UI?
         */
        <StyledHeader>
            <StyledNav>
                <CredditLogo />

                <StyledRightBox>
                    <SearchBar />
                </StyledRightBox>
                <StyledRightBox>
                    <RedButton name="Sign In" />
                    <RedButton name="Sign Up" />
                </StyledRightBox>
            </StyledNav>
        </StyledHeader>
    );
}

const StyledHeader = styled.header`
    color: #aca9a9;
    border-bottom-width: 1px;
    border-top-width: 0;
    border-right-width: 0;
    border-left-width: 0;
    border-style: solid;
    padding-top: 5px;
    padding-bottom: 5px;
`;
const StyledNav = styled.nav`
    display: flex; 
    align-items: center;
`;
const StyledRightBox = styled.div`
    padding-right: 20px;
    padding-left: 20px;
    display: flex;
    align-items: center;
    margin-left: auto;
`;
const StyledSearchBarBox = styled.div`
    margin-left: auto;
`;
export default Header;