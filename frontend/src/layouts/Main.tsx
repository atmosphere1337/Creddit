import React, {useState} from 'react';
import Header from './Header';
import LeftSidebar from "./LeftSidebar";
import styled from "styled-components";
import Content from "./Content";
function Main() {
    return (
        <StyledMain>
          <Header />
          <StyledSidebarAndContent>
            <LeftSidebar />
            <Content />
          </StyledSidebarAndContent>
        </StyledMain>
    );
}
const StyledMain = styled.div`
    color: white;
    background-color: #301515;
`;
const StyledContent = styled.div`
    background-color: #581e8f;
`;
const StyledSidebarAndContent = styled.div`
    display: grid;
    grid-auto-flow: row;
    grid-template-columns: 272px 1fr;
`;
export default Main;