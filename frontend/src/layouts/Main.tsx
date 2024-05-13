import React, {useState, useEffect} from 'react';
import Header from './Header';
import LeftSidebar from "./LeftSidebar";
import styled from "styled-components";
import Feed from './Feed';
import ContentSidebarRight from "./ContentSidebarRight";
function Main() {
    useEffect(() => {
        let url : string = "/api/feed";
        let options = {
            method: "GET"    
        };
        fetch(url)
        .then(res => res.json() )
        .then( payload => {
            alert(JSON.stringify(payload));
        });
    });
    return (
        <StyledMain>
          <Header />
          <StyledSidebarAndContent>
            <LeftSidebar />
            <StyledContentDiv>
              <Feed />
              <ContentSidebarRight />
            </StyledContentDiv>
          </StyledSidebarAndContent>
        </StyledMain>
    );
}
const StyledMain = styled.div`
    color: white;
    background-color: #301515;
`;
const StyledSidebarAndContent = styled.div`
    display: grid;
    grid-auto-flow: row;
    grid-template-columns: 272px 1fr;
`;
const StyledContentDiv = styled.div`
    display: flex;
    justify-content: center;
`;
export default Main;