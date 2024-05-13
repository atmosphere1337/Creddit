import React, {useState, useEffect, } from 'react';
import {useParams} from "react-router-dom";
import styled from "styled-components";
import Header from './Header';
import LeftSidebar from "./LeftSidebar";
import Feed from './Feed';
import ContentSidebarRight from "./ContentSidebarRight";
import ApiFirstLoad from "./ApiFirstLoad";
import ChannelWallpaper from "../large-components/ChannelWallpaper";
function Main({type = "default"} : {type: string}) {
    let { channelUrl } = useParams();
    return (
        <StyledMain>
          <ApiFirstLoad />
          <Header />
          <StyledSidebarAndContent>
            <LeftSidebar />
            <StyledContentDiv>
              <div>
                {
                    type == "channel" &&
                    <ChannelWallpaper />
                }
                <Feed />
              </div>
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