import React, {useState} from 'react';
import Header from './Header';
import LeftSidebar from "./LeftSidebar";
import styled from "styled-components";
function Feed() {
    /*
        .header
        DISPLAY GRID sidebar and content to left and right on single row *
     */

    return (
        <>
            <Header />
            <StyledSidebarAndContent>
                <LeftSidebar />
                <StyledContent>
                    Feed
                </StyledContent>
            </StyledSidebarAndContent>

        </>
    );
}
const StyledContent = styled.div`
    background-color: #581e8f;
`;
const StyledSidebarAndContent = styled.div`
    display: grid;
    grid-auto-flow: row;
    grid-template-columns: 272px 1fr;
`;
export default Feed;